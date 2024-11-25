const booths = [
  {
    organization_name: "Icon",
    organization_id: "1",
    products: [
      {
        product_id: "1",
        product_name: "hoodie",
        product_image: "../resources/images/products/hoodie.png",
        product_price: 100,
        product_quantity: 11,
      },
      {
        product_id: "2",
        product_name: "cap",
        product_image: "../resources/images/products/hoodie.png",
        product_price: 100,
        product_quantity: 12,
      },
      {
        product_id: "3",
        product_name: "bag",
        product_image: "../resources/images/products/hoodie.png",
        product_price: 100,
        product_quantity: 13,
      },
      {
        product_id: "4",
        product_name: "phone case",
        product_image: "../resources/images/products/hoodie.png",
        product_price: 100,
        product_quantity: 14,
      },
    ],
  },
  {
    organization_name: "Scope",
    organization_id: "2",
    products: [
      {
        product_id: "1",
        product_name: "hoodie",
        product_image: "../resources/images/products/hoodie.png", // Replace with an actual path or Blob instance
        product_price: 100,
        product_quantity: 10,
      },
      {
        product_id: "2",
        product_name: "cap",
        product_image: "../resources/images/products/hoodie.png", // Replace with an actual path or Blob instance
        product_price: 100,
        product_quantity: 10,
      },
    ],
  },
];

window.onload = function () {
  showBooths();
};

function showBooths() {
  const mainContainer = document.querySelector(".content-container");

  const innerContainer = document.createElement("div");
  innerContainer.classList.add("inner-container");

  //card header
  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");

  const headerText = document.createElement("h2");
  headerText.classList.add("header-text");
  headerText.textContent = "See Products of Each SLU Organizations";
  cardHeader.appendChild(headerText);

  const headerIcon = document.createElement("img");
  headerIcon.classList.add("header-icon");
  headerIcon.src = "../resources/images/products/products-header-icon.png";
  cardHeader.appendChild(headerIcon);

  innerContainer.appendChild(cardHeader);

  booths.forEach((booth) => {
    const boothContainer = document.createElement("div");
    boothContainer.classList.add("booth-container");

    const boothNameContainer = document.createElement("div");
    boothNameContainer.classList.add("booth-name-container");

    const boothName = document.createElement("h2");
    boothName.classList.add("booth-name");
    boothName.textContent = booth.organization_name;
    boothNameContainer.appendChild(boothName);

    const seeAllButton = document.createElement("h2");
    seeAllButton.classList.add("see-all-button");
    seeAllButton.textContent = "See All";
    boothNameContainer.appendChild(seeAllButton);

    boothContainer.appendChild(boothNameContainer);
    innerContainer.appendChild(boothContainer);

    const productsGrid = document.createElement("div");
    productsGrid.classList.add("products-grid");

    booth.products.forEach((product) => {});
  });

  mainContainer.appendChild(innerContainer);
}
