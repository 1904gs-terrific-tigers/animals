'use strict'

const db = require('../server/db')
const {User, Animal} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', isAdmin: true}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const cody = users[0]
  const animals = await Promise.all([
    Animal.create({
      name: 'Hang with Sid',
      imageUrl:
        'https://media.treehugger.com/assets/images/2018/03/sloth-sounds.jpg.860x0_q70_crop-scale.jpg',
      description: 'Climb a tree, hang upside down and take a nap with Sid',
      species: 'sloth',
      price: 75
    }),
    Animal.create({
      name: 'Cuddle up with Simba',
      imageUrl:
        'https://media.mnn.com/assets/images/2014/08/babies-LEAD.jpg.620x0_q80_crop-smart_upscale-true.jpg',
      description:
        'Cuddle up with Simba, rub him behind his ears and let his purring put your body and mind at ease',
      species: 'lion',
      price: 200
    }),
    Animal.create({
      name: 'Headpat Lola',
      imageUrl:
        'https://media.discordapp.net/attachments/123623920879271937/588868872787067074/20190221_192651-1.jpg?width=276&height=411',
      description:
        'Lola is a great introduction to felines for those guests who are not yet ready to interact with a lion cub. Lola is a sweet girl who likes to chase her own tail and catnip. So sit down with your favorite book or a cup of your beverage of choice and let Lola climb onto your lap',
      species: 'cat',
      price: 20
    }),
    Animal.create({
      name: 'Debug with Cody',
      imageUrl:
        'https://cloud.githubusercontent.com/assets/12876798/24311104/b0035b0c-10a0-11e7-9c40-7ceb205206b5.png',
      description: `Cody the Pug is the unofficial mascot of Fullstack Academy of Code. Come rub Cody's belly and use him for all your rubber duck debugging needs (he is used to it, he might even opine on your choice of libraries). If your code compiles, he will lick your face.`,
      species: 'dog',
      price: 100
    }),
    Animal.create({
      name: 'Run with Secretariat',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/d/df/Secretariat_at_stud.jpg',
      description:
        'For our runner customers. Do your speed workout with our fastest horse and get that PR',
      species: 'horse',
      price: 200
    }),
    Animal.create({
      name: 'Swim with Gloria',
      imageUrl:
        'https://media.npr.org/assets/img/2017/07/23/baby-fiona_wide-c3a5b2cae6e072c2880a324b711ccc7eefafe3a2-s800-c85.jpg',
      description: `If you're not a fan of running, then try our free swimming workout`,
      species: 'hippopotamus',
      price: 0
    }),
    Animal.create({
      name: 'Watch People Swim with Gloria',
      imageUrl:
        'https://media.npr.org/assets/img/2017/07/23/baby-fiona_wide-c3a5b2cae6e072c2880a324b711ccc7eefafe3a2-s800-c85.jpg',
      description: `While swimming with Gloria is free, watching people workout with her is a paid content for people over 18`,
      species: 'hippopotamus',
      price: 40
    }),
    Animal.create({
      name: 'Swim with baby Needle',
      imageUrl:
        'https://i.pinimg.com/originals/d2/cc/10/d2cc1024e4bc069fd1ac51900b5c3d73.jpg',
      description: 'Safer option for our clients who like to swim',
      species: 'stingray',
      price: 100
    }),
    Animal.create({
      name: 'Tickle Loofah and Doofah',
      imageUrl:
        'https://patch.com/img/cdn20/users/22906546/20181227/043814/styles/raw/public/processed_images/unnamed_2-1545945947-3712.jpg',
      description:
        'Playful twin red pandas can make you feel all warm and fuzzy even on your saddest day',
      species: 'red panda',
      price: 250
    }),
    Animal.create({
      name: 'Smell Popcorn',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/a/a7/Binturong_in_Overloon.jpg',
      description:
        'Check for yourself whether it is true that binturongs smell like popcorn',
      species: 'binturong',
      price: 50
    }),
    Animal.create({
      name: 'Hunt with Snagglepuss',
      imageUrl:
        'https://a57.foxnews.com/media2.foxnews.com/BrightCove/694940094001/2019/06/14/931/524/694940094001_6048372022001_6048377228001-vs.jpg?ve=1&tl=1',
      description: 'Another activity for the physically fit customers',
      species: 'mountain lion',
      price: 300
    }),
    Animal.create({
      name: 'Wrestle with Kaa',
      imageUrl:
        'https://jaxenter.com/wp-content/uploads/2018/08/shutterstock_794051476.jpg',
      description: 'For true fans of the Jungle Book',
      species: 'Python',
      price: 250
    })
  ])
  const sid = animals[0],
    simba = animals[1],
    lola = animals[2]

  const codyOrder = await cody.createOrder({
    purchased: false
  })

  await Promise.all([
    codyOrder.addAnimal(lola, {
      through: {
        quantity: 3,
        price: lola.price
      }
    }),
    codyOrder.addAnimal(sid, {
      through: {
        quantity: 1,
        price: sid.price
      }
    }),
    codyOrder.addAnimal(simba, {
      through: {
        quantity: 1,
        price: simba.price
      }
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${animals.length} animals`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
