const { pool } = require('./dbConnection.js')

function storeItemInDatabase (descr, price, imgId, imgUrl, imgDeleteUrl) {
  let query = {
    text: `INSERT INTO products (descr, price, img_id, img_url, img_delete_url)
                VALUES($1, $2, $3, $4, $5)`,
    values: [descr, price, imgId, imgUrl, imgDeleteUrl]
  }
  return new Promise((resolve, reject) => {
    pool.query(query, (err, res) => {
      if (err) {
        console.log(err.stack)
        reject(new Error(err.stack))
      } else {
        resolve('Success')
      }
    })
  })
}

function retrieveProducts () {
  let query = {
    text: 'SELECT (descr, price, img_url) from products'
  }

  return new Promise((resolve, reject) => {
    pool
      .query(query)
      .then(res => {
        let itemArray = []
        res.rows.forEach((line) => {
          let detailsArray = parseTupleStringToArray(line.row)
          let item = {
            descr: String(detailsArray[0]),
            price: Number(detailsArray[1]),
            imgUrl: detailsArray[2]
          }
          itemArray.push(item)
        })
        resolve(itemArray)
      })
      .catch(err => {
        reject(new Error('Error executing query', err.stack))
      })
  })
}

function parseTupleStringToArray (tupleString) {
  // Remove backets
  tupleString = tupleString.substring(1, tupleString.length - 1)
  let a = tupleString.split(',')
  return a
}

function getDeleteImageLink (imgURL) {
  let query = {
    text: 'SELECT (img_delete_url) FROM products WHERE img_url=$1',
    values: [imgURL]
  }

  return new Promise((resolve, reject) => {
    pool
      .query(query)
      .then(res => {
        if (res.rows[0] !== null) {
          let urlString = res.rows[0].img_delete_url
          resolve(urlString)
        } else {
          reject(new Error('Could not find image link'))
        }
      })
      .catch(err => {
        reject(new Error(err.stack))
      })
  })
}

function deleteItemEntry (imgUrl) {
  let query = {
    text: 'DELETE FROM products WHERE img_url=$1',
    values: [imgUrl]
  }

  return new Promise((resolve, reject) => {
    pool
      .query(query)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(new Error('Error executing query', err.stack))
      })
  })
}

module.exports = { storeItemInDatabase, retrieveProducts, getDeleteImageLink, deleteItemEntry }
