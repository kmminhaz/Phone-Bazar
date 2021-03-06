// --------------------
// Globel Declearations
// --------------------

// getting show details place
const showDetailsPlace = document.getElementById("show-details");

// getting search button
const searchButton = document.getElementById("search-button");

// Getting Spinner
const spinner = document.getElementById("spinner");

// ---------------
// showing sensors
// ---------------
const sensorsInfo = (sensors) => {
  let allSensors = "";
  let flag = 0;

  // Looping the sensors array and adding to a string
  for (const sensor of sensors) {
    if (flag == 0) {
      allSensors = allSensors + sensor;
      flag = 1;
    } else {
      allSensors = allSensors + ", " + sensor;
    }
  }
  return allSensors + ".";
};

// --------------------------
// showing other info details
// --------------------------
const otherInfo = (otherInfos) => {
  let info = "";

  // Checking if there is any data or not
  if (otherInfos == undefined) {
    info = "No Other Information's To Show";
  } else {
    // Looping the others object and adding to a string
    for (const keys in otherInfos) {
      info = info + "<br>" + (keys + " : " + otherInfos[keys]);
    }
  }
  return info;
};

// -------------------------
// Fetching data by phone ID
// -------------------------
const fetchPhoneDetail = (phoneId) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
    .then((response) => response.json())
    .then((json) => phoneDetails(json.data));
};

// ---------------------
// showing phone Details
// ---------------------
const phoneDetails = (detailsData) => {
  let dateOfRelease;
  let otherInfos = detailsData.others;

  // checking if the releaseDate is empty or not
  if (detailsData.releaseDate == "") {
    dateOfRelease = "Release Date Not Announced Yet";
  } else {
    dateOfRelease = detailsData.releaseDate;
  }

  // implementing the html for details to show
  showDetailsPlace.innerHTML = `
        <div class="col-lg-6 col-12 mx-auto py-2 px-lg-5 px-4 pb-light-dark text-white border rounded-3">
          <img src="${
            detailsData.image
          }" class="card-img-top py-3 px-5" height="350px" width: "250px" />
          <small class="fw-bolder">${dateOfRelease}</small>
          <h4 class="fw-bold">${detailsData.name}</h4>
          <h5 class="fw-bold">${detailsData.brand}</h5>
          <p class=""><strong>Sensors : </strong> ${sensorsInfo(
            detailsData.mainFeatures.sensors
          )} </p>
          <p class=""><strong>Other Informations : \n </strong> ${otherInfo(
            otherInfos
          )} </p>
        </div>
  `;
};

// -----------------------------------
// Setting Values to div
// -----------------------------------
const itemsToShow = (phone) => {
  return `
    <div class="card h-100 rounded-3 px-lg-5 px-3">
        <img src="${phone.image}" class="card-img-top py-3" height="350px" />
        <div class="card-body py-3">
          <h4 class="card-title fw-bold">${phone.phone_name}</h4>
          <h5 class="card-text fw-bold">${phone.brand}</h5>
          <button type="button" class="btn btn-primary fw-bold" onclick="fetchPhoneDetail('${phone.slug}')">Show Details</button>
        </div>
    </div>
    `;
};

// -----------------------------------
// Showing all phones as search result
// -----------------------------------
const showResults = (data) => {
  // declearing the initial state of elements and getting them
  const showItems = document.getElementById("all-search-results");
  showItems.innerHTML = "";

  const noItemMessage = document.getElementById("no-item-message");
  noItemMessage.style.display = "none";

  const showAllBtn = document.getElementById("show-all");
  showAllBtn.style.display = "none";

  // checking if any item is present or not
  if (data.length > 0) {
    let phoneItem = 0;

    for (const phone of data) {
      // showing 20 phones
      if (phoneItem < 20) {
        // creating 2 div
        const itemDiv = document.createElement("div");

        // setting class, calling function to setting values in div
        itemDiv.classList.add("col");
        itemDiv.innerHTML = `${itemsToShow(phone)}`;

        // showing values
        showItems.appendChild(itemDiv);
      } else {
        // phones over 20
        showAllBtn.style.display = "block";

        // creating 2 div
        const allOtherItemsDiv = document.createElement("div");
        const itemDivMore = document.createElement("div");

        // setting class, calling function to setting values in div
        itemDivMore.classList.add("col");
        itemDivMore.innerHTML = `${itemsToShow(phone)}`;
        allOtherItemsDiv.appendChild(itemDivMore);

        // Showing values on showAllBtn click
        showAllBtn.addEventListener("click", function () {
          showItems.appendChild(allOtherItemsDiv);
          showAllBtn.style.display = "none";
        });
      }
      phoneItem++;
    }

    // Stop Spinner
    spinner.style.display = "none";
  } else {
    // Show No Item Message
    noItemMessage.style.display = "block";

    // Stop Spinner
    spinner.style.display = "none";
  }
};

// Search Button Workings
searchButton.addEventListener("click", function () {
  // showing spinner
  spinner.style.display = "block";

  // Taking Search Input Text
  const searchText = document.getElementById("search-input-text");
  const searchTextValue = searchText.value;

  // Declearing Initial State's
  searchText.value = "";
  showDetailsPlace.innerHTML = "";

  // Fetching Fata of Search Text
  fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchTextValue.toLowerCase()}`
  )
    .then((response) => response.json())
    .then((json) => showResults(json.data));
});
