import { orderOption, openModal, closeModal, sendOrder } from "./modules/main/events.js";

let counter = 0;
export let dish;
export let drink;
export let dessert;

export const selectOrderOption = (event) => {
  const element = event.currentTarget;
  const orderOption = element.dataset.optionType;
  let allOptions = ['dish', 'drink', 'dessert'];

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

  if (allOptions.includes(orderOption)) {
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

const handleEvents = ( () => {
  orderOption();
  openModal();
  closeModal();
  sendOrder();
})();