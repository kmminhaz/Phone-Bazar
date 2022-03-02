const showDetailsPlace = document.getElementById("show-details");

const fetchPhoneDetail = (phoneId) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
    .then((response) => response.json())
    .then((json) => phoneDetails(json.data));
};

const phoneDetails = (detailsData) => {
  showDetailsPlace.innerHTML = `
        <div class="w-50 mx-auto py-2 px-5 border">
          <img src="${detailsData.image}" class="card-img-top py-3 px-5" height="350px" />
          <small class="text-muted fw-bold">${detailsData.releaseDate}</small>
          <h4 class="fw-bold">${detailsData.name}</h4>
          <h5 class="fw-bold">${detailsData.brand}</h5>
        </div>
  `;
};

const showResults = (data) => {
  const showItems = document.getElementById("all-search-results");
  showItems.innerHTML = "";

  const noItemMessage = document.getElementById("no-item-message");
  noItemMessage.style.display = "none";

  const showAllBtn = document.getElementById("show-all");
  showAllBtn.style.display = "none";

  if (data.length > 0) {
    let phoneItem = 0;

    for (const phone of data) {
      if (phoneItem < 20) {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("col");
        itemDiv.innerHTML = `
                    <div class="card h-100">
                        <img src="${phone.image}" class="card-img-top py-3 px-5" height="350px" />
                        <div class="card-body">
                            <small class="text-muted fw-bold"
                                >Release Date</small
                            >
                            <h4 class="card-title fw-bold">${phone.phone_name}</h4>
                            <h5 class="card-text fw-bold">${phone.brand}</h5>
                            <button type="button" class="btn btn-primary fw-bold" onclick="fetchPhoneDetail('${phone.slug}')">Show Details</button>
                        </div>
                    </div>
                    `;
        showItems.appendChild(itemDiv);
      } else {
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

const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", function () {
  const searchText = document.getElementById("search-input-text");
  const searchTextValue = searchText.value;

  searchText.value = "";
  showDetailsPlace.innerHTML = "";

  fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchTextValue.toLowerCase()}`
  )
    .then((response) => response.json())
    .then((json) => showResults(json.data));
});
