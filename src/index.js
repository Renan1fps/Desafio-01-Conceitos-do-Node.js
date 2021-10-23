const express = require('express');
const cors = require('cors');

const { v4: uuidv4, v4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers

  const existsUsers = users.find(user => user.username === username)

  if(!existsUsers){
    return response.status(400).json({error: "User not found"})
  }

  request.username = existsUsers

  return next()
}

app.post('/users', (request, response) => {
  const { name, username } = request.body

  const existsUsers = users.some(user => user.username === username)

  if(existsUsers){
    console.log(existsUsers)
    return response.status(400).json({error: "User already exists"})
  }

  const userTosave = { id: v4(), name, username, todos:[] }
  users.push(userTosave)
  
  return response.status(201).json(userTosave)

});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { username } = request

  return response.status(200).json(username.todos)
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;