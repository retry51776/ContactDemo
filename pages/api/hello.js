// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/* Trying to figure out how to integrate Json-server into NextJS Server
I was hopping somekind middleware, but seems like json server requires its own server
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
*/

//server.use('/api', router)
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
