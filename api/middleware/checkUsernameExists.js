const db = require('../../data/dbConfig');
module.exports = async (req, res, next) => {
const {username} = req.body;
try{
  const [user] = await db('users').where({username}).first()
} catch(err) {
  next(err)
}
};
