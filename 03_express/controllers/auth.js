let crypto = require("crypto")
const users = require('../models/user')
const tokenKey = '1a2b-3c4d-5e6f-7g8h'

exports.middlewareAuth = async function (req, res, next) {
    if (req.headers.authorization) {
        let tokenParts = req.headers.authorization
            .split(' ')[1]
            .split('.')
        let signature = crypto
            .createHmac('SHA256', tokenKey)
            .update(`${tokenParts[0]}.${tokenParts[1]}`)
            .digest('base64')

        if (signature === tokenParts[2])
            req.user = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString('utf8'))

        next()
    }

    next()
}

exports.authByEmail = async function (req, res) {
    const email = req.body.email
    const password = req.body.password

    users.findOne( {email: email, password: password},function(err, user) {
        if (err) {
            console.error(err)
            return res.status(500).json({ message: 'MongoDB error', error: err })
        }

        if(!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        let head = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'jwt' })).toString('base64')
        let body = Buffer.from(JSON.stringify(user)).toString('base64')
        let signature = crypto
            .createHmac('SHA256', tokenKey)
            .update(`${head}.${body}`)
            .digest('base64')

        return res.status(200).json({
            id: user._id,
            email: user.email,
            username: user.username,
            avatarUrl: user.avatarUrl,
            token: `${head}.${body}.${signature}`,
        })

    })
}

exports.registerUser = async function (req, res) {
    let user = new users()
    user.username = req.body.username
    user.email = req.body.email
    user.passwordHash = req.body.password // TODO: Hash password SHA256
    user.isEmailVerified = false
    user.avatarUrl = 'https://firebasestorage.googleapis.com/v0/b/echo-c09f3.appspot.com/o/avatars%2Fdefault%20avatar.png?alt=media&token=3d11a976-b768-4895-acd5-cfb5fa6ba1b2'

    user.save(function (err) {
        if (err) {
            console.error(err)
            return err
        }
        // TODO: email verifying
        return res.status(201).json(user)
    })
}