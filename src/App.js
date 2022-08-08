
import useApi from "./useApi";
import countries from "./countries.json"
import { generateRandomUrls, generateRandomNumber } from "./generateRandomUrls";
import "./App.css"
import { useEffect, useState } from "react";

function App() {

  const flags = generateRandomUrls(countries, 6);
  const [images, isLoading] = useApi(flags);
  const [contents, setContent] = useState([...images]);

  const loadImage = () => {
    if (isLoading) {
      return <h1>Loading....</h1>
    } else {
      let count = 0;
      const jsx = (<ul>
        {contents.map((content) => {
          return <li
            key={count += 1}
            className="falgs"
            onClick={handelClickOnflag.bind("", contents)}>
            <img src={content}></img>
          </li>

        })}
      </ul>
      )
      return jsx;
    }
  }

  // images.forEach(image => {

  //   content.push(<li key={count += 1} class="falgs"><img src={image}></img></li>)
  // });

  useEffect(() => {
    setContent(images);
  }, [images])

  const handelClickOnflag = (deck) => { 
    //randomly places the flags when clicked
    const _shuffle = () => {
      let shuffledDeck = [];
      let workingDeck = [...deck];
      let randomNumber;

      for (let i = 0; i < deck.length; i++) {
        randomNumber = generateRandomNumber(0, workingDeck.length);
        shuffledDeck[i] = workingDeck[randomNumber];
        workingDeck.splice(randomNumber, 1)
      }
      return shuffledDeck;
    }

    setContent(_shuffle());
  }

  return (
    <div className="App">
      {console.log("render")}
      <div>
        {loadImage()}
      </div>

    </div>
  );
}


export default App;
