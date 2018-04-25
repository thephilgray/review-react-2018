const { assert } = require('chai');
const {
  describe, beforeEach, afterEach, it
} = require('mocha');
const request = require('supertest');

const Album = require('../models/');
const { mongoose, databaseUrl } = require('../database');

const app = require('../../server/');

const newAlbum = {
  title: 'Space is the Place',
  artist: 'Sun Ra',
  art: 'https://upload.wikimedia.org/wikipedia/en/6/6c/Space_Is_The_Place_album_cover.jpg',
  year: '1973',
  rating: 5
};
// setup and teardown utilities
async function connectDatabase() {
  await mongoose.connect(databaseUrl);
  await mongoose.connection.db.dropDatabase();
}

async function disconnectDatabase() {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
}

describe('/', async () => {
  // setup and teardown utilities
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);
  describe('GET', () => {
    it('should return a status of 200', async () => {
      const response = await request(app).get('/');

      assert.equal(response.status, 200);
    });

    it('should return an array of albums', async () => {
      await request(app)
        .post('/add')
        .send(newAlbum);

      const response = await request(app).get('/');

      assert.include(JSON.stringify(response.body), newAlbum.title);
      assert.equal(response.body.length, 1);
    });
  });

  describe('Server path: `/add`', () => {
    describe('POST', () => {
      it('should return a `201` status code when creating a new album', async () => {
        const response = await request(app)
          .post('/add')
          .send(newAlbum);

        assert.equal(response.status, 201);
      });

      it('should save the new album to the database', async () => {
        await request(app)
          .post('/add')
          .send(newAlbum);

        const createdAlbum = await Album.findOne(newAlbum);
        assert.isOk(createdAlbum);
      });
    });
  });
});
