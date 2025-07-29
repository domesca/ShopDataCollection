// --- Utility Functions ---
function getInputValues(selector) {
  const inputs = document.querySelectorAll(selector);
  return Array.from(inputs).map(i => i.value.trim()).filter(val => val !== "");
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
  const data = {
    section: "area",
    city: document.getElementById("city").value.trim(),
    town: document.getElementById("town").value.trim(),
    borough: document.getElementById("borough").value.trim(),
    postcode1: document.getElementById("postcode1").value.trim(),
    lane: document.getElementById("lane").value.trim(),
    shopNumber: document.getElementById("shop-number").value.trim()
  };

  fetch("https://76952caa-0470-47ca-ad9a-601e2f774c03-00-2zy36chsul1cv.janeway.replit.dev/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(response => {
    if (response.includes("Error")) {
      console.error("Server error:", response);
    } else {
      alert("✅ Data submitted successfully!");
    }
  })
  .catch(err => alert("❌ " + err));
}

function clearArea() {
  document.getElementById("city").value = "";
  document.getElementById("town").value = "";
  document.getElementById("borough").value = "";
  document.getElementById("postcode1").value = "";
  document.getElementById("lane").value = "";
  document.getElementById("shop-number").value = "";
}
// --- Shop Section ---
function addShopCategory() {
  addEntry("extra-categories", `
    <select class="shelf-category">
      <option>Select category</option>
      <option>Dessert Packages</option>
      <option>Pickles</option>
      <option>Sauces</option>
      <option>Tinned Food</option>
      <option>Vermicelli</option>
    </select>
    <input class="shelf-qty" type="text" placeholder="Qty">
  `);
}

function saveShop() {
  const data = {
    section: "shop",
    shopName: document.getElementById("shop-name").value.trim(),
    counterNumber: document.getElementById("counter-number").value.trim(),
    shelves: []
  };

  const categories = document.querySelectorAll("#shelf-container .shelf-category");
  const quantities = document.querySelectorAll("#shelf-container .shelf-qty");

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i].value;
    const qty = quantities[i].value.trim();
    if (category !== "Select category" && qty !== "") {
      data.shelves.push({ category, quantity: qty });
    }
  }

  fetch("https://76952caa-0470-47ca-ad9a-601e2f774c03-00-2zy36chsul1cv.janeway.replit.dev/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(text => alert("✅ Shop data submitted!"))
  .catch(err => alert("❌ " + err));
}

function clearShop() {
  clearContainer("shop-container");
}

// --- Brand Section ---
function addBrandEntry() {
  addEntry("brand-container", `
    <div class="form-row brand-row">
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
    </div>
  `);
}

function savePurchase() {
  const container = document.getElementById("purchase-container");
  const rows = container.querySelectorAll(".form-row");

  const data = [];

  rows.forEach(row => {
    const selects = row.querySelectorAll("select");
    const category = selects[0]?.value.trim();
    const brand = selects[1]?.value.trim();
    const size = row.querySelector("input[placeholder='Size']").value.trim();
    const price = row.querySelector("input[placeholder='Purchase Price']").value.trim();

    if (category && brand && size && price) {
      data.push({
        section: "purchase",
        category,
        brand,
        size,
        purchasePrice: price
      });
    }
  });

  fetch("https://76952caa-0470-47ca-ad9a-601e2f774c03-00-2zy36chsul1cv.janeway.replit.dev/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(response => {
    if (response.includes("Error")) {
      console.error("Server error:", response);
    } else {
      alert("✅ Purchase data submitted successfully!");
    }
  })
  .catch(err => alert("❌ " + err));
}


function clearBrand() {
  clearContainer("brand-container");
  updateBrandOptions();
}
function clearDeliveryLocation() { clearContainer("delivery-location-container"); }

// --- Purchase ---
function savePurchase() {
  const container = document.getElementById("purchase-container");
  const rows = container.querySelectorAll(".form-row");

  const data = [];

  rows.forEach(row => {
    const category = row.querySelector("select").value.trim();
    const brand = row.querySelectorAll("select")[1].value.trim();
    const size = row.querySelector("input[placeholder='Size']").value.trim();
    const price = row.querySelector("input[placeholder='Purchase Price']").value.trim();

    if (category && brand && size && price) {
      data.push({
        section: "purchase",
        category,
        brand,
        size,
        purchasePrice: price
      });
    }
  });

  fetch("https://76952caa-0470-47ca-ad9a-601e2f774c03-00-2zy36chsul1cv.janeway.replit.dev/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(response => {
    if (response.includes("Error")) {
      console.error("Server error:", response);
    } else {
      alert("✅ Purchase data submitted successfully!");
    }
  })
  .catch(err => alert("❌ " + err));
}
