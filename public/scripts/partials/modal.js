export function setupModal(modal, openBtn, onConfirm) {
  const cancelBtn = modal.querySelector('[data-action="cancel"]')
  const confirmBtn = modal.querySelector('[data-action="confirm"]')

  openBtn.addEventListener('click', (event) => {
    event.preventDefault()
    modal.showModal()
  })

  cancelBtn.addEventListener('click', (event) => {
    event.preventDefault()
    modal.close()
  })

  confirmBtn.addEventListener('click', onConfirm)
}
