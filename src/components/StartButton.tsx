import { Button, Typography } from '@mui/material';
import { gradientMove, bounceY } from '../utils/animations';

type StartButtonProps = {
  onStart: () => void;
};

const StartButton = (props: StartButtonProps) => {
  const { onStart } = props;

  return (
    <Button
      variant='outlined'
      onClick={onStart}
      sx={{
        border: '3px solid white',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '24px',
        borderColor: 'white',
        boxSizing: 'border-box',
        padding: 0,
        color: 'white',
        zIndex: 1,
        '&:hover': {
          border: '5px solid white',
          borderColor: 'white',
          bgcolor: 'rgba(255, 0, 0, 0.86)',
        },
        '&:active': {
          border: '2px solid white',
        },
        '&:focus': {
          outline: 'none',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-20px',
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, rgba(255, 0, 0, 0.86), transparent 100%)',
          backgroundSize: '200% 200%',
          animation: `${gradientMove} 10s ease infinite, ${bounceY} 3s ease-in-out infinite`,
          filter: 'blur(10px)',
          zIndex: -1,
          transition: 'opacity 0.3s ease-in-out',
        },
        '&:hover::before': {
          opacity: 0.8,
        },
      }}
    >
      <Typography
        sx={{
          fontSize: 32,
          px: '130px',
          py: '12px',
          fontFamily: 'Montserrat, sans-serif',
          zIndex: 2,
          position: 'relative',
        }}
      >
        Start Now
      </Typography>
    </Button>
  );
};

export default StartButton;
