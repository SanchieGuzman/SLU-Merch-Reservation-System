document.addEventListener('DOMContentLoaded', function () {
    const vendorData = {
        vendor_name: "ICON",
        description: "ICON (Integrated Confideracy) is an organization that brings together like-minded individuals focused on fostering collaboration and innovation within the Saint Louis University community. Through its various events, ICON aims to create a platform for students to showcase their ideas, projects, and merchandise.",
        vendor_image: "../resources/images/vendors/icon-org.png", 
        booth_event_name: "October Fest",
        booth_event_date: "October 20, 2024",
        booth_event_time: "10:00 AM - 4:00 PM",
        booth_event_location: "Devesse"
    };

    //create vendor card elements
    const vendorCard = document.createElement('div');
    vendorCard.classList.add('vendor-card');

    //vendor image container
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('vendor-card-image-container');
    const image = document.createElement('img');
    image.classList.add('vendor-card-orgimage');
    image.src = vendorData.vendor_image;
    image.alt = 'Vendor Image';
    imageContainer.appendChild(image);

    // vendor details container
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('vendor-card-details');

    // vendor name
    const vendorName = document.createElement('h2');
    vendorName.classList.add('vendor-card-name');
    vendorName.textContent = vendorData.vendor_name;

    //vendor description
    const vendorDescription = document.createElement('p');
    vendorDescription.classList.add('vendor-card-description');
    vendorDescription.textContent = vendorData.description;

    //booth title
    const boothTitle = document.createElement('h3');
    boothTitle.classList.add('vendor-card-booth-title');
    boothTitle.textContent = 'Upcoming Booth Details:';

    //booth details container
    const boothDetails = document.createElement('div');
    boothDetails.classList.add('vendor-card-booth-details');

    //create and append each booth detail dynamically
    const eventName = document.createElement('p');
    eventName.innerHTML = `<strong class="vendor-card-booth-label">Event Name:</strong> ${vendorData.booth_event_name}`;
    boothDetails.appendChild(eventName);

    const eventDate = document.createElement('p');
    eventDate.innerHTML = `<strong class="vendor-card-booth-label">Date:</strong> ${vendorData.booth_event_date}`;
    boothDetails.appendChild(eventDate);

    const eventTime = document.createElement('p');
    eventTime.innerHTML = `<strong class="vendor-card-booth-label">Time:</strong> ${vendorData.booth_event_time}`;
    boothDetails.appendChild(eventTime);

    const eventLocation = document.createElement('p');
    eventLocation.innerHTML = `<strong class="vendor-card-booth-label">Location:</strong> ${vendorData.booth_event_location}`;
    boothDetails.appendChild(eventLocation);

    //append elements to details container
    detailsContainer.appendChild(vendorName);
    detailsContainer.appendChild(vendorDescription);
    detailsContainer.appendChild(boothTitle);
    detailsContainer.appendChild(boothDetails);

    //append image container and details container to vendor card
    vendorCard.appendChild(imageContainer);
    vendorCard.appendChild(detailsContainer);

    //append the vendor card to the content container
    const contentContainer = document.querySelector('.content-container');
    contentContainer.appendChild(vendorCard);
});
