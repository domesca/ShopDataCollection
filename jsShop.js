  // --- Utility Functions ---
function getInputValues(selector) {
  const inputs = document.querySelectorAll(selector);
  return Array.from(inputs).map(i => i.value.trim()).filter(val => val !== "");
}

function sendToSheet(sheetName, values) {
  const data = { sheet: sheetName, locations: values };
  fetch("https://script.google.com/macros/s/AKfycbxF5JoO5KntmWqLhWrKYuAijxjjii0fE5EksRInjlkkpQ_Yuz49joUKldQ4Uj3jFqP3/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.text())
    .then(msg => alert(msg))
    .catch(err => alert("Error: " + err));
}

function clearContainer(containerId) {
  document.getElementById(containerId).innerHTML = "";
}

// --- Entry Adders ---
function addEntry(containerId, html) {
  const container = document.getElementById(containerId);
  const div = document.createElement("div");
  div.className = "form-row";
  div.innerHTML = html;
  container.appendChild(div);
  updateBrandOptions();
}

function updateBrandOptions() {
  const brandInputs = document.querySelectorAll("#brand-container input[placeholder='Brand name']");
  const brandNames = Array.from(brandInputs).map(i => i.value.trim()).filter(Boolean);
  const brandSelects = document.querySelectorAll(".brand-select");

  brandSelects.forEach(select => {
    const current = select.value;
    select.innerHTML = '<option>Select Brand</option>';
    brandNames.forEach(name => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });
    select.value = current;
  });
}

// --- Toggle Logic ---
function toggleOptions(checkbox) {
  const optionsBox = checkbox.closest(".checkbox-group").querySelector(".options-box");
  if (optionsBox) optionsBox.style.display = checkbox.checked ? "block" : "none";
}

function toggleWarehouseInput(checkbox) {
  const group = checkbox.closest(".warehouse-group");
  if (group) {
    const input = group.querySelector(".warehouse-location");
    input.style.display = checkbox.checked ? "inline-block" : "none";
  }
}

// --- Form Actions ---
function submitForm() {
  alert("Submitting all form data...");
}

// --- Category-specific Entry Functions ---
function saveArea() {
  const city = document.getElementById("city").value.trim();
  const town = document.getElementById("town").value.trim();
  const borough = document.getElementById("borough").value.trim();
  const postcode = document.getElementById("postcode1").value.trim();
  const lane = document.getElementById("lane").value.trim();
  const shopNumber = document.getElementById("shop-number").value.trim();

  const values = [city, town, borough, postcode, lane, shopNumber];
  sendToSheet("Area Information", values);
}
function clearArea() {
  document.getElementById("city").value = "";
  document.getElementById("town").value = "";
  document.getElementById("borough").value = "";
  document.getElementById("postcode1").value = "";
  document.getElementById("lane").value = "";
  document.getElementById("shop-number").value = "";
}
function addShopCategory() {
  addEntry("extra-categories", `
    <select>
      <option>Select category</option>
      <option>Dessert Packages</option>
      <option>Pickles</option>
      <option>Sauces</option>
      <option>Tinned Food</option>
      <option>Vermicelli</option>
    </select>
    <input type="text" placeholder="Qty">`
  );
}

function addBrandEntry() {
  addEntry("brand-container", `
    <select>
      <option>Select category</option>
      <option>Dessert Packages</option>
      <option>Pickles</option>
      <option>Sauces</option>
      <option>Tinned Food</option>
      <option>Vermicelli</option>
    </select>
    <input type="text" placeholder="Brand name">
    <input type="text" placeholder="Size">
    <input type="text" placeholder="Price">`
  );
}

function addPurchaseEntry() {
  addEntry("purchase-container", `
    <select>
      <option>Select category</option>
      <option>Dessert Packages</option>
      <option>Pickles</option>
      <option>Sauces</option>
      <option>Tinned Food</option>
      <option>Vermicelli</option>
    </select>
    <select class="brand-select">
      <option>Select Brand</option>
    </select>
    <input type="text" placeholder="Size">
    <input type="text" placeholder="Purchase Price">`
  );
}

function addSpecialOfferEntry() {
  const container = document.getElementById("special-offer-container");

  // Reference the first row in Purchase Price to clone the dropdowns
  const referenceRow = document.querySelector("#purchase-container .form-row");
  const selects = referenceRow.querySelectorAll("select");

  const div = document.createElement("div");
  div.className = "form-row";
  div.innerHTML = `
    ${selects[1].outerHTML} <!-- Brand dropdown (2nd select from Purchase Price) -->
    <input type="text" placeholder="Value/ctn">
    <input type="text" placeholder="Condition">
  `;
  container.appendChild(div);
  updateBrandOptions();
}

function addPaymentTermsEntry() {
  const container = document.getElementById("payment-terms-container");

  // Get the first row to clone selects
  const referenceRow = container.querySelector(".form-row");
  if (!referenceRow) return;

  const selects = referenceRow.querySelectorAll("select");

  const div = document.createElement("div");
  div.className = "form-row";
  div.innerHTML = `
    ${selects[0].outerHTML} <!-- Brand -->
    ${selects[1].outerHTML} <!-- Payment Method -->
    ${selects[2].outerHTML} <!-- Credit Days -->
  `;
  container.appendChild(div);
  updateBrandOptions();
}

function addAverageSalesEntry() {
const container = document.getElementById("average-sales-container");

  const referenceRow = container.querySelector(".form-row");
  if (!referenceRow) return;

  const selects = referenceRow.querySelectorAll("select");

  const div = document.createElement("div");
  div.className = "form-row";
  div.innerHTML = `
    ${selects[0].outerHTML} <!-- Category -->
    ${selects[1].outerHTML} <!-- Brand -->
    <input type="text" placeholder="Value">
    ${selects[2].outerHTML} <!-- Units of measurement -->
  `;
  container.appendChild(div);
  updateBrandOptions();
}


function addBuyingSourcesEntry() {
  const container = document.getElementById("buying-sources-container");

  const referenceRow = container.querySelector(".form-row");
  if (!referenceRow) return;

  const div = document.createElement("div");
  div.className = "form-row";
  div.innerHTML = referenceRow.innerHTML; // Clone full inner HTML
  container.appendChild(div);

  // Re-attach event listeners for the new checkboxes
  const checkboxes = div.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function () {
      toggleOptions(checkbox);
    });
  });

  updateBrandOptions(); // in case you want to sync brands
}


function addDistributionFrequencyEntry() {
  addEntry("distribution-frequency-container", `
    <select>
      <option>Select category</option>
      <option>Dessert Packages</option>
      <option>Pickles</option>
      <option>Sauces</option>
      <option>Tinned Food</option>
      <option>Vermicelli</option>
    </select>
    <input type="text" placeholder="Frequency">
    <input type="text" placeholder="Per month /per week">`
  );
}

function addDeliveryLocationEntry() {
  addEntry("delivery-location-container", `<input type="text" placeholder="Location">`);
}

// --- Save & Clear Functions ---
function saveShop() { sendToSheet("ShopInformation", getInputValues("#shop-container input")); }
function clearShop() { clearContainer("shop-container"); }

function saveBrand() { sendToSheet("BrandInformation", getInputValues("#brand-container input")); }
function clearBrand() { clearContainer("brand-container"); updateBrandOptions(); }

function savePurchase() { sendToSheet("PurchasePrice", getInputValues("#purchase-container input")); }
function clearPurchase() { clearContainer("purchase-container"); }

function saveSpecialOffer() { sendToSheet("SpecialOffer", getInputValues("#special-offer-container input")); }
function clearSpecialOffer() { clearContainer("special-offer-container"); }

function savePaymentTerms() { sendToSheet("PaymentTerms", getInputValues("#payment-terms-container input")); }
function clearPaymentTerms() { clearContainer("payment-terms-container"); }

function saveAverageSales() { sendToSheet("AverageSales", getInputValues("#average-sales-container input")); }
function clearAverageSales() { clearContainer("average-sales-container"); }

function saveBuyingSources() { sendToSheet("BuyingSources", getInputValues("#buying-sources-container input")); }
function clearBuyingSources() { clearContainer("buying-sources-container"); }

function saveDistributionFrequency() { sendToSheet("DistributionFrequency", getInputValues("#distribution-frequency-container input")); }
function clearDistributionFrequency() { clearContainer("distribution-frequency-container"); }

function saveDeliveryLocation() { sendToSheet("DeliveryLocation", getInputValues("#delivery-location-container input")); }
function clearDeliveryLocation() { clearContainer("delivery-location-container"); }
