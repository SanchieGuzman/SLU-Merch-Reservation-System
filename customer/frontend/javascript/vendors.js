



    //  // IMMAGE ISSUES
    //   // Convert the product.product_image to a Uint8Array
    //   const byteArray = new Uint8Array(product.product_image.data);

    //   // Create a Blob from the byteArray
    //   const blob = new Blob([byteArray], { type: "image/jpeg" }); // Adjust MIME type if necessary

    //   // Create a temporary object URL for the blob
    //   const imageUrl = URL.createObjectURL(blob);

    //   //image
    //   const itemImage = document.createElement("img");
    //   itemImage.classList.add("item-image");
    //   itemImage.src = imageUrl;


    document.addEventListener('DOMContentLoaded', async function () {
      const userName = (() => {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
          const [key, value] = cookie.split("=");
          if (key === "username") {
            return value;
          }
        }
        return null;
      })();
    
      const welcomUser = document.querySelector("#welcome-name");
      welcomUser.textContent = userName;
    
      const userNameTopBar = document.querySelector(".username");
      userNameTopBar.textContent = userName;
    let result = await getVendorDetails();
    console.log(result);
        result.forEach(vendorData => {
        const vendorCard = document.createElement('div');
        vendorCard.classList.add('vendor-card');

        // Vendor image container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('vendor-card-image-container');
        const image = document.createElement('img');
        image.classList.add('vendor-card-orgimage');
       // IMMAGE ISSUES
       // Convert the product.product_image to a Uint8Array
        const byteArray = new Uint8Array(vendorData.logo.data);
        // Create a Blob from the byteArray
        const blob = new Blob([byteArray], { type: "image/jpeg" }); // Adjust MIME type if necessary
        // Create a temporary object URL for the blob
        const imageUrl = URL.createObjectURL(blob);
        
        const itemImage = document.createElement("img");
        image.src = imageUrl || ''; 
        image.alt = 'Vendor Image';
        imageContainer.appendChild(image);

        // Vendor details container
        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('vendor-card-details');

        // Vendor name
        const vendorName = document.createElement('h2');
        vendorName.classList.add('vendor-card-name');
        vendorName.textContent = vendorData.organization_name; // If name is null, display 'No Name'

        // Vendor description
        const vendorDescription = document.createElement('p');
        vendorDescription.classList.add('vendor-card-description');
        vendorDescription.textContent = vendorData.organization_description;

        // start of scheds
        const boothTitle = document.createElement('h3');
        boothTitle.classList.add('vendor-card-booth-title');
        boothTitle.textContent = 'Upcoming Booth Details:';

        
        const boothDetails = document.createElement('div');
        boothDetails.classList.add('vendor-card-booth-details');

      

        const eventDate = document.createElement('p');
        const eventDateText = vendorData.date 
                              ? new Date(vendorData.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                              })
                              : 'None'; 
        eventDate.innerHTML = `<strong class="vendor-card-booth-label">Date:</strong> ${eventDateText}`;
        boothDetails.appendChild(eventDate);

        const eventTime = document.createElement('p');
        const eventStartTimeText = vendorData.start_time ? vendorData.start_time : 'None';
        const eventEndTimeText = vendorData.end_time ? vendorData.end_time : 'None'; 
        const timeString = eventStartTimeText == 'None' && eventEndTimeText == 'None' ? 'None' : vendorData.start_time +' - '+vendorData.end_time
        eventTime.innerHTML = `<strong class="vendor-card-booth-label">Time:</strong> ${timeString}`;
        boothDetails.appendChild(eventTime);

        const eventLocation = document.createElement('p');
        const eventLocationText = vendorData.location || 'None';
        eventLocation.innerHTML = `<strong class="vendor-card-booth-label">Location:</strong> ${eventLocationText}`;
        boothDetails.appendChild(eventLocation);

        
        detailsContainer.appendChild(vendorName);
        detailsContainer.appendChild(vendorDescription);
        detailsContainer.appendChild(boothTitle);
        detailsContainer.appendChild(boothDetails);

        
        vendorCard.appendChild(imageContainer);
        vendorCard.appendChild(detailsContainer);

       
        const contentContainer = document.querySelector('.content-container');
        contentContainer.appendChild(vendorCard);
    });

});
async function getVendorDetails() {
    try {
      const response = await fetch("/api/vendors", {
        method: "GET",
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  }
