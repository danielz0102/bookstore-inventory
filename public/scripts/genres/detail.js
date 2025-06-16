import { setupModal } from '../partials/modal.js'

const deleteBtn = document.querySelector('#deleteGenreBtn')
const modal = document.querySelector('#confirmDeleteModal')

setupModal(modal, deleteBtn, () =>
  document.querySelector('#deleteGenreForm').submit(),
)
