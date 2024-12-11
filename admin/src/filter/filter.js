document.addEventListener("DOMContentLoaded", () => {
  const filterImage = document.getElementById("filter-image");
  filterImage.addEventListener("click", () => {
    showFilter();
    const filterContainer = document.getElementById("filter-container");
    filterContainer.classList.remove("hidden");
  });
});

function showFilter() {
  const showFilterOptions = document.querySelector("#filter-container");
  showFilterOptions.innerHTML = "";

  // Upper Container
  const upperContainer = document.createElement("div");
  upperContainer.classList.add("filter-header");

  const filter_title = document.createElement("h1");
  filter_title.textContent = "Filter";

  const close_button = document.createElement("button");
  close_button.textContent = "X";
  close_button.addEventListener("click", () => {
    showFilterOptions.classList.add("hidden");
  });

  upperContainer.appendChild(filter_title);
  upperContainer.appendChild(close_button);

  // Lower Container
  const lowerContainer = document.createElement("div");
  lowerContainer.classList.add("filter-options");

  // pickup location Dropdown
  const dropdownContainer = document.createElement("div");
  dropdownContainer.classList.add("dropdown-container");

  const pickUpLocationHeader = document.createElement("h2");
  pickUpLocationHeader.textContent = "Pickup Location";

  const pickUpLocationDropdown = document.createElement("select");
  pickUpLocationDropdown.classList.add("pickup-location-dropdown");

  const defaultPickUpLocation = document.createElement("option");
  defaultPickUpLocation.value = "All";
  defaultPickUpLocation.textContent = "All";
  defaultPickUpLocation.selected = true; //Make this option the default

  const pickUpLocationOptions1 = document.createElement("option");
  const lobby1 = "Maryheights Lobby";
  pickUpLocationOptions1.value = lobby1;
  pickUpLocationOptions1.textContent = lobby1;

  const pickUpLocationOptions2 = document.createElement("option");
  const lobby2 = "Maryheights Amphi";
  pickUpLocationOptions2.value = lobby2;
  pickUpLocationOptions2.textContent = lobby2;

  const pickUpLocationOptions3 = document.createElement("option");
  const lobby3 = "Silang Bldg Lobby";
  pickUpLocationOptions3.value = lobby3;
  pickUpLocationOptions3.textContent = lobby3;

  const pickUpLocationOptions4 = document.createElement("option");
  const lobby4 = "Prince Bernard Gym";
  pickUpLocationOptions4.value = lobby4;
  pickUpLocationOptions4.textContent = lobby4;

  pickUpLocationDropdown.appendChild(defaultPickUpLocation);
  pickUpLocationDropdown.appendChild(pickUpLocationOptions1);
  pickUpLocationDropdown.appendChild(pickUpLocationOptions2);
  pickUpLocationDropdown.appendChild(pickUpLocationOptions3);
  pickUpLocationDropdown.appendChild(pickUpLocationOptions4);
  dropdownContainer.appendChild(pickUpLocationHeader);
  dropdownContainer.appendChild(pickUpLocationDropdown);

  lowerContainer.appendChild(dropdownContainer);

  // Date Range Checkbox
  const checkboxContainer = document.createElement("div");
  checkboxContainer.classList.add("checkbox-container");

  const dateRangeHeader = document.createElement("h2");
  dateRangeHeader.textContent = "Date Range";

  checkboxContainer.appendChild(dateRangeHeader);

  const dateRange = [
    "All Time",
    "Today",
    "Yesterday",
    "Last 3 Days",
    "Last 5 Days",
    "Last 7 Days",
  ];
  const dateRangeValue = [-1, 0, 1, 3, 5, 7]; //todo: change to 7

  dateRange.forEach((range, index) => {
    const radioButton = document.createElement("input");
    radioButton.classList.add("radio-button");
    radioButton.type = "radio";
    radioButton.name = "dateRange";
    radioButton.id = `dateRange${index}`;
    radioButton.value = range;
    radioButton.value = dateRangeValue[index];

    //Makes the first index (All Time) the default option
    if (index === 0) {
      radioButton.checked = true;
    }

    const dateRangeLabel = document.createElement("label");
    dateRangeLabel.setAttribute("for", radioButton.id);
    dateRangeLabel.textContent = range;
    // dateRangeLabel.textContent = 'hello';

    checkboxContainer.appendChild(radioButton);
    checkboxContainer.appendChild(dateRangeLabel);
  });

  lowerContainer.appendChild(checkboxContainer);

  // Filter Button
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  const applyButton = document.createElement("button");
  applyButton.classList.add("apply-button");
  applyButton.textContent = "Apply";
  applyButton.addEventListener("click", () => {
    const selectedRadio = document.querySelector(
      'input[name="dateRange"]:checked'
    ).value;
    const selectedLocation = pickUpLocationDropdown.value;

    // Create form and submit
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "orders.php"; // Target PHP file for processing
    form.autocomplete = "off";

    // Add hidden inputs for the filter values
    const radioInput = document.createElement("input");
    radioInput.type = "hidden";
    radioInput.name = "selectedRadio";
    radioInput.value = selectedRadio;

    const locationInput = document.createElement("input");
    locationInput.type = "hidden";
    locationInput.name = "selectedLocation";
    locationInput.value = selectedLocation;

    form.appendChild(radioInput);
    form.appendChild(locationInput);

    document.body.appendChild(form);
    console.log(selectedLocation, selectedRadio);
    console.log(selectedLocation, selectedRadio);
    console.log(selectedLocation, selectedRadio);
    console.log(selectedLocation, selectedRadio);
    form.submit(); // Submit the form to `filter.php`

    showFilterOptions.classList.add("hidden");
  });

  buttonContainer.appendChild(applyButton);
  lowerContainer.appendChild(buttonContainer);

  showFilterOptions.appendChild(upperContainer);
  showFilterOptions.appendChild(lowerContainer);
}
