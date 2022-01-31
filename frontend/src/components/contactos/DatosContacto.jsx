import "../../assets/css/common/detalle.css";
import { useSelector } from "react-redux";
import { EmailOutlined, CallOutlined } from "@mui/icons-material";

const DatosContacto = () => {
  return (
    <div className="box">
      <div className="box__info-title">
        <div className="title">
          <h2>
            {useSelector((store) => store.contactos.contacto.nombre)}{" "}
            {useSelector((store) => store.contactos.contacto.apellido)}
          </h2>
          <p className="text-gray">
            {useSelector((store) => store.contactos.contacto.cargo)}
          </p>
        </div>
      </div>

      <div className="contactList">
        <button className="contactButton">
          <div>
            <EmailOutlined />
            <h2>Correo</h2>
          </div>
          <div>
            <p className="text-gray">
              {useSelector((store) => store.contactos.contacto.correo)}
            </p>
          </div>
        </button>

        <button className="contactButton">
          <div>
            <CallOutlined />
            <h2>Teléfono</h2>
          </div>
          <div>
            <p className="text-gray">
              {useSelector((store) => store.contactos.contacto.correo)}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DatosContacto;
