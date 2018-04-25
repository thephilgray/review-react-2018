const { assert } = require('chai');
const request = require('supertest');

const Album = require('../models/');
const { mongoose, databaseUrl } = require('../database');

const app = require('../../server/');

// setup and teardown utilities
beforeEach(async () => {
  await mongoose.connect(databaseUrl);
  await mongoose.connection.db.dropDatabase();
});

afterEach(async () => {
  await mongoose.disconnect();
});

describe('GET `/`', () => {
  it('should return a JSON message and a status of 200', async () => {
    const response = await request(app).get('/');

    assert.equal(response.status, 200);
    assert.include(response.body, {
      message: 'root'
    });
  });
});

describe('Server path: `/add`', () => {
  describe('POST', () => {
    const newAlbum = {
      title: 'Space is the Place',
      artist: 'Sun Ra',
      art: 'https://upload.wikimedia.org/wikipedia/en/6/6c/Space_Is_The_Place_album_cover.jpg',
      year: '1973',
      rating: 5
    };
    it('should return a `201` status code when creating a new album', async () => {
      const response = await request(app)
        .post('/add')
        .type('json')
        .send(newAlbum);

      assert.equal(response.status, 201);
    });

    it('should save the new album to the database', async () => {
      await request(app)
        .post('/add')
        .send(newAlbum);

      const createdAlbum = await Album.findOne(newAlbum);
      console.log(createdAlbum);
      assert.isOk(createdAlbum);
    });
  });
});
