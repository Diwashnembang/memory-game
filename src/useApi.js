import React, { useState, useEffect } from "react"

const useApi = (urls, codes, levelClear) => {

    const [code, setCode] = useState(codes)
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        // console.log(codes);
        setData([]);
        setIsLoading(true)

        for (let i = 0; i < urls.length; i++) {

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
                const reader = new FileReader();
                reader.readAsDataURL(response);
                reader.onloadend = () => {
                    if (i === urls.length - 1) {
                        setIsLoading(false);
                    }
                    let base64data = reader.result;
                    let data = {
                        flag: base64data,
                        code: code[i]
                    };
                    setData((oldArray) => [...oldArray, data]);
                }


            } catch (e) {
                alert("this is error", e)
            }
        };



    }


    useEffect(() => {
        fetchData();

    }, [levelClear]);


    return [data, isLoading]



}

export default useApi

