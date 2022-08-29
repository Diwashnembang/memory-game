import { useState, useEffect } from "react";

import { generateRandomUrls, generateRandomNumber } from "../generateRandomUrls";
import useApi from "../useApi";
import Countries from "../countries.json";

import "./body.css"
import Flags from "./Flags";
import Retry from "./Retry";
import { useRef } from "react";



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
    const [level, setLevel] = useState(0);
    const [time, setTime] = useState(30);
    const maxtime = useRef(time);
    const palyAgain = useRef(false);


    useEffect(() => {
        palyAgain.current = false;
        setFlag(data);
    }, [data]);

    useEffect(() => {
        if (!isLoading) {

            setTimeout(() => {
                if (time > 0 && !gameOver) {

                    setTime(prev => prev - 1);
                }
            }, 1000);

            if (time === 0) {
                setState(0);
                setGameOver(true);

            }
        }
    }, [time, isLoading])



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

    }, [clicked])

    useEffect(() => {

        if (history.length >= flags.length && flags.length) {
            setleveClear(!levelClear);
            setLevel(prev => prev + 1);
            setHistory([]);
            setClicked("");
            setGameOver(false);
            setTime(maxtime.current);
            console.log("clear");
        }
    }, [history])

    useEffect(() => {
        if (!palyAgain.current && maxtime.current > 10 && level > 0) {

            maxtime.current = maxtime.current - 5;
            setTime(maxtime.current);
        }
    }, [level]);


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

    const restart = () => {

        palyAgain.current = true;
        setleveClear(!levelClear);
        setHistory([]);
        setClicked("");
        setGameOver(false);
        maxtime.current = 30;
        setLevel(0);
        setTime(30);
    }
    return (
        < div className="body" >
            <div className="score">Score : {score}</div>
            <div className="time">Time : {time}</div>
            <div className="bestScore">Best : {bestScore}</div>
            <div className="flags">
                {isLoading ?
                    "loading"
                    : gameOver ?
                        <Retry restart={restart} />
                        : <Flags flags={flags} handleClick={clickHandler} />}
            </div>

        </div >
    )

}


export default Body;