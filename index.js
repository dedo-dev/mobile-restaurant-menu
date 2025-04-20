import {menuArray} from '/data.js'

let renderMenu = ''
menuArray.forEach(item => {
    renderMenu += `
        <article class="menu">
            <p class="menu__emoji">${item.emoji}</p>
            <h3 class="menu__name">${item.name}</h3>
            <h4 class="menu__ingredient">${item.ingredients}</h4>
            <p class="menu__price">${item.price}</p>
        </article>
    `
})

document.getElementById('app').innerHTML = renderMenu