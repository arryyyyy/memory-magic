import './StartScreen.css';
import React, { useState, useEffect } from 'react';
import howToPlay1 from '../howToPlay1.png';
import howToPlay2 from '../howToPlay2.png';
import howToPlay3 from '../howToPlay3.png';


const wrapTextInSpans = (text) => {
    return text.split('').map((char, index) => {
        const character = char === ' ' ? '\u00A0' : char;
        return (
            <span key={index} style={{ animationDelay: `${0.1 * index}s` }}>
                {character}
            </span>
        );
    });
};

function StartScreen({ onStartGame }) {
    const dialogueTexts = [
        "I can't thank you enough for coming. No one but you can help us!",
        "My son is dying...",
        "And you're the only witch in the kingdom who knows how to make the healing potion.",
        "Will you help?"
    ];

    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    // Function to change the text after the current text is fully displayed
    useEffect(() => {
        if (currentTextIndex < dialogueTexts.length - 1) {
            const animationDuration = dialogueTexts[currentTextIndex].length * 100; // 0.1s per character
            const timer = setTimeout(() => {
                setCurrentTextIndex(currentTextIndex + 1);
            }, animationDuration + 2000);

            return () => clearTimeout(timer);
        }
    }, [currentTextIndex]);

    // Function to wrap text in spans for animation
    const wrapTextInSpans = (text) => {
        return text.split('').map((char, index) => {
            const character = char === ' ' ? '\u00A0' : char;
            return (
                <span key={index} style={{ animationDelay: `${0.1 * index}s` }}>
                    {character}
                </span>
            );
        });
    };

    //How To Play Instructions
    const howToPlayImages = [howToPlay1, howToPlay2, howToPlay3];
    const [showOverlay, setShowOverlay] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const onHowToPlay = () => {
        setShowOverlay(true);
        setCurrentImageIndex(0);
    };

    const handleImageClick = () => {
        if (currentImageIndex < howToPlayImages.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        } else {
            setShowOverlay(false);
        }
    };

    const handleOverlayClick = () => {
        setShowOverlay(false);
    };

    // Overlay Component
    const Overlay = () => {
        if (!showOverlay) return null;
    
        return (
            <div className="overlay" onClick={handleOverlayClick}>
                <img 
                    src={howToPlayImages[currentImageIndex]} 
                    alt="How to Play" 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick();
                    }} 
                />
            </div>
        );
    };

    return (
        <div className="start-screen">
            <Overlay />
            <div className="left-container">
                <div className="dialogue-box">
                    <p className="typewriter" key={currentTextIndex}>
                        {wrapTextInSpans(dialogueTexts[currentTextIndex])}
                    </p>
                </div>
                <div className="buttons-container">
                    <button onClick={onHowToPlay}>How to Play?</button>
                    <button onClick={onStartGame}>Start Game</button>
                </div>
            </div>
            <video src="queen.mp4" autoPlay muted />
        </div>
    );
}

export default StartScreen;

