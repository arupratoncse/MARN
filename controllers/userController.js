const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const {serverError, resourceError} = require('../util/error')
const jwt = require('jsonwebtoken')

// Login controller
module.exports = {
    login(req, res){
        let {email, password} = req.body
        let validate = loginValidator({email, password})
        if(!validate.isValid){
            return res.status(400).json(validate.error)
        }
        User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(400).json({email: 'User Not Found'})
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if(err){
                    return serverError(res, err)
                }
                if(!result){
                    return res.status(400).json( {password: 'Password Dosn\'t Match'})
                }
                let token = jwt.sign({
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }, 'SECRET', {expiresIn: '2h'})
                return res.json({
                    message: 'Login Successful',
                    token: `Bearer ${token}`
                })
            })
        })
        .catch(error => serverError(res, error))
    },
    register(req, res){
        let {name, email, password, confirmPassword} = req.body
        let validate  = registerValidator({name, email, password, confirmPassword})
        if(!validate.isValid){
            res.status(400).json(validate.error)
        }else{
            User.findOne({email})
            .then(user => {
                if(user){
                    return resourceError(res, 'Email Already Exist')
                }
                bcrypt.hash(password, 11, (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            message: 'Server Error Occerred Bcrypt'
                        })
                    }
                    let user = new User({
                        name,
                        email,
                        password: hash
                    })
                    user.save()
                    .then(user => {
                        res.status(201).json({
                            message: 'User Created Successfully',
                            user: user
                        })
                    })
                    .catch(error => {
                        res.status(500).json({
                            message:'Server Error Occurred User save'
                        })
                    })
                })
            })
            .catch(error => {
                res.status(500).json({
                    message:'Server Error Occurred'
                })
            })
        }
    }
}
