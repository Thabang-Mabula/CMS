class DeleteItemController {
  constructor (deletePostButtons) {
    this._deletePostBtn = deletePostButtons
  }

  configure () {
    this._configureDeletePostBtn()
  }

  _configureDeletePostBtn () {
    this._deletePostBtn.on('click', async (e) => {
      let isDeletionIntetional = confirm('Are you sure that you want to delete this item')
      if (isDeletionIntetional) {
        let listElem = $(e.target).parent()
        let img = listElem.find('img')
        this._deleteItem(img.attr('src'))
      }
    })
  }

  async _deleteItem (imgLink) {
    await this._sendDeleteRequestToServer(imgLink).then((deleteImageLink) => {
      alert('Item successfully deleted. We will now attempt to open a link that will allow you to permanently delete the photo')
      window.open(deleteImageLink)
      alert(`If a new window didn't open, please enable popups for this website on your browser. To delete the image, please copy and go to the link below: \n ${deleteImageLink}`)
      location.reload()
    }).catch(() => {
      alert('Sorry, this item could not be deleted at this time. Try again later.')
    })
  }

  _sendDeleteRequestToServer (imgLink) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        url: '/api/deleteItem',
        data: JSON.stringify({ imgUrl: imgLink }),
        contentType: 'application/json',
        success: function (deleteImageLink) {
          resolve(deleteImageLink)
        },
        error: function () {
          reject(new Error('Unable to upload item'))
        }
      })
    })
  }
}

export { DeleteItemController }
