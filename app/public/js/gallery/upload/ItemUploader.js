class ItemUploader {
  constructor (description, price, img) {
    this._descr = description
    this._price = price
    this._img = img
  }

  upload () {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url: '/api/uploadItem',
        data: JSON.stringify({
          descr: this._descr,
          price: this._price,
          img: this._img
        }),
        contentType: 'application/json',
        success: function () {
          resolve('Success')
        },
        error: function () {
          reject(new Error('Unable to upload item'))
        }
      })
    })
  }
}

export { ItemUploader }
