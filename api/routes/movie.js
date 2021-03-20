const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.movie.get.all);

router.get('/:id', controllers.movie.get.single);

router.post('/', auth(), controllers.movie.post);

// router.put('/:id', auth(), controllers.movie.put);

router.put('/rate/:id', auth(), controllers.movie.put.rate);

// router.delete('/:id', auth(), controllers.movie.delete);

module.exports = router;