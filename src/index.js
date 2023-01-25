import express from 'express'
import GraphQLController from './controllers/UserController.js';

const app = express()

app.use(express.static('public'));

app.use('/gpl', new GraphQLController())

const PORT = 8080;
app.listen(PORT, () => console.log('runngin on port', PORT));