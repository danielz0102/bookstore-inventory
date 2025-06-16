const bookForm = document.querySelector('#bookForm')
const coverPreview = bookForm.querySelector('.cover-preview')
const coverInput = bookForm.querySelector('#cover')
const imgFileReader = new FileReader()

imgFileReader.addEventListener('load', (e) => {
  coverPreview.src = e.target.result
})

coverInput.addEventListener('change', (event) => {
  const file = event.target.files[0]

  if (file) {
    imgFileReader.readAsDataURL(file)
  }
})

const isbnInput = bookForm.querySelector('#isbn')

isbnInput.addEventListener('input', () => {
  isbnInput.setCustomValidity('')
})

bookForm.addEventListener('submit', (event) => {
  event.preventDefault()

  if (validateForm()) {
    bookForm.submit()
  }
})

function validateForm() {
  const isbnValue = isbnInput.value.trim()

  //ISBN is optional
  if (!isbnIsValid(isbnValue) && isbnValue !== '') {
    isbnInput.setCustomValidity('Please enter a valid ISBN-10 or ISBN-13.')
    isbnInput.reportValidity()
    return false
  }

  return true
}

function isbnIsValid(str) {
  // Regular expression to validate ISBN-10 or ISBN-13
  const isbnRegex =
    /^(?:ISBN(?:-1[03])?:?\s*)?(?=[-0-9 ]{10,17}$)(?:97[89][- ]?)?(?=[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$)(?:[0-9]+[- ]?){3}[0-9X]$/

  return isbnRegex.test(str)
}
