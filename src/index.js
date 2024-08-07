// Global variables
const ramensUrl = "http://localhost:3000/ramens/"
let ramenSelected

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
const loadRamenImages = (ramen) => {
  const ramenMenuDiv = document.getElementById('ramen-menu')
  const ramenImg = document.createElement('img')
  ramenImg.src = ramen.image
  ramenImg.alt = ramen.name
  ramenImg.id = `ramen-${ramen.id}`
  ramenMenuDiv.appendChild(ramenImg)
  ramenImg.addEventListener('click', () => handleClick(ramen))
}

// Click 'ramen-menu' images to show ramen object data in 'ramen-detail' 
const handleClick = (ramen) => {
  document.getElementById('detail-image').src = ramen.image
  document.getElementById('detail-name').textContent = ramen.name
  document.getElementById('detail-restaurant').textContent = ramen.restaurant
  document.getElementById('rating-display').textContent = ramen.rating
  document.getElementById('comment-display').textContent = ramen.comment
  ramenSelected = ramen.id
  console.log("Ramen " + ramenSelected + " was clicked")
}

// handleSubmit(), handleDelete(), and handlePatch()
const addSubmitListener = () => {
  
  // 'new-ramen' form submit creates new ramen object and appends it to 'ramen-menu'
  const newRamenForm = document.getElementById('new-ramen')
  const handleSubmit = (event) => {
    event.preventDefault()

    const newRamen = {
        name: document.getElementById('new-name').value,
        restaurant: document.getElementById('new-restaurant').value,
        image: document.getElementById('new-image').value,
        rating: document.getElementById('new-rating').value,
        comment: document.getElementById('new-comment').value
      }

    fetch(ramensUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newRamen)
    })
      .then(response => response.json())
      .then((ramen) => {
        loadRamenImages(ramen)
      })
      .catch((error) => console.log(error))
    newRamenForm.reset()
  }
  newRamenForm.addEventListener('submit', handleSubmit)

  // Delete 'ramenSelected'
  const deleteRamen = document.getElementById('delete-ramen')
  const handleDelete = () => {
   
    fetch(ramensUrl + ramenSelected, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(response => response.json())
      .then(() => {
        // loadRamenImages(ramen)
        document.getElementById(`ramen-${ramenSelected}`).remove()
        console.log("Ramen " + ramenSelected + " was deleted")
      })
      .catch((error) => console.log(error)) 
  }
  deleteRamen.addEventListener('click', handleDelete)  

  // Patch ramenSelected
  const patchRamenForm = document.getElementById('edit-ramen')
  const handlePatch = (event) => {
    event.preventDefault()

    const patchRamen = {
      rating: document.getElementById('patch-rating').value,
      comment: document.getElementById('patch-comment').value
    }

    fetch(ramensUrl + ramenSelected, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(patchRamen)
    })
      .then(response => response.json())
      .then(() => {
        console.log("Ramen " + ramenSelected + " was patched")
      })
      .catch((error) => console.log(error))

    document.getElementById('rating-display').textContent = document.getElementById('patch-rating').value
    document.getElementById('comment-display').textContent = document.getElementById('patch-comment').value
    patchRamenForm.reset()
  }
  patchRamenForm.addEventListener('submit', handlePatch) 
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