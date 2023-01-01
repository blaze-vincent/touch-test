export default function requireAuthentication(req, res, next){
  if(req.session?.authenticated){
    return next();
  }
  return res.status(401).json({error: "This action requires authentication. Please sign in and try again."});
}