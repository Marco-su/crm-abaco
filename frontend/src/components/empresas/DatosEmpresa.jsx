import "../../assets/css/common/detalle.css";
import { useSelector } from "react-redux";
import { capitalizeFirstLetter as capitalize } from "../../helpers/firstLetterUppercase";

const DatosEmpresa = () => {
  // STATES
  const empresa = useSelector((store) => store.empresas.empresa);

  // RENDER FUNCTIONS
  const rowCreate = (titulo, llave) => {
    return (
      <tr>
        <th>{titulo}</th>
        <td>
          {(empresa[llave] && capitalize(empresa[llave])) || (
            <span className="gray">No especificado</span>
          )}
        </td>
      </tr>
    );
  };

  const tdIngresos = () => {
    if (empresa.ingresosMaximos) {
      return (
        <td>
          Entre {empresa.ingresosMinimos} y {empresa.ingresosMaximos}
        </td>
      );
    } else if (empresa.ingresosMinimos) {
      return <td>{empresa.ingresosMinimos}</td>;
    } else {
      return (
        <td>
          <span className="gray">No especificado</span>
        </td>
      );
    }
  };

  const rowsContacto = (titulo, llave) => {
    if (empresa[llave].length > 0) {
      return empresa[llave].map((el, index) => (
        <tr key={`${llave}-${index}`}>
          {empresa[llave].length === 1 ? (
            <th>{titulo}</th>
          ) : (
            <th>
              {titulo} {index + 1}
            </th>
          )}

          <td>{el.numero}</td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <th>{titulo}</th>
          <td>
            <span className="gray">No especificado</span>
          </td>
        </tr>
      );
    }
  };

  const rowsWebs = (titulo, tipo) => {
    if (empresa.webs.length > 0 && tipo !== "otro") {
      const webFound = empresa.webs.find((el) => el.tipo === tipo);
      if (webFound) {
        return (
          <tr>
            <th>{titulo}</th>
            <td>
              <a href={webFound.url} target="_blank" rel="noreferrer">
                {webFound.url}
              </a>
            </td>
          </tr>
        );
      } else {
        return (
          <tr>
            <th>{titulo}</th>
            <td>
              <span className="gray">No especificado</span>
            </td>
          </tr>
        );
      }
    } else if (tipo === "otro") {
      let websFound = [];
      websFound = empresa.webs.filter((el) => el.tipo === tipo);

      if (websFound.length > 0) {
        return websFound.map((el, index) => (
          <tr key={`${tipo}-${index}`}>
            {websFound.length === 1 ? (
              <th>{titulo}</th>
            ) : (
              <th>
                {titulo} {index + 1}
              </th>
            )}

            <td>
              <a href={el.url} target="_blank" rel="noreferrer">
                {el.url}
              </a>
            </td>
          </tr>
        ));
      } else {
        return (
          <tr>
            <th>{titulo}</th>
            <td>
              <span className="gray">No especificado</span>
            </td>
          </tr>
        );
      }
    } else {
      return (
        <tr>
          <th>{titulo}</th>
          <td>
            <span className="gray">No especificado</span>
          </td>
        </tr>
      );
    }
  };

  const rowDireccion = {};

  // RENDER
  return (
    <>
      <div className="box tableBox">
        <section>
          <h2>Información</h2>
        </section>

        <div className="detailsBox">
          <table>
            <tbody>
              {rowCreate("Nombre de la empresa", "nombre")}
              {rowCreate("Representante legal", "representante")}
              {rowCreate("Vertical de negocios", "vertical")}
              {rowCreate("Número de Identificación Tributaria", "nit")}
              {rowCreate("Tipo de propiedad", "propiedad")}
              {rowCreate("Cantidad de empleados", "empleados")}

              <tr>
                <th>Ingresos anuales</th>
                {tdIngresos()}
              </tr>

              {rowCreate("Tipo de empresa", "tipo")}
              {rowCreate("Estatus en sistema", "status")}
              {rowCreate("Etapa de gestión", "etapa")}
              {rowCreate("ID de creación", "idCreacion")}
              {rowCreate("Tipo de creación", "tipoCreacion")}
            </tbody>
          </table>

          <div className="noteBox">
            <p className="gray">Nota</p>
            <p>{empresa.nota || "Sin notas adicionales"}</p>
          </div>
        </div>
      </div>

      <div className="box tableBox">
        <section>
          <h2>Contacto</h2>
        </section>

        <div className="detailsBox">
          <table>
            <tbody>
              {rowsContacto("Teléfono", "telefonos")}
              {rowsContacto("Correo", "correos")}
              {rowsWebs("LinkedIn", "linkedin")}
              {rowsWebs("Instagram", "instagram")}
              {rowsWebs("Facebook", "facebook")}
              {rowsWebs("Twitter", "twitter")}
              {rowsWebs("Sitio web adicional", "otro")}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DatosEmpresa;
