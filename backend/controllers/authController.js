const { generateAccessToken } = require("../middlewares/jwt");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const userRegister = async (req, res) => {
  const { username, phone, password, email } = req.body;
  const errors = [];

  if (!username) {
    errors.push("Tên đăng nhập không được rỗng!");
  }
  if (!phone) {
    errors.push("SDT không được rỗng!");
  }
  if (!password) {
    errors.push("Mật khẩu không được rỗng!");
  }
  if (!email) {
    errors.push("Email không được rỗng!");
  }
  if (phone && (phone.length < 9 || phone.length > 10)) {
    errors.push("SDT phải là có 9 hoặc 10 số!");
  }
  if (password && password.length < 6) {
    errors.push("Mật khẩu phải ít nhất 6 ký tự");
  }
  if (username && !/^[a-zA-Z0-9 ]+$/.test(username)) {
    errors.push("Tên đăng nhập chỉ được chứa ký tự, số và dấu gạch dưới!");
  }
  if (phone && !/^[0-9]+$/.test(phone)) {
    errors.push("SDT chỉ được nhập số!");
  }

  if (errors.length > 0) {
    res.status(400).json({
      error: {
        errorMessage: errors,
      },
    });
  } else {
    const checkUser = await User.findOne({
      phone: phone,
    });

    if (checkUser) {
      res.status(404).json({
        error: {
          errorMessage: ["SDT đã có trong hệ thống!"],
        },
      });
    } else {
      try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        //Create new user
        const newUser = new User({
          username: username,
          phone: phone,
          email: email,
          password: hashed,
          verification: false,
        });
        console.log(newUser);

        //Save user to DB
        const user = await newUser.save();
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({
          error: {
            errorMessage: ["Đăng ký không thành công"],
          },
        });
      }
    }
  }
};

const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.body.phone });
    if (!user) {
      res.status(404).json("Incorrect phone");
    }
    if (user && user.verification === false) {
      res.status(404).json("Tài khoản chưa xác thực");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(404).json("Incorrect password");
    }
    if (user && validPassword) {
      //Generate access token
      const accessToken = generateAccessToken(user);

      //STORE ACCESS TOKEN IN COOKIE
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, accessToken });
    }
  } catch (err) {
    res.status(500).json({
      error: ["Đăng nhập không thành công"],
    });
  }
};

const userLogout = async (req, res) => {
  //Clear cookies when user logs out
  // refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  // res.clearCookie("refreshToken");
  res.status(200).json("Logged out successfully!");
};

module.exports = { userRegister, userLogin, userLogout };
