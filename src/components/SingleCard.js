import React from 'react'
import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }
    }

    const cardStyle = {
        //Fixed Width to prevent cards from jumping around
        width: '150px',
        height: '0px'
    };

    return (
        <div className="card"  style={cardStyle}>
            <div className={flipped ? "flipped" : ""}>
                <div>
                    <img className="front" src={card.src} alt={card.name} />
                    <img className="back" src="/img/cover.png" onClick={handleClick} alt="unflipped card" />
                </div>
            </div>
        </div>
    )
}