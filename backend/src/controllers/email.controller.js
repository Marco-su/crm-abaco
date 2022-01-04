const { Email, Empleado, Contacto } = require("../database");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const emailController = {};

emailController.buscarDestinatarios = (req, res) => {
  let empleados = [];
  let contactos = [];

  try {
    Promise.all([
      Empleado.findAll({
        limit: 25,
        attributes: ["correo"],
        where: { correo: { [Op.like]: `%${req.body.term}%` } },
      }).then((res) => (empleados = res)),

      Contacto.findAll({
        limit: 25,
        attributes: ["correo"],
        where: { correo: { [Op.like]: `%${req.body.term}%` } },
      }).then((res) => (contactos = res)),

      //
    ]).then(() => {
      res.send([...contactos, ...empleados]);
    });

    //
  } catch (error) {
    res.send("Error al buscar correos");
  }
};

emailController.sendEmail = (req, res) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return res.json("Sin token en headers");

    const decoded = jwt.verify(token, process.env.SECRET);

    Empleado.findOne({
      attributes: ["nombre", "correo", "emailPassword"],
      where: { id: decoded.id },
    })
      .then((empleado) => {
        if (!empleado)
          return res.json("No se encontró usuarion con este token");

        const { to, subject, html, cc, bcc } = req.body;

        const transport = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: empleado.correo,
            pass: empleado.emailPassword,
          },
        });

        transport
          .sendMail({
            from: `${empleado.nombre} de Abaco Systems Technologies <${empleado.correo}>`,
            to,
            cc,
            bcc,
            subject,
            html,
          })
          .then((response) => res.send(response))
          .catch((err) => res.send(`Error: ${err}`));
      })
      .catch((err) =>
        res.json(`error al buscar empleado en base de datos: ${err}`)
      );
  } catch (error) {
    res.json("Invalid token");
  }
};

// emailController.receiveEmails = async (req, res) => {
//   const client = new ImapFlow({
//     host: "imap.gmail.com",
//     port: 993,
//     secure: true,
//     auth: {
//       user: "garland.mcclure71@ethereal.email",
//       pass: "mW6e4wWWnEd3H4hT5B",
//     },
//   });

//   await client.connect();
//   let lock = await client.getMailboxLock("INBOX");

//   try {
//   } catch (error) {
//   } finally {
//   }

//   await client.logout();
// };

module.exports = emailController;
