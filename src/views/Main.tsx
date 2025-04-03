import { Stack, Box, Fade, Typography, TextField, Button } from '@mui/material';
import logo from '../assets/logo.png';
import startVideo from '../assets/startVideo.mp4';
import gameVideo from '../assets/gameVideo.mp4';
import { useState } from 'react';
import StartScreen from './StartScreen';
import GameScreen from './GameScreen';
import { verifyPassword } from '../utils/passCheck';

const Main = () => {
  const [gameIsOn, setGameIsOn] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [wrongPass, setWrongPass] = useState(false);

  const onResetGame = async () => {
    const isValid = await verifyPassword(userInput);
    if (isValid) {
      setGameIsOn(false);
      setUserInput('');
      setOpenResetModal(false);
      localStorage.clear();
    } else {
      setWrongPass(true);
      setUserInput('');
      setTimeout(() => {
        setWrongPass(false);
      }, 2000);
    }
  };

  const handleSwitchScreen = (value: boolean) => {
    if (!gameIsOn && !value) {
      setOpenResetModal(true);
      return;
    }
    setIsTransitioning(true);

    setTimeout(() => {
      setGameIsOn(value);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <Stack
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <Box
        component='video'
        key={gameIsOn ? 'game' : 'start'}
        src={gameIsOn ? gameVideo : startVideo}
        autoPlay
        muted
        loop
        playsInline
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -100,
        }}
      />

      {openResetModal && (
        <Stack
          onClick={() => setOpenResetModal(false)}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack
            onClick={(e) => e.stopPropagation()}
            sx={{
              width: 500,
              height: 350,
              gap: 5,
              alignItems: 'center',
              border: '1px solid white',
              borderRadius: 4,
              bgcolor: 'black',
              boxSizing: 'border-box',
              zIndex: 2,
            }}
          >
            <Stack>
              <Typography sx={{ color: 'white', fontSize: 40, textAlign: 'center', mt: 2, fontFamily: 'monteserrat' }}>Reset Game</Typography>
              <Typography sx={{ color: 'white', fontSize: 26, textAlign: 'center', mt: 2, fontFamily: 'monteserrat' }}>
                Enter password to reset the game.
              </Typography>
            </Stack>

            <Stack>
              <TextField
                type='password'
                variant='outlined'
                placeholder='Enter password'
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                sx={{
                  width: 300,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                  input: {
                    color: 'white',
                  },
                }}
              />
              <Button
                variant='outlined'
                size='large'
                sx={{
                  mt: 2,
                  color: 'rgba(255, 0, 0, 0.86)',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease-in-out',
                  borderColor: 'rgba(255, 0, 0, 0.86)',
                  '&:hover': {
                    borderColor: 'rgba(255, 0, 0, 0.86)',
                    bgcolor: 'rgba(255, 0, 0, 0.86)',
                    color: 'white',
                  },
                }}
                onClick={onResetGame}
              >
                Reset Game
              </Button>

              <Typography
                sx={{
                  color: 'red',
                  fontSize: 20,
                  textAlign: 'center',
                  mt: 2,
                  fontFamily: 'monteserrat',
                  display: wrongPass ? 'block' : 'none',
                }}
              >
                Wrong password
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      )}

      <Fade in={isTransitioning} timeout={300}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            zIndex: 2,
          }}
        />
      </Fade>
      <Stack
        sx={{
          p: '1rem',
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 1,
          boxSizing: 'border-box',
        }}
      >
        <Stack
          sx={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            cursor: 'pointer',
          }}
          onClick={() => handleSwitchScreen(false)}
        >
          <img src={logo} alt='Logo' style={{ width: '140px', height: 'auto' }} />
        </Stack>

        {!gameIsOn ? <StartScreen setGameIsOn={() => handleSwitchScreen(true)} /> : <GameScreen setGameIsOn={setGameIsOn} />}
      </Stack>
    </Stack>
  );
};

export default Main;
