$(document).ready(() => {
  $('.delete-post-btn').on('click', (e) => {
    let isDeletionIntetional = confirm('Are you sure that you want to delete this item')
    if (isDeletionIntetional) {
      let listElem = $(e.target).parent()
      let img = listElem.find('img')
      deleteItem(img.attr('src'))
    }
  })
})

function deleteItem (imgLink) {
  sendDeleteRequestToServer(imgLink).then(() => {
    alert('Item deleted. Refresh your browser to see result')
  }).catch(() => {
    alert('Sorry, this item could not be deleted at this time. Try again later.')
  })
}

function sendDeleteRequestToServer (imgLink) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      url: '/api/deleteItem',
      data: JSON.stringify({ imgUrl: imgLink }),
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
