import BookModel from '../models/book.js'

class Book {
  static getAll (request, h) {
    const queryParams = request.query
    const queryParamKeys = Object.keys(queryParams)

    const data = BookModel.findAll()
    let filteredData = JSON.parse(JSON.stringify(data))

    if (queryParamKeys.includes('name')) {
      filteredData = filteredData.filter(el => Boolean(String(el.name).toLowerCase().includes(String(queryParams.name).toLowerCase())))
    }
    if (queryParamKeys.includes('reading')) {
      filteredData = filteredData.filter(el => Boolean(Number(el.reading)) === Boolean(Number(queryParams.reading)))
    }
    if (queryParamKeys.includes('finished')) {
      filteredData = filteredData.filter(el => Boolean(Number(el.finished)) === Boolean(Number(queryParams.finished)))
    }

    const serializedData = filteredData.map(({ id, name, publisher }) => {
      return { id, name, publisher }
    })

    return h.response(
      {
        status: 'success',
        data: { books: serializedData }
      }
    ).code(200)
  }

  static getById (request, h) {
    const book = BookModel.findById(request.params.id)

    if (!book) {
      return h.response(
        {
          status: 'fail',
          message: 'Buku tidak ditemukan'
        }
      ).code(404)
    }

    return h.response(
      {
        status: 'success',
        data: { book }
      }
    ).code(200)
  }

  static post (request, h) {
    try {
      const newBook = new BookModel()
      newBook.assignAttributes(request.payload)

      if (!newBook.name) {
        return h.response(
          {
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
          }
        ).code(400)
      }

      if (newBook.readPage > newBook.pageCount) {
        return h.response(
          {
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
          }
        ).code(400)
      }

      newBook.save()

      return h.response(
        {
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: { bookId: newBook.id }
        }
      ).code(201)
    } catch (e) {
      return h.response(
        {
          status: 'error',
          message: 'Buku gagal ditambahkan'
        }
      ).code(500)
    }
  }

  static updateById (request, h) {
    const requestBody = request.payload

    if (!requestBody.name) {
      return h.response(
        {
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku'
        }
      ).code(400)
    }

    if (Number(requestBody.readPage || 0) > Number(requestBody.pageCount || 0)) {
      return h.response(
        {
          status: 'fail',
          message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        }
      ).code(400)
    }

    const existingBook = BookModel.findById(request.params.id)

    if (!existingBook) {
      return h.response(
        {
          status: 'fail',
          message: 'Gagal memperbarui buku. Id tidak ditemukan'
        }
      ).code(404)
    }

    const book = new BookModel()
    book.id = existingBook.id
    book.assignAttributes(existingBook)
    book.assignAttributes(requestBody)
    book.insertedAt = existingBook.insertedAt
    book.updatedAt = new Date().toISOString()
    book.save()

    return h.response(
      {
        status: 'success',
        message: 'Buku berhasil diperbarui'
      }
    ).code(200)
  }

  static deleteById (request, h) {
    const paramId = request.params.id
    const existingBook = BookModel.findById(paramId)

    if (!existingBook) {
      return h.response(
        {
          status: 'fail',
          message: 'Buku gagal dihapus. Id tidak ditemukan'
        }
      ).code(404)
    }

    BookModel.deleteById(paramId)

    return h.response(
      {
        status: 'success',
        message: 'Buku berhasil dihapus'
      }
    ).code(200)
  }
}

export default Book
