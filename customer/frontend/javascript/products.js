async function getBoothDetails() {
  try {
    const response = await fetch("http://localhost:3000/api/products", {
      method: "GET",
    });
    const result = await response.json();    
    return result;
  } catch (err) {
    console.log(err);
  }
}
//   {
//     organization_name: "Icon",
//     organization_id: "1",
//     products: [
//       {
//         product_id: "1",
//         product_name: "Hoodie",
//         product_image: "../resources/images/products/hoodie.png",
//         product_price: 100,
//         product_quantity: 11,
//       },
//       {
//         product_id: "2",
//         product_name: "Cap",
//         product_image: "../resources/images/products/hoodie.png",
//         product_price: 100,
//         product_quantity: 12,
//       },
//       {
//         product_id: "3",
//         product_name: "Bag",
//         product_image: "../resources/images/products/hoodie.png",
//         product_price: 100,
//         product_quantity: 13,
//       },
//       {
//         product_id: "4",
//         product_name: "Phone case",
//         product_image: "../resources/images/products/hoodie.png",
//         product_price: 100,
//         product_quantity: 14,
//       },
//     ],
//   },
//   {
//     organization_name: "Scope",
//     organization_id: "2",
//     products: [
//       {
//         product_id: "1",
//         product_name: "hoodie",
//         product_image: "../resources/images/products/hoodie.png", // Replace with an actual path or Blob instance
//         product_price: 100,
//         product_quantity: 10,
//       },
//       {
//         product_id: "2",
//         product_name: "cap",
//         product_image: "../resources/images/products/hoodie.png", // Replace with an actual path or Blob instance
//         product_price: 100,
//         product_quantity: 10,
//       },
//     ],
//   },
//   {
//     organization_name: "Sample",
//     organization_id: "2",
//     products: [
//       {
//         product_id: "1",
//         product_name: "hoodie",
//         product_image: "../resources/images/products/hoodie.png", // Replace with an actual path or Blob instance
//         product_price: 100,
//         product_quantity: 10,
//       },
//       {
//         product_id: "2",
//         product_name: "cap",
//         product_image: "../resources/images/products/hoodie.png", // Replace with an actual path or Blob instance
//         product_price: 100,
//         product_quantity: 10,
//       },
//     ],
//   },
// ];

window.onload = async function () {
  let booths = await getBoothDetails();  
  showBooths(booths);
};

function showBooths(booths) {
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

    const seeAllButton = document.createElement("button");
    seeAllButton.classList.add("see-all-button");
    seeAllButton.textContent = "See All";
    boothNameContainer.appendChild(seeAllButton);

    boothContainer.appendChild(boothNameContainer);
    innerContainer.appendChild(boothContainer);

    const productsGrid = document.createElement("div");
    productsGrid.classList.add("products-grid");

    booth.products.forEach((product) => {      
      //item card
      const itemCard = document.createElement("div");
      itemCard.classList.add("item-card");

      //image container
      const itemCardImageContainer = document.createElement("section");
      itemCardImageContainer.classList.add("item-card-image-container");

      // IMMAGE ISSUES
      // Convert the product.product_image to a Uint8Array
      const byteArray = new Uint8Array(product.product_image.data);

      // Create a Blob from the byteArray
      const blob = new Blob([byteArray], { type: "image/jpeg" }); // Adjust MIME type if necessary

      // Create a temporary object URL for the blob
      const imageUrl = URL.createObjectURL(blob);

      //image
      const itemImage = document.createElement("img");
      itemImage.classList.add("item-image");
      itemImage.src = imageUrl;
      itemCardImageContainer.appendChild(itemImage);

      itemCard.appendChild(itemCardImageContainer);

      //item name and price container
      const itemNameContainer = document.createElement("section");
      itemNameContainer.classList.add("item-name-container");

      //item name
      const itemName = document.createElement("p");
      itemName.classList.add("item-name");
      itemName.textContent = product.product_name;
      itemNameContainer.appendChild(itemName);

      //item price
      const itemPrice = document.createElement("p");
      itemPrice.classList.add("item-price");
      itemPrice.textContent = "P" + product.product_price;
      itemNameContainer.appendChild(itemPrice);

      itemCard.appendChild(itemNameContainer);

      //quantity
      const quantity = document.createElement("p");
      quantity.classList.add("quantity");
      quantity.textContent = "Stock: " + product.product_quantity;
      itemCard.appendChild(quantity);

      //view button container
      const viewButtonContainer = document.createElement("section");
      viewButtonContainer.classList.add("view-button-container");

      //view button
      const viewButton = document.createElement("button");
      viewButton.classList.add("view-button");
      viewButton.textContent = "View";
      viewButtonContainer.appendChild(viewButton);
      itemCard.appendChild(viewButtonContainer);

      productsGrid.appendChild(itemCard);
      boothContainer.appendChild(productsGrid);
    });

    const line = document.createElement("hr");
    line.classList.add("line-break");
    boothContainer.appendChild(line);
  });

  mainContainer.appendChild(innerContainer);
}
