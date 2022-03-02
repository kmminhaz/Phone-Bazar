// --------------------
// Globel Declearations
// --------------------

// show details place
const showDetailsPlace = document.getElementById("show-details");

// search button
const searchButton = document.getElementById("search-button");

// ---------------
// showing sensors
// ---------------
const sensorsInfo = (sensors) => {
  let allSensors = "";
  let flag = 0;
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
  let text = "";

  for (const keys in otherInfos) {
    text = text + "<br>" + (keys + " : " + otherInfos[keys]);
  }
  return text;
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
  const otherInfos = detailsData.others;

  // checking if the releaseDate is empty or not
  if (detailsData.releaseDate == "") {
    dateOfRelease = "Release Date Not Announced Yet";
  } else {
    dateOfRelease = detailsData.releaseDate;
  }

  // implementing the html for details to show
  showDetailsPlace.innerHTML = `
        <div class="col-lg-6 col-12 mx-auto py-2 px-lg-5 px-4 border">
          <img src="${
            detailsData.image
          }" class="card-img-top py-3 px-5" height="350px" />
          <small class="text-muted fw-bold">${dateOfRelease}</small>
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
      // showing 20 products
      if (phoneItem < 20) {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("col");
        itemDiv.innerHTML = `
                    <div class="card h-100">
                        <img src="${phone.image}" class="card-img-top py-3 px-5" height="350px" />
                        <div class="card-body">
                          <h4 class="card-title fw-bold">${phone.phone_name}</h4>
                          <h5 class="card-text fw-bold">${phone.brand}</h5>
                          <button type="button" class="btn btn-primary fw-bold" onclick="fetchPhoneDetail('${phone.slug}')">Show Details</button>
                        </div>
                    </div>
                    `;
        showItems.appendChild(itemDiv);
      } else {
        // making visible to the show all button
        showAllBtn.style.display = "block";
        showAllBtn.addEventListener("click", function () {
          showItems.appendChild(itemDivMore);
        });
      }
      phoneItem++;
    }
  } else {
    noItemMessage.style.display = "block";
  }
};

// Search Button Works
searchButton.addEventListener("click", function () {
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
