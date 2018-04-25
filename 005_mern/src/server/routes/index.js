const router = require('express').Router();

const Album = require('../models');

router.get('/', async (req, res) => {
  const albums = await Album.find({}).exec();
  res.json(albums);
});

router.post('/add', async (req, res) => {
  const newAlbum = await new Album(req.body);
  newAlbum.save();
  const album = await Album.findOne(req.body);
  res.status(201).json(album);
});

module.exports = router;
