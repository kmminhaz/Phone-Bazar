const showResults = (data) => {
  const showItems = document.getElementById("all-search-results");
  showItems.innerHTML = "";

  const noItemMessage = document.getElementById("no-item-message");
  noItemMessage.style.display = "none";

  if(data.length > 0){
      for (const phone of data) {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("col");
        itemDiv.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top img-fluid" />
            <div class="card-body">
            <small class="text-muted fw-bold"
                >Release Date</small
            >
            <h4 class="card-title fw-bold">${phone.phone_name}</h4>
            <h5 class="card-text fw-bold">${phone.brand}</h5>
            <button type="button" class="btn btn-primary fw-bold">Show Details</button>
            </div>
        </div>
        `;

        showItems.appendChild(itemDiv);
      }
  }else{
    noItemMessage.style.display = "block";
  }
};

const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", function () {
  const searchText = document.getElementById("search-input-text");
  const searchTextValue = searchText.value;

  searchText.value = "";

  fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchTextValue.toLowerCase()}`
  )
    .then((response) => response.json())
    .then((json) => showResults(json.data));
});
