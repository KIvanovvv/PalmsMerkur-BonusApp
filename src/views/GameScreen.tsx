import { Stack, Typography } from '@mui/material';
import sinCityImg from '../assets/sinCity.png';
import BonusCard from '../components/BonusCard';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import card1A from '../assets/card1-a-min.png';
import card1B from '../assets/card1-b-min.png';
import card2A from '../assets/card2-a-min.webp';
import card2B from '../assets/card2-b-min.webp';
import card3A from '../assets/card3-a-min.webp';
import card3B from '../assets/card3-b-min.webp';
import card4A from '../assets/card4-a-min.webp';
import card4B from '../assets/card4-b-min.webp';
import card5A from '../assets/card5-a-min.webp';
import card5B from '../assets/card5-b-min.webp';
import card6A from '../assets/card6-a-min.webp';
import card6B from '../assets/card6-b-min.webp';
import card7A from '../assets/card7-a-min.webp';
import card7B from '../assets/card7-b-min.webp';
import card8A from '../assets/card8-a-min.webp';
import card8B from '../assets/card8-b-min.webp';
import card9A from '../assets/card9-a-min.webp';
import card9B from '../assets/card9-b-min.webp';

import bloodStain from '../assets/bloodStain.png';
import bonus from '../assets/bonus.png';
import twentyForty from '../assets/20-40.png';
import fiftyHundred from '../assets/50-100.png';
import youWin from '../assets/youWin.png';
import redMist from '../assets/redMist.mp4';

const MotionStack = motion(Stack);

type CardsType = {
  id: string;
  imageA: string;
  imageB: string;
  bonusImg: string;
};

const CARDS: CardsType[] = [
  { id: 'card-0-0', imageA: card1A, imageB: card1B, bonusImg: twentyForty },
  { id: 'card-0-1', imageA: card2A, imageB: card2B, bonusImg: twentyForty },
  { id: 'card-0-2', imageA: card3A, imageB: card3B, bonusImg: fiftyHundred },
  { id: 'card-1-0', imageA: card4A, imageB: card4B, bonusImg: fiftyHundred },
  { id: 'card-1-1', imageA: card5A, imageB: card5B, bonusImg: fiftyHundred },
  { id: 'card-1-2', imageA: card6A, imageB: card6B, bonusImg: fiftyHundred },
  { id: 'card-2-0', imageA: card7A, imageB: card7B, bonusImg: twentyForty },
  { id: 'card-2-1', imageA: card8A, imageB: card8B, bonusImg: twentyForty },
  { id: 'card-2-2', imageA: card9A, imageB: card9B, bonusImg: twentyForty },
];

const LOCAL_STORAGE_KEY = 'openedCards';
const LOCAL_STORAGE_CARDS_KEY = 'shuffledCards';

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const generateRandomBonusCards = (): CardsType[] => {
  const bonusImages = [fiftyHundred, fiftyHundred, fiftyHundred, twentyForty, twentyForty, twentyForty, twentyForty, twentyForty, twentyForty];

  const shuffledBonuses = shuffleArray(bonusImages);

  return CARDS.map((card, index) => ({
    ...card,
    bonusImg: shuffledBonuses[index],
  }));
};

type GameScreenProps = {
  setGameIsOn: (value: boolean) => void;
};

const GameScreen = (props: GameScreenProps) => {
  const { setGameIsOn } = props;

  const [cards, setCards] = useState<CardsType[]>([]);

  const [selectedCard, setSelectedCard] = useState<CardsType | null>(null);
  const [animatingCard, setAnimatingCard] = useState<CardsType | null>(null);
  const [showBonus, setShowBonus] = useState(false);
  const [openedCards, setOpenedCards] = useState<string[]>([]);
  const [freezeTimeout, setFreezeTimeout] = useState(false);

  useEffect(() => {
    const storedOpenedCards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    const storedShuffledCards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CARDS_KEY) || 'null');

    if (storedShuffledCards && storedShuffledCards.length === CARDS.length) {
      setCards(storedShuffledCards);
    } else {
      const newCards = generateRandomBonusCards();
      setCards(newCards);
      localStorage.setItem(LOCAL_STORAGE_CARDS_KEY, JSON.stringify(newCards));
    }

    setOpenedCards(storedOpenedCards);
  }, []);

  useEffect(() => {
    const storedOpenedCards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    setOpenedCards(storedOpenedCards);
  }, []);

  const handleCardClick = (card: CardsType) => {
    if (openedCards.includes(card.id)) return;
    if (freezeTimeout) return;

    setFreezeTimeout(true);
    setSelectedCard(card);
    setAnimatingCard(card);

    setTimeout(() => {
      setFreezeTimeout(false);
    }, 5000);

    const updatedOpenedCards = [...openedCards, card.id];
    setOpenedCards(updatedOpenedCards);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedOpenedCards));

    if (updatedOpenedCards.length === CARDS.length) {
      setTimeout(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        localStorage.removeItem(LOCAL_STORAGE_CARDS_KEY);

        const reshuffledCards = generateRandomBonusCards();
        setCards(reshuffledCards);
        localStorage.setItem(LOCAL_STORAGE_CARDS_KEY, JSON.stringify(reshuffledCards));

        setOpenedCards([]);
      }, 1500);
    }
  };

  useEffect(() => {
    if (selectedCard) {
      setShowBonus(false);
      const timer = setTimeout(() => {
        setShowBonus(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [selectedCard]);

  const handleClose = () => {
    if (freezeTimeout) return;

    setFreezeTimeout(true);
    setTimeout(() => {
      setFreezeTimeout(false);
    }, 5000);

    setSelectedCard(null);
    if (openedCards.length === 0) {
      setGameIsOn(false);
    }

    setTimeout(() => {
      setAnimatingCard(null);
    }, 100);
  };

  return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
      <Stack sx={{ width: '100%', alignItems: 'center' }}>
        <img src={sinCityImg} alt='Sin City' style={{ width: 140, height: 'auto' }} />
      </Stack>

      <motion.div
        style={{ padding: 5, visibility: !freezeTimeout ? 'visible' : 'hidden' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, ease: 'easeInOut', repeat: Infinity }}
      >
        <Typography sx={{ color: 'white', fontFamily: 'Montserrat', fontSize: 'calc(0.75rem + 1vw)' }}>SELECT BONUS</Typography>
      </motion.div>

      <Stack
        width='100%'
        height='100%'
        justifyContent='center'
        alignItems='center'
        sx={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          gap: 1,
          padding: '0.5rem',
          boxSizing: 'border-box',
        }}
      >
        {[0, 1, 2].map((row) => (
          <Stack key={`row-${row}`} flexDirection='row' gap={1} width='100%' justifyContent='center' alignItems='center'>
            {cards
              .filter((card) => card.id.startsWith(`card-${row}`))
              .map((card) => (
                <BonusCard
                  key={card.id}
                  layoutId={card.id}
                  cardImageA={card.imageA}
                  cardImageB={card.imageB}
                  bonusImg={card.bonusImg}
                  hidden={animatingCard?.id === card.id}
                  onClick={() => handleCardClick(card)}
                  isSelected={openedCards.includes(card.id)}
                />
              ))}
          </Stack>
        ))}
      </Stack>

      {selectedCard && (
        <>
          <Stack
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AnimatePresence mode='wait'>
              <MotionStack
                layoutId={selectedCard.id}
                sx={{
                  width: 800,
                  height: 500,
                  border: '5px solid  rgba(255, 0, 0, 0.86)',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  position: 'relative',
                }}
              >
                {!freezeTimeout && (
                  <Stack sx={{ position: 'absolute', top: 10, right: 20, width: '100%', height: '100%', zIndex: 1, alignItems: 'flex-end' }}>
                    <motion.div
                      style={{ padding: 5 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
                    >
                      <Typography sx={{ color: 'white', fontFamily: 'Montserrat', fontSize: '1.75rem' }}>Touch to continue</Typography>
                    </motion.div>
                  </Stack>
                )}

                <img
                  src={selectedCard.imageB}
                  alt='Card B'
                  style={{
                    width: '100%',
                    height: 600,
                    objectFit: 'cover',
                    objectPosition: 'center',
                    scale: 1.1,
                  }}
                />

                <Stack
                  sx={{
                    position: 'absolute',
                    bottom: 20,
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <motion.img
                    key='youWin'
                    src={youWin}
                    alt='Bonus'
                    style={{
                      width: 500,
                      height: 'auto',
                      position: 'absolute',
                      top: -200,
                      pointerEvents: 'none',
                    }}
                  />
                  <motion.img
                    key='bonus'
                    src={bonus}
                    alt='Bonus'
                    initial={{ opacity: 1, y: 0 }}
                    animate={showBonus ? { opacity: 0, y: 100 } : { opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    style={{
                      width: 200,
                      height: 'auto',
                      position: 'absolute',
                      top: 20,
                      pointerEvents: 'none',
                    }}
                  />

                  <motion.img
                    key='bonusWin'
                    src={selectedCard.bonusImg}
                    alt='20-40'
                    initial={{ opacity: 0, y: -100 }}
                    animate={showBonus ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.4 }}
                    style={{
                      width: 200,
                      height: 'auto',
                      position: 'absolute',
                      top: 20,
                      pointerEvents: 'none',
                    }}
                  />
                  <img src={bloodStain} alt='Blood Bonus' style={{ width: 500, height: 'auto' }} />
                </Stack>
              </MotionStack>
            </AnimatePresence>
          </Stack>

          <Stack sx={{ position: 'absolute', width: '100vw', height: '100vh', zIndex: -100, scale: 1.2, opacity: 0.7 }}>
            <video
              src={redMist}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default GameScreen;
