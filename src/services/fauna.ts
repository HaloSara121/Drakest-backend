const { Client } = require('faunadb')

export const fauna = new Client({
  secret: process.env.FAUNA_SECRET_KEY
})