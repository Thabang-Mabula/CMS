class FileUploadReader {
  constructor (fileDOMElement) {
    this._fileDOMElement = fileDOMElement
    this._file = new Object()
    this._reader = new FileReader()
  }

  _isValidFileType (filename) {
    let acceptableFileTypes = ['BMP', 'GIF', 'HEIC', 'ICO', 'JPG', 'PNG', 'TIFF', 'WEBP']
    let indexFileExtentionStart = filename.indexOf('.') + 1
    let fileExtension = filename.substring(indexFileExtentionStart)
    let isAnAcceptableFileType = acceptableFileTypes.indexOf(fileExtension.toUpperCase()) !== -1

    return isAnAcceptableFileType
  }

  _loadComplete () {
  }

  _loadFailed () {
  }

  _invalidFileTypeAlert () {
    alert(`You tried to upload an invalid file type. Please make sure that the
        image you tried it upload is a BMP, GIF, HEIC, ICO, JPG, PNG, TIFF or WEBP image`)
  }

  openFile () {
    // Remove pre-existing files
    this._file = this._fileDOMElement[0].files[0]
    if (this._isValidFileType(this._file.name)) {
      this._reader.readAsDataURL(this._file)

      this._reader.onloadend = this._loadComplete

      this._reader.onerror = this._loadFailed
    } else {
      this._invalidFileTypeAlert()
      this._emptyFileUploadElement()
    }
  }

  _emptyFileUploadElement () {
    this._fileDOMElement.replaceWith(this._fileDOMElement.val('').clone(true))
  }
  getFileAsBase64String () {
    return this._reader.result.replace('data:', '').replace(/^.+,/, '')
  }
}

export { FileUploadReader }
