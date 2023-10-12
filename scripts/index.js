let counter = 0;


function selectOrderOption (orderOption,element) {
  const orderOptionSelected = document.querySelector(`.${orderOption} .combo-option-selected`);

  //This conditional is used to deselect an option from the combo that was already selected.
  if(element.classList.contains('combo-option-selected')){
    element.classList.remove("combo-option-selected");
    counter--;
    console.log(counter);
    checkOrder();
    return;
  }

  if(orderOptionSelected !== null) {
    orderOptionSelected.classList.remove("combo-option-selected");
    counter--;
    console.log(counter);
    checkOrder();
  }

  element.classList.add("combo-option-selected"); 
  counter++;
  console.log(counter);
  checkOrder();
}

function checkOrder() {
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