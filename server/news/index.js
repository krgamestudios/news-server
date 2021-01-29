const express = require('express');
const router = express.Router();

//the routes
const query = require('./query');
const publish = require('./publish');
const edit = require('./edit');

//basic route management
router.get('/', query(false, false));
router.get('/:id(\\d+)', query(false, false));
router.get('/archive', query(true, false));
router.get('/archive/:id(\\d+)', query(true, false));
router.get('/titles', query(false, true));
router.get('/titles/:id(\\d+)', query(false, true));
router.get('/archive/titles', query(true, true));
router.get('/archive/titles/:id(\\d+)', query(true, true));

router.post('/', publish);

router.patch('/:id(\\d+)', edit);

module.exports = router;
