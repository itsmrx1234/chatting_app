import jwt from 'jsonwebtoken'
const jsonwebtoken=(userId,res)=>{
    const token= jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'7d';

    })
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true,
        secure:true,
        sameSite:'strict'
    }
}
export default jsonwebtoken;