let counter = 0;
let dish;
let drink;
let dessert;

const selectOrderOption = (event) => {
  const element = event.currentTarget;
  const orderOption = element.dataset.optionType;

  const orderOptionSelected = document.querySelector(`.${orderOption} .combo-option-selected`);

  if (element.classList.contains('combo-option-selected')) {
    element.classList.remove("combo-option-selected");
    counter--;
    checkOrder();
    return;
  }

  if (orderOptionSelected !== null) {
    orderOptionSelected.classList.remove("combo-option-selected");
    counter--;
    checkOrder();
  }

  const name = element.querySelector('h2').textContent;
  const price = parseFloat(element.querySelector('.combo-option-footer span').textContent.slice(2));

  if (['dish', 'drink', 'dessert'].includes(orderOption)) {
    const item = {
      name,
      price: price.toFixed(2)
    };

    switch (orderOption) {
      case 'dish':
        dish = item;
        break;
      case 'drink':
        drink = item;
        break;
      case 'dessert':
        dessert = item;
        break;
    }
  }

  element.classList.add("combo-option-selected");
  counter++;
  checkOrder();
}

const orderOption = (() => {
  document.querySelectorAll('.combo-option').forEach(element => {
    element.addEventListener('click', selectOrderOption);
  });
})();

const checkOrder = () => {
  const buttonOrder = document.querySelector("footer button");

  if(counter === 3){
    buttonOrder.disabled = false;
    buttonOrder.style.cssText = "background-color: #32B72F; font-weight: 700; cursor: pointer";
    buttonOrder.textContent = "Submit Order";
  } else {
    buttonOrder.disabled = true;
    buttonOrder.style.cssText = "background-color: #CBCBCB;; font-weight: 400; cursor: not-allowed";
    buttonOrder.textContent = "Choose the 3 items\n to finalize the order";
  }
}

const openModal = (() => {
  const overlay = document.querySelector(".overlay");
  const modal = document.querySelector("#openModalButton"); 
  
  modal.addEventListener("click", () => {
    overlay.classList.remove("hidden");

    const items = {
      dish: { name: ".order-dish-name", price: ".order-dish-price" },
      drink: { name: ".order-drink-name", price: ".order-drink-price" },
      dessert: { name: ".order-dessert-name", price: ".order-dessert-price" }
    };
  
    for (const key in items) {
      const item = items[key];
      document.querySelector(item.name).textContent = eval(key).name;
      document.querySelector(item.price).textContent = eval(key).price;
    }
  
    const totalOrder = Object.values(items).reduce((total, item) => {
      return total + Number(document.querySelector(item.price).textContent);
    }, 0);
  
    document.querySelector(".order-price-total").textContent = `$ ${totalOrder.toFixed(2)}`;
  });    
})();

const closeModal = (() => {
  const overlay = document.querySelector(".overlay");
  const cancel = document.querySelector("#cancelButton");

  cancel.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });
})();

const sendOrder = (() => {
  const orderButton = document.querySelector("#orderButton");

  orderButton.addEventListener("click", () => {
    const clientName = prompt("Please enter your name!");
    const adress = prompt("Please enter delivery location!");
    const phoneNumber = 5571999999999;
    const totalPrice = Number(dish.price) + Number(drink.price) + Number(dessert.price);
    const encodedText = `
    Hello, I would like to place an order:\n
    - Dish: ${dish.name}\n
    - Drink: ${drink.name}\n
    - Dessert: ${dessert.name}\n
    Total: R$ ${totalPrice.toFixed(2)}
  
    Name: ${clientName}
    Adress: ${adress}
    `;
    const urlWhatsapp = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(urlWhatsapp);
  });
})();