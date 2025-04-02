import { keyframes } from '@mui/material';

export const gradientMove = keyframes`
  0% {
    background-position: 50% 50%;
  }
  10% {
    background-position: 20% 80%;
  }
  25% {
    background-position: 70% 10%;
  }
  40% {
    background-position: 10% 90%;
  }
  55% {
    background-position: 90% 30%;
  }
  70% {
    background-position: 30% 70%;
  }
  85% {
    background-position: 80% 80%;
  }
  100% {
    background-position: 50% 50%;
  }
`;

export const bounceY = keyframes`
  0% {
    top: -20px;
  }
  50% {
    top: 20px;
  }
  100% {
    top: -20px;
  }
`;
