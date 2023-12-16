const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

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

router.post('/movies/create', (req, res, next)=>{
    console.log('movie:', req.body);
    Movie.create(req.body)
        .then(()=>res.redirect('/movies'))
        .catch(err=>{
            console.log('We hit an error while creating movie!', err);
            next(err);
        });
});

router.get('/movies', (req,res, next)=>{
    console.log('show all movies');
    Movie.find()
        .then(movies=>res.render('movies/movies', {movies}))
        .catch(err=>{
            console.log(err);
            next(err);
        })
});

//edit
router.post('/movies/:id', (req, res)=>{
    console.log('inside edit', req.body);
    const { title, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast }, {new:true})
        .then(()=>res.redirect(`/movies/${req.params.id}`))
        .catch(err => console.log('error updating the movie', err));
});

router.get('/movies/:id', (req, res, next)=>{
    
    console.log('req.params', req.params);
    Movie.findById(req.params.id)
        .populate('cast')
        .then(movie=>{
            console.log('movie', movie);
            res.render('movies/movie-details.hbs',movie);
        })
        .catch(err=>{
            console.log('err', err);
            next(err);
        })
});

router.post('/movies/:id/delete', (req, res, next)=>{
    console.log('req.params', req.params);
    Movie.findByIdAndRemove(req.params.id)
        .then(()=> res.redirect('/movies'))
        .catch(err => {
            console.log(err);
            next(err);
        })
});

router.get('/movies/:id/edit', (req, res)=>{
    console.log('entered edit', req.params);
    Movie.findById(req.params.id)
        .then(movie=> {
            console.log('movies cast', movie.cast);
            Celebrity.find()
                .then(celebrities=> {
                    res.render('movies/edit-movie.hbs', {movie, celebrities});
                })
                .catch(err=>{
                    console.log('error while retrieving celebrities for edit', err);
                })
        })
        .catch(err => {
            console.log('error while retrieving movies for edit', err);
        })
});





module.exports = router;