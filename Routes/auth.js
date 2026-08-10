const express = require("express")
const router = express.Router()

const { register, userLogin, adminLogin, logout } = require('../controllers/auth')

router.post('/register', register)
router.post('/login/user', userLogin)
router.post('/login/admin', adminLogin)
router.post('/logout', logout)

module.exports = router
