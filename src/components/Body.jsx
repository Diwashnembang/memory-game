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
    const history = useRef([]);

    const [gameOver, setGameOver] = useState(false);
    const [clicked, setClicked] = useState('');

    useEffect(() => {
        setFlag(data);
    }, [data]);

    useEffect(() => {
        console.log(history.current.includes(clicked));
        if (history.current.includes(clicked) || clicked === "gameOver") {
            setGameOver(true);
            console.log("gameover");
        } else if (clicked) {

            history.current = [...history.current, clicked]

        }


        if (history.current.length >= flags.length && flags.length) {
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
            <div className="score">Score : 100</div>
            <div className="bestScore">Best : 100</div>
            <div className="flags">
                {isLoading ? "loading" : gameOver ? "Game Over" : <Flags flags={flags} handleClick={clickHandler} />}
            </div>

        </div >
    )

}


export default Body;