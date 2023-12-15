const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get('/movies/create', (req, res)=>{
    Celebrity.find()
        .then(celebrities=>{
            res.render('movies/new-movie', {celebrities});
        })
        .catch(err=>next(err));
});

router.post('/movies/create', (req, res)=>{

});

module.exports = router;