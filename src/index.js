import './styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import oneCountry from './country.hbs';
import moreThenOneCountry from './countries.hbs';
import '@pnotify/core/dist/PNotify.css';

const {error, notice, defaultModules} = require('@pnotify/core');
import '../node_modules/@pnotify/core/dist/PNotify.css'
import '../node_modules/@pnotify/core/dist/Angeler.css'
import '../node_modules/@pnotify/core/dist/BrightTheme.css'
import '../node_modules/@pnotify/core/dist/Material.css'


const input = document.querySelector('input')
const content = document.querySelector('.content')

input.addEventListener('input', debounce(createMarcup, 500))

const myNotice = notice({
    text: "The string is empty, enter the name of the country!",
    type: 'info'
})
console.log(myNotice);

function createMarcup(event) {
    event.preventDefault()
    const inputValue = event.target.value
    fetchCountries(inputValue)
        .then(response => response.json())
        .then(country => {
            console.log(country)

    if (country.length > 10) {
          const myError = error({
          text: 'Too many matches found. Please enter a more specific query!',
          type: 'info'
      })
      console.log(myError);
        }else
    if (country.length > 1) {
         const countriesMarkup = moreThenOneCountry(country)
         content.innerHTML = countriesMarkup
        } else 
    if (country.length === 1 ) {
        const countryMarkup = oneCountry(country)
            content.innerHTML = countryMarkup
        }
 })
}