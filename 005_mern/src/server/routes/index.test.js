const { assert } = require('chai');

const request = require('supertest');

const Album = require('../models/');
const { mongoose, databaseUrl } = require('../database');

const app = require('../../server/');

// setup and teardown utilities
const connectDatabase = async () => {
  await mongoose.connect(databaseUrl);
  await mongoose.connection.db.dropDatabase();
};

const disconnectDatabase = async () => {
  await mongoose.disconnect();
};

const newAlbum = {
  title: 'Space is the Place',
  artist: 'Sun Ra',
  art: 'https://upload.wikimedia.org/wikipedia/en/6/6c/Space_Is_The_Place_album_cover.jpg',
  year: '1973',
  rating: 5
};

describe('/api/albums', () => {
  describe('GET', () => {
    beforeEach(connectDatabase);
    afterEach(disconnectDatabase);
    it('should return a status of 200', async () => {
      const response = await request(app).get('/api/albums');

      assert.equal(response.status, 200);
    });

    it('should return an array of albums', async () => {
      await request(app)
        .post('/api/albums/add')
        .send(newAlbum);

      const response = await request(app).get('/api/albums');

      assert.include(JSON.stringify(response.body), newAlbum.title);
      assert.equal(response.body.length, 1);
    });
  });

  describe('Server path: `/api/albums/add`', () => {
    describe('POST', () => {
      beforeEach(connectDatabase);
      afterEach(disconnectDatabase);
      it('should return a `201` status code when creating a new album', async () => {
        const response = await request(app)
          .post('/api/albums/add')
          .send(newAlbum);

        assert.equal(response.status, 201);
      });

      it('should save the new album to the database', async () => {
        await request(app)
          .post('/api/albums/add')
          .send(newAlbum);

        const createdAlbum = await Album.findOne(newAlbum);
        assert.isOk(createdAlbum);
      });
    });
  });
});
