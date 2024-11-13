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
  defaultPickUpLocation.value = "all";
  defaultPickUpLocation.textContent = "All";
  defaultPickUpLocation.selected = true;

  const pickUpLocationOptions1 = document.createElement('option');
  pickUpLocationOptions1.value = "all";
  pickUpLocationOptions1.textContent = "Devesse Lobby (Bakakeng)";

  const pickUpLocationOptions2 = document.createElement('option');
  pickUpLocationOptions2.value = "all";
  pickUpLocationOptions2.textContent = "Lobby (Main)";

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

  dateRange.forEach((range,index) => {
    const radioButton = document.createElement('input');
    radioButton.type = "radio";
    radioButton.name = "dateRange"
    radioButton.id = `dateRange${index}`; 

    if (index === 0) {
      radioButton.checked = true;
    }
  
    const dateRangeLabel = document.createElement('label');
    dateRangeLabel.setAttribute('for',radioButton.id);
    dateRangeLabel.textContent = range;

    checkboxContainer.appendChild(radioButton);
    checkboxContainer.appendChild(dateRangeLabel);
  })

  lowerContainer.appendChild(checkboxContainer);

  // Filter Button
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  const clearAllButton = document.createElement('button');
  clearAllButton.classList.add('clear-all-button');
  clearAllButton.textContent = "Clear All";

  const applyButton = document.createElement('button');
  applyButton.classList.add('apply-button');
  applyButton.textContent = "Apply";

  buttonContainer.appendChild(clearAllButton);
  buttonContainer.appendChild(applyButton);
  lowerContainer.appendChild(buttonContainer);


  showFilterOptions.appendChild(upperContainer);
  showFilterOptions.appendChild(lowerContainer);
}
