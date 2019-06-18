/* eslint-disable no-unused-expressions */
/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('Auth routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/auth/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        password: '123'
      })
    })

    describe('POST /auth/signup', () => {
      it('can create a user', async () => {
        const userData = {
          email: 'user@example.org',
          password: '123'
        }
        const res = await request(app)
          .post('/auth/signup')
          .send(userData)
          .expect(200)

        expect(res.body.email).to.be.equal(userData.email)
        expect(res.body.isAdmin).to.be.false
      })
    })

    it('does not allow duplicate emails to be used', async () => {
      const userData = {
        email: codysEmail,
        password: '123'
      }
      const res = await request(app)
        .post('/auth/signup')
        .send(userData)
        .expect(401)
    })
    it('does not allow extra data to be used', async () => {
      const userData = {
        email: 'blahblah',
        password: '123',
        isAdmin: true
      }
      const res = await request(app)
        .post('/auth/signup')
        .send(userData)
        .expect(200)
      expect(res.body.isAdmin).to.be.false
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
