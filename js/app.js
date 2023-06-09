const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.textContent = "";

  /* //display 15 phones only
  phones = phones.slice(0, 15); */
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 9) {
    phones = phones.slice(0, 9);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  //display no phones found
  const noPhone = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card p-5">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a card for phone. Here some details about phone. This is a right phone that you choose. This is a budget friendly phone. In your budget many features are available here. So, you can buy this phone. Thank you.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show details</button>
            </div>
        </div>
        `;
    phonesContainer.appendChild(phoneDiv);
  });
  //stop loader
  toggleSpinner(false);
};

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};

// handle search button click

document.getElementById("btn-search").addEventListener("click", function () {
  //start loader
  processSearch(10);
});

//search input field
document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    // console.log(e.key)
    if (e.key === "Enter") {
      processSearch(10);
    }
  });

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

//not the best solution
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  console.log(phone);
  const modalTitle = document.getElementById("phoneDetailModalLabel");
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.innerHTML = `
    <p>Release Date: ${
      phone.releaseDate ? phone.releaseDate : "No Release Date Found"
    }</p>
    <p>Storage: ${
      phone.mainFeatures
        ? phone.mainFeatures.storage
        : "No storage information found"
    }</p>
    <p>Others: ${
      phone.others ? phone.others.Bluetooth : "No Bluetooth information"
    }</p>
    <p>Sensors: ${
      phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : "No Sensor"
    }</p>
  `;
};

loadPhones("apple");
