import nextConnect from "../../middleware/nextConnect";
import Account from '../../db/models/account'
import bcrypt from 'bcryptjs'
import multer from 'multer'

const upload = multer()
export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = nextConnect()
.post(upload.none(), async (req, res) => {
  const {
    username,
    password
  } = req.body;

  const account = await Account.findOne({username});

  if(!account){
    return res.status(404).json({error: 'The requested account does not exist.'})
  }

  const authenticated = await bcrypt.compare(password, account.passwordHash);

  if(!authenticated){
    return res.status(401).json({error: 'An incorrect password was supplied for the requested account.'})
  }

  req.session.authenticated = true;
  req.session.uid = account._id;

  return res.status(200).json({id: account._id});

})

export default handler;