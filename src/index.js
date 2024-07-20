// index.js


// Callbacks
const handleClick = (ramen) => {
  // Add code
};

const addSubmitListener = () => {
  console.log("addSubmitListener")
}

const displayRamens = () => {
  console.log("displayRamens")
};

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
};

