const bcrypt = require('bcryptjs')
const authModel = require('../Model/Auth')

const register = async(req, res)=>{
    try {
        const { username, email, password, role } = req.body;
        
        const existingUser = await authModel.findOne({email})
        if (existingUser) {
            return res.status(400).json({
                msg: 'Email already exist, please use another email'
            })
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)
        
        const result = await authModel.create({
            username: username,
            email: email,
            password: hashedPassword,
            role: role || 'user' 
        })
        
        res.status(201).json({
            msg: "User registered successfully",
            result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
}

const userLogin = async(req, res) => {
    try {
        const {email, password} = req.body;
        
        const existingUser = await authModel.findOne({email})
        if (!existingUser) {
            return res.status(404).json({
                msg: "Email not found"
            })
        }
        
        if (existingUser.role !== 'user') {
            return res.status(403).json({
                msg: "Access denied. Please use the Admin login portal."
            })
        }
        
        const matchedPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchedPassword) {
            return res.status(400).json({
                msg: "Invalid email or password"
            })
        }
        
        res.status(200).json({
            msg: "User login successful",
            user: existingUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
}

const adminLogin = async(req, res) => {
    try {
        const {email, password} = req.body;
        
        const existingAdmin = await authModel.findOne({email})
        if (!existingAdmin) {
            return res.status(404).json({
                msg: "Admin credentials not found"
            })
        }
        
        if (existingAdmin.role !== 'admin') {
            return res.status(403).json({
                msg: "Access denied. Unauthorized role."
            })
        }
        
        const matchedPassword = await bcrypt.compare(password, existingAdmin.password)
        if (!matchedPassword) {
            return res.status(400).json({
                msg: "Invalid email or password"
            })
        }
        
        res.status(200).json({
            msg: "Admin login successful",
            user: existingAdmin
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).json({
            success: true,
            msg: "Logged out successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = { register, userLogin, adminLogin, logout }
