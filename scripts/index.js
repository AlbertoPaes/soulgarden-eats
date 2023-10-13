let counter = 0;
let dish;
let drink;
let dessert;


function selectOrderOption (orderOption,element,name,price) {
  const orderOptionSelected = document.querySelector(`.${orderOption} .combo-option-selected`);

  if(element.classList.contains('combo-option-selected')){
    element.classList.remove("combo-option-selected");
    counter--;
    checkOrder();
    return;
  }

  if(orderOptionSelected !== null) {
    orderOptionSelected.classList.remove("combo-option-selected");
    counter--;
    checkOrder();
  }

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

function checkOrder () {
  const buttonOrder = document.querySelector("footer button");

  if(counter === 3){
    buttonOrder.disabled = false;
    buttonOrder.style.cssText = "background-color: #32B72F; font-weight: 700; cursor: pointer";
    buttonOrder.innerHTML = "Submit Order";
  } else {
    buttonOrder.disabled = true;
    buttonOrder.style.cssText = "background-color: #CBCBCB;; font-weight: 400; cursor: not-allowed";
    buttonOrder.innerHTML = "Choose the 3 items<br>to finalize the order";
  }
}

function openModal () {
  const overlay = document.querySelector(".overlay");
  overlay.classList.remove("hidden");

  const totalOrder = Number(dish.price) + Number(drink.price) + Number(dessert.price);

  document.querySelector(".order-dish-name").innerHTML = dish.name;
  document.querySelector(".order-drink-name").innerHTML = drink.name;
  document.querySelector(".order-dessert-name").innerHTML = dessert.name;

  document.querySelector(".order-dish-price").innerHTML = dish.price;
  document.querySelector(".order-drink-price").innerHTML = drink.price;
  document.querySelector(".order-dessert-price").innerHTML = dessert.price;

  document.querySelector(".order-price-total").innerHTML = `$ ${totalOrder.toFixed(2)}`;
}

function closeModal() {
  const overlay = document.querySelector(".overlay");
  overlay.classList.add("hidden");
}

function sendOrder () {
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
}