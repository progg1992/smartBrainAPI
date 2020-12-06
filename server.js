const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require('knex');
const { response } = require('express');

const PORT = process.env.PORT || 3000

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true,
    }
  });

const app = express();

app.use(bodyParser.json())

app.use(cors())

app.get('/', (req, res)=> {
    res.send('success')
});

app.post('/signin', (req, res)=> { signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res)=> { register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res)=> { profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => { image.handleImage(req, res, db)});
app.post('imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(PORT, ()=> {
  console.log('app is running on ' + PORT);
});