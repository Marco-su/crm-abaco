import { useRef } from "react";
import { Link } from "react-router-dom";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { getEmpleados } from "../../store/actions/empleado.actions";
import { capitalizeFirstLetter as capitalize } from "../../helpers/firstLetterUppercase";
import { Button } from "@mui/material";
import { toggleUpdate } from "../../store/actions/modals.action";
import { gridEs } from "../../constants/gridEs";

const List = ({ getInitial, titulo }) => {
  // INITIALIZATION
  const dispatch = useDispatch();
  const gridApi = useRef();

  // FUNCTIONS
  const findPhone = (employee) => {
    const item = employee.telefonos.find((el) => el.tipo === "telefono");
    return item ? `+${item.codPais} ${item.numero}` : "";
  };

  const findMovile = (employee) => {
    const item = employee.telefonos.find((el) => el.tipo === "movil");
    return item ? `+${item.codPais} ${item.numero}` : "";
  };

  const linkRenderer = (params) => {
    return <Link to={`/empleados/${params.data.id}`}>{params.value}</Link>;
  };

  // GETTING ROWS
  const rows = useSelector((store) => store.empleados.lista).map((el) => {
    return {
      id: el.id,
      nombre: `${el.nombre} ${el.apellido}`,
      dni: el.dni ? el.dni : "",
      cargo: el.cargo ? capitalize(el.cargo) : "",
      correo: el.correo ? el.correo : "",
      empleados: el.empleados ? el.empleados : "",
      telf: findPhone(el),
      movil: findMovile(el),
      linkedin: el.linkedin ? el.linkedin : "",
      facebook: el.facebook ? el.facebook : "",
      instagram: el.instagram ? el.instagram : "",
      twitter: el.twitter ? el.twitter : "",
      acciones: el.nombre,
    };
  });

  // SETTING COLS
  const onGridReady = (params) => {
    dispatch(getEmpleados());
    gridApi.current = params.api;
  };

  // FUNCTIONS

  // console.log(gridApi.current.getSelectedNodes());

  // RENDER
  return (
    <div className="mainTableBox1">
      <div className="mainTableBox2">
        <h1 className="tableTitle">Empleados</h1>

        <div
          style={{
            height: "100%",
            width: "100%",
          }}
          id="myGrid"
          class="ag-theme-balham"
        >
          <AgGridReact
            localeText={gridEs}
            defaultColDef={{
              flex: 1,
              filter: true,
              sortable: true,
            }}
            onGridReady={onGridReady}
            rowData={rows}
            suppressRowClickSelection={true}
            rowSelection={"multiple"}
            ref={gridApi}
            pagination={true}
            paginationPageSize={150}
          >
            <AgGridColumn headerName="Datos">
              <AgGridColumn
                field="nombre"
                headerName="Nombre y apellido"
                resizable={true}
                cellRendererFramework={linkRenderer}
                minWidth={250}
                headerCheckboxSelection={true}
                headerCheckboxSelectionFilteredOnly={true}
                checkboxSelection={true}
              />

              <AgGridColumn field="cargo" resizable={true} minWidth={160} />
              <AgGridColumn
                field="dni"
                resizable={true}
                minWidth={180}
                headerName="Documento de identidad"
              />

              <AgGridColumn
                field="empleados"
                resizable={true}
                minWidth={160}
                filter="agNumberColumnFilter"
              />
            </AgGridColumn>

            <AgGridColumn headerName="Contacto">
              <AgGridColumn
                field="correoPersonal"
                resizable={true}
                minWidth={200}
                headerName="Correo personal"
              />

              <AgGridColumn
                field="correoEmpresa"
                resizable={true}
                minWidth={200}
                headerName="Correo de empresa"
              />

              <AgGridColumn
                field="telf"
                resizable={true}
                minWidth={160}
                headerName="Teléfono"
              />

              <AgGridColumn
                field="movil"
                resizable={true}
                minWidth={160}
                headerName="Móvil"
              />
            </AgGridColumn>

            <AgGridColumn headerName="Redes sociales">
              <AgGridColumn
                field="linkedin"
                resizable={true}
                minWidth={180}
                headerName="LinkedIn"
              />

              <AgGridColumn field="instagram" resizable={true} minWidth={180} />
              <AgGridColumn field="facebook" resizable={true} minWidth={180} />
              <AgGridColumn field="twitter" resizable={true} minWidth={180} />
            </AgGridColumn>
          </AgGridReact>
        </div>

        <div className="tablefooterBtn">
          <Button
            className="ms-3"
            variant="contained"
            onClick={() => dispatch(toggleUpdate("empleadoCreate", null))}
          >
            Crear nuevo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default List;
