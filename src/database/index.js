let mongoose = require('mongoose')

class Database {
  constructor () {
    this._connect()
  }
  async _connect () {
    try {
      await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log('Connected to DB')
    } catch (error) {
      console.log('Unable to connect to DB', error)
    }
  }
}
module.exports = new Database()
