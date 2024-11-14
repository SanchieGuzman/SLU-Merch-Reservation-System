<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Filter</title>
  <link rel="stylesheet" href="../../assets/css/globals.css">
  <link rel="stylesheet" href="../../assets/css/filter.css">
</head>
<body>
  <div id="filter-container" class="hidden"></div>
  <script src="../filter/filter.js"></script>
  <script>
    
    function showPrint(){
      console.log('hello');
      console.log(new Date());
      const selectedRadio = document.querySelector('input[name="dateRange"]:checked').value;
      console.log(selectedRadio);
      const selectedLocation = pickUpLocationDropdown.value;
      console.log(selectedLocation);
      showFilterOptions.classList.add('hidden');
     

    }
  </script>
</body>
</html>