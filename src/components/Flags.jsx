import uniqid from "uniqid";

import React from "react";

import "./falgs.css"
import Card from "./Card";
const Flags = (props) => {
    const { flags, handleClick } = props;
    return (<div className="flags-display">

        {
            flags.map((item, index) => (
                <div key={uniqid()} onClick={handleClick} className={`${"a" + (+index + 1)}`} id={item.code}>
                    <Card image={item} classKoNam={index} />

                </div>
            ))
        }

    </div>
    )
}


export default Flags;