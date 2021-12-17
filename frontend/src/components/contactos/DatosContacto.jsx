import "../../assets/css/common/detalle.css";
import { useSelector } from "react-redux";
import { EmailOutlined, CallOutlined } from "@mui/icons-material";

const DatosContacto = () => {
  return (
    <div className="box">
      <section>
        <h1>
          {useSelector((store) => store.contactos.contacto.nombre)}{" "}
          {useSelector((store) => store.contactos.contacto.apellido)}
        </h1>
        <p className="gray">
          {useSelector((store) => store.contactos.contacto.cargo)}
        </p>
      </section>

      <div className="contactList">
        <button>
          <div>
            <EmailOutlined />
            <h2>Correo</h2>
          </div>
          <div>
            <p className="gray">
              {useSelector((store) => store.contactos.contacto.correo)}
            </p>
          </div>
        </button>

        <button>
          <div>
            <CallOutlined />
            <h2>Teléfono</h2>
          </div>
          <div>
            <p className="gray">
              {useSelector((store) => store.contactos.contacto.correo)}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DatosContacto;
