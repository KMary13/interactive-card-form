# Frontend Mentor - Interactive card details form solution

This is a solution to the [Interactive card details form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw). This project helped me improve my skills in form handling, data validation, and responsive layout.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Fill in the form and see the card details update in real-time.
- Receive error messages when the form is submitted if:
  - Any input field is empty.
  - The card number, expiry date, or CVC fields are in the wrong format (e.g., month outside 01-12).
- View the optimal layout depending on their device's screen size.
- See hover, active, and focus states for interactive elements.
- Benefit from automatic focus transition between date and CVC fields.

### Screenshot

![Project Screenshot](./screenshot.jpg)
_(Note: Replace this with your actual project screenshot)_

### Links

- **Solution URL:** [(https://github.com/KMary13/interactive-card-form)]
- **Live Site URL:** [(https://test-interactive-cards.netlify.app/)]

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties (Variables)
- Flexbox
- Mobile-first workflow
- Vanilla JavaScript

### What I learned

During this project, I implemented several key techniques to improve both code efficiency and user experience:

1. **The 62.5% REM Trick:**
   I set the base font size to `html { font-size: 62.5% }`. This allowed me to use a much simpler calculation for `rem` units (**10px = 1rem**), making the styling process faster and more intuitive.

2. **Advanced Validation Logic:**
   I added custom logic to ensure the month input is strictly within the 01-12 range and the year is not in the past.

```javascript
const monthVal = parseInt(inputs.month.value, 10);
if (isNaN(monthVal) || monthVal < 1 || monthVal > 12) {
  showError(inputs.month, 'Invalid month (01-12)');
  isValid = false;
}
```

3.  **Automatic Focus (UX Improvement):**
    To create a seamless typing experience, I implemented an event listener that automatically moves the cursor to the next field once a user finishes entering two digits.

```javascript
inputs.month.addEventListener('input', (e) => {
  if (e.target.value.length === 2) {
    inputs.year.focus();
  }
});
```

### Continued development

In future projects, I want to focus more on:

- Regular Expressions (RegEx): For even more robust credit card number formatting.

- CSS Animations: To make the transitions between the form and the "Thank You" state smoother.

## Author

- Frontend Mentor - @mariana_50757

- GitHub - @KMary13
