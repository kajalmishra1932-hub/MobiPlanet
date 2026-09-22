const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Uploads now go straight to Cloudinary instead of local disk.
// Render's filesystem is ephemeral, so anything saved to a local
// "uploads" folder gets wiped on every restart/redeploy/idle spin-down.
// Cloudinary gives every uploaded file a permanent public URL.
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "mobiplanet/products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    // gives each file a unique name, same idea as Date.now() before
    public_id: (req, file) =>
      `${Date.now()}-${file.originalname.split(".")[0]}`,
  },
});

module.exports = multer({ storage });
