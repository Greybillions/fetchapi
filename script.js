'use strict';

// Country API link = https://restcountries.com/v3.1/all

// Get the HTML elements
const searchBtn = document.getElementById('search-btn'),
  countryInput = document.getElementById('country-input'),
  countryName = document.getElementById('country-name'),
  countryFlag = document.getElementById('country-flag'),
  capital = document.getElementById('capital'),
  population = document.getElementById('population'),
  region = document.getElementById('region'),
  currency = document.getElementById('currency'), // New currency element
  resultDiv = document.getElementById('result'),
  errorMessage = document.getElementById('error-message'),
  datalist = document.getElementById('countries'); //for options

// Assigning the API link
const restCountries = 'https://restcountries.com/v3.1/';

// Function to add country names to the datalist
const addCountryNames = (countries) => {
  countries.forEach((country) => {
    const option = document.createElement('option');
    option.value = country.name.common; // Use the common name of the country
    datalist.appendChild(option); // Append the option to the datalist
  });
};

const countryDatalist = async () => {
  try {
    const response = await fetch(restCountries + 'all');
    const countries = await response.json();
    addCountryNames(countries);
  } catch (error) {
    console.error('Error fetching country list:', error);
  }
};

// Function to fetch country data
const fetchCountryData = () => {
  const country = countryInput.value.trim(); // Get user input and remove any extra spaces

  // Clear previous error messages and results
  errorMessage.textContent = ' ';
  resultDiv.style.display = 'none';

  // Fetch data from the REST Countries API
  fetch(restCountries + `/name/${country}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Country not found');
      }
      return response.json();
    })
    .then((data) => {
      const countryData = data[0]; // Get the first result

      // Get currency details (first currency listed)
      const currencyCode = Object.keys(countryData.currencies)[0];
      const currencyName = countryData.currencies[currencyCode].name;
      const currencySymbol = countryData.currencies[currencyCode].symbol;

      // Display the country information
      countryName.textContent = countryData.name.common;
      countryFlag.src = countryData.flags.png;
      capital.textContent = countryData.capital[0];
      population.textContent = countryData.population.toLocaleString();
      region.textContent = countryData.region;
      currency.textContent = `${currencyName} (${currencySymbol})`; // Display currency
      resultDiv.style.display = 'block'; // Show the results
    })
    .catch((error) => {
      errorMessage.textContent = 'Country not found. Please try again.';
      resultDiv.style.display = 'none'; // Hide results if an error occurs
    });
};

// Add event listener to the search button
searchBtn.addEventListener('click', fetchCountryData);

// Optional: Allow pressing Enter to trigger search
countryInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    fetchCountryData();
  }
});

window.onload = countryDatalist;

/*
// Function to fetch country data from an external API
const fetchCountryData = (country) => {
  fetch(restCountries + `/name/${country}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Country not found');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Log the fetched data for the specified country
      // You can process and use this data as needed
    })
    .catch((error) => {
      console.error('Error:', error.message); // Handle any errors during fetch
    });
};

// Example usage
fetchCountryData('France'); // Fetch data for France as an example
*/
