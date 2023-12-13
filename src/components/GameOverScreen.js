import React from 'react';
import styles from './GameOverScreen.module.css';

const GameOverScreen = ({ gameWon, onNewGame, turns, timeLeft }) => {
  return (
    <div className={styles.gameOverContainer}>
      <div className={styles.messageContainer}>
        {gameWon ? (
          <>
            <p>You saved the prince!</p>
            <video src="princeAlive.mp4" autoPlay muted loop width="1200px" height="800px" className={styles.media} />
          </>
        ) : (
          <>
            <p>The prince was not able to get the potion in time and died...</p>
            <img src="/img/princeDead.png" alt="Defeat" width="1200px" height="800px" className={styles.media} />
          </>
        )}
      </div>
      <div className={styles.stats}>
        <p>Turns taken: {turns}</p>
        <p>Time taken: {60 - timeLeft} seconds</p>
      </div>
      <button onClick={onNewGame} className={styles.newGameButton}>New Game</button>
    </div>
  );
};

export default GameOverScreen;

