const form = document.querySelector('form')
document.getElementById('publishedDate').max = new Date()
  .toISOString()
  .split('T')[0]

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const isbnInput = document.getElementById('isbn')
  const isbnValue = isbnInput.value.trim()

  if (isbnValue === '') {
    isbnInput.setCustomValidity('')
    return form.submit()
  }

  if (!isbnIsValid(isbnValue)) {
    isbnInput.setCustomValidity('Please enter a valid ISBN-10 or ISBN-13.')
    return isbnInput.reportValidity()
  }

  isbnInput.setCustomValidity('')
  form.submit()
})

function isbnIsValid(str) {
  // Regular expression to validate ISBN-10 or ISBN-13
  const isbnRegex =
    /^(?:ISBN(?:-1[03])?:?\s*)?(?=[-0-9 ]{10,17}$)(?:97[89][- ]?)?(?=[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$)(?:[0-9]+[- ]?){3}[0-9X]$/

  return isbnRegex.test(str)
}
