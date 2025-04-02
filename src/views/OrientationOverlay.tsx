import { useEffect, useState } from 'react';

const OrientationOverlay = () => {
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  if (!isPortrait) return null;

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 9999,
        top: 0,
        left: -20,
        width: '100vw',
        height: '100vh',
        background: 'black',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1rem',
      }}
    >
      <h2>Please rotate your device to landscape mode.</h2>
    </div>
  );
};

export default OrientationOverlay;
