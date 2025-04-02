import { Stack } from '@mui/material';
import { motion } from 'framer-motion';
import bloodBonus from '../assets/bloodBonus.png';
import { useState } from 'react';
import selected from '../assets/selected.png';

const MotionStack = motion(Stack);

type BonusCardProps = {
  layoutId: string;
  hidden: boolean;
  cardImageA: string;
  cardImageB: string;
  bonusImg: string;
  onClick: () => void;
  isSelected?: boolean;
};

const BonusCard = (props: BonusCardProps) => {
  const { layoutId, hidden, cardImageA, cardImageB, bonusImg, onClick, isSelected = false } = props;
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnterAction = () => {
    if (isSelected) return;
    setIsHovered(true);
  };

  const onMouseLeaveAction = () => {
    if (isSelected) return;
    setIsHovered(false);
  };

  return (
    <MotionStack
      layoutId={layoutId}
      onClick={onClick}
      onMouseEnter={onMouseEnterAction}
      onMouseLeave={onMouseLeaveAction}
      sx={{
        visibility: hidden ? 'hidden' : 'visible',
        width: 'min(30vw, 180px)',
        maxWidth: '270px',
        height: 'min(20vh, 200px)',
        flexShrink: 1,
        flexGrow: 1,
        border: isSelected ? '' : '1px solid white',
        borderTop: isSelected ? '' : '5px solid white',
        borderBottom: isSelected ? '' : '5px solid white',
        borderRadius: 5,
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <img
        src={isHovered && !isSelected ? cardImageB : cardImageA}
        alt='Card A'
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          transition: 'transform 0.3s',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />

      <Stack
        sx={{
          position: 'absolute',
          bottom: 10,
          width: '100%',
          alignItems: 'center',
        }}
      >
        {isSelected ? (
          <Stack sx={{ width: '100%' }}>
            <img
              src={selected}
              alt='Selected'
              style={{
                width: 100,
                height: 'auto',
                objectFit: 'cover',
                objectPosition: 'center',
                transition: 'transform 0.3s',
                alignSelf: 'flex-end',
              }}
            />
            <img src={bonusImg} alt='Blood Bonus' style={{ width: 80, height: 'auto', opacity: 0.8, alignSelf: 'center' }} />
          </Stack>
        ) : (
          <img src={bloodBonus} alt='Blood Bonus' style={{ width: 150, height: 'auto' }} />
        )}
      </Stack>
    </MotionStack>
  );
};

export default BonusCard;
