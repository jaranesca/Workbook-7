"use strict";

const baseURL = "https://jsonplaceholder.typicode.com/";
const endpoint = "todo";
const endpointUsers = "users";
const fullURLEndpoint = baseURL + endpoint;
//https://jsonplaceholder.typicode.com/users

function fetchData() {
  fetch('https://jsonplaceholder.typicode.com/users')//GET request from URL
  .then((response) => response.json()//Transform response into JSON format
  .then((data) => displayData(data))//Then is a keyword to resolve promise
  );
}

function displayData(_data) {
   _data.forEach(title => {
    console.log(_data.title);
   });
  
}

fetchData();

function displayData(_data) {
  
    for (let index = 0; index < _data.length; index++) {
      const myTitle = _data[index];
      if(myTitle.id == 2) {
        console.log(myTitle.title);
      }
    }
  }

  function fetchData(_endpointResource) {
    const baseURL = "https://jsonplaceholder.typicode.com/";
    const endpointResource = _endpointResource;
    fetch(baseURL + endpointResource).then((response) =>
      response.json().then((data) => displayData(data))
    );
  }
  function displayData(_data) {
    console.log(_data);
  }
  //fetchData("albums");
  //fetchData("todos");
  //fetchData("todos/1");
  //fetchData("albums");
  fetchData("comments");
  


const BASE_URL = "https://jsonplaceholder.typicode.com/";
// Function to fetch data from a given endpoint resource
const fetchData = async (endpointResource) => {
    try {
      // Sending a GET request to the endpoint using fetch API
      const response = await fetch(`${BASE_URL}${endpointResource}`);
      
      // Check if the response is not ok (status code is not in the range 200-299)
      if (!response.ok) {
        // Throw an error with the status text if the response is not ok
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      
      // Parse the JSON data from the response
      const data = await response.json();
      
      // Call the displayData function to handle the fetched data
      displayData(data);
    } catch (error) {
      // Log any errors that occur during the fetch process
      console.error(`Error fetching data from ${endpointResource}:`, error);
    }
  };
  
  // Function to display the fetched data (currently logs it to the console)
  const displayData = (data) => {
    console.log(data);
  };