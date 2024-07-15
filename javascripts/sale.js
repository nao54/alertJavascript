const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number"); 
let purchases = [];

function add() {
  const price = parseInt(priceElement.value);
  const number = parseInt(numberElement.value);
  const selectedOption = priceElement.options[priceElement.selectedIndex];
  const productoElegido = selectedOption.getAttribute('selecc-product');
  let purchase = {
    price: price,
    number: number,
    producto: productoElegido,
  };

  if (!productoElegido || !price || !number) {
    window.alert("Por favor seleccione un producto y una cantidad válidos.");
      return;
  } 

  const newPurchase = purchases.findIndex((item) => item.price === purchase.price) 
    if(purchases.length < 1 || newPurchase === -1) {
       purchases.push(purchase);
    }  else {
      purchases[newPurchase].number += purchase.number; 
  }

  
  window.alert(`${display()}\nsubtotal ${subtotal()} yenes`);

}

function display() {
  return purchases.map(purchase => {
    return `${purchase.producto}, ${purchase.price} yenes: ${purchase.number} `
  }).join("\n");
}

function subtotal() {
  return purchases.reduce((prev, purchase) => {
    return prev + purchase.price * purchase.number; 
  }, 0);
}

function calc() {
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  window.alert(`${display()}\nSubtotal: ${sum} yenes\nLos gastos de envío son: ${postage} yenes\nEl total de importe es de: ${sum + postage} yenes`);
  purchases = [];
  priceElement.value= "";
  numberElement.value = "";
}

function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0;
  } else if (sum < 2000){
   return 500;
  } else {
   return 250;
  }
}

