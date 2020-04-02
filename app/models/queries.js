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

module.exports = { storeItemInDatabase, retrieveProducts }
