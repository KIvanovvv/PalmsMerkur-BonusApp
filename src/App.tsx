import { Stack } from '@mui/material';
import './App.css';
import '@fontsource/montserrat/700.css';
import AppLoader from './components/AppLoader';
import OrientationOverlay from './views/OrientationOverlay';

function App() {
  return (
    <Stack sx={{ height: '100vh', width: '100vw' }}>
      <OrientationOverlay />
      <AppLoader />
    </Stack>
  );
}

export default App;
