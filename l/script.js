// Author: Rebecka Skog & Viljami Myllyvirta
// Date: 

document.getElementById("FullInfo").addEventListener("submit", function (e) {
  let valid = true;

  // Clear previous errors
  document.querySelectorAll("p.text-red-500").forEach(p => p.textContent = "");

  // Instrument validation
  const instrument = document.getElementById("instruments").value.trim();
  if (instrument === "") {
    document.getElementById("InstrumentError").textContent = "Please select an instrument.";
    valid = false;
  }

  // Start date validation
  const startDate = document.getElementById("rentalStart").value;
  if (!startDate) {
    document.getElementById("RentalstartError").textContent = "Please enter a rental start date.";
    valid = false;
  }

  // Weeks validation
  const weeks = document.getElementById("weeks").value;
  if (weeks === "" || weeks <= 0) {
    document.getElementById("WeeksError").textContent = "Please enter a valid number of weeks.";
    valid = false;
  }

  // Name validation
  const name = document.getElementById("FullName").value.trim();
  if (name.length < 2) {
    document.getElementById("NameError").textContent = "Please enter your full name.";
    valid = false;
  }

  // Email validation
  const email = document.getElementById("Email").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById("EmailError").textContent = "Please enter a valid email address.";
    valid = false;
  }

  // Address validation
  const address = document.getElementById("Address").value.trim();
  if (address.length < 3) {
    document.getElementById("AddressError").textContent = "Please enter your address.";
    valid = false;
  }

  // Phone number validation
  const Phone_number = document.getElementById("Tel").value.trim();
  if (Phone_number.length < 5 || Phone_number.length > 15) {
    document.getElementById("NumberError").textContent = "Please enter a valid phone number.";
    valid = false;
  }

  // Terms validation
  const termsAccepted = document.getElementById("Terms").checked;
  if (!termsAccepted) {
    document.getElementById("TermsError").textContent = "You must accept the terms and conditions.";
    valid = false;
  }

  if (!valid) e.preventDefault();
});


// Realtime validation
function addRealtime(id, errorId, validator) {
  var el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("input", function () {
    var msg = validator(el.value);
    document.getElementById(errorId).textContent = msg;
  });
}

addRealtime("instruments", "InstrumentError", function (v) {
  return v.trim() === "" ? "Please select an instrument." : "";
});

addRealtime("rentalStart", "RentalstartError", function (v) {
  return v === "" ? "Please enter a rental start date." : "";
});

addRealtime("weeks", "WeeksError", function (v) {
  return (v === "" || v <= 0) ? "Please enter a valid number of weeks." : "";
});

addRealtime("FullName", "NameError", function (v) {
  return v.trim().length < 2 ? "Please enter your full name." : "";
});

addRealtime("Email", "EmailError", function (v) {
  var ok = v.includes("@") && v.includes(".");
  return ok ? "" : "Please enter a valid email address.";
});

addRealtime("Address", "AddressError", function (v) {
  return v.trim().length < 3 ? "Please enter your address." : "";
});

addRealtime("Tel", "NumberError", function (v) {
  const len = v.trim().length;
  return (len < 5 || len > 15) ? "Please enter a valid phone number." : "";
});

var terms = document.getElementById("Terms");
if (terms) {
  terms.addEventListener("change", function () {
    document.getElementById("TermsError").textContent = terms.checked
      ? ""
      : "You must accept the terms and conditions.";
  });
}
