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
            <button>+</button>
        </article>
    `
})

document.getElementById('app').innerHTML = renderMenu