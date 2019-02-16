const express = require('express');
const authMiddleware = require('../middlewares/auth')

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
    // eslint-disable-next-line no-console
    console.log(req.userId)
    res.send({ ok: true})
});

module.exports = app => app.use('/test', router);