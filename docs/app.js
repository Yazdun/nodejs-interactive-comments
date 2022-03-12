function card(item) {
  return `
    <p class="endpoint">
      <span class="title">${item.title}</span>
      <span class="url">${item.endpoint}</span>
    </p>
    <p  class="method ${item.method}">${item.method}</p>
    `
}

const renderCards = (cards, id) => {
  cards.forEach(item => {
    let Card = document.createElement('div')
    Card.id = item.id
    Card.className = 'card'
    Card.innerHTML = card(item)
    document.getElementById(id).appendChild(Card)
  })
}

renderCards(protectedEndpoints, 'protected')
renderCards(publicEndpoints, 'public')
