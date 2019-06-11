const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Animal = db.model('animal')

//all items tests

//single items tests

describe('Animal routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/animals/', () => {
    const name = 'Cody'
    let Cody

    beforeEach(async () => {
      Cody = await Animal.create({
        name: 'Cody',
        species: 'dog',
        imageUrl:
          'https://media.treehugger.com/assets/images/2018/03/sloth-sounds.jpg.860x0_q70_crop-scale.jpg',
        pricePerTimeUnit: 1.0
      })
    })

    it('GET /api/animals', async () => {
      const res = await request(app)
        .get('/api/animals')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(Cody.name)
    })
  }) // end describe('/api/users')
}) //
