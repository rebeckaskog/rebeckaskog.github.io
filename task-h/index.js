// index.js
// Author: Rebecka Skog
// Date: 13-11-2025

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("FullInfo");
  const tableBody = document.getElementById("timetable");

  const fullName = document.getElementById("FullName");
  const email = document.getElementById("Email");
  const tel = document.getElementById("Tel");
  const birthDate = document.getElementById("BirthDate");
  const terms = document.getElementById("Terms");

  const NameError = document.getElementById("NameError");
  const EmailError = document.getElementById("EmailError");
  const NumberError = document.getElementById("NumberError");
  const BirthdayError = document.getElementById("BirthdayError");
  const TermsError = document.getElementById("TermsError");

  const errors = {
    NameError,
    EmailError,
    NumberError,
    BirthdayError,
    TermsError
  };

  function showError(field, message){
    field.textContent = message;
  }

  function PhoneValid(phone) {
    return /^\+358\s?\d{9}$/.test(phone);
  }

  function calcAge(birthDateStr) {
    const birth = new Date(birthDateStr);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  const validate = () => {
    let ok = true;

    const nameParts = fullName.value.trim().split(" ");
    if (nameParts.some(part => part.length < 2)) {
      showError(NameError, "Name needs to be 2 words");
      ok = false;
    } else {
      showError(NameError, "");
    }

    if (!email.value.trim() || !email.checkValidity()) {
      showError(EmailError, "Enter a valid Email address");
      ok = false;
    } else {
      showError(EmailError, "");
    }

    if (!PhoneValid(tel.value.trim())) {
      showError(NumberError, "Give a real Phone Number that starts with +358 and followed by 9 digits");
      ok = false;
    } else {
      showError(NumberError, "");
    }

    const b = birthDate.value;
    if (!b) {
      showError(BirthdayError, "Pick your birthday");
      ok = false;
    } else if (calcAge(b) < 13) {
      showError(BirthdayError, "You need to be at least 13");
      ok = false;
    } else {
      showError(BirthdayError, "");
    }

    if (!terms.checked) {
      showError(TermsError, "Accept the terms and conditions");
      ok = false;
    } else {
      showError(TermsError, "");
    }

    return ok;
  };

  const newRow = ({ fullName, email, tel, birthDate, terms }) => {
    const tr = document.createElement("tr");

    const cells = [
      new Date().toLocaleString(),
      fullName,
      email,
      tel,
      birthDate,
      terms
    ];

    cells.forEach((text) => {
      const td = document.createElement("td");
      td.textContent = text;
      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const ok = validate();
    if (!ok) return;

    newRow({
      fullName: fullName.value.trim(),
      email: email.value.trim(),
      tel: tel.value.trim(),
      birthDate: birthDate.value,
      terms: terms.checked ? "Accepted" : "Declined"
    });

    form.reset();
    fullName.focus();
  });

  form.addEventListener("reset", () => {
    Object.values(errors).forEach(el => el.textContent = "");
  });
});
