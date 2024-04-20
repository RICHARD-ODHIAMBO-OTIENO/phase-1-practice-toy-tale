document.addEventListener("DOMContentLoaded", () => {
  let addToy = false;
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyForm = document.querySelector(".add-toy-form"); 

  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    toyFormContainer.style.display = addToy ? "block" : "none";
  });

  // Handle form submission for adding a new toy
  toyForm.addEventListener("submit", event => {
    event.preventDefault(); // Prevent the form from submitting in the default way
    const formData = new FormData(toyForm);
    const name = formData.get("name"); 
    const image = formData.get("image"); 

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name,
        image,
        likes: 0
      })
    })
    .then(response => response.json())
    .then(newToy => {
      // Code to add new toy to the DOM goes here
      console.log(newToy); 
      addToyToDOM(newToy); 
    });
  });
});

// Function to update likes
function updateLikes(toyId, newNumberOfLikes) {
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: newNumberOfLikes
    })
  })
  .then(response => response.json())
  .then(updatedToy => {
    console.log(updatedToy); 
    updateToyOnDOM(updatedToy); 
  });
}