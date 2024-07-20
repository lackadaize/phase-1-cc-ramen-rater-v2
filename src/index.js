// index.js
const ramensUrl = "http://localhost:3000/ramens/"


// Callbacks
const handleClick = (ramen) => {
  let ramenSelected = ramen.id
  console.log(ramenSelected)
}

const addSubmitListener = () => {
  console.log("addSubmitListener")
}

const displayRamens = () => {
  fetch(ramensUrl)
    .then(response => response.json())
    .then((ramen) => ramen.forEach(loadRamenImages))
    .catch((error) => console.log(error))

  function loadRamenImages (ramen) {
    const ramenMenu = document.getElementById('ramen-menu')
    const ramenImg = document.createElement('img')
    ramenImg.src = ramen.image
    ramenImg.alt = ramen.name
    ramenImg.id = ramen.id
    ramenMenu.appendChild(ramenImg)
    ramenImg.addEventListener('click', () => handleClick(ramen))
  }
}

const main = () => {
  document.addEventListener('DOMContentLoaded', () => {
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
