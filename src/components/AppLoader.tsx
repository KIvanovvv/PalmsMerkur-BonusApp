import { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import Main from '../views/Main';
import sinCityImg from '../assets/sinCity.png';
import logo from '../assets/logo.png';
import startVideo from '../assets/startVideo.mp4';
import gameVideo from '../assets/gameVideo.mp4';
import cardAssets from '../assets/cardAssets';

const ASSETS = [sinCityImg, logo, startVideo, gameVideo, ...cardAssets];

import { preloadAllAssets } from '../utils/preloadAssets';

const AppLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await preloadAllAssets(ASSETS);
      setIsLoaded(true);
    })();
  }, []);

  if (!isLoaded) {
    return (
      <Stack
        sx={{
          width: '100vw',
          height: '100vh',
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
        }}
      >
        <img src={logo} alt='Logo' style={{ width: '300px', height: 'auto' }} />
      </Stack>
    );
  }

  return <Main />;
};

export default AppLoader;
