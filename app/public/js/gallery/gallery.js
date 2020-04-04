import { UploadItemController } from './upload/uploadItemController.js'
import { DeleteItemController } from './delete/deleteItemController.js'

$(document).ready(() => {
  let descrDOMElement = $('#descr-input')
  let priceDOMElement = $('#price-input')
  let fileInputDOMElement = $('#upload-img-input')
  let submitItemBtn = $('#submit-btn')
  let cancelBtn = $('#cancel-btn')
  let deletePostButtons = $('.delete-post-btn')

  let uploadController = new UploadItemController(descrDOMElement, priceDOMElement, fileInputDOMElement, submitItemBtn, cancelBtn)
  uploadController.configure()

  let deleteController = new DeleteItemController(deletePostButtons)
  deleteController.configure()
})
