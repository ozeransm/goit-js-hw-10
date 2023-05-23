
import debounce from 'lodash.debounce';
import {fetchCountries} from '../src/fetchCountries';
import Notiflix from 'notiflix';
import './css/styles.css';

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    card: document.querySelector('.country-info'),
    
}
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input',debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(e){
    const nameCountry = e.target.value.trim();
    refs.list.textContent='';
    refs.card.textContent='';
    if(!nameCountry){
        return false;
    }

    resolveFetch(nameCountry, 0);
}

function resolveFetch(nameCountry, strong){
    fetchCountries(nameCountry, strong)
    .then(data =>{
        if(data.length>10){
            Notiflix.Notify.success("Too many matches found. Please enter a more specific name.");
        }else if(data.length>=2&&data.length<=10){
            // console.log(data);
            markupList(data);
            
        }else {
            markupCardCountry(...data);
            
        }
        
    })
    .catch((err)=>Notiflix.Notify.failure(`Oops, there is no country with that name ${err.toString()}`));
}

// err.message.find('404') ? 'Oops, there is no country with that name' : err.toString()
// `Oops, there is no country with that name ${err.toString()}`
function markupCardCountry({flags, name, capital, languages, population}){
    const markupCard = `<img src="${flags.svg}" width="50px" ><h1>${name.common}</h1><p><span>Capital: </span>${capital}</p><p><span>Population: </span>${population}</p><p><span>Languages: </span>${Object.values(languages).join(', ')}</p>`;
    refs.card.insertAdjacentHTML('afterbegin', markupCard);
    
       
}

function markupList(data){
    
    const markupLi = data.reduce((akk,{name,flags})=>
        akk + `<li><img src="${flags.svg}" width="50px" ><a class="country-list-link" href="#">${name.common}</a></li>`
    ,'');
    refs.list.insertAdjacentHTML('afterbegin', markupLi);
    refs.list.addEventListener('click',handlerLink);
    
}

function handlerLink(e){
    e.currentTarget.textContent='';
    e.preventDefault();
    resolveFetch(e.target.textContent, 1);
}