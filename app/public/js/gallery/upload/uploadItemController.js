import { ImageUploadReader } from './imageUploadReader.js'
import { ItemUploader } from './ItemUploader.js'
import { InvalidInputNotifyer } from './InvalidInputNotifyer.js'

class UploadItemController {
  constructor (descrDOMElement, priceDOMElement, fileInputDOMElement, submitItemBtn, cancelBtn) {
    this._descrDOMElement = descrDOMElement
    this._priceDOMElement = priceDOMElement
    this._fileInputDOMElement = fileInputDOMElement
    this._submitItemBtn = submitItemBtn
    this._imageUploadReader = new ImageUploadReader(this._fileInputDOMElement)
    this._cancelBtn = cancelBtn
  }

  configure () {
    this._configureFileInputBtn()
    this._configureClearBtn()
    this._configureSubmitBtn()
  }

  _configureFileInputBtn () {
    this._fileInputDOMElement.change((e) => {
      this._imageUploadReader.openFile()
    })
  }
  _configureClearBtn () {
    this._cancelBtn.click(() => {
      this._clearInputs()
    })
  }

  _configureSubmitBtn () {
    this._submitItemBtn.click(() => {
      if (this._isSubmissionValid()) {
        let text = this._descrDOMElement.val()
        let price = this._priceDOMElement.val()
        let img = this._imageUploadReader.getFileAsBase64String()

        let itemUploader = new ItemUploader(text, price, img)
        itemUploader.upload().then(() => {
          alert('Upload Successful')
          this._clearInputs()
          location.reload()
        }).catch(() => {
          alert('Upload Unsuccessful')
          this._clearInputs()
          location.reload()
        })
      }
    })
  }

  _clearInputs () {
    let inputs = [this._descrDOMElement, this._priceDOMElement, this._fileInputDOMElement]
    inputs.forEach((input) => {
      input.val('')
    })
  }

  _isSubmissionValid () {
    let isValidSubmission = true
    let notifyer = new InvalidInputNotifyer()

    if (!this._descrDOMElement.parsley().isValid()) {
      notifyer.noteInvalidInput(this._descrDOMElement, 'Please insert text decription 60 characters or less')
      isValidSubmission = false
    }

    if (!this._priceDOMElement.parsley().isValid()) {
      notifyer.noteInvalidInput(this._priceDOMElement, 'Please insert a valid numerical value for the price')
      isValidSubmission = false
    }

    if (!this._fileInputDOMElement.parsley().isValid()) {
      notifyer.noteInvalidInput(this._fileInputDOMElement, 'Please upload a valid image file')
      isValidSubmission = false
    }

    if (!this._isValidSubmission) {
      this._displayErrorMessages(notifyer.getErrorMessageArray())
    }
    return isValidSubmission
  }

  _displayErrorMessages (errorMessageArray) {
    let errorMessageString = ''
    errorMessageArray.forEach((message) => {
      errorMessageString = errorMessageString.concat(message.concat('\n'))
    })
    alert(errorMessageString)
  }
}

export { UploadItemController }
