// Getting input
const inputValues = () => {
  const searchField = document.getElementById("search-field");
  const searchValue = searchField.value;
  searchField.value = "";
  return searchValue;
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
  displayPhone(data.data);
};

const displayPhone = (phones) => {
  const phoneContainer = containerValue("phone");
  phoneContainer.textContent = "";

  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");

    //Adding Html into div
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

// show phone details
const showPhoneDetails = async (slug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  const res = await fetch(url);
  const slugs = await res.json();

  displayPhoneDetails(slugs.data);
  console.log(slugs);
};

const displayPhoneDetails = (slugs) => {
  const detailContainer = containerValue("detail");
  detailContainer.textContent = "";

  //Creating div and showing the div
  detailContainer.style.display = "block";
  const div = document.createElement("div");
  div.classList.add("col");

  // Adding Html into div
  div.innerHTML = `
  <div class="card border-0 shadow-lg mx-auto my-4">
  <img src="${slugs.image}" class="card-img-top w-25 mx-auto my-3" alt="..." />
  <div class="container">
  <div class="row">
    <div class="col-lg-4">
      <h3>Brand Name</h3>
      <p>
    </div>
    <div class="col-lg-4">
      <h3>Sensors</h3>
      <li>${slugs.mainFeatures.sensors[0]}</li>

      <li>${slugs.mainFeatures.sensors[2]}</li>
      <li>${slugs.mainFeatures.sensors[3]}</li>
      <li>${slugs.mainFeatures.sensors[4]}</li>
      <li>${slugs.mainFeatures.sensors[5]}</li>
    </div>
    <div class="col-lg-4">
      <h3>Others</h3>
     <li>WLAN: ${slugs.others.WLAN}</li>
     <li>Bluetooth: ${slugs.others.Bluetooth}</li>
     <li>GPS: ${slugs.others.GPS}</li>
     <li>NFC: ${slugs.others.NFC}</li>
     <li>Radio: ${slugs.others.Radio}</li>
     <li>USB: ${slugs.others.USB}</li>
    </div>
  </div>
</div>
</div>
  `;

  detailContainer.appendChild(div);
};
