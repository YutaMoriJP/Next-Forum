const CryptoJS = require("crypto-js");

const encrypt = postID => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(postID));
};

module.exports = encrypt;
