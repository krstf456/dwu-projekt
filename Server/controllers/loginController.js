const userModel = require('../models/User.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { auth, generateAccessToken, refreshTokens } = require('./authController')


const { ErrorHandler } = require('../utils/errors')

loginUser = async (req, res, next) => {

    try {
        const user = await userModel.findOne({ username: req.body.username })
   
       if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
           throw new ErrorHandler(401, "Wrong username or password");
       
        } else {
            // JVT Session here
            // Create and send token            
            //1
            const token = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
            const refreshToken = jwt.sign({_id: user._id}, process.env.REFRESH_TOKEN_SECRET)
            // res.header('auth-token', token).send(token)
            
            //2
            // const accessToken = generateAccessToken(user._id)
            // const refreshToken = jwt.sign({_id: user._id}, process.env.REFRESH_TOKEN_SECRET)
            refreshTokens.push(refreshToken)

            res.header('auth-token', token).json({accessToken: token, refreshToken: refreshToken})

           //2 

        //    const accessToken = generateAccessToken(user)

        //    res.status(200).json('You are logged in')
        }
   
    } catch (err) {
        next(err);
    }    
}

logoutUser = async (req, res, next) => {

    try {
        // jwt session = null ?
        res.status(200).json('You are now logged out!')

    } catch (err) {
        next(err);
    }
}

module.exports = { loginUser, logoutUser }
module.exports = { loginUser, logoutUser }
