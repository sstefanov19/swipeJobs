"use client"
import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';

interface Character {
  name: string;
  url: string;
}

interface SwipeCardProps {
  db?: Character[];
}

const db = [{
    name: "Software Engineer",

},
    {
        name: "Frontend Developer",
    },
    {
        name: "Backend Developer",
    }

]

const SwipeCard: React.FC<SwipeCardProps> = () => {
  const [lastDirection, setLastDirection] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [canSwipe, setCanSwipe] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  const childRefs = useMemo(
    () => Array(db.length).fill(0).map(() => React.createRef<TinderCard>()),
    [db.length]
  );

  const swiped = (direction: string, nameToDelete: string, index: number) => {
    setLastDirection(direction);
    setCurrentIndex(index - 1);
    setCanSwipe(index - 1 >= 0);
    setCanGoBack(true);
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`);
  };

  const swipe = async (dir: 'left' | 'right') => {
    if (canSwipe && currentIndex >= 0) {
      await childRefs[currentIndex].current?.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    setCanSwipe(true);
    setCanGoBack(newIndex < db.length - 1);
  };

  return (
    <div id="root" className="flex justify-center items-center w-screen min-h-screen overflow-hidden bg-gradient-to-b from-slate-600 to-slate-400 text-center">
      <div className="flex flex-col justify-center items-center">
        <div className="app overflow-hidden">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-damion text-white text-shadow-lg">React Tinder Card</h1>
            <div className="cardContainer w-[90vw] max-w-[260px] h-[300px]">
              {db.map((character, index) => (
                <TinderCard
                  ref={childRefs[index]}
                  className="swipe absolute"
                  key={character.name}
                  onSwipe={(dir) => swiped(dir, character.name, index)}
                  onCardLeftScreen={() => outOfFrame(character.name, index)}
                >
                  <div
                    className="card relative bg-white w-[80vw] max-w-[260px] h-[300px] shadow-lg rounded-2xl bg-cover bg-center"
                  >
                    <h3 className="absolute bottom-0 m-2 text-black">{character.name}</h3>
                  </div>
                </TinderCard>
              ))}
            </div>
            <div className="buttons flex flex-wrap justify-center m-5">
              <button
                className="flex-shrink-0 p-2 rounded-md border-none text-white text-lg bg-[#9198e5] transition-transform duration-200 m-2 font-bold w-[160px] shadow-md hover:scale-105"
                onClick={() => swipe('left')}
                disabled={!canSwipe}
              >
                Swipe left!
              </button>
              <button
                className="flex-shrink-0 p-2 rounded-md border-none text-white text-lg bg-[#9198e5] transition-transform duration-200 m-2 font-bold w-[160px] shadow-md hover:scale-105"
                onClick={goBack}
                disabled={!canGoBack}
              >
                Undo swipe!
              </button>
              <button
                className="flex-shrink-0 p-2 rounded-md border-none text-white text-lg bg-[#9198e5] transition-transform duration-200 m-2 font-bold w-[160px] shadow-md hover:scale-105"
                onClick={() => swipe('right')}
                disabled={!canSwipe}
              >
                Swipe right!
              </button>
            </div>
            {lastDirection ? (
              <h2 key={lastDirection} className="infoText flex justify-center text-white animate-popup">
                You swiped {lastDirection}
              </h2>
            ) : (
              <h2 className="infoText flex justify-center text-white animate-popup">
                Swipe a card or press a button to get Restore Card button visible!
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;
