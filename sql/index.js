// File sql.js

// Proper way to organize an sql provider:
//
// - have all sql files for Users in ./sql/users
// - have all sql files for Products in ./sql/products
// - have your sql provider module as ./sql/index.js

const QueryFile = require('pg-promise').QueryFile
const path = require('path')

// Helper for linking to external query files:
function sql(file) {
  const fullPath = path.join(__dirname, file.slice(2)) // generating full path;
  return new QueryFile(fullPath, { minify: true })
}

module.exports = {
  auth: {
    isUser: sql('./auth/isUser.sql'),
    currentPersonId: sql('./auth/currentPersonId.sql'),
    checkLogin: sql('./auth/checkLogin.sql'),
    signup: sql('./auth/signup.sql')
  },
  link: {
    select: sql('./link/select.sql'),
    insert: sql('./link/insert.sql')
  },
  tag: {
    select: sql('./tag/select.sql')
  },
  word_n_tag: {
    select: sql('./word_n_tag/select.sql')
  },
  person: {
    select: sql('./person/select.sql')
  }
}
