const User = require("../models/User")

const verificationUpdate = async (req, res) => {
    const phone = req.body.phone
    if (!phone) return res.sendStatus(401).json({ error: ["Không tìm thấy SDT - 01"] })

    const user = User.findOne({ phone: phone })
    if (!user) return res.sendStatus(403).json({ error: ["Không tìm thấy SDT - 02"] })
    try {
        await User.findOneAndUpdate({ phone: phone }, { verification: true })

        res.status(200).json({
            status: ["Cập nhập thành công"]
        });
    } catch (error) {
        res.sendStatus(403).json({
            error: ["Xác thực không thành công"]
        })
    }
}


module.exports = { verificationUpdate }
