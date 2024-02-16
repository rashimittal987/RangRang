const express = require('express');
const router = express.Router();
const path = require('path');



router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})
module.exports = router;