const router = require('express').Router();
const heroRouter = require('./heroe.routes.js');


router.use('/heroes', heroRouter);


module.exports = router;