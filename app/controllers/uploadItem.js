const { storeItemInDatabase } = require('../models/uploadItemsModel.js')

function uploadItem (description, price, image) {
  return storeItemInDatabase(description, price, image)
}

module.exports = { uploadItem }
