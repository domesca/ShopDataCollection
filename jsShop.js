 function addShopCategory() {
  const container = document.getElementById("extra-categories");
  const div = document.createElement("div");
  div.className = "form-row";
  div.innerHTML = `
    <select>
      <option>Select category</option>
      <option>Dessert Packages</option>
      <option>Pickles</option>
      <option>Sauces</option>
      <option>Tinned Food</option>
      <option>Vermicelli</option>
    </select>
    <input type="text" placeholder="Qty">
  `;
  container.appendChild(div);
}

function addBrandEntry() {
  const container = document.getElementById("brand-container");
  const div = document.createElement("div");
  div.className = "form-row";
  div.innerHTML = `
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
    <input type="text" placeholder="Price">
  `;
  container.appendChild(div);
  updateBrandOptions();
}

function addPurchaseEntry() {
  const container = document.getElementById("purchase-container");
  const div = document.createElement("div");
  div.className = "form-row";
  div.innerHTML = `
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
    <input type="text" placeholder="Purchase Price">
  `;
  container.appendChild(div);
  updateBrandOptions();
}

function addSpecialOfferEntry() {
  const container = document.getElementById("special-offer-container");
  const div = document.createElement("div");
  div.className = "form-row";
  div.innerHTML = `
    <select class="brand-select">
      <option>Select Brand</option>
    </select>
    <input type="text" placeholder="Value/ctn">
    <input type="text" placeholder="Condition">
  `;
  container.appendChild(div);
  updateBrandOptions();
}

function updateBrandOptions() {
  const brandInputs = document.querySelectorAll("#brand-container input[placeholder='Brand name']");
  const brandNames = Array.from(brandInputs).map(input => input.value.trim()).filter(name => name);
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

function saveShop() {
  const inputs = document.querySelectorAll("#shop-container input");
  const locations = Array.from(inputs).map(input => input.value.trim()).filter(val => val !== "");

  const data = {
    sheet: "ShopInformation", // The name of the sheet (optional, if your Google Script uses it)
    locations: locations
  };

  fetch("https://script.google.com/macros/s/AKfycbxTTwN2Kbwg-k2jjeYwy_GdzoY2YoOqUREqHPvKzyg6nrKvGx-aOb7bdNNW-j7eKgiE/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(msg => alert(msg))
  .catch(err => alert("Error: " + err));
}
function clearShop() {
  document.getElementById("shop-container").innerHTML = "";
}

function saveBrand() {
 const inputs = document.querySelectorAll("#brand-container input");
  const locations = Array.from(inputs).map(input => input.value.trim()).filter(val => val !== "");

  const data = {
    sheet: "BrandInformation", // The name of the sheet (optional, if your Google Script uses it)
    locations: locations
  };

  fetch("https://script.google.com/macros/s/AKfycbxTTwN2Kbwg-k2jjeYwy_GdzoY2YoOqUREqHPvKzyg6nrKvGx-aOb7bdNNW-j7eKgiE/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(msg => alert(msg))
  .catch(err => alert("Error: " + err));
}
function clearBrand() {
  document.getElementById("delivery-location-container").innerHTML = "";
}

function clearBrand() {
  document.getElementById("brand-container").innerHTML = "";
  updateBrandOptions();
  fetch("https://script.google.com/macros/s/AKfycbxTTwN2Kbwg-k2jjeYwy_GdzoY2YoOqUREqHPvKzyg6nrKvGx-aOb7bdNNW-j7eKgiE/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(msg => alert(msg));
}

function savePurchase() {
  const inputs = document.querySelectorAll("#purchase-container input");
  const locations = Array.from(inputs).map(input => input.value.trim()).filter(val => val !== "");

  const data = {
    sheet: "PurchasePrice", // The name of the sheet (optional, if your Google Script uses it)
    locations: locations
  };

  fetch("https://script.google.com/macros/s/AKfycbxTTwN2Kbwg-k2jjeYwy_GdzoY2YoOqUREqHPvKzyg6nrKvGx-aOb7bdNNW-j7eKgiE/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(msg => alert(msg))
  .catch(err => alert("Error: " + err));
}
function clearPurchase() {
  document.getElementById("purchase-container").innerHTML = "";
}

function saveSpecialOffer() {
  const inputs = document.querySelectorAll("special-offer-container input");
  const locations = Array.from(inputs).map(input => input.value.trim()).filter(val => val !== "");

  const data = {
    sheet: "DeliveryLocation", // The name of the sheet (optional, if your Google Script uses it)
    locations: locations
  };

  fetch("https://script.google.com/macros/s/AKfycbxTTwN2Kbwg-k2jjeYwy_GdzoY2YoOqUREqHPvKzyg6nrKvGx-aOb7bdNNW-j7eKgiE/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(msg => alert(msg))
  .catch(err => alert("Error: " + err));
}
function clearSpecialOffer() {
  document.getElementById("special-offer-container").innerHTML = "";
}


function addPaymentTermsEntry() {
  const container = document.getElementById("payment-terms-container");
  const div = document.createElement("div");
  div.className = "form-row";
  div.innerHTML = `
    <select class="brand-select">
      <option>Select Brand</option>
    </select>
    <input type="text" placeholder="Select Category (Optional)">
    <input type="text" placeholder="Payment Time">
    <input type="text" placeholder="Payment Method">
  `;
  container.appendChild(div);
  updateBrandOptions();
}

function savePaymentTerms() {
 const inputs = document.querySelectorAll("payment-terms-container input");
  const locations = Array.from(inputs).map(input => input.value.trim()).filter(val => val !== "");

  const data = {
    sheet: "PaymentTerms", // The name of the sheet (optional, if your Google Script uses it)
    locations: locations
  };

  fetch("https://script.google.com/macros/s/AKfycbxTTwN2Kbwg-k2jjeYwy_GdzoY2YoOqUREqHPvKzyg6nrKvGx-aOb7bdNNW-j7eKgiE/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(msg => alert(msg))
  .catch(err => alert("Error: " + err));
}
function clearPaymentTerms() {
  document.getElementById("payment-terms-container").innerHTML = "";
}

function addPaymentTermsEntry() {
  const container = document.getElementById("payment-terms-container");
  const div = document.createElement("div");
  div.className = "form-row";
  div.innerHTML = `
    <select class="brand-select">
      <option>Select Brand</option>
    </select>
    <input type="text" placeholder="Select Category (Optional)">
    <input type="text" placeholder="Payment Time">
    <input type="text" placeholder="Payment Method">
  `;
  container.appendChild(div);
  updateBrandOptions();
}

function savePaymentTerms() {
 const inputs = document.querySelectorAll("payment-terms-container input");
  const locations = Array.from(inputs).map(input => input.value.trim()).filter(val => val !== "");

  const data = {
    sheet: "PaymentTerms", // The name of the sheet (optional, if your Google Script uses it)
    locations: locations
  };

  fetch("https://script.google.com/macros/s/AKfycbxTTwN2Kbwg-k2jjeYwy_GdzoY2YoOqUREqHPvKzyg6nrKvGx-aOb7bdNNW-j7eKgiE/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(msg => alert(msg))
  .catch(err => alert("Error: " + err));
}
function clearSpecialOffer() {
  document.getElementById("payment-terms-container").innerHTML = "";
}


function addAverageSalesEntry() {
  const container = document.getElementById("average-sales-container");
  const div = document.createElement("div");
  div.className = "form-row";
  div.innerHTML = `
    <select>
      <option>Select category</option>
      <option>Dessert Packages</option>
      <option>Pickles</option>
      <option>Sauces</option>
      <option>Tinned Food</option>
      <option>Vermicelli</option>
    </select>
    <select class="brand-select">
      <option>Select Brand (Optional)</option>
    </select>
    <input type="text" placeholder="Indicators">
    <input type="text" placeholder="Value">
  `;
  container.appendChild(div);
  updateBrandOptions();
}

function saveAverageSales() {
  const inputs = document.querySelectorAll("#average-sales-container input");
  const locations = Array.from(inputs).map(input => input.value.trim()).filter(val => val !== "");

  const data = {
    sheet: "AverageSales", // The name of the sheet (optional, if your Google Script uses it)
    locations: locations
  };

  fetch("https://script.google.com/macros/s/AKfycbxTTwN2Kbwg-k2jjeYwy_GdzoY2YoOqUREqHPvKzyg6nrKvGx-aOb7bdNNW-j7eKgiE/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(msg => alert(msg))
  .catch(err => alert("Error: " + err));
}
function clearAverageSales() {
  document.getElementById("average-sales-container").innerHTML = "";
}

function addBuyingSourcesEntry() {
  const container = document.getElementById("buying-sources-container");
  const div = document.createElement("div");
  div.className = "form-row";
  div.innerHTML = `
    <select class="brand-select">
      <option>Select Brand</option>
    </select>
    <input type="text" placeholder="Buying Source">
  `;
  container.appendChild(div);
  updateBrandOptions();
}
function saveBuyingSources() {
  const inputs = document.querySelectorAll("#buying-sources-container input");
  const locations = Array.from(inputs).map(input => input.value.trim()).filter(val => val !== "");

  const data = {
    sheet: "BuyingSources", // The name of the sheet (optional, if your Google Script uses it)
    locations: locations
  };

  fetch("https://script.google.com/macros/s/AKfycbxTTwN2Kbwg-k2jjeYwy_GdzoY2YoOqUREqHPvKzyg6nrKvGx-aOb7bdNNW-j7eKgiE/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(msg => alert(msg))
  .catch(err => alert("Error: " + err));
}
function clearBuyingSources() {
  document.getElementById("buying-sources-container").innerHTML = "";
}

function addDistributionFrequencyEntry() {
  const container = document.getElementById("distribution-frequency-container");
  const div = document.createElement("div");
  div.className = "form-row";
  div.innerHTML = `
    <select>
      <option>Select category</option>
      <option>Dessert Packages</option>
      <option>Pickles</option>
      <option>Sauces</option>
      <option>Tinned Food</option>
      <option>Vermicelli</option>
    </select>
    <input type="text" placeholder="Frequency">
    <input type="text" placeholder="Per month /per week">
  `;
  container.appendChild(div);
}
function saveDistributionFrequency() {
  const inputs = document.querySelectorAll("#distribution-frequency-container input");
  const locations = Array.from(inputs).map(input => input.value.trim()).filter(val => val !== "");

  const data = {
    sheet: "DistributionFrequency", // The name of the sheet (optional, if your Google Script uses it)
    locations: locations
  };

  fetch("https://script.google.com/macros/s/AKfycbxTTwN2Kbwg-k2jjeYwy_GdzoY2YoOqUREqHPvKzyg6nrKvGx-aOb7bdNNW-j7eKgiE/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(msg => alert(msg))
  .catch(err => alert("Error: " + err));
}
function clearDistributionFrequency() {
  document.getElementById("distribution-frequency-container").innerHTML = "";
}

function addDeliveryLocationEntry() {
  const container = document.getElementById("delivery-location-container");
  const div = document.createElement("div");
  div.className = "form-row";
  div.innerHTML = `<input type="text" placeholder="Location">`;
  container.appendChild(div);
}
function saveDeliveryLocation() {
   const inputs = document.querySelectorAll("#delivery-location-container input");
  const locations = Array.from(inputs).map(input => input.value.trim()).filter(val => val !== "");

  const data = {
    sheet: "DeliveryLocation", // The name of the sheet (optional, if your Google Script uses it)
    locations: locations
  };

  fetch("https://script.google.com/macros/s/AKfycbxTTwN2Kbwg-k2jjeYwy_GdzoY2YoOqUREqHPvKzyg6nrKvGx-aOb7bdNNW-j7eKgiE/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.text())
  .then(msg => alert(msg))
  .catch(err => alert("Error: " + err));
}
function clearDeliveryLocation() {
  document.getElementById("delivery-location-container").innerHTML = "";
}

function submitForm() {
  alert("Submitting all form data...");
  // You will implement the function to gather all form data and send to Google Sheets.
}
