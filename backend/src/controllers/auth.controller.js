const jwt = require("jsonwebtoken");
const { Empleado } = require("../database");
const { validatePassword, generateHash } = require("../helpers/authFunctions");

const authController = {};

authController.register = (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.json("Sin token en headers");
  const decoded = jwt.verify(token, process.env.SECRET);

  Empleado.findOne({
    attributes: ["id", "correo"],
    where: { correo: req.body.correo },
  })
    .then(async (empleado) => {
      if (empleado) {
        res.json({
          success: false,
          message: "Este correo ya se encuentra registrado",
        });
      }

      const {
        nombre,
        apellido,
        cargo,
        correo,
        telefonos,
        password,
        emailPassword,
      } = req.body;

      const hashed = await generateHash(password);

      Empleado.create(
        {
          nombre,
          apellido,
          cargo,
          correo,
          telefonos,
          password: hashed,
          emailPassword,
          status: "activo",
          asociadoId: decoded.asociadoId,
        },
        {
          include: ["telefonos"],
        }
      )
        .then((empleado) => {
          res.json({
            success: true,
            id: empleado.id,
          });
        })
        .catch((err) => {
          res.json({
            success: false,
            message: "Error al crear empleado",
            data: err,
          });
        });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "Error al crear empleado",
        data: err,
      });
    });
};

authController.login = (req, res) => {
  Empleado.findOne({
    attributes: ["password", "id"],
    include: ["asociado"],
    where: { correo: req.body.correo },
  })
    .then(async (empleado) => {
      if (!empleado) {
        res.json({
          success: false,
          message: "No se encontró ningún usuario con este correo electrónico",
        });
      }

      const matchPassword = await validatePassword(
        req.body.password,
        empleado.password
      );

      if (!matchPassword) {
        res.json({
          success: false,
          message: "Contraseña incorrecta",
        });
      }

      const token = jwt.sign(
        { id: empleado.id, asociadoId: empleado.asociado.id },
        process.env.SECRET,
        {
          expiresIn: 86400,
        }
      );

      res.json({
        token,
        success: true,
        id: empleado.id,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "Error en login",
        data: err,
      });
    });
};

module.exports = authController;
