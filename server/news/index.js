const express = require('express');
const router = express.Router();

//middleware
const authToken = require('../utilities/token-auth');

//the routes
const query = require('./query');
const publish = require('./publish');
const edit = require('./edit');
const remove = require('./remove');

//basic route management (all query possibilities)
router.get('/', query(false, false));
router.get('/:id(\\d+)', query(false, false));
router.get('/archive', query(true, false));
router.get('/archive/:id(\\d+)', query(true, false));
router.get('/metadata', query(false, true));
router.get('/metadata/:id(\\d+)', query(false, true));
router.get('/archive/metadata', query(true, true));
router.get('/archive/metadata/:id(\\d+)', query(true, true));

//use middleware to authenticate the rest of the routes
router.use(authToken);
router.use((req, res, next) => {
	if (req.user.admin) {
		next();
	} else {
		res.status(403).end();
	}
});

//authenticated routes
router.post('/', publish);
router.patch('/:id(\\d+)', edit);
router.delete('/:id(\\d+)', remove);

module.exports = router;
