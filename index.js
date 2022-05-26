const express = require('express')

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log('Server running...'));

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', {root: __dirname})
})
app.get('/about', (req, res) => {
    res.sendFile('./views/about.html' , {root: __dirname})
})
app.get('/contact-me', (req, res) => {
    res.sendFile('./views/contact-me.html', {root: __dirname})
})
app.use((req, res) => {
    res.status(404).sendFile('./views/index.html', {root: __dirname})
})
//Create server object