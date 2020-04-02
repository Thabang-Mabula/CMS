import { FileUploadReader } from './FileUploadReader.js'
import { ItemUploader } from './ItemUploader.js'
import { InvalidInputNotifyer } from './InvalidInputNotifyer.js'

const descrDOMElement = $('#descr-input')
const priceDOMElement = $('#price-input')
const fileInputDOMElement = $('#upload-img-input')

$(document).ready(() => {
  let fileUploadReader = new FileUploadReader(fileInputDOMElement)
  fileInputDOMElement.change((e) => {
    fileUploadReader.openFile()
  })

  $('#upload-image-btn').click(() => {

  })
  $('#submit-btn').click(() => {
    if (isSubmissionValid()) {
      let text = descrDOMElement.val()
      let price = priceDOMElement.val()
      let img = fileUploadReader.getFileAsBase64String()

      let itemUploader = new ItemUploader(text, price, img)
      itemUploader.upload().then(() => {
        alert('Upload Successful')
        clearInputs()
      }).catch(() => {
        alert('Upload Unsuccessful')
        clearInputs()
      })
    }
  })

  $('#cancel-btn').click(() => {
    clearInputs()
  })
})

function clearInputs () {
  let inputs = [descrDOMElement, priceDOMElement, fileInputDOMElement]
  inputs.forEach((input) => {
    input.val('')
  })
}
function isSubmissionValid () {
  let isValidSubmission = true
  let notifyer = new InvalidInputNotifyer()

  if (!descrDOMElement.parsley().isValid()) {
    notifyer.noteInvalidInput(descrDOMElement, 'Please insert text decription 60 characters or less')
    isValidSubmission = false
  }

  if (!priceDOMElement.parsley().isValid()) {
    notifyer.noteInvalidInput(priceDOMElement, 'Please insert a valid numerical value for the price')
    isValidSubmission = false
  }

  if (!fileInputDOMElement.parsley().isValid()) {
    notifyer.noteInvalidInput(fileInputDOMElement, 'Please upload a valid image file')
    isValidSubmission = false
  }

  if (!isValidSubmission) {
    displayErrorMessages(notifyer.getErrorMessageArray())
  }
  return isValidSubmission
}

function displayErrorMessages (errorMessageArray) {
  let errorMessageString = ''
  errorMessageArray.forEach((message) => {
    errorMessageString = errorMessageString.concat(message.concat('\n'))
  })

  alert(errorMessageString)
}
