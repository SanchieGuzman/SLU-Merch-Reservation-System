document.addEventListener('DOMContentLoaded',() =>{
  const filterImage = document.getElementById('filter-image');
  filterImage.addEventListener('click', () => {
    showFilter();
    const filterContainer = document.getElementById('filter-container');
    filterContainer.classList.remove('hidden'); 
  })
})

function showFilter(){
  const showFilterOptions = document.querySelector('#filter-container')

  showFilterOptions.innerHTML = '';

  // Upper Container
  const upperContainer = document.createElement('div');
  upperContainer.classList.add('filter-header')

  const filter_title = document.createElement('h1');
  filter_title.textContent = "Filter";
  
  const close_button = document.createElement('button');
  close_button.textContent = "X";
  close_button.addEventListener('click', () => {
    showFilterOptions.classList.add('hidden');
  })

  upperContainer.appendChild(filter_title)
  upperContainer.appendChild(close_button);

  // Lower Container
  const lowerContainer = document.createElement('div');
  lowerContainer.classList.add('filter-options');

  // pickup location Dropdown
  const dropdownContainer = document.createElement('div');
  dropdownContainer.classList.add('dropdown-container');

  const pickUpLocationHeader = document.createElement('h2');
  pickUpLocationHeader.textContent = "Pickup Location";

  const pickUpLocationDropdown = document.createElement('select');
  pickUpLocationDropdown.classList.add('pickup-location-dropdown');

  const defaultPickUpLocation = document.createElement('option');
  defaultPickUpLocation.value = "All";
  defaultPickUpLocation.textContent = "All";
  defaultPickUpLocation.selected = true; //Make this option the default

  const pickUpLocationOptions1 = document.createElement('option');
  const lobby1 = "Devesse Lobby (Bakakeng)"
  pickUpLocationOptions1.value = lobby1;
  pickUpLocationOptions1.textContent = lobby1;

  const pickUpLocationOptions2 = document.createElement('option');
  const lobby2 = "Lobby (Main)"
  pickUpLocationOptions2.value = lobby2;
  pickUpLocationOptions2.textContent = lobby2;

  pickUpLocationDropdown.appendChild(defaultPickUpLocation);
  pickUpLocationDropdown.appendChild(pickUpLocationOptions1);
  pickUpLocationDropdown.appendChild(pickUpLocationOptions2);
  dropdownContainer.appendChild(pickUpLocationHeader);
  dropdownContainer.appendChild(pickUpLocationDropdown);

  lowerContainer.appendChild(dropdownContainer);

  // Date Range Checkbox
  const checkboxContainer = document.createElement('div');
  checkboxContainer.classList.add('checkbox-container');

  const dateRangeHeader = document.createElement('h2');
  dateRangeHeader.textContent = "Date Range";

  checkboxContainer.appendChild(dateRangeHeader);

  const dateRange = ["All Time", "Today","Yesterday","Last 3 Days","Last 5 Days","Last 7 Days"];
  // const dateRangeValue = ["All Time", "Today","Yesterday","Last 3 Days","Last 5 Days","Last 7 Days"];

  dateRange.forEach((range,index) => {
    const radioButton = document.createElement('input');
    radioButton.classList.add('radio-button');
    radioButton.type = "radio";
    radioButton.name = "dateRange"
    radioButton.id = `dateRange${index}`; 
    radioButton.value = range;

    //Makes the first index (All Time) the default option
    if (index === 0) { 
      radioButton.checked = true;
    }
  
    const dateRangeLabel = document.createElement('label');
    dateRangeLabel.setAttribute('for', radioButton.id);
    dateRangeLabel.textContent = range;
    // dateRangeLabel.textContent = 'hello';

    checkboxContainer.appendChild(radioButton);
    checkboxContainer.appendChild(dateRangeLabel);
  })

  lowerContainer.appendChild(checkboxContainer);

  // Filter Button
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  const applyButton = document.createElement('button');
  applyButton.classList.add('apply-button');
  applyButton.textContent = "Apply";
  applyButton.addEventListener('click', () =>{
    const selectedRadio = document.querySelector('input[name="dateRange"]:checked').value;
    console.log(selectedRadio);
    const selectedLocation = pickUpLocationDropdown.value;
    console.log(selectedLocation);
    showFilterOptions.classList.add('hidden');
  });

  // const clearAllButton = document.createElement('button');
  // clearAllButton.classList.add('clear-all-button');
  // clearAllButton.textContent = "Clear All";

  buttonContainer.appendChild(applyButton);
  lowerContainer.appendChild(buttonContainer);
  // buttonContainer.appendChild(clearAllButton);

  showFilterOptions.appendChild(upperContainer);
  showFilterOptions.appendChild(lowerContainer);
}