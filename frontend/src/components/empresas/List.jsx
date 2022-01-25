import { useRef } from "react";
import { Link } from "react-router-dom";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { capitalizeFirstLetter as capitalize } from "../../helpers/firstLetterUppercase";
import { Button } from "@mui/material";
import { toggleUpdate } from "../../store/actions/modals.action";
import { gridEs } from "../../constants/gridEs";

const List = ({ getInitial, titulo }) => {
  // INITIALIZATION
  const dispatch = useDispatch();
  const location = useLocation();
  const gridApi = useRef();

  // GETTING ROWS
  let listToFind = "";

  switch (location.pathname) {
    case "/prospectos":
      listToFind = "prospectos";
      break;

    case "/clientes":
      listToFind = "clientes";
      break;

    default:
      listToFind = "lista";
      break;
  }

  const rows = useSelector((store) => store.empresas[listToFind]).map((el) => {
    return {
      id: el.id,
      idCreacion: el.idCreacion,
      tipoCreacion: el.tipoCreacion ? capitalize(el.tipoCreacion) : "",
      nombre: el.nombre ? el.nombre : "",
      tipo: el.tipo ? capitalize(el.tipo) : "",
      sector: el.vertical ? capitalize(el.vertical) : "",
      nit: el.nit,
      etapa: el.etapa ? capitalize(el.etapa) : "",
      propiedad: el.propiedad ? capitalize(el.propiedad) : "",
      acciones: el.nombre ? el.nombre : "",
      ingresosMin: el.ingresosMinimos ? el.ingresosMinimos : "",
      ingresosMax: el.ingresosMaximos
        ? el.ingresosMaximos
        : el.ingresosMinimos
        ? el.ingresosMinimos
        : "",
    };
  });

  // SETTING COLS
  const onGridReady = (params) => {
    dispatch(getInitial());
    gridApi.current = params.api;
  };

  // FUNCTIONS
  const linkRenderer = (params) => {
    return <Link to={`/empresas/${params.data.id}`}>{params.value}</Link>;
  };

  // console.log(gridApi.current.getSelectedNodes());

  // RENDER
  return (
    <div className="mainTableBox1">
      <div className="mainTableBox2">
        <h1 className="tableTitle">{titulo}</h1>

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
                resizable={true}
                cellRendererFramework={linkRenderer}
                minWidth={450}
                headerCheckboxSelection={true}
                headerCheckboxSelectionFilteredOnly={true}
                checkboxSelection={true}
                headerName="Nombre de la empresa"
              />

              <AgGridColumn field="sector" resizable={true} minWidth={160} />
              <AgGridColumn field="nit" resizable={true} minWidth={160} />
            </AgGridColumn>

            <AgGridColumn headerName="Gestión">
              <AgGridColumn
                field="idCreacion"
                resizable={true}
                minWidth={160}
                headerName="Id de creación"
              />

              <AgGridColumn
                field="etapa"
                resizable={true}
                minWidth={160}
                headerName="Etapa de gestión"
              />

              <AgGridColumn field="tipo" resizable={true} minWidth={160} />

              <AgGridColumn
                field="tipoCreacion"
                resizable={true}
                minWidth={160}
                headerName="Tipo de creación"
              />
            </AgGridColumn>

            <AgGridColumn headerName="Ingresos anuales">
              <AgGridColumn
                field="ingresosMin"
                resizable={true}
                minWidth={200}
                headerName="Ingresos mínimos"
                filter="agNumberColumnFilter"
              />

              <AgGridColumn
                field="ingresosMax"
                resizable={true}
                minWidth={200}
                headerName="Ingresos máximos"
                filter="agNumberColumnFilter"
              />
            </AgGridColumn>
          </AgGridReact>
        </div>

        <div className="tablefooterBtn">
          <Button
            className="ms-3"
            variant="contained"
            onClick={() => dispatch(toggleUpdate("empresaCreate", null))}
          >
            Crear nuevo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default List;
