const { generateAccessToken } = require("../middlewares/jwt");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const sendMail = require("../utils/sendMail");
const crypto = require("crypto");
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
  if (!/^[a-zA-ZÀ-Ỹà-ỹ ]+$/.test(username)) {
    return next(
      errorHandler(
        400,
        "Tên phải bắt đầu bằng chữ cái viết hoa và chỉ chứa chữ cái"
      )
    );
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
        //Create new user
        const newUser = new User({
          username: username,
          phone: phone,
          email: email,
          password: password,
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

// const forgetPassword = asyncHandler(async (req, res) => {
//   const { email } = req.query;
//   if (!email) throw new Error("Missing email");
//   const user = await User.findOne({ email });
//   if (!user) throw new Error("User not found");
//   const resetToken = user.createChangePassword();
//   await user.save();

//   const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`;

//   const data = {
//     email,
//     html,
//   };
//   const rs = await sendMail(data);
//   return res.status(200).json({
//     sucess: true,
//     rs,
//   });
// });
const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  // Tạo một mật khẩu mới ngẫu nhiên
  const newPassword = generateRandomPassword();

  // Cập nhật mật khẩu mới cho người dùng
  user.password = newPassword;
  await user.save();

  // Gửi email chứa mật khẩu mới
  const html = `Mật khẩu mới của bạn là: <strong>${newPassword}</strong>. Vui lòng đăng nhập và đổi mật khẩu sau khi đăng nhập thành công.`;
  const data = {
    email,
    html,
  };
  const rs = await sendMail(data);

  return res.status(200).json({
    success: true,
    rs,
  });
});

// Hàm tạo mật khẩu ngẫu nhiên
function generateRandomPassword() {
  const length = 6;
  const charset = "123456";
  let newPassword = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    newPassword += charset[randomIndex];
  }
  return newPassword;
}

module.exports = forgetPassword;
const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("Missing inputs");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Invalid reset token");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    sucess: user ? true : false,
    mes: user ? "Updated password" : "Something went wrong",
  });
});

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  forgetPassword,
  resetPassword,
};
