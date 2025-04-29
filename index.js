import {menuArray} from '/data.js'
let orderArray = []
let orderPriceArray = []

menuArray.forEach(item => {
    document.getElementById('order-menu').innerHTML += `
        <article class="menu">
            <p class="menu__emoji">${item.emoji}</p>
            <div class="menu__content">
                <h3 class="menu__name">${item.name}</h3>
                <h4 class="menu__ingredient">${item.ingredients.join(', ')}</h4>
                <p class="menu__price">$${item.price}</p>
            </div>
            <button data-add-item="${item.id}" class="menu__btn">+</button>
        </article>
    `
})

document.addEventListener('click', function(e) {
    if(e.target.dataset.addItem) {
        addItemToOrder(e.target.dataset.addItem)
        renderOrder()
    }

    if(e.target.dataset.removeItem) {
        removeItemFromOrder(e.target.dataset.removeItem)
        if(orderArray.length > 0 ) {
            renderOrder()
        }
    }
})

function addItemToOrder(itemId) {
    const targetOrderObj = menuArray.filter(function(item) {
        return item.id === Number(itemId)
    })[0]
    orderArray.push(targetOrderObj)
    orderPriceArray.push(targetOrderObj.price)
}

function removeItemFromOrder(itemId) {
    const targetOrderObj = menuArray.filter(function(item) {
        return item.id === Number(itemId)
    })[0]
    orderArray.pop(targetOrderObj)
    orderPriceArray.pop(targetOrderObj.price)
    if(orderArray.length === 0 ) {
        document.getElementById('order-item').innerHTML = ``
    }
}

function renderOrder() {
    const totalPrice = orderPriceArray.reduce((totalPrice, currentPrice) => {
        return totalPrice + currentPrice
    })
    document.getElementById('order-item').innerHTML = `
        <h2 class="order-item__heading">Your Order</h2>
        <div id="order-wrapper" class="order-wrapper"></div>
        <div class="order-wrapper__item">
            <p>Total price:</p>
            <p class="order-wrapper__item-price">$${totalPrice}</p>
        </div>
        <button id="order-btn" class="order-wrapper__btn">Complete order</button>
    `
    orderArray.forEach(item => {
        document.getElementById('order-wrapper').innerHTML += `
            <div class="order-wrapper__item">
                <div class="order-wrapper__content">
                    <p>${item.name}</p>
                    <button data-remove-item="${item.id}" class="order-wrapper__item-btn">remove</button>
                </div>
                <p class="order-wrapper__item-price">$${item.price}</p>
            </div>
        `
    })

    document.getElementById('order-btn').addEventListener('click', () => {
         renderPaymentModal()
    })
}

function renderPaymentModal() {
    document.querySelector('main').innerHTML += `
        <div id="payment-modal" class="payment-modal">
            <h1 class="payment-modal__heading">Enter card details</h1>
            <form class="payment-modal__form">
                <label>Card older fullname
                    <input class="payment-modal__input" type="text" id="input-el" name="card-name" required />
                </label>
                <label>Card number
                    <input class="payment-modal__input" type="text" id="" name="card-number" minlength="15" maxlength="15" required />
                </label>
                <label>CVV number
                    <input class="payment-modal__input" type="text" id="" name="card-cvv" minlength="3" maxlength="3" required />
                </label>
                <button class="payment-modal__btn" id="btn">Pay</button>
            </form>
        </div>
    `

    document.getElementById('btn').addEventListener('click', (e) => {
        e.preventDefault()
        orderCompletedMessage()
        setTimeout(function() {
            location.reload()
        }, 5000)
    })
}

function orderCompletedMessage() {
    const inputValue = document.getElementById('input-el').value
    setTimeout(function() {
        document.getElementById('order-item').innerHTML = `
            <div class="order-completed">
                <p class="order-completed">Thanks, ${inputValue}! Your order is on its way!</p>
            </div>
        `
        document.getElementById('payment-modal').classList.add('d-none')
    }, 1500)
}