const express = require('express')
const app = express()
const port = 3000
const redis = require('redis')
const client = redis.createClient(process.env.REDIS_URL);
console.log(process.env.REDIS_URL)
app.post('/search', (req, res) => {
  client.set('search', 'search text', redis.print);
  client.get('search', redis.print)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})