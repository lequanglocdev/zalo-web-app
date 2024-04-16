const formatBase64ToBuffer = async (base64) => {
  return await Buffer.from(base64, "base64");
};

module.exports = { formatBase64ToBuffer };
