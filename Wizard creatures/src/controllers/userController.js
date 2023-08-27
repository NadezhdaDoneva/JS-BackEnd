const router = require('express').Router();

const userManager = require('../managers/userManager');
const {tokenKey} = require('../config/config');
const {getErrorMessage} = require('../utils/errorHelpers');

router.get('/login', (req, res) =>{
    res.render('users/login');
});

router.post('/login', async (req, res)=>{

    const {email, password} = req.body;
    try{
        const token = await userManager.login(email, password);
        res.cookie(tokenKey, token);
        res.redirect('/')

    } catch (err){
        res.render('users/login', {error: getErrorMessage(err)})
    }
});

router.get('/register', (req, res) =>{
    res.render('users/register');
});

router.post('/register', async (req, res)=>{
    const {firstname, lastname, email, password, repeatPassword} = req.body;

    try{
        const token = await userManager.register({firstname, lastname, email, password, repeatPassword});
        res.cookie(tokenKey, token);
        res.redirect('/');
        
    } catch (err){
        res.render('users/register', {error: getErrorMessage(err)})
    }

});

router.get('/logout', (req, res) =>{
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;