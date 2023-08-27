const router = require('express').Router();


const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const photosController = require('./controllers/photoController');

router.use(homeController);
router.use('/users', userController);
router.use('/photos', photosController);
 router.get('*', (req, res) =>{
     res.redirect('/404');
 })

module.exports = router;