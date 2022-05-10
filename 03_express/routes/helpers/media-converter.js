const express = require('express');
const router = express.Router();

const controller = require("../../helpers/media-converter")

router.post('/avatar', controller.postAvatar);

module.exports = router;
