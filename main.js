const contItems = document.querySelector(".contItems");
const btnRoulette = document.querySelector(".containerRoulette .btnRoulette");
const txtArea = document.querySelector('textarea')

txtArea.addEventListener('change', createRoulette)
txtArea.addEventListener('keyup', e => {
  if (e.key === `Enter`) {
    createRoulette(e)
  }
})

function createRoulette(e) {
  const values = e.target.value.trim().split("\n")
  deleteItems()

  renderItems(values)
  App.setData(values)
}

function deleteItems() {
  const items = document.querySelectorAll('.item')
  items.forEach(item => {
    contItems.removeChild(item)
  })

}

function renderItems(items) {
  items.forEach(item => {
    if (item.length > 0) {
      const it = document.createElement('p')
      it.classList.add('item')
      it.textContent = item
      contItems.append(it)
    }
  })
  configRoulette()
}

btnRoulette.addEventListener("click", () => {
  const transf = contItems.style.transform
  let curRot = transf ? transf.slice(7, contItems.style.transform.indexOf("d")) : 0;

  if (curRot > 500) {
    contItems.style.transform = `rotate(${randomNum(360, 0)}deg)`;
  } else {
    contItems.style.transform = `rotate(${randomNum(1440, 1080)}deg)`;
  }
});

function randomNum(max, min = 0) {
  return min + Math.ceil(Math.random() * (max - min));
}

function configRoulette() {
  const items = document.querySelectorAll(".item");

  // caso a roleta tenha + de 2 opcoes
  if (items.length > 2) {
    for (let i = 0; i < items.length; i++) {
      items[i].classList.add('polygon')
      // definindo o angulo dos items
      items[i].style.transform = `translate(-50%, -100%) rotate(${(i * 360) / items.length}deg)`;
      // definir largura do poligono
      items[i].style.width = (2 * items[i].offsetHeight * Math.sin(Math.PI / items.length)) / Math.cos(Math.PI / items.length) + "px";
    }
    //caso ela tenha exatamente 2 opcoes
  } else if (items.length == 2) {
    for (let i = 0; i < items.length; i++) {
      items[i].style.transform = `translate(-50%, -100%) rotate(${(i * 360) / items.length}deg)`;
      items[i].style.width = '100%'
    }
    //caso so tenha 1
  } else {
    items[0].classList.add('unique')
  }
}

class App {
  static get getData() {
    const db = JSON.parse(localStorage.getItem('data'))
    return db.save
  }

  static setData(list) {
    localStorage.setItem('data', JSON.stringify({ save: list }))
    return this
  }

}

document.addEventListener('DOMContentLoaded', () => {
  if (App.getData === undefined || App.getData === null) {
    App.setData(['Sim', 'Não'])
  }

  renderItems(App.getData)
})