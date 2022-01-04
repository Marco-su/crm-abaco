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
      <section>
        <h1>
          {useSelector((store) => store.empleados.empleado.nombre)}{" "}
          {useSelector((store) => store.empleados.empleado.apellido)}
        </h1>
        <p className="gray">
          {useSelector((store) => store.empleados.empleado.cargo)}
        </p>
      </section>

      <div className="contactList">
        <button className="contactButton">
          <div>
            <EmailOutlined />
            <h2>Correo</h2>
          </div>
          <div>
            <p className="gray">
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
              <p className="gray">
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
              <p className="gray">
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
