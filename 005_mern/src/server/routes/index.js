const router = require('express').Router();

const Album = require('../models');

router.get('/albums', async (req, res) => {
  const albums = await Album.find({}).exec();
  res.json(albums);
});

router.post('/albums/add', async (req, res) => {
  const newAlbum = await new Album(req.body);
  await newAlbum.save();
  const album = await Album.findOne(req.body);
  res.status(201).json(album);
});

module.exports = router;
