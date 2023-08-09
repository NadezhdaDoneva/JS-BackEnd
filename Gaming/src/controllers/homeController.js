const router = require('express').Router();
const photoManager = require('../managers/photoManager');
const {isAuth} = require('../middlewares/authMiddleware')

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/profile', isAuth, async(req, res) =>{
    const photos = await photoManager.getByOwner(req.user._id).lean();
    res.render('profile', {photos, photoCout: photos.length});
});


router.get('/search', async (req, res) => {
    let photoText = req.query.name;
    let photoPlat = req.query.platform;

    let photo = await photoManager.search(photoText, photoPlat);

    if (photo == undefined) {
        photo = await photoManager.getAll();
    }

    console.log(photo);

    res.render('search', { photo })
});

module.exports = router