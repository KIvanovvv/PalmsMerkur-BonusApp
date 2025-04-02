import { Stack } from '@mui/material';
import StartButton from '../components/StartButton';
import sinCityImg from '../assets/sinCity.png';

type StartScreenProps = {
  setGameIsOn: (value: boolean) => void;
};

const StartScreen = (props: StartScreenProps) => {
  const { setGameIsOn } = props;

  return (
    <Stack sx={{ width: '100%', alignItems: 'center' }}>
      <Stack>
        <img src={sinCityImg} alt='Sin City' style={{ width: 300, height: 'auto' }} />
      </Stack>
      <Stack sx={{ mt: '10%' }}>
        <StartButton onStart={() => setGameIsOn(true)} />
      </Stack>
    </Stack>
  );
};

export default StartScreen;
