import "../../assets/css/common/detalle.css";
import { useSelector } from "react-redux";
import {
  EmailOutlined,
  CallOutlined,
  PhoneAndroidOutlined,
} from "@mui/icons-material";

const DatosEmpleado = () => {
  const telf = useSelector((store) =>
    store.empleados.empleado.telefonos.find((el) => el.tipo === "telefono")
  );
  const movil = useSelector((store) =>
    store.empleados.empleado.telefonos.find((el) => el.tipo === "movil")
  );

  return (
    <div className="box">
      <div className="box__info-title">
        <div className="title">
          <h2>
            {useSelector((store) => store.empleados.empleado.nombre)}{" "}
            {useSelector((store) => store.empleados.empleado.apellido)}
          </h2>
          <p className="text-gray">
            {useSelector((store) => store.empleados.empleado.cargo)}
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
              {useSelector((store) => store.empleados.empleado.correo)}
            </p>
          </div>
        </button>

        <button className="contactButton">
          <div>
            <CallOutlined />
            <h2>Teléfono</h2>
          </div>
          <div>
            {telf ? (
              <p className="text-gray">
                +{telf.codPais} {telf.numero}
              </p>
            ) : null}
          </div>
        </button>

        <button className="contactButton">
          <div>
            <PhoneAndroidOutlined />
            <h2>Móvil</h2>
          </div>
          <div>
            {movil ? (
              <p className="text-gray">
                +{movil.codPais} {movil.numero}
              </p>
            ) : null}
          </div>
        </button>
      </div>
    </div>
  );
};

export default DatosEmpleado;
