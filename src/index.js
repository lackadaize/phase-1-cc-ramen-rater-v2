// index.js
const ramensUrl = "http://localhost:3000/ramens/"

// Callbacks
const handleClick = (ramen) => {
  // Add code
};

const addSubmitListener = () => {
  console.log("addSubmitListener")
}

const displayRamens = () => {
  console.log("displayRamens")
  fetch(ramensUrl)
    .then(response => response.json())
    .then((ramen) => ramen.forEach(loadRamen))
    .catch((error) => console.log(error))
  
  function loadRamen () {
    console.log("loadRamen")
  }
}

const main = () => {
  document.addEventListener ('DOMContentLoaded', () => {
    displayRamens()
    addSubmitListener()
  })
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
}

