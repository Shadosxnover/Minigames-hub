import React, { useState, useRef } from 'react';

function Game1() {
    const [numberToGuess, setNumberToGuess] = useState(Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState('');
    const [result, setResult] = useState('');
    const [attempts, setAttempts] = useState(0);
    const inputRef = useRef(null);

    const handleGuess = () => {
        setAttempts(attempts + 1);
        if (parseInt(guess) === numberToGuess) {
            setResult('Congratulations! You guessed the number!');
        } else if (parseInt(guess) < numberToGuess) {
            setResult('Higher!');
        } else {
            setResult('Lower!');
        }
        setGuess('');
        inputRef.current.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleGuess();
        }
    };

    const resetGame = () => {
        setNumberToGuess(Math.floor(Math.random() * 100) + 1);
        setGuess('');
        setResult('');
        setAttempts(0);
        inputRef.current.focus();
    };

    return (
        <div
            style={{
                background: 'radial-gradient(circle 500px at 50% 350px, #1b1a27, transparent)',
                backgroundColor:'#171520',
            }}
        >
            <div className="">
                <div className="h-screen flex justify-center items-center">
                    <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                        <h1 className="text-3xl font-bold mb-4">Higher or Lower</h1>
                        <p className="text-lg mb-4">Guess a number between 1 and 100</p>
                        <input
                            type="number"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full p-2 pl-10 text-lg border border-gray-400 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Enter your guess"
                            ref={inputRef}
                        />
                        <button
                            onClick={handleGuess}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
                        >
                            Guess
                        </button>
                        <p className="text-lg mt-4">{result}</p>
                        <p className="text-lg mt-4">Attempts: {attempts}</p>
                        {result === 'Congratulations! You guessed the number!' && (
                            <button
                                onClick={resetGame}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
                            >
                                Reset Game
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game1;
