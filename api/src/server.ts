import cors from 'cors'
import express from 'express'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/message', (_req, res) => {
  res.json({ message: 'Hello World from the Express API' })
})

app.get('/', (_req, res) => {
  res.send('Example FS API is running. Hit /api/message for JSON.')
})

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
