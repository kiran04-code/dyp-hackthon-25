
const JWT = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
function cratetoken(user){
    const payload= {
        _id:user._id,
        email:user.email,
        Number:user.Number,
        UserName:user.UserName
    }
    const token = JWT.sign(payload,secret)
    return token
}
function validation(token){
    const pyload = JWT.verify(token,secret)
    return pyload
}

module.exports = {cratetoken,validation}