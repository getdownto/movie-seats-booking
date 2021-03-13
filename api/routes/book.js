const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.book.get.all);

router.get('/:id', controllers.book.get.single);

router.post('/', auth(), controllers.book.post);

router.put('/:id', auth(), controllers.book.put);

router.delete('/:id', auth(), controllers.book.delete);

module.exports = router;