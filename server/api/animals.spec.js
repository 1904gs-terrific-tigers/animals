const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Animal = db.model('animal')

//all items tests

//single items tests

describe('/api/animals/id', () => {
  const animal = {
    name: 'Tony',
    imageUrl:
      'https://www.telegraph.co.uk/content/dam/news/2017/11/30/TELEMMGLPICT000148018716_trans_NvBQzQNjv4BqutIaqbtdgycbjoKap7Ft85iru5ESH6waxLG5-q_DX4Y.jpeg?imwidth=450',
    description: 'Spend an time with the famous Tony the Tiger',
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

    expect(res.body).to.be.an('array')
    expect(res.body).to.have.length(1)
    expect(res.body[0].id).to.equal(id)
    expect(res.body[0].name).to.equal(animal.name)
    expect(res.body[0].imageUrl).to.equal(animal.imageUrl)
    expect(res.body[0].description).to.equal(animal.description)
  })
})
