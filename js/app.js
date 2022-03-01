const loadApi = async () => {
  // search field value
  const searchField = document.getElementById("search-field");
  const searchValue = searchField.value;

  const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
  const res = await fetch(url);
  const data = await res.json();

  displayPhone(data.data);
  searchField.value = "";
};

const displayPhone = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");

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
};

const displayPhoneDetails = (slugs) => {
  const phoneDetailContainer = document.getElementById(
    "phone-details-container"
  );
  phoneDetailContainer.style.display = "block";
  phoneDetailContainer.textContent = "";
  const div = document.createElement("div");
  div.classList.add("col");

  div.innerHTML = `
  <div class="card border-0 shadow-lg mx-auto my-4">
  <img src="${slugs.image}" class="card-img-top w-25 mx-auto my-3" alt="..." />
  <div class="card-body text-center my-3">
    <h5 class="card-title">Phone Name: N ameeee</h5>
    <p>Brand Name:</p>
    <button class='btn btn-danger w-50 mx-auto'>Close</button>
  </div>
</div>
  `;

  phoneDetailContainer.appendChild(div);
};
