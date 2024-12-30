const express = require('express')
const path = require('path')
const cors = require('cors')
const connectDB = require('./config/db')
require('dotenv').config()

const port = process.env.PORT || 5000 

const app = express()

connectDB()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:3000'],
  credentials: true
}))

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the RandomIdeas API' })
})
const ideaRouter = require('./routes/ideas')
app.use('/api/ideas', ideaRouter)


app.listen(port, () => console.log(`server is listening on port ${port}`))

