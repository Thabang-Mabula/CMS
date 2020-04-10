const { uploadImage } = require('./imageHostingServiceUpload.js')
const { storeItemInDatabase, getDeleteImageLink, deleteItemEntry } = require('./queries.js')

function uploadItem (descr, price, img) {
  let imgID = ''
  let imgURL = ''
  let imgDeleteURL = ''
  return new Promise(async (resolve, reject) => {
    let error = null
    await uploadImage(img).then((resolve) => {
      imgID = resolve.data.data.id
      imgURL = resolve.data.data.url
      imgDeleteURL = resolve.data.data.delete_url
    }).catch((reject) => {
      // error = new Error('Could not upload image to image hosting service')
      error = new Error(reject.response.data)
      console.log(reject.response.data)
    })

    if (error == null) {
      await storeItemInDatabase(descr, price, imgID, imgURL, imgDeleteURL).catch(() => {
        error = new Error(`Could not save item to database: ${error.message}`)
      })
    }
    (error == null) ? resolve('Success') : reject(error)
  })
}

function deleteItem (imgUrl) {
  return new Promise(async (resolve, reject) => {
    let error = null
    let link = ''
    await getDeleteImageLink(imgUrl).then((imgDeletLink) => {
      link = imgDeletLink
    }).catch((err) => {
      error = new Error(`Could not retrieve delete img link: ${err.message}`)
      console.log(error.message)
    })

    if (error == null) {
      await deleteItemEntry(imgUrl).catch((err) => {
        error = new Error(`Could not remove entry from database: ${err.message}`)
      })
    }

    error == null ? resolve(link) : reject(error)
  })
}

module.exports = { uploadItem, deleteItem }
