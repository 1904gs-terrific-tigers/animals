const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Animal = db.model('animal')

//all items tests

//single items tests