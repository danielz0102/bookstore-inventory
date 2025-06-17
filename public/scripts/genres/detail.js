import { setupModal } from '../partials/modal.js'

const deleteBtn = document.querySelector('#deleteGenreBtn')
const deleteModal = document.querySelector('#confirmDeleteModal')

setupModal(deleteModal, deleteBtn)

const updateBtn = document.querySelector('#updateGenreBtn')
const updateModal = document.querySelector('#updateGenreModal')

setupModal(updateModal, updateBtn)
