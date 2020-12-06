const { json } = require('body-parser');
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '09b0aacf2dac493589d58a5e775a67a1'
   });

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db)=> {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => response.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}