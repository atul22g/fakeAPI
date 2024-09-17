const express = require('express');
const cors = require('cors');
const { json } = require('body-parser')

const app = express();
app.use(json({limit:'50mb'}))
app.use(cors());
const port = 5000

app.get('/', (req, res) => {
    res.send('FakeAPI Backend')
})
app.post('/api/user/create', (req, res) => {
    console.log('User Backend');
    console.log(req.body);

    res.send(req.body)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})