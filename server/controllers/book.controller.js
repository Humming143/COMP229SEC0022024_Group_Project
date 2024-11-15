import Book from '../models/book.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'
const create = async (req, res) => { 
const book = new Book(req.body) 
try {
await book.save()
return res.status(200).json({ 
message: "Successfully book saved!"
})
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const list = async (req, res) => { 
try {
let books = await Book.find().select('title author genre published_year') 
res.json(books)
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const bookByID = async (req, res, next, id) => { 
try {
let book = await Book.findById(id) 
if (!book)
return res.status('400').json({ 
error: "Book not found"
})
req.profile = book 
next()
} catch (err) {
return res.status('400').json({ 
error: "Could not retrieve book"
}) 
}
}
const read = (req, res) => {
return res.json(req.profile) 
}
const update = async (req, res) => { 
try {
let book = req.profile
book = extend(book, req.body) 

await book.save()
res.json(book) 
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const remove = async (req, res) => { 
try {
let book = req.profile
let deletedBook = await book.deleteOne() 
res.json(deletedBook) 
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
export default { create, bookByID, read, list, remove, update }
