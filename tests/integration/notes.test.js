import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../../src/index.js'; // adjust path
import Note from '../../src/models/note.models.js'; // adjust path

dotenv.config();

describe('Fundo Notes CRUD API', () => {
  let token;
  let noteId;

  before(async () => {
    await mongoose.connect(process.env.DATABASE_TEST);
    await Note.deleteMany({});

    const loginRes = await request(app)
      .post('/api/v1/users/login')
      .send({ email: 'pooja@gmail.com', password: 'pooja1234' });

    token = loginRes.body.data.token;
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('should create a note', async () => {
    const res = await request(app)
      .post('/api/v1/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Note',
        description: 'Testing CRUD operations',
        color: 'blue'
      });

    expect(res.status).to.equal(201);
    expect(res.body.data).to.have.property('_id');
    noteId = res.body.data._id;
  });

  it('should get all notes', async () => {
    const res = await request(app)
      .get('/api/v1/notes')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.data).to.be.an('array');
  });

  it('should get a single note by id', async () => {
    const res = await request(app)
      .get(`/api/v1/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body.data).to.have.property('_id').equal(noteId);
  });

  it('should update a note', async () => {
    const res = await request(app)
      .put(`/api/v1/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Note Title' });

    expect(res.status).to.equal(200);
    expect(res.body.data.title).to.equal('Updated Note Title');
  });

  it('should delete a note', async () => {
    const res = await request(app)
      .delete(`/api/v1/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
  });
});
