import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import SingleCard from './components/SingleCard';
import StartScreen from './components/StartScreen';
import styles from './Appalt.module.css';
import GameOverScreen from './components/GameOverScreen';
import bgMusic from './piano-music-game.mp3';
import pausePlayIcon from './pause-play.png'
import Helper from './helper.png'
import Dialog from './dialog.png'
//Add storyline, instructions, smaller game features- add a turn and time limit, congratulations page with potion [3D libraries], alt text is shown only when the card is flipped
//start the counter after the first card is turned...?
//End the counter as soon as all the cards are turned - 
//High score - number of turns and time in the last screen

//Name of the potion 
//Tie in all visuals together
//Check color contrast levels
//Make start and end screens look better - tie in visuals somehow
//Another way to let players know that they've matched!
// Object with all ingredient names and images

const allIngredients = [
  { name: "Alchemist's Thyme", img: "/img/AlchemistsThyme.png" }, { name: "Astral Jelly", img: "/img/AstralJelly.png" }, { name: "Basilisk's Eye Crystal", img: "/img/BasiliskEyeCrystal.png" }, { name: "Chameleon Iris", img: "/img/ChameleonIris.png" },
  { name: "Dew of Morning Star", img: "/img/DewMorningStar.png" }, { name: "Dragon Scale Leaves", img: "/img/DragonScaleLeaves.png" }, { name: "Dream Catcher Webs", img: "/img/DreamCatcherWebs.png" }, { name: "Echoing Conch", img: "/img/EchoingConch.png" },
  { name: "Enchanted Ink", img: "/img/EnchantedInk.png" }, { name: "Essence of Tempest", img: "/img/EssenceTempest.png" }, { name: "Ethereal Silk Threads", img: "/img/EtherealSilkThreads.png" }, { name: "Fae Fern Spores", img: "/img/FaeFernSpores.png" },
  { name: "Fairy Fluff", img: "/img/FairyFluff.png" }, { name: "Glowing Ember Orchid", img: "/img/GlowingEmberOrchid.png" }, { name: "Lustful Coral Fragments", img: "/img/LustfulCoralFragments.png" }, { name: "Mermaid Shells", img: "/img/MermaidShells.png" },
  { name: "Moonstone Dust", img: "/img/MoonstoneDust.png" }, { name: "Mystic Mushrooms", img: "/img/MysticMushrooms.png" }, { name: "Nebula Pearl", img: "/img/NebulaPearl.png" }, { name: "Nightshade Berries", img: "/img/NightShadeBerries.png" },
  { name: "Phoenix Feather", img: "/img/PhoenixFeather.png" }, { name: "Runic Ice Petal", img: "/img/RunicIcePetal.png" }, { name: "Sapphire Crystals", img: "/img/SapphireCrystals.png" }, { name: "Silver Bell Petals", img: "/img/SilverBellPetals.png" },
  { name: "Starlight Infused Water", img: "/img/StarlightInfusedWater.png" }, { name: "Sunstone Shards", img: "/img/SunstoneShards.png" }, { name: "Time Warped Amber", img: "/img/TimeWarpedAmber.png" },
  { name: "Transcendental Toadstool", img: "/img/TranscendentalToadstool.png" }, { name: "Whispering Vine Sap", img: "/img/WhisperingVineSap.png" }, { name: "Wizard's Sage", img: "/img/WizardsSage.png" }
];

// Function to shuffle an array
function shuffleArray(array) {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

//Storyline
const storyline = [
  "Once a prosperous kingdom, now shadowed by a mysterious curse.",
  "The queen's son fell ill, struck by an unknown malady.",
  "Rumors say a dark wizard cast a spell on the young prince.",
  "The only cure: a rare potion known to a solitary witch in the kingdom.",
  "As the witch, you must gather ingredients to save the prince and uncover the truth behind the curse."
];

function App() {
  // State for cards
  const [cards, setCards] = useState([]);
  // State for turns
  const [turns, setTurns] = useState(0);
  // States for choices
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  // State to disable multiple clicks
  const [disabled, setDisabled] = useState(false);
  // State for displaying ingredient names
  const [displayIngredients, setDisplayIngredients] = useState([]);
  // State for game started
  const [isGameStarted, setIsGameStarted] = useState(false);
  //State for current part of story
  const [storyIndex, setStoryIndex] = useState(-1);
  //State for time left
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  //State for confetti
  const [showConfetti, setShowConfetti] = useState(false);
  //State for music
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);
  //State for storyline dialogs
  const [showStorylinePopup, setShowStorylinePopup] = useState(false);

  // Handle the music play state

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Timer countdown
    if (timeLeft > 0 && isGameStarted && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, isGameStarted, gameOver]);

  useEffect(() => {
    // Check if all cards are matched
    if (cards.every(card => card.matched) && cards.length > 0) {
      setGameWon(true);
      setShowConfetti(true); // Show confetti
      setTimeout(() => {
        setShowConfetti(false); // Stop showing confetti after a delay
        setGameOver(true);      // Transition to game over screen
      }, 5000);
    }
  }, [cards]);

  // Function to update the story based on matches
  const updateStory = () => {
    setStoryIndex(prevIndex => prevIndex + 1);
    if(storyIndex < 4) {
      setShowStorylinePopup(true);
    }
    setTimeout(() => {
      setShowStorylinePopup(false); // Hide after 3 seconds
    }, 3000);
  };

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  const shuffleCards = () => {

    // Shuffle ingredients
    const shuffledIngredients = shuffleArray(allIngredients);

    // Select a subset for display
    const selectedForDisplay = shuffledIngredients.slice(0, 6);
    setDisplayIngredients(selectedForDisplay.map(ingredient => ({ name: ingredient.name, matched: false })));

    // Prepare the cards
    const doubledCards = [...selectedForDisplay, ...selectedForDisplay]
      .map(ingredient => ({
        src: ingredient.img,
        name: ingredient.name,
        id: Math.random(),
        matched: false
      }));

    setCards(doubledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setTimeLeft(60);
    setGameOver(false);
    setGameWon(false);
    setStoryIndex(-1);
  };

  const handleChoice = (card) => {
    if (!choiceOne) {
      setChoiceOne(card);
    } else {
      setChoiceTwo(card);
      setDisabled(true); // Disable further choices until the current ones are processed

      if (choiceOne.name === card.name) {
        // Update cards state
        setCards(prevCards => prevCards.map(currentCard =>
          currentCard.name === card.name ? { ...currentCard, matched: true } : currentCard
        ));

        // Update displayIngredients state
        setDisplayIngredients(prevIngredients => prevIngredients.map(ingredient =>
          ingredient.name === card.name ? { ...ingredient, matched: true } : ingredient
        ));

        // Update the story index
        updateStory();

        // Reset choices after a delay
        setTimeout(() => resetTurn(), 1000);
      } else {
        // Reset choices if they don't match
        setTimeout(() => resetTurn(), 1000);
      }
    }
  };

  // Reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  // Start a game automatically on component mount
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div>
      {!isGameStarted ? (
        <StartScreen onStartGame={handleStartGame} />
      ) : gameOver ? (
        <GameOverScreen
          gameWon={gameWon}
          onNewGame={shuffleCards}
          turns={turns}
          timeLeft={timeLeft}
        />
      ) : (<div className={styles.App}>
        {showConfetti && <Confetti />}
        <div className="game-screen">
          <audio ref={audioRef} src={bgMusic} autoPlay loop />

          <div className={styles.scrollContainer}>
            <img src="/img/Scroll.png" alt="Scroll" className={styles.scrollImage} style={{ width: '400px', height: '1000px' }} />
            <div className={styles.scrollText}>
              <div className={styles.potionName}>Elixir of Life</div>
              <ul>
                {displayIngredients.map((ingredient, index) => (
                  <li key={index} className={ingredient.matched ? styles.crossedOff : ""}>
                    *{ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.gridControlsContainer}>
            <div className={styles.gamecontrols}>
              {showStorylinePopup && 
              <div className={`${styles.storylinePopup} ${storyIndex >= 0 ? styles.visible : ''}`}>
                <img src={Dialog} alt="Dialog" width="44%" height="130x" className={styles.dialogBoxBackground} />
                <div className={styles.storylineContent}>
                  <p>{storyline[storyIndex]}</p>
                </div>
              </div>}
              <p>Turns: {turns}</p>
              <p className={styles.timer}>Time left: {timeLeft}s</p>
              <button onClick={() => setIsPlaying(!isPlaying)} className={styles.audioControl}>
                <img src={pausePlayIcon} alt={isPlaying ? 'Pause' : 'Play'} />
              </button>
              <img src={Helper} alt="Witch's Helper" className={styles.helperImg} />
            </div>

            <div className={styles.cardGrid}>
              {cards.map(card => (
                <SingleCard
                  key={card.id}
                  card={card}
                  handleChoice={handleChoice}
                  flipped={card === choiceOne || card === choiceTwo || card.matched}
                  disabled={disabled}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
      )}
    </div>
  );
}

export default App;
