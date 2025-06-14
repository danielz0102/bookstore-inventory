import { setupModal } from '../partials/modal.js'

const confirmDeleteModal = document.querySelector('#confirmDeleteModal')
const deleteBookBtn = document.querySelector('#deleteBookBtn')

setupModal(confirmDeleteModal, deleteBookBtn, () => {
  document.querySelector('#deleteBookForm').submit()
})

const updateBookModal = document.querySelector('#updateBookModal')
const updateBookBtn = document.querySelector('#updateBookBtn')

setupModal(updateBookModal, updateBookBtn, () => {})
