"use strict";

// Function to fetch data from a given endpoint resource
const BASE_URL = "https://freetestapi.com/api/v1/";
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
  fetchData("cats");