import { dish, drink, dessert, selectOrderOption } from "../../main.js";

export const orderOption = (() => {
  document.querySelectorAll('.combo-option').forEach(element => {
    element.addEventListener('click', selectOrderOption);
  });
});

export const openModal = (() => {
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
});

export const closeModal = (() => {
  const overlay = document.querySelector(".overlay");
  const cancel = document.querySelector("#cancelButton");

  cancel.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });
});

export const sendOrder = (() => {
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
});

