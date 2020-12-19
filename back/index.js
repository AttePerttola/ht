const express = require('express')
const app = express();
const port = 8000;
var cors = require('cors')
app.use(cors())
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const fs = require('fs')
const database = require('./db.json')

let message_array = []
console.log(database)

app.get('/getArray', (req, res) => {
  res.send(database)
});


app.post('/getArray', jsonParser, (req, res) => {
  //console.log(req.body)
  const messageContent = req.body
  const message = {
    content: messageContent.content,
    username: messageContent.username,
    id: database.length + 1
  }
  console.log(message)
  message_array = database
  message_array.push(message)
  let data = JSON.stringify(message_array,null,2)
  fs.writeFileSync('db.json',data)
  res.status(200).json({messageContent})
})

app.get('/', (req, res) => {
  res.send("ebin backend")
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});