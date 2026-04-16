const form = document.getElementById('payment-form');
const thankYou = document.querySelector('.thank_you_section');
const btnConfirm = document.querySelector('.btn');
const btnContinue = document.querySelector('.btn-continue');

const inputs = {
  name: document.getElementById('name'),
  number: document.getElementById('number'),
  month: document.getElementById('month'),
  year: document.getElementById('year'),
  cvc: document.getElementById('cvc'),
};

const displays = {
  name: document.querySelector('.card_name_display'),
  number: document.querySelector('.card_number_display'),
  date: document.querySelector('.card_date_display'),
  cvc: document.querySelector('.card_cvc_display'),
};
inputs.name.addEventListener('input', () => {
  displays.name.textContent = inputs.name.value || 'Jane Appleseed';
});

inputs.number.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  let formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();

  e.target.value = formattedValue;
  displays.number.textContent = formattedValue || '0000 0000 0000 0000';
});

const updateDate = () => {
  const mm = inputs.month.value.padStart(2, '0');
  const yy = inputs.year.value.padStart(2, '0');
  displays.date.textContent = `${mm}/${yy}`;
};

inputs.month.addEventListener('input', updateDate);
inputs.year.addEventListener('input', updateDate);

inputs.cvc.addEventListener('input', () => {
  displays.cvc.textContent = inputs.cvc.value || '000';
});

function showError(inputEl, message) {
  const parent =
    inputEl.closest('.input_group') ||
    inputEl.closest('.date_group') ||
    inputEl.closest('.cvc_group');
  const errorSpan = parent.querySelector('.error_msg');
  inputEl.style.borderColor = 'var(--input-errors)';
  errorSpan.textContent = message;
}

function clearErrors() {
  document
    .querySelectorAll('.error_msg')
    .forEach((el) => (el.textContent = ''));
  document
    .querySelectorAll('input')
    .forEach((el) => (el.style.borderColor = 'var(--gray-200)'));
}

inputs.month.addEventListener('input', (e) => {
  if (e.target.value.length === 2) {
    inputs.year.focus();
  }
});

inputs.year.addEventListener('input', (e) => {
  if (e.target.value.length === 2) {
    inputs.cvc.focus();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();
  let isValid = true;

  if (!inputs.name.value) {
    showError(inputs.name, "Can't be blank");
    isValid = false;
  }

  if (!inputs.number.value) {
    showError(inputs.number, "Can't be blank");
    isValid = false;
  } else if (inputs.number.value.replace(/\s/g, '').length < 16) {
    showError(inputs.number, 'Wrong format, too short');
    isValid = false;
  }

  const currentYear = new Date().getFullYear() % 100;
  const monthVal = parseInt(inputs.month.value, 10);
  const yearVal = parseInt(inputs.year.value, 10);

  if (!inputs.month.value.trim() || !inputs.year.value.trim()) {
    showError(inputs.month, "Can't be blank");
    if (!inputs.month.value.trim())
      inputs.month.style.borderColor = 'var(--input-errors)';
    if (!inputs.year.value.trim())
      inputs.year.style.borderColor = 'var(--input-errors)';
    isValid = false;
  } else if (isNaN(monthVal) || monthVal < 1 || monthVal > 12) {
    showError(inputs.month, 'Invalid month (01-12)');
    inputs.month.style.borderColor = 'var(--input-errors)';
    isValid = false;
  } else if (isNaN(yearVal) || yearVal < currentYear) {
    showError(inputs.month, 'Invalid year');
    inputs.year.style.borderColor = 'var(--input-errors)';
    isValid = false;
  }

  if (!inputs.cvc.value.trim()) {
    showError(inputs.cvc, "Can't be blank");
    isValid = false;
  } else if (isNaN(inputs.cvc.value)) {
    showError(inputs.cvc, 'Numbers only');
    isValid = false;
  } else if (inputs.cvc.value.length < 3) {
    showError(inputs.cvc, 'Too short');
    isValid = false;
  }

  if (isValid) {
    form.classList.add('hidden');
    thankYou.classList.remove('hidden');
  }
});

btnContinue.addEventListener('click', () => {
  form.reset();

  form.classList.remove('hidden');
  thankYou.classList.add('hidden');

  displays.name.textContent = 'Jane Appleseed';
  displays.number.textContent = '0000 0000 0000 0000';
  displays.date.textContent = '00/00';
  displays.cvc.textContent = '000';

  clearErrors();
});
