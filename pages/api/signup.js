import nextConnect from "../../middleware/nextConnect";
import bcrypt from 'bcryptjs'
import Account from '../../db/models/account'
import multer from 'multer'

const upload = multer()
export const config = {
  api: {
    bodyParser: false,
  },
}

//todo: enforce superadmin privileges
const handler = nextConnect()
.post(upload.none(), async (req, res) => {
  const {
    username,
    password
  } = req.body;

  if(!username || !password){
    return res.status(400).json({error: "Username and password are required fields."})
  }

  if(username.length < 3){
    return res.status(400).json({error: "Username must be 3 characters or greater in length."})
  }

  if(password.length < 6){
    return res.status(400).json({error: "Password must be 6 characters or greater in length."})
  }

  if(await Account.findOne({username})){
    return res.status(409).json({error: "This username is unavailable."});
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const account = await Account.create({
    username, passwordHash
  });

  return res.status(201).json({id: account._id});
  
})

export default handler;