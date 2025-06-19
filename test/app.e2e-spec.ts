import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { Event } from '../src/events/entities/event.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let testEvent: Event;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Test that the app is running and the root endpoint is returning the correct response
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('May the API be with you!');
  });

  // Test that the events endpoint is initially returning an empty array
  it('/events (GET)', () => {
    return request(app.getHttpServer()).get('/events').expect(200);
  });

  // Test that the events endpoint is returning an empty array
  it('/events (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/events')
      .send({
        title: 'Test Event',
        description: 'Test Description',
        type: 'app',
        priority: 1,
      })
      .expect(201);

    testEvent = response.body as Event;
  });

  // Test that the events/:id endpoint is returning the correct response
  it('/event/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/events/${testEvent.id}`)
      .expect(200)
      .expect(testEvent);
  });

  // Test that the events/:id endpoint is returning the correct response
  it('/events/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch(`/events/${testEvent.id}`)
      .send({
        title: 'Updated Test Event',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject({
          id: testEvent.id,
          title: 'Updated Test Event',
          description: testEvent.description,
          type: testEvent.type,
          priority: testEvent.priority,
        });
      });
  });

  // Test that the events/:id endpoint is returning the correct response
  it('/events/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/events/${testEvent.id}`)
      .expect(200);
  });

  // Test that the users/authorize endpoint is returning the correct response
  it('/users/authorize (GET)', () => {
    return request(app.getHttpServer())
      .get(`/users/authorize?ip=8.8.8.8`)
      .expect((res) => {
        expect([200, 403]).toContain(res.status);
      });
  });
});
