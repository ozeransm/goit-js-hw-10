
function fetchCountries(nameCountry, strong){
    const BASE_URL = !strong ? `https://restcountries.com/v3.1/name/${nameCountry}?fields=name,capital,population,flags,languages`
                            : `https://restcountries.com/v3.1/name/${nameCountry}?fields=name,capital,population,flags,languages&fullText=true`;
    return fetch(BASE_URL);
    // return BASE_URL;
}

export {fetchCountries}