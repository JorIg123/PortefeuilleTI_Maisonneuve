import React, { useState, useEffect } from 'react';
import './Jackpot.css'; 

const Jackpot = () => {
    const [showJackpot, setShowJackpot] = useState(true);
    const [color, setColor] = useState('red'); 
    useEffect(() => {
       
        const interval = setInterval(() => {
            setColor(prevColor => prevColor === 'red' ? 'green' : 'red');
        }, 50);

        const timeout = setTimeout(() => {
            setShowJackpot(false);
        }, 50);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [color]);

    if (color === 'green') {
        return (
            <div className={`jackpot1 ${showJackpot ? 'visible' : 'hidden'}`} style={ {color}}>
                <h1>JACKPOT!!!</h1>
            </div>
        );
    } else {
        return (
            <div className={`jackpot ${showJackpot ? 'visible' : 'hidden'}`} style={ {color}}>
                <h1>JACKPOT!!!</h1>
            </div>
        );
    }


};

export default Jackpot;


