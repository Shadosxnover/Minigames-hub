import React, { useState, useEffect } from 'react';

const words = [
    'the', 'with', 'from', 'they', 'this', 'have', 'had', 'not', 'but', 
    'some', 'what', 'there', 'which', 'their', 'all', 'any', 'when', 'up', 
    'out', 'if', 'will', 'get', 'me', 'more', 'time', 'just', 
    'him', 'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 
    'could', 'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 
    'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 
    'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 
    'because', 'any', 'give', 'day', 'most', 'us', 'man', 'find', 'here', 
    'tell', 'one', 'day', 'every', 'try', 'new', 'use', 'still', 'sure', 
    'get', 'long', 'make', 'anything', 'must', 'great', 'again', 'might', 
    'high', 'old', 'show', 'part', 'saw', 'ever', 'upon', 'never', 'took', 
    'mean', 'down', 'put', 'learn', 'why', 'now', 'think', 'always', 'point', 
    'today', 'once', 'ask', 'few', 'let', 'keep', 'eye', 'know', 'water', 
    'side', 'being', 'yet', 'although', 'mind', 'system', 'company', 'number', 
    'friend', 'come', 'government', 'really', 'something', 'always', 'around', 
    'world', 'believe', 'family', 'seem', 'another', 'would', 'state', 
    'country', 'need', 'should', 'school', 'become', 'between', 'while', 
    'before', 'turn', 'program', 'without', 'each', 'because', 'thing', 
    'say', 'issue', 'many', 'high', 'also', 'might', 'then', 'mean', 'write', 
    'great', 'even', 'such', 'because', 'get', 'same', 'under', 'write', 
    'your', 'type', 'just', 'like', 'become', 'find', 'hand', 'much', 'say', 
    'might', 'most', 'even', 'call', 'long', 'both', 'these', 'find', 
    'take', 'get', 'much', 'between', 'each', 'turn', 'become', 'here', 
    'say', 'part', 'from', 'some', 'because', 'great', 'what', 'some', 
    'these', 'tell', 'one', 'day', 'most', 'other', 'use', 'also', 'mean', 
    'still', 'new', 'mind', 'even', 'just', 'like', 'find', 'some', 'will', 
    'be', 'have', 'look', 'write', 'also', 'from', 'their', 'this', 'get', 
    'hand', 'most', 'even', 'because', 'might', 'call', 'long', 'much', 
    'great', 'some', 'first', 'become', 'just', 'like', 'these', 'find', 
    'still', 'new', 'one', 'also', 'other', 'some', 'what', 'write', 'say', 
    'use', 'get', 'because', 'right', 'each', 'both', 'even', 'find', 
    'hand', 'become', 'take', 'part', 'some', 'most', 'great', 'like', 
    'just', 'these', 'new', 'still', 'also', 'because', 'some', 'what', 
    'find', 'one', 'day', 'get', 'long', 'much', 'even', 'might', 'call', 
    'become', 'here', 'say', 'mean', 'some', 'these', 'tell'
];


const getRandomWords = (words, count) => {
    const shuffled = words.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
};

const TypingTest = () => {
    const [wordIndex, setWordIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [correctWords, setCorrectWords] = useState(0);
    const [time, setTime] = useState(15);
    const [isRunning, setIsRunning] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [currentWords, setCurrentWords] = useState(getRandomWords(words, 15));

    useEffect(() => {
        let intervalId;

        if (isRunning) {
            intervalId = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(intervalId);
                        setIsRunning(false);
                        const calculatedWpm = Math.floor((correctWords / (15 - time + 1)) * 60);
                        setWpm(calculatedWpm);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isRunning, correctWords, time]);

    const handleInputChange = (e) => {
        const typedWord = e.target.value.trim();
        const currentWord = currentWords[wordIndex];

        if (typedWord === currentWord) {
            setCorrectWords((prev) => prev + 1);
            setInputValue('');

            setWordIndex((prev) => {
                const nextIndex = prev + 1;
                if (nextIndex >= currentWords.length) {
                    setCurrentWords(getRandomWords(words, 15));
                    return 0;
                }
                return nextIndex;
            });
        } else {
            setInputValue(typedWord);
        }
    };

    const handleStart = (duration) => {
        setIsRunning(true);
        setWordIndex(0);
        setCorrectWords(0);
        setInputValue('');
        setTime(duration);
        setWpm(0);
        setCurrentWords(getRandomWords(words, 15));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            handleStart(15);
        }
    };

    return (
        <div className="bg-gray-900 h-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-3xl font-bold mb-4">Typing Test</h1>
            <div className="flex mb-4">
                <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded mr-2" onClick={() => handleStart(15)}>15s</button>
                <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded mr-2" onClick={() => handleStart(30)}>30s</button>
                <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded" onClick={() => handleStart(60)}>60s</button>
            </div>
            <p className="text-2xl font-bold mb-4">{currentWords[wordIndex]}</p>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="bg-gray-700 text-white px-4 py-2 rounded mb-4"
                autoFocus
            />
            <p className="text-xl font-bold mb-4">Time: {time}s</p>
            <p className="text-xl font-bold mb-4">WPM: {wpm}</p>
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded" onClick={() => handleStart(15)}>
                Start
            </button>
        </div>
    );
};

export default TypingTest;