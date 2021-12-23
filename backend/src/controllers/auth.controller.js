const jwt = require("jsonwebtoken");
const { Empleado } = require("../database");
const { validatePassword, generateHash } = require("../helpers/authFunctions");

const authController = {};

authController.register = (req, res) => {
  Empleado.findOne({
    attributes: ["id", "correo"],
    where: { correo: req.body.correo },
  })
    .then(async (empleado) => {
      if (empleado) return res.send("Este correo ya se encuentra registrado.");

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
        },
        {
          include: ["telefonos", "contactos", "oportunidades"],
        }
      )
        .then((empleado) => {
          res.json({ id: empleado.id });
        })
        .catch((err) => {
          console.log(err);
          res.send(`Error al crear empleado`);
        });
    })
    .catch((err) => {
      console.log(err);
      return res.send(`Error al crear empleado`);
    });
};

authController.login = (req, res) => {
  Empleado.findOne({
    attributes: ["password", "id"],
    where: { correo: req.body.correo },
  })
    .then(async (empleado) => {
      if (!empleado)
        return res.json(
          "No se encontró ningún usuario con este correo electrónico."
        );

      const matchPassword = await validatePassword(
        req.body.password,
        empleado.password
      );

      if (!matchPassword) return res.json("Contraseña incorrecta.");

      const token = jwt.sign({ id: empleado.id }, process.env.SECRET, {
        expiresIn: 86400,
      });

      res.json({ token, id: empleado.id });
    })
    .catch((err) => res.status(500));
};

module.exports = authController;
