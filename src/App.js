import useApi from "./useApi";
import countries from "./countries.json"
import { generateRandomUrls, generateRandomNumber } from "./generateRandomUrls";
import "./App.css"
import { useEffect, useState } from "react";

function App() {

  const [flags, codes] = generateRandomUrls(countries, 6);
  const [images, isLoading] = useApi(flags, codes);
  const [contents, setContent] = useState([...images]);
  const [history, setHistory] = useState([]);
  const loadImage = () => {
    if (isLoading) {
      return <h1>Loading....</h1>
    } else {
      let count = 0;
      const jsx = (<ul>
        {contents.map((content) => {
          return <li
            key={count += 1}
            onClick={handelClickOnflag.bind("", contents, content.code)}
          >
            <img src={content.flag}></img>
          </li>

        })}
      </ul>
      )
      return jsx;
    }
  }

  useEffect(() => {
    setContent(images);
  }, [images])

  const handelClickOnflag = (deck, code) => {
    //randomly places the flags when clicked
    const _shuffle = () => {
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

    setHistory(oldArray => [...oldArray, code])
    setContent(_shuffle());


  }

  return (
    <div className="App">
      <div>
        {loadImage()}
      </div>

    </div>
  );
}


export default App;
