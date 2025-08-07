document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const cardholderInput = document.querySelector("#cardholder");
  const cardNumberInput = document.querySelector("#cardnumber");
  const monthInput = document.querySelector(".monthInput input");
  const yearInput = document.querySelector(".yearInput input");
  const cvcInput = document.querySelector(".cvc input");
  const cardNumberDisplay = document.querySelector(".cardNumber");
  const cardNameDisplay = document.querySelector(".cardName");
  const cardExpDateDisplay = document.querySelector(".cardExpDate");
  const cardCVCDisplay = document.querySelector(".cardCVC");
  const form = document.querySelector(".form-container");
  const button = form.querySelector("button");

  // Real-time update functions
  cardholderInput.addEventListener("input", () => {
    const value = cardholderInput.value.trim().toUpperCase();
    cardNameDisplay.textContent = value || "JANE APPLESEED";
    validateCardholder(value);
  });

  cardNumberInput.addEventListener("input", () => {
    let value = cardNumberInput.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    cardNumberInput.value = formatted;
    cardNumberDisplay.textContent = formatted || "0000 0000 0000 0000";
    validateCardNumber(value);
  });

  monthInput.addEventListener("input", () => {
    let value = monthInput.value.replace(/\D/g, "");
    if (value.length > 2) value = value.slice(0, 2);
    monthInput.value = value;
    updateExpDate();
    validateExpDate();
  });

  yearInput.addEventListener("input", () => {
    let value = yearInput.value.replace(/\D/g, "");
    if (value.length > 2) value = value.slice(0, 2);
    yearInput.value = value;
    updateExpDate();
    validateExpDate();
  });

  cvcInput.addEventListener("input", () => {
    let value = cvcInput.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    cvcInput.value = value;
    cardCVCDisplay.textContent = value || "000";
    validateCVC(value);
  });

  // Update expiration date display
  function updateExpDate() {
    const month = monthInput.value.padStart(2, "0");
    const year = yearInput.value.padStart(2, "0");
    cardExpDateDisplay.textContent = `${month}/${year}` || "00/00";
  }

  // Validation functions
  function validateCardholder(value) {
    const errorMsg = cardholderInput.nextElementSibling;
    const nameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!value) {
      showError(cardholderInput, errorMsg, "Can't be blank");
      return false;
    } else if (!nameRegex.test(value)) {
      showError(
        cardholderInput,
        errorMsg,
        "Must contain first and last name, no numbers"
      );
      return false;
    } else {
      hideError(cardholderInput, errorMsg);
      return true;
    }
  }

  function validateCardNumber(value) {
    const errorMsg = cardNumberInput.nextElementSibling;
    if (!value) {
      showError(cardNumberInput, errorMsg, "Can't be blank");
      return false;
    } else if (!/^\d{16}$/.test(value)) {
      showError(cardNumberInput, errorMsg, "Must be 16 digits");
      return false;
    } else {
      hideError(cardNumberInput, errorMsg);
      return true;
    }
  }

  function validateExpDate() {
    const monthErrorMsg = monthInput.nextElementSibling;
    const yearErrorMsg = yearInput.nextElementSibling;
    const month = monthInput.value;
    const year = yearInput.value;

    let isValid = true;

    if (!month) {
      showError(monthInput, monthErrorMsg, "Can't be blank");
      isValid = false;
    } else if (
      !/^\d{1,2}$/.test(month) ||
      parseInt(month) < 1 ||
      parseInt(month) > 12
    ) {
      showError(monthInput, monthErrorMsg, "Invalid month");
      isValid = false;
    } else {
      hideError(monthInput, monthErrorMsg);
    }

    if (!year) {
      showError(yearInput, yearErrorMsg, "Can't be blank");
      isValid = false;
    } else if (!/^\d{2}$/.test(year)) {
      showError(yearInput, yearErrorMsg, "Invalid year");
      isValid = false;
    } else {
      hideError(yearInput, yearErrorMsg);
    }

    return isValid;
  }

  function validateCVC(value) {
    const errorMsg = cvcInput.nextElementSibling;
    if (!value) {
      showError(cvcInput, errorMsg, "Can't be blank");
      return false;
    } else if (!/^\d{3,4}$/.test(value)) {
      showError(cvcInput, errorMsg, "Must be 3 or 4 digits");
      return false;
    } else {
      hideError(cvcInput, errorMsg);
      return true;
    }
  }

  // Error handling functions
  function showError(input, errorMsg, message) {
    input.classList.add("error");
    input.style.borderColor = "#ff0000";
    if (errorMsg) {
      errorMsg.style.display = "block";
      errorMsg.textContent = message;
    }
  }

  function hideError(input, errorMsg) {
    input.classList.remove("error");
    input.style.borderColor = "#ccc";
    if (errorMsg) errorMsg.style.display = "none";
  }

  // Form submission
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const isCardholderValid = validateCardholder(cardholderInput.value.trim());
    const isCardNumberValid = validateCardNumber(
      cardNumberInput.value.replace(/\D/g, "")
    );
    const isExpDateValid = validateExpDate();
    const isCVCValid = validateCVC(cvcInput.value);

    if (
      isCardholderValid &&
      isCardNumberValid &&
      isExpDateValid &&
      isCVCValid
    ) {
      // alert('Form submitted successfully!');
      form.innerHTML = `
            <div class="form-submitted-content">
                <img src="images/icon-complete.svg" alt="complete-tick">
                <h3>THANK YOU!</h3>
                <p>We've added your card details</p>
                <button>Continue</button>
            </div>
            `;
      // Optionally reset form
      form.reset();
      cardNameDisplay.textContent = "JANE APPLESEED";
      cardNumberDisplay.textContent = "0000 0000 0000 0000";
      cardExpDateDisplay.textContent = "00/00";
      cardCVCDisplay.textContent = "000";
    }
  });
});
