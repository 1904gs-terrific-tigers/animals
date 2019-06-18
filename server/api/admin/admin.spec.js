/* eslint-disable no-unused-expressions */
/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const User = db.model('user')
const Animal = db.model('animal')

describe('Admin routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/admin/', () => {
    let user
    const userData = {
      email: 'user@example.org',
      password: '123',
      isAdmin: true
    }

    beforeEach(async () => {
      user = await User.create(userData)
    })

    describe('GET /api/admin', () => {
      it('only can be accessed by a logged in admin', async () => {
        // regular auth to make sure person is authorized
        const agent = request.agent(app)
        await agent.post('/auth/login').send(userData)

        const res = await agent.get('/api/admin').expect(200)
      })
    })

    describe('/api/admin/animals', () => {
      describe('POST /api/admin/animals', () => {
        it('creates a new animal with the passed data', async () => {
          // regular auth to make sure person is authorized
          const agent = request.agent(app)
          await agent.post('/auth/login').send(userData)

          const animalData = {
            name: 'Lola',
            species: 'cat',
            price: 100
          }

          const res = await agent
            .post('/api/admin/animals')
            .send(animalData)
            .expect(201)

          expect(res.body.id).to.be.greaterThan(0)
          expect(res.body.name).to.be.equal(animalData.name)
          expect(res.body.species).to.be.equal(animalData.species)
          expect(res.body.price).to.be.equal(animalData.price)
        })
      })

      describe('PUT /api/admin/animals/:animalId', () => {
        let animal
        const animalData = {
          name: 'Lola',
          species: 'cat',
          price: 100
        }
        beforeEach(async () => {
          animal = await Animal.create(animalData)
        })

        it('updates an animal with the specified ID', async () => {
          // regular auth to make sure person is authorized
          const agent = request.agent(app)
          await agent.post('/auth/login').send(userData)

          const updatedInfo = {
            name: 'Sid',
            species: 'Sloth'
          }

          await agent
            .put(`/api/admin/animals/${animal.id}`)
            .send(updatedInfo)
            .expect(204)

          const updatedAnimal = await Animal.findByPk(animal.id)

          expect(updatedAnimal.name).to.be.equal(updatedInfo.name)
          expect(updatedAnimal.species).to.be.equal(updatedInfo.species)
        })
      })
    })
  })
})
