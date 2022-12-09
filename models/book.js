import { nanoid } from 'nanoid'
import database from '../database.js'

class Book {
  constructor () {
    const timeNow = new Date().toISOString()

    this.id = nanoid() // => "V1StGXR8_Z5jdHi6B-myT"
    this.name = null
    this.year = null
    this.author = null
    this.summary = null
    this.publisher = null
    this.pageCount = null
    this.readPage = null
    this.finished = null
    this.reading = null
    this.insertedAt = timeNow
    this.updatedAt = timeNow
  }

  save () {
    database[this.id] = JSON.parse(JSON.stringify(this))
  }

  assignAttributes (data) {
    this.name = data.name
    this.year = data.year
    this.author = data.author
    this.summary = data.summary
    this.publisher = data.publisher
    this.pageCount = data.pageCount
    this.readPage = data.readPage
    this.reading = data.reading
    this.finished = this.alreadyFinished
  }

  get alreadyFinished () {
    return Number(this.pageCount || 0) === Number(this.readPage || 0)
  }

  static findById (id) {
    return database[id]
  }

  static findAll () {
    return JSON.parse(JSON.stringify(Object.values(database)))
  }

  static deleteById (id) {
    delete database[id]
  }
}

export default Book
