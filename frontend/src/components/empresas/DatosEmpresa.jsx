import "../../assets/css/common/detalle.css";
import { useSelector } from "react-redux";

const DatosEmpresa = () => {
  const tipo = useSelector((store) => store.empresas.empresa.tipo);

  return (
    <div className="box">
      <section>
        <h2>Información</h2>
      </section>

      <div className="detailsContent">
        <div>
          <p>Tipo de empresa</p>
          <p className={tipo === "Cliente" ? "greenFilled" : "orangeFilled"}>
            {tipo}
          </p>
        </div>

        <div>
          <p>Vertical de negocios</p>
          <p className="gray">
            {useSelector((store) => store.empresas.empresa.vertical)}
          </p>
        </div>

        <div>
          <p>Etapa actual de la empresa</p>
          <p className="gray">
            {useSelector((store) => store.empresas.empresa.etapa)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DatosEmpresa;
