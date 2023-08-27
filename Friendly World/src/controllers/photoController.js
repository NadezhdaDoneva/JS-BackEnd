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
    
    
    if(req.user!=undefined){
        let isOwner = req.user._id == photo.owner._id;
        let donator = photoB.getDonators();
        let isDonated = req.user && donator.some(c => c._id == req.user?._id);
        res.render('photos/details', {photo, isOwner, isDonated});
    } else {
        const isOwner = false;
        let isDonated = false;
        res.render('photos/details', {photo, isOwner, isDonated});
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
// router.get('/:photoId/bought', isAuth, async(req, res) =>{
//     const photoId = req.params.photoId;
//     res.redirect(`/photos/${photoId}/details`);
// });



router.get('/:photoId/donate', isAuth, async(req, res) =>{
    const photoId = req.params.photoId;
    try{
        let photo = await photoManager.getOne(photoId);
    photo.donations.push(req.user._id);
    await photo.save();

    res.redirect(`/photos/${photoId}/details`);

    } catch(err){
        res.render(`/photos/${photoId}/details`, {error: 'Unable to buy game'});
    }
});


// router.post('/:photoId/comments', isAuth, async(req, res) => {
//     const photoId= req.params.photoId;
//     const {message} = req.body;
//     const user = req.user._id;

//     try {
//         await photoManager.addComment(photoId, {user, message});
//         res.redirect(`/photos/${photoId}/details`);
        
//     } catch (error) {
//         res.render(`/photos/${photoId}/details`, {error: 'Unable to upload comment'});
//     }
// });

module.exports = router;