const axios = require('axios')
const FormData = require('form-data')
// const { API_KEY_IMG_UPLOAD } = require('./../../config.js')

function uploadImage (img) {
  var fomrBody = new FormData()
  fomrBody.append('image', img)
  return axios({
    method: 'post',
    url: `https://api.imgbb.com/1/upload?key=${process.env.API_KEY_IMG_UPLOAD}`,
    headers: fomrBody.getHeaders(),
    data: fomrBody
  })
}

// uploadImage('https://miro.medium.com/max/4000/1*KUy_KKExZrSpBuv9XfyBgA.png').then((resolve) => {
//   console.log(resolve.data)
// }).catch((error) => {
//   console.log(error.response.data)
// })

module.exports = { uploadImage }
