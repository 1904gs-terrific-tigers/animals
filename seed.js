const {db, Animal} = require('./server/db')
const {green, red} = require('chalk')

const animals = [
  {
    id: 1,
    name: 'Cody',
    imageUrl:
      'https://media.treehugger.com/assets/images/2018/03/sloth-sounds.jpg.860x0_q70_crop-scale.jpg',
    species: 'sloth',
    pricePerTimeUnit: 1
  },
  {
    id: 2,
    name: 'Simba',
    imageUrl:
      'https://media.cntraveler.com/photos/53ec0c68976f8f2d44d5ab1e/master/w_420,c_limit/tiger-cubs.jpg',
    species: 'tiger',
    pricePerTimeUnit: 2
  }
]

const seed = async () => {
  await db.sync({force: true})

  await Promise.all(
    animals.map(animal => {
      return Animal.create(animal)
    })
  )

  console.log(green('Seeded animals'))
  db.close()
}

seed().catch(err => {
  console.error(red('Oy vey!'))
  console.error(err)
  db.close()
})
