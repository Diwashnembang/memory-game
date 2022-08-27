import { useState, useEffect, useRef } from "react";

import { generateRandomUrls, generateRandomNumber } from "../generateRandomUrls";
import useApi from "../useApi";
import Countries from "../countries.json";

import "./body.css"
import Flags from "./Flags";



//randomly places the flags when clicked
const shuffle = (deck) => {
    let shuffledDeck = [];
    let workingDeck = [...deck];
    let randomNumber;
    for (let i = 0; i < deck.length; i++) {
        randomNumber = generateRandomNumber(0, workingDeck.length);
        shuffledDeck[i] = workingDeck[randomNumber];
        workingDeck.splice(randomNumber, 1);
    }
    return shuffledDeck;
}

const Body = () => {
    const countries = Countries;
    const [urls, codes] = generateRandomUrls(countries, 6);
    const [levelClear, setleveClear] = useState(false);
    const [data, isLoading] = useApi(urls, codes, levelClear);
    const [flags, setFlag] = useState([]);
    const [history, setHistory] = useState([]);
    const [score, setState] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    const [gameOver, setGameOver] = useState(false);
    const [clicked, setClicked] = useState('');

    useEffect(() => {
        setFlag(data);
    }, [data]);

    useEffect(() => {

        if (score >= bestScore) {
            setBestScore(score);
        }

    }, [score])

    useEffect(() => {
        if (history.includes(clicked) || clicked === "gameOver") {
            setGameOver(true);
            setState(0);
            console.log("gameover");
        } else if (clicked) {

            setHistory(prev => [...prev, clicked]);
            setState(prev => prev + 5);
        }


        if (history.length >= flags.length && flags.length) {
            setleveClear(!levelClear);
            history.current = [];
            setClicked("");
            setGameOver(false);
            console.log("clear");
        }
    }, [clicked])

    const clickHandler = (e) => {
        if (clicked === e.target.alt) {
            setClicked("gameOver");
        } else {

            setClicked(e.target.alt);
        }
        if (gameOver) return;
        console.log("clicked");
        const newDeck = shuffle(flags);
        setFlag(newDeck);
    }
    return (
        < div className="body" >
            <div className="score">Score : {score}</div>
            <div className="bestScore">Best : {bestScore}</div>
            <div className="flags">
                {isLoading ? "loading" : gameOver ? "Game Over" : <Flags flags={flags} handleClick={clickHandler} />}
            </div>

        </div >
    )

}


export default Body;