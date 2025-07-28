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
  const input = group?.querySelector(".warehouse-location");
  if (input) input.style.display = checkbox.checked ? "inline-block" : "none";
}

// --- Area Section ---
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
  ["city", "town", "borough", "postcode1", "lane", "shop-number"].forEach(id => {
    document.getElementById(id).value = "";
  });
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

function saveBrand() {
  const container = document.getElementById("brand-container");
  const rows = container.querySelectorAll(".brand-row");
  const data = [];

  rows.forEach(row => {
    const category = row.querySelector("select").value.trim();
    const brandName = row.querySelectorAll("input")[0].value.trim();
    const size = row.querySelectorAll("input")[1].value.trim();
    const price = row.querySelectorAll("input")[2].value.trim();

    if (category && brandName && size && price) {
      data.push({
        section: "brand",
        category,
        brandName,
        size,
        price
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
      alert("✅ Brand information submitted successfully!");
    }
  })
  .catch(err => alert("❌ " + err));
}

function clearBrand() {
  clearContainer("brand-container");
  updateBrandOptions();
}ut")); }
function clearDeliveryLocation() { clearContainer("delivery-location-container"); }
