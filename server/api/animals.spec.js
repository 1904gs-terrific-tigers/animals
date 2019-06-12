/* eslint-disable no-unused-expressions */
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Animal = db.model('animal')

//all items tests
describe('Animal routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/animals/', () => {
    let Cody, Lola
    const codyData = {
      name: 'Cody',
      species: 'dog',
      imageUrl:
        'https://media.treehugger.com/assets/images/2018/03/sloth-sounds.jpg.860x0_q70_crop-scale.jpg',
      pricePerTimeUnit: 1.0
    }

    const lolaData = {
      name: 'Cuddle with Lola',
      species: 'cat',
      pricePerTimeUnit: 100
    }

    beforeEach(async () => {
      Cody = await Animal.create(codyData)
      Lola = await Animal.create(lolaData)
    })

    it('GET /api/animals', async () => {
      const res = await request(app)
        .get('/api/animals')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body).to.have.lengthOf(2)

      expect(res.body[0].name).to.be.equal(codyData.name)
      expect(res.body[0].imageUrl).to.be.equal(codyData.imageUrl)
      expect(res.body[1].name).to.be.equal(lolaData.name)
      expect(res.body[1].imageUrl).to.exist
    })
  }) // end describe('/api/animals')

  //single items tests
  describe('/api/animals/id', () => {
    const animal = {
      name: 'Tony',
      imageUrl:
        'https://www.telegraph.co.uk/content/dam/news/2017/11/30/TELEMMGLPICT000148018716_trans_NvBQzQNjv4BqutIaqbtdgycbjoKap7Ft85iru5ESH6waxLG5-q_DX4Y.jpeg?imwidth=450',
      description: 'Spend time with the famous Tony the Tiger',
      species: 'Tiger',
      pricePerTimeUnit: 100
    }

    let tony
    beforeEach(async () => {
      await db.sync({force: true})
      tony = await Animal.create(animal)
    })
    it('GET a single animal', async () => {
      let id = tony.id
      const res = await request(app)
        .get(`/api/animals/${id}`)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.id).to.equal(id)
      expect(res.body.name).to.equal(animal.name)
      expect(res.body.imageUrl).to.equal(animal.imageUrl)
      expect(res.body.description).to.equal(animal.description)
    })
  })
})
