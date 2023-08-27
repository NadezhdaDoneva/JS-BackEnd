const router = require('express').Router();
const photoManager = require('../managers/photoManager');
const {isAuth} = require('../middlewares/authMiddleware');


const {getErrorMessage} = require('../utils/errorHelpers');

router.get('/', async (req, res) => {
    const photos = await photoManager.getAll().lean();
    res.render('photos', {photos});
});

router.get('/create', isAuth, (req, res) => {
    res.render('photos/create');
});

router.post('/create', isAuth, async (req, res) => {
    const photoData = {
        ...req.body,
        owner: req.user._id,
    };

    try {
        await photoManager.create(photoData);
        res.redirect('/photos');
    } catch (err) {
        res.render('photos/create', {error: getErrorMessage(err)});
    }
});

router.get('/:photoId/details', async (req, res) => {
    const photoId = req.params.photoId;
    const photo = await photoManager.getOne(photoId).lean();
    const photoB = await photoManager.getOne(photoId);
    let buyers = photoB.getBuyers();
    let count = buyers.length;
    let hasBeenBought = false;
    const user = req.user

    if(count !== 0) {
        hasBeenBought=true;
    }

    if(req.user!=undefined){
        let isOwner = req.user._id == photo.owner._id;
        let isBought = req.user && buyers.some(c => c._id == req.user?._id);
        res.render('photos/details', {photo, isOwner, isBought, count, hasBeenBought, user});
    } else {
        const isOwner = false;
        let isBought = false;
        res.render('photos/details', {photo, isOwner, isBought, count, hasBeenBought, user});
    }
    
});

router.get('/:photoId/delete', isAuth, async (req, res) =>{
    const photoId = req.params.photoId
    try {
        await photoManager.delete(photoId);
        res.redirect('/photos');
    } catch (err) {
        res.render(`/photos/${photoId}/details`, {error: 'Unsuccessful deletion'});
    }
});

router.get('/:photoId/edit', isAuth, async(req, res) =>{
    const photo = await photoManager.getOne(req.params.photoId).lean();
    res.render('photos/edit', {photo});
});

router.post('/:photoId/edit', isAuth, async(req, res) =>{
    const photoId = req.params.photoId;
    const photoData = req.body;
    try{
        await photoManager.edit(photoId, photoData);
        res.redirect(`/photos/${photoId}/details`);

    } catch(err){
        res.render('photos/edit', {error: 'Unable to update photo', ...photoData});
    }
});

router.get('/:photoId/bought', isAuth, async(req, res) =>{
    
    const photoId = req.params.photoId;
    try{
        let photo = await photoManager.getOne(photoId);
    photo.buyer.push(req.user._id);
    await photo.save();

    res.redirect(`/photos/${photoId}/details`,);

    } catch(err){
        res.render(`/photos/${photoId}/details`, {error: 'Unable to buy game'});
    }
});


module.exports = router;