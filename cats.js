const BASE_URL="https://freetestapi.com/api/v1/";
BASE_URL_IMAGES="https://api.thecatapi.com/v1/images/search";

const fetchBreeds = async () => {
    try {
      const response = await fetch(`${BASE_URL}cats`);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      populateBreedsDropdown(data.message);
    } catch (error) {
      console.error("Error fetching dog breeds:", error);
    }
  };
  
  // Populate the dropdown menu with the list of breeds
  const populateBreedsDropdown = (data) => {
    const breedsDropdown = document.getElementById("breedsDropdown");
    data.forEach(cat => {
        const option=new option(cat.name, cat.name)
        breedsDropdown.appendChild(option);
    });
  };
  
  // Display a random dog image from the selected breed
  const DisplayImage = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}breed/${selectedBreed}/images/search`
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();
      document.getElementById("myImage").src = data[0].url;
    } catch (error) {
      console.error("Error fetching dog image:", error);
    }
  };
  
  // Call the fetchBreeds function to populate the dropdown on page load
  fetchBreeds();
  