
function fetchCountries(nameCountry, strong){
    const BASE_URL = !strong ? `https://restcountries.com/v3.1/name/${nameCountry}?fields=name,capital,population,flags,languages`
                            : `https://restcountries.com/v3.1/name/${nameCountry}?fields=name,capital,population,flags,languages&fullText=true`;
    return fetch(BASE_URL).then(res =>{
        if(!res.ok){
            throw new Error(res.statusText);
        };          
    return res.json()});
    // return BASE_URL;
}

export {fetchCountries}