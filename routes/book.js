import bookController from '../controllers/book.js'

export default [
  {
    method: 'GET',
    path: '/books',
    handler: bookController.getAll
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: bookController.getById
  },
  {
    method: 'POST',
    path: '/books',
    handler: bookController.post
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: bookController.updateById
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: bookController.deleteById
  }
]
