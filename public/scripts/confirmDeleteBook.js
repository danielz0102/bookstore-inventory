const deleteBookForm = document.getElementById('deleteBookForm')
const modal = document.getElementById('confirmDeleteModal')
const closeModalBtn = document.getElementById('cancelBtn')
const confirmModalBtn = document.getElementById('confirmBtn')

deleteBookForm.addEventListener('submit', (event) => {
  event.preventDefault()
  modal.showModal()
})

closeModalBtn.addEventListener('click', () => {
  modal.close()
})

confirmModalBtn.addEventListener('click', () => {
  deleteBookForm.submit()
})
