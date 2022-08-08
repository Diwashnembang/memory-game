import React, { useState, useEffect } from "react"

const useApi = (urls) => {
    let count = 1;
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        for (let i = 0; i < urls.length; i++) {

            console.log("the url is ", urls[i])
            // setNewUrl(url);
            const apiCall = new Request(
                urls[i],
                {
                    mode: 'cors',
                    method: 'get',
                },
            )
            try { 
                const response = await (await fetch(apiCall)).blob();
                console.log("fetch has been called", count);
                count++;
                const reader = new FileReader();
                reader.readAsDataURL(response);
                reader.onloadend = () => {
                    if(i===urls.length-1){
                        setIsLoading(false);
                        console.log("done")
                    }
                    let base64data = reader.result;
                    setData((oldArray) => [...oldArray, base64data]);
            }
                

        } catch (e) {
            alert("this is error", e)
        }
    };



}


useEffect(() => {
    console.log("useEffect api");

    fetchData();

}, []);

return [data, isLoading]



}

export default useApi