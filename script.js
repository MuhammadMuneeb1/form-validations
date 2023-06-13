// Get form elements
const form = document.getElementById("myForm");
const fullNameInput = document.getElementById("fullName");
const userNameInput = document.getElementById("userName");
const phoneNumberInput = document.getElementById("phoneNumber");
const emailAddressInput = document.getElementById("emailAddress");
const degreeTypeSelect = document.getElementById("degreeType");
const degreeDurationSelect = document.getElementById("degreeDuration");
const degreeNameSelect = document.getElementById("degreeName");
const passwordInput = document.getElementById("password");
const showPasswordCheckbox = document.getElementById("showPassword");
const submitBtn = document.getElementById("submitBtn");

// Add event listeners
fullNameInput.addEventListener("blur", validateFullName);
userNameInput.addEventListener("blur", validateUserName);
phoneNumberInput.addEventListener("blur", validatePhoneNumber);
emailAddressInput.addEventListener("blur", validateEmailAddress);
degreeTypeSelect.addEventListener("change", updateDegreeDurationOptions);
degreeDurationSelect.addEventListener("change", updateDegreeNameOptions);
passwordInput.addEventListener("blur", validatePassword);
showPasswordCheckbox.addEventListener("change", togglePasswordVisibility);
form.addEventListener("submit", submitForm);

// Validation functions
function validateFullName() {
  // No specific validation for full name
  return true;
}

// Toggle password visibility
function togglePasswordVisibility() {
  if (showPasswordCheckbox.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}

function validateUserName() {
  const userName = userNameInput.value.trim();
  if (userName.includes(" ")) {
    showWarningPopup(userNameInput, "User Name cannot contain spaces.");
    return false;
  }
  return true;
}

function validatePhoneNumber() {
  const phoneNumber = phoneNumberInput.value.trim();
  if (!/^\d+(-\d+)*$/.test(phoneNumber)) {
    showWarningPopup(
      phoneNumberInput,
      "Invalid Phone Number. Only digits and dashes are allowed."
    );
    return false;
  }
  return true;
}

function validateEmailAddress() {
  const emailAddress = emailAddressInput.value.trim();
  if (!/\S+@\S+\.\S+/.test(emailAddress)) {
    showWarningPopup(emailAddressInput, "Invalid Email Address.");
    return false;
  }
  return true;
}

function validatePassword() {
  const password = passwordInput.value.trim();
  if (!/(?=.*[A-Z])(?=.*\d)(?=.*\W)/.test(password)) {
    showWarningPopup(
      passwordInput,
      "Password must contain at least one uppercase letter, one number, and one symbol."
    );
    return false;
  }
  return true;
}

// Update degree duration options based on selected degree type
function updateDegreeDurationOptions() {
  const degreeType = degreeTypeSelect.value;
  degreeDurationSelect.innerHTML =
    '<option value="">Select Degree Duration</option>';
  if (degreeType === "associate") {
    degreeDurationSelect.innerHTML += '<option value="2">2 Years</option>';
  } else if (degreeType === "bachelor") {
    degreeDurationSelect.innerHTML += '<option value="4">4 Years</option>';
  }
}

// Update degree name options based on selected degree duration
function updateDegreeNameOptions() {
  const degreeDuration = degreeDurationSelect.value;
  degreeNameSelect.innerHTML = '<option value="">Select Degree Name</option>';
  if (degreeDuration === "2") {
    // Associate Degree options
    const associateDegrees = [
      "ADP Artificial Intelligence",
      "ADP Business Administration and Commerce",
      "ADP Computer Science",
      "ADP Computer Networking",
      "ADP Cyber Security",
      "ADP Food Science and Technology",
      "ADP Information Technology Management",
    ];
    associateDegrees.forEach((degree) => {
      degreeNameSelect.innerHTML += `<option value="${degree}">${degree}</option>`;
    });
  } else if (degreeDuration === "4") {
    // Bachelor's Degree options
    const bachelorDegrees = [
      "Bachelor of Civil Engineering (B.C.E.)",
      "Bachelor of Science in Civil Engineering (B.S.C.E.)",
      "Bachelor of Science in Civil and Infrastructure Engineering (B.S.-C.I.E.)",
      "Bachelor of Computer Engineering (B.Comp.E.)",
      "Bachelor of Science in Computer Engineering (B.S.C.E./B.S.Cmp.E.)",
      "Bachelor of Science in Computer Science and Engineering (B.S.C.S.E.)",
      "Bachelor of Science in Electrical and Computer Engineering (B.S.E.C.E.)",
      "Bachelor of Electrical Engineering (B.E.E.)",
    ];
    bachelorDegrees.forEach((degree) => {
      degreeNameSelect.innerHTML += `<option value="${degree}">${degree}</option>`;
    });
  }
}

// Submit form
function submitForm(e) {
  e.preventDefault();

  const formData = {
    fullName: fullNameInput.value.trim(),
    userName: userNameInput.value.trim(),
    phoneNumber: phoneNumberInput.value.trim(),
    emailAddress: emailAddressInput.value.trim(),
    degreeType: degreeTypeSelect.value,
    degreeDuration: degreeDurationSelect.value,
    degreeName: degreeNameSelect.value,
    password: passwordInput.value,
  };

  console.log(JSON.stringify(formData));
  form.reset();
}

// Helper function to show warning popup
function showWarningPopup(inputElement, message) {
  const warningPopup = document.createElement("div");
  warningPopup.classList.add("warning-popup");
  warningPopup.textContent = message;

  // Position the warning popup below the input element
  const inputRect = inputElement.getBoundingClientRect();
  warningPopup.style.top = `${inputRect.bottom + 5}px`;
  warningPopup.style.left = `${inputRect.left}px`;

  // Add the warning popup to the form
  form.appendChild(warningPopup);

  // Remove the warning popup after 3 seconds
  setTimeout(() => {
    warningPopup.remove();
  }, 3000);
}
