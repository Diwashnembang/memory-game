
const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min));
}

const makeValidUrl = (code) => {
    let url = `https://countryflagsapi.com/png/${code}`;
    return url;
}
const generateRandomUrls = (list, howManytimes) => {

    let flagUrls = []
    let countryCodes = [];
    let newFlagUrl;

    for (let i = 0; i < howManytimes; i++) {
        let countryCode = list[generateRandomNumber(0, list.length)].code;
        newFlagUrl = makeValidUrl(countryCode);
        flagUrls.push(newFlagUrl);
        countryCodes.push(countryCode);
    }





    return [flagUrls, countryCodes];
}


export { generateRandomUrls, generateRandomNumber };
