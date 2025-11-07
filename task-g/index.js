// index.js
// Author: Rebecka Skog
// Date: 7-11-2025

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("FullInfo");
  const tableBody = document.querySelector("#timetable tbody");

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

  function showError(field, message){
    errors[field].textContent = message;
  }

  function clearError() {
    Object.values(errors).forEach(el => el.textContent = "");
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

    if (
      !fullName.value.trim() ||
      (fullName.length >= 2 && fullName.every((part) => part.lengt >= 2))
    ) {
      showError(NameError, "Name needs to be 2 words");
      ok = false;
    } else {
      showError(NameError, "");
    }

    if (!email.value.trim() || !email.checkValidity()) {
      showError(EmailError, "Enter an Email-address");
      ok = false;
    } else {
      showError(EmailError, "");
    }

    if (!PhoneValid(tel.value.trim())) {
      showError(NumberError, "Give a real Phone Number thats starts with +358 and followed by 9 digits");
      ok = false;
    } else {
      showError(NumberError, "");
    }

    const b = birthDate.value;
    if (!b) {
      showError(BirthdayError, "Pick your birthday");
      ok = false;
    } else if (calcAge(b) < 10) {
      showError(BirthdayError, "You need to be at least 10");
      ok = false;
    } else {
      showError(BirthdayError, "");
    }

    if (!terms.checked) {
      showError(TermsError, "Accept the terms and conditions.");
      ok = false;
    } else {
      showError(TermsError, "");
    }

    return ok;
  };

  const newRow = ({ fullName, email, tel, birthDate, terms }) => {
    const tr = document.createElement("tr");

    const cells = [
      new Date().toISOString(),
      fullName,
      email,
      tel,
      birthDate,
      "Accepted",
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
    if (!ok) {
      if (NameError.textContent) fullName.focus();
      else if (EmailError.textContent) email.focus();
      else if (NumberError.textContent) tel.focus();
      else if (BirthdayError.textContent) birthDate.focus();
      else if (TermsError.textContent) terms.focus();
      return;
    }

    newRow({
      fullName: nameInput.value.trim(),
      email: email.value.trim(),
      tel: tel.value.trim(),
      birthDate: birthDate.value,
      terms: termsInput.checked,
    })

    form.reset();
    nameInput.focus();
  })

  form.addEventListener("reset", () => {
    [NameError, EmailError, NumberError, BirthdayError, TermsError].forEach(
      (el) => showError(el, "")
    );
  });
});
