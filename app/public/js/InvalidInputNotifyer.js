class InvalidInputNotifyer {
  constructor () {
    this._error_msg_array = []
  }

  noteInvalidInput (inputDOMElement, message) {
    inputDOMElement.val('')
    inputDOMElement.css('border', '0.2em solid red')
    this._error_msg_array.push(message)
  }

  getErrorMessageArray () {
    return this._error_msg_array
  }
}

export { InvalidInputNotifyer }
