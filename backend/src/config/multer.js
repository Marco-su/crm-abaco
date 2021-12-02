const multer = require("multer");
const path = require("path");
const randomName = require("../helpers/randomName");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    // Si se quiere asignar un nombre (debe ser subida individual):
    // const nombre = req.body.nombre
    //   ? req.body.nombre
    //       .replace(/\s+/g, " ")
    //       .trim()
    //       .replace(/\s+/g, "-")
    //       .replace(/\.[^/.]+$/, "")
    //       .slice(0, 150)
    //   : "";

    const nombre = file.originalname
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/\.[^/.]+$/, "")
      .slice(0, 150);

    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${nombre}-${Date.now()}-${randomName()}${ext}`);
  },
});

const uploader = multer({ storage }).array("file");

module.exports = uploader;
