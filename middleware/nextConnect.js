import nc from 'next-connect'
import session from 'express-session'
import dbConnect from '../db/connect';
import MongoStore from 'connect-mongo';

async function dbClient(){
  const db = await dbConnect();
  return db.connection.getClient();
}

export default function nextConnect(){
  return nc({
    onError: (err, req, res) => {
      console.error(err.stack);
      res.status(500).end('A server-side error occurred.')
    },
    onNoMatch: (req, res) => {
      res.status(405).json({error: `Method ${req.method} is not facilitated for this route.`})
    }
  })
  .use(session({
    cookie: {
      maxAge: 1000 * 60 * 30,
      sameSite: true,
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      clientPromise: dbClient()
    })
  }))
}