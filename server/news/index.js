const express = require('express');
const router = express.Router();
const cors = require('cors'); //route-by-route, because some routes are available without authentication

//middleware
const authToken = require('../utilities/token-auth');

//the routes
const query = require('./query');
const publish = require('./publish');
const edit = require('./edit');
const remove = require('./remove');

//basic route management (all query possibilities)
router.get('/', cors(), query(false, false));
router.get('/:id(\\d+)', cors(), query(false, false));
router.get('/archive', cors(), query(true, false));
router.get('/archive/:id(\\d+)', cors(), query(true, false));
router.get('/metadata', cors(), query(false, true));
router.get('/metadata/:id(\\d+)', cors(), query(false, true));
router.get('/archive/metadata', cors(), query(true, true));
router.get('/archive/metadata/:id(\\d+)', cors(), query(true, true));

//use middleware to authenticate the rest of the routes
router.use(cors({
	credentials: true,
	origin: [`${process.env.WEB_ORIGIN}`], //because auth-server
	allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Set-Cookie'],
	exposedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Set-Cookie'],
}));

router.use(authToken);

router.use((req, res, next) => {
	if (req.user.mod) {
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
