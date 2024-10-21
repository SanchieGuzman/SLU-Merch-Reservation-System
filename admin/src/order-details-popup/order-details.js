const button = document.querySelector(".add");
button.addEventListener("click", () =>
  showOrderDetails(
    1234,
    "Jerwin Ramos",
    "../../assets/images/johncena.jpeg",
    "Meow",
    12,
    250
  )
);

function showOrderDetails(orderID, name, imgsrc, productName, quantity, total) {
  const orderDetailsPopUp = document.querySelector(".order-details");

  //Upper container
  const upperCont = document.createElement("div");
  upperCont.classList.add("upperCont");

  const orderNum = document.createElement("h5");
  orderNum.classList.add("orderNum");
  orderNum.textContent = orderID;
  upperCont.appendChild(orderNum);

  const close = document.createElement("button");
  close.classList.add("close-button");
  close.addEventListener("click", () =>
    orderDetailsPopUp.classList.remove("active")
  );
  upperCont.appendChild(close);

  //lower container
  const cardsContainer = document.createElement("div");
  cardsContainer.classList.add("cards-grid");

  const custName = document.createElement("div");
  custName.classList.add("customer-name");
  custName.textContent = name + " Order List";
  cardsContainer.appendChild(custName);

  const addButton = document.createElement("button");
  addButton.classList.add("add");
  addButton.textContent = "Add";
  addButton.addEventListener("click", () =>
    createCards(imgsrc, productName, quantity, total, cardsContainer)
  );

  cardsContainer.appendChild(addButton);

  orderDetailsPopUp.appendChild(upperCont);
  orderDetailsPopUp.appendChild(cardsContainer);
}

function createCards(
  imgsrc,
  productName,
  productQuantity,
  productTotal,
  cardContainer
) {
  const card = document.createElement("div");
  card.classList.add("order-card");

  //product image
  const image = document.createElement("img");
  image.classList.add("product-image");
  image.src = imgsrc;
  card.appendChild(image);

  //product name
  const prodName = document.createElement("h4");
  prodName.classList.add("product-name");
  prodName.textContent = productName;
  card.appendChild(prodName);

  //product quantity
  const quantity = document.createElement("p");
  quantity.classList.add("product-quantity");
  quantity.textContent = "Qty: " + productQuantity;
  card.appendChild(quantity);

  //total
  const total = document.createElement("p");
  total.classList.add("total-price");
  total.textContent = "Total: " + productTotal;
  card.appendChild(total);

  cardContainer.appendChild(card);
}

// //for queries, add them here
// function addCards(imgsrc, productName, quantity, total) {
//   products.forEach((product) => {
//     createCards();
//   });

// }
