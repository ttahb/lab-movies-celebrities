const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get('/celebrities/create', (req, res)=>{
    console.log('i am here');
    res.render('celebrities/new-celebrity')
});

router.post('/celebrities/create', (req, res)=>{
    console.log('req.body', req.body);
    Celebrity.create(req.body)
        .then(()=>res.redirect('/celebrities'))
        .catch(err=> {
            console.log('We hit an error while creating celebrity!', err);
            res.render('celebrities/new-celebrity');
        });
})

router

module.exports = router;