// Getting input
const inputValues = () => {
  const searchField = document.getElementById("search-field");
  const searchValue = searchField.value;
  searchField.value = "";

  // Condition
  if (searchValue <= 0 || searchValue >= 0 || searchValue === " ") {
    alert(`Number and Empty Space is not allowed.
Phone Available : Huawei, Apple, Oppo,ipad and watches available.`);
  } else {
    return searchValue;
  }
};

//Container
const containerValue = (value) => {
  const phoneContainer = document.getElementById(value + "-container");
  return phoneContainer;
};

const loadApi = async () => {
  // search field value
  const searchValue = inputValues();
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhone(data);
};

const displayPhone = (mobiles) => {
  const phoneContainer = containerValue("phone");
  phoneContainer.textContent = "";
  const phones = mobiles.data.slice(0, 20);

  // Looping
  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");

    //Adding phones into HTML
    div.innerHTML = `
    <div class="card w-75 border-0 shadow-lg mx-auto my-4">
    <img src="${phone.image}" class="card-img-top w-50 mx-auto my-3" alt="..." />
    <div class="card-body text-center my-3">
      <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>
      <p>Brand Name: ${phone.brand}</p>
      <button class='btn btn-success' onclick="showPhoneDetails('${phone.slug}')">Show Details</button>
    </div>
  </div>
  `;
    phoneContainer.appendChild(div);
  });
};

// load phone details api
const showPhoneDetails = async (slug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  const res = await fetch(url);
  const slugs = await res.json();
  displayPhoneDetails(slugs.data);
};

// Showing Phone Details
const displayPhoneDetails = (slugs) => {
  const detailContainer = containerValue("detail");
  detailContainer.textContent = "";

  //Creating div and showing the div
  detailContainer.style.display = "block";
  const div = document.createElement("div");
  div.classList.add("col");

  // Adding Html into div
  div.innerHTML = `
  <div class="card border-0 shadow-lg mx-auto">
  <img src="${slugs.image}" class="card-img-top w-25 mx-auto my-3" alt="..." />
  <div class="container">
      <h5 class="text-center">Release Date: ${slugs.releaseDate}</h5>
      <h3>Main Features</h3>
      <div class="row">
          <div class="col-lg-6 my-auto">
              <p>Storage:</p>
              <p>Display:</p>
              <p>Chipset:</p>
              <p>Memory:</p>
          </div>
          <div class="col-lg-6 mt-lg-1">
              <p>${slugs.mainFeatures.storage}</p>
              <p>${slugs.mainFeatures.displaySize}</p>
              <p>${slugs.mainFeatures.chipset}</p>
              <p>${slugs.mainFeatures.memory}</p>
          </div>
          <h3>Sensors</h3>
          <div class="row row-cols-lg-2">
              <p>1. ${slugs.mainFeatures.sensors[0]}</p>
              <p>2. ${slugs.mainFeatures.sensors[1]}</p>
              <p>3. ${slugs.mainFeatures.sensors[2]}</p>
              <p>4. ${slugs.mainFeatures.sensors[3]}</p>
              <p>5. ${slugs.mainFeatures.sensors[4]}</p>
              <p>6. ${slugs.mainFeatures.sensors[5]}</p>
          </div>
          <h3>Others</h3>
          <div class="row">
              <div class="col-lg-6">
                  <p>WLAN:</p>
                  <p>Bluetooth:</p>
                  <p>GPS:</p>
                  <p>NFC:</p>
                  <p>Radio:</p>
                  <p>USB:</p>
              </div>
              <div id="others" class="col-lg-6 mt-lg-auto">
                  <p>${slugs.others.WLAN}</p>
                  <p>${slugs.others.Bluetooth}</p>
                  <p>${slugs.others.GPS}</p>
                  <p>${slugs.others.NFC}</p>
                  <p>${slugs.others.Radio}</p>
                  <p>${slugs.others.USB}</p>
              </div>
          </div>
      </div>
      <div class="d-flex justify-content-center align-items-center pb-2">
          <button class="btn btn-danger" onclick="closeDetails()">Close</button>
      </div>
  </div>
</div>
`;
  detailContainer.appendChild(div);
};

//Close Details Container
const closeDetails = () => {
  const detailContainer = containerValue("detail");
  detailContainer.textContent = "";
  return detailContainer;
};

// Button Call
document.getElementById("search-button").addEventListener("click", () => {
  loadApi();
  containerValue("phone").textContent = "";
  containerValue("detail").textContent = "";
});
