const app = require("./server");
const sequelize = require("./database");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Servidor escuchando en el puerto", port);

  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Base de datos conectada");
    })
    .catch((error) => {
      console.log("Error al conectar base de datos", error);
    });
});
