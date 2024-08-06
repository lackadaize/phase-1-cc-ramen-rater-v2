// Global variables
const ramensUrl = "http://localhost:3000/ramens/"
// let ramenSelected

// Initial fetch of ramen objects into 'ramen-menu'
const displayRamens = () => {
  fetch(ramensUrl)
    .then(response => response.json())
    .then((ramen) => {
      ramen.forEach(loadRamenImages)
    })
    .catch((error) => console.log(error))
}

// Load images for both displayRamens and loadNewRamen()
function loadRamenImages (ramen) {
  const ramenMenuDiv = document.getElementById('ramen-menu')
  const ramenImg = document.createElement('img')
  ramenImg.src = ramen.image
  ramenImg.alt = ramen.name
  ramenImg.id = ramen.id
  ramenMenuDiv.appendChild(ramenImg)
  ramenImg.addEventListener('click', () => handleClick(ramen))
}

// Click 'ramen-menu' images to show ramen object data in 'ramen-detail' 
const handleClick = (ramen) => {
  let detailsImg = document.getElementById('detail-image')
  let detailsName = document.getElementById('detail-name')
  let detailsRestaurant = document.getElementById('detail-restaurant')
  let detailsRating = document.getElementById('rating-display')
  let detailsComment = document.getElementById('comment-display')
  detailsImg.src = ramen.image
  detailsName.textContent = ramen.name
  detailsRestaurant.textContent = ramen.restaurant
  detailsRating.textContent= ramen.rating
  detailsComment.textContent = ramen.comment
}

// // 'new-ramen' form submit creates new ramen object and appends it to 'ramen-menu'
const addSubmitListener = () => {
  const newRamenForm = document.getElementById('new-ramen')
  const handleSubmit = (event) => {
    event.preventDefault()

    let newName = document.getElementById('new-name').value
    let newRestaurant = document.getElementById('new-restaurant').value
    let newImage = document.getElementById('new-image').value
    let newRating = document.getElementById('new-rating').value
    let newComment = document.getElementById('new-comment').value

    const newRamen = {
        name: newName,
        restaurant: newRestaurant,
        image: newImage,
        rating: newRating,
        comment: newComment
      }

    fetch(ramensUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newRamen)
    })
      .then(response => response.json())
      .then((ramen) => {
        loadRamenImages(ramen)
      })
      .catch((error) => console.log(error))
    newRamenForm.reset()
    return newRamen  
  }
  newRamenForm.addEventListener('submit', handleSubmit)
}

// Invokes main functions once DOM has loaded
const main = () => {
  displayRamens()
  addSubmitListener()
}
document.addEventListener('DOMContentLoaded', main)

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
}