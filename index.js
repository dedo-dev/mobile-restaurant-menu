import {menuArray} from '/data.js'
const orderArray = []
const orderPriceArray = []

menuArray.forEach(item => {
    document.getElementById('order-menu').innerHTML += `
        <article class="menu">
            <p class="menu__emoji">${item.emoji}</p>
            <div class="menu__content">
                <h3 class="menu__name">${item.name}</h3>
                <h4 class="menu__ingredient">${item.ingredients.join(', ')}</h4>
                <p class="menu__price">$${item.price}</p>
            </div>
            <button data-add-item="${item.id}" id="menu-btn" class="menu__btn">+</button>
        </article>
    `
})

document.addEventListener('click', function(e) {
    if(e.target.dataset.addItem) {
        getItem(e.target.dataset.addItem)
        renderOrder()
    }

    if(e.target.dataset.removeItem) {
        removeItemFromOrder(e.target.dataset.removeItem)
        renderOrder()
    }
})

function getItem(itemId) {
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
}

function renderOrder() {
    if(orderArray.length > 0) {
        document.getElementById('order-item').classList.remove('d-none')
        const totalPrice = orderPriceArray.reduce((totalPrice, currentPrice) => {
            return totalPrice + currentPrice
        })
        document.getElementById('order-item').innerHTML = `
            <h2>Your Order</h2>
            <div id="order-wrapper" class="order-wrapper"></div>
            <div class="order-wrapper__item">
                <p>Total price:</p>
                <p class="order-wrapper__item-price">$${totalPrice}</p>
            </div>
            <button class="order-wrapper__btn">Complete order</button>
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
    } else {
        document.getElementById('order-item').classList.add('d-none')
    }
}

function renderPaymentModal() {
    return `
        <div class="payment-modal">
            <h1 class="payment-modal__heading">Enter card details</h1>
            <form>
                <label>Card older fullname
                    <input type="text" id="" name="card-name" required>
                </label>
                <label>Card number
                    <input type="number" id="" name="card-number" length="15" required>
                </label>
                <label>CVV number
                    <input type="number" id="" name="card-cvv" length="3" required>
                </label>
            </form>
        </div>
    `
}