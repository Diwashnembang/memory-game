import React, { useState } from "react";

import "./nagivation.css";
import Guide from "./Guide"
const Nagivation = () => {
    const [clickedHelp, setClickedHelp] = useState(false);

    const handelClick = () => {
        setClickedHelp(!clickedHelp);
    }
    return (

        < div className="nagivation" >
            <div className="title">Geo <span className="big">Memory</span> Guesser</div>
            <div className="help" onClick={handelClick}>How to Play</div>
            {clickedHelp ? <Guide /> : null}
        </div>
    )
}

export default Nagivation;