const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let users = [
  { id: 1, nome: 'Usuário 1', login: 'usuario1', senha: 'senha1' },
  { id: 2, nome: 'Usuário 2', login: 'usuario2', senha: 'senha2' },
  { id: 3, nome: 'Usuário 3', login: 'usuario3', senha: 'senha3' }
];

// Endpoint para retornar todos os usuários
app.get('/users', (req, res) => {
  res.json(users);
});

// Endpoint para retornar um usuário específico pelo login
app.get('/users/:login', (req, res) => {
  const user = users.find(u => u.login === req.params.login);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

// Endpoint para incluir um novo usuário
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    nome: req.body.nome,
    login: req.body.login,
    senha: req.body.senha
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Endpoint para atualizar um usuário existente pelo login
app.put('/users/:login', (req, res) => {
  const user = users.find(u => u.login === req.params.login);
  if (user) {
    user.nome = req.body.nome;
    user.senha = req.body.senha;
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

// Endpoint para excluir um usuário pelo login
app.delete('/users/:login', (req, res) => {
  const index = users.findIndex(u => u.login === req.params.login);
  if (index !== -1) {
    users.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

// Iniciando o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
