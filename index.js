import {menuArray} from '/data.js'

let renderMenu = ''
menuArray.forEach(item => {
    renderMenu += `
        <article class="menu">
            <p class="menu__emoji">${item.emoji}</p>
            <div class="menu__content">
                <h3 class="menu__name">${item.name}</h3>
                <h4 class="menu__ingredient">${item.ingredients.join(', ')}</h4>
                <p class="menu__price">$${item.price}</p>
            </div>
            <button id="menu-btn" class="menu__btn">+</button>
        </article>
    `
})

document.getElementById('order-menu').innerHTML = renderMenu

document.getElementById('order-item').innerHTML = `
    <h2 style="color: black">Your Order</h2>
    <article>
        <p>Pizza</p>
        <p>Beer</p>
    </article>

    <p>Total price:</p>
    <button>Complete order</button>
`