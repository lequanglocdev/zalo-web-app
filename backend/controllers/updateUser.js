const User = require("../models/User");
const uploadToS3 = require("../upload/s3");
const { formatBase64ToBuffer } = require("../utils/buffer");

// Controller function to update user information
const updateUser = async (req, res) => {
  // Kiểm tra xem req.user tồn tại và có thuộc tính id hay không
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "Unauthorized !!!" });
  }

  // Lấy ID của người dùng từ token đã được xác thực
  const userId = req.user.id;

  try {
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findById(userId);

    // Nếu không tìm thấy người dùng, trả về mã trạng thái 404 và thông báo lỗi
    if (!user) {
      return res.status(404).json({ error: "User not found !!!" });
    }

    // Cập nhật thông tin người dùng
    if (req.body.username) user.username = req.body.username;
    if (req.body.gender) user.gender = req.body.gender;
    if (req.body.birthday) user.birthday = req.body.birthday;

    // Lưu người dùng đã được cập nhật vào cơ sở dữ liệu
    const updatedUser = await user.save();

    // Trả về thông tin người dùng đã được cập nhật
    return res.status(200).json(updatedUser);
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    return res.status(500).json({ error: "Error updating user information" });
  }
};



const updateUserMobile = async (req, res) => {
  try {
    
    const { id } = req.params;
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found !!!" });
    }
    // Cập nhật thông tin người dùng
    if (req.body.username) user.username = req.body.username;
    if (req.body.gender) user.gender = req.body.gender;
    if (req.body.birthday) user.birthday = new Date(req.body.birthday);
    const updatedUser = await user.save();

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: "Error updating user information" });
  }
};

const updateAvatarMobile = async (req, res) => {
  try {
    const { id } = req.params;
    const { avatar } = req.body;
    console.log(avatar);
    const user = await User.findById(id);
    if (!user) {
     
 return res.status(404).json({ error: "User not found !!!" });
    }
    if (avatar) {
      avatar.buffer = await formatBase64ToBuffer(avatar.base64);
      const result = await uploadToS3(
        `${avatar.mimetype.split("/")[0]}___${Date.now().toString()}_${
          avatar.originalname.split(".")[0]
        }`,
        avatar.buffer,
        avatar.mimetype,
        avatar.originalname.split(".")[0],
        avatar.size / 1024
      );
      console.log(result);
      user.image = result.url;
    }

    const updatedUser = await user.save();

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error updating user information" });
  }
};

const updateAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const  image = req.file;
    console.log("id", id);
    console.log("image ", image );
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found !!!" });
    }
    if (image ) {
      //image .buffer = await formatBase64ToBuffer(image .base64);
      const result = await uploadToS3(
        `${
          image.mimetype.split("/")[0] !== "application"
            ? image.mimetype.split("/")[0]
            : image.originalname.split(".")[
                image.originalname.split(".").length - 1
              ]
        }___${Date.now().toString()}_${image.originalname.split(".")[0]}`,
        image.buffer,
        image .mimetype,
        image .originalname.split(".")[0],
        image .size / 1024
      );
      console.log(result);
      user.image = result.url;
    }

    const updatedUser = await user.save();

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error updating user information" });
  }
};



module.exports = { updateUser,updateAvatar, updateUserMobile, updateAvatarMobile };
