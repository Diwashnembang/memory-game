
const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min));
}

const makeValidUrl = (code) => {
    let url = `https://countryflagsapi.com/png/${code} `
    return url;
}
const generateRandomUrls = (list, howManytimes) => {

    let flagUrls = []

    let newFlagUrl;

    for (let i = 0; i < howManytimes; i++) {
        let countyCode = list[generateRandomNumber(0, list.length)].code;
        newFlagUrl = makeValidUrl(countyCode);
        flagUrls.push(newFlagUrl);

    }





    return flagUrls;
}


export { generateRandomUrls, generateRandomNumber };