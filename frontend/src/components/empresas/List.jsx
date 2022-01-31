import { useRef } from "react";
import { Link } from "react-router-dom";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { capitalizeFirstLetter as capitalize } from "../../helpers/firstLetterUppercase";
import { Button, Tooltip, IconButton } from "@mui/material";
import { Spinner } from "reactstrap";
import { toggleUpdate } from "../../store/actions/modals.action";
import { gridEs } from "../../constants/gridEs";
import { FilterAltOffOutlined, Replay } from "@mui/icons-material";

const List = ({ getInitial, titulo }) => {
  // INITIALIZATION
  const dispatch = useDispatch();
  const location = useLocation();
  const gridApi = useRef();
  const isLoading = useSelector((store) => store.global.tableLoading);

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

  const list = useSelector((store) => store.empresas[listToFind]);
  const rows = list.map((el) => {
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
    if (list.length === 0) {
      dispatch(getInitial());
    }

    gridApi.current = params.api;
  };

  // FUNCTIONS
  const linkRenderer = (params) => {
    return <Link to={`/empresas/${params.data.id}`}>{params.value}</Link>;
  };

  const commonCellRenderer = (params) => {
    if (params.value) {
      return <span>{params.value}</span>;
    } else {
      return <span className="text-gray">Vacío</span>;
    }
  };

  // gridApi.current.getSelectedNodes();

  // RENDER
  return (
    <div className="mainTableBox1">
      <div className="table-btn-box">
        <Button
          className="pill-button"
          variant="contained"
          onClick={() => dispatch(toggleUpdate("empresaCreate", null))}
        >
          Crear nuevo
        </Button>
      </div>

      <div className="mainTableBox2">
        <div className="titleTableBox">
          <h1 className="tableTitle">{titulo}</h1>

          <Tooltip title="Actualizar lista">
            {isLoading ? (
              <div className="spinnerBox">
                <Spinner color="primary" />
              </div>
            ) : (
              <IconButton
                color="info"
                onClick={() => {
                  dispatch(getInitial());
                }}
              >
                <Replay />
              </IconButton>
            )}
          </Tooltip>

          <Tooltip title="Limpiar filtros">
            <IconButton
              color="info"
              onClick={() => gridApi.current.setFilterModel(null)}
            >
              <FilterAltOffOutlined />
            </IconButton>
          </Tooltip>
        </div>

        <div
          style={{
            height: "100%",
            width: "100%",
          }}
          id="myGrid"
          className="ag-theme-balham"
        >
          <AgGridReact
            localeText={gridEs}
            defaultColDef={{
              flex: 1,
              filter: true,
              sortable: true,
            }}
            rowData={isLoading ? null : rows}
            onGridReady={onGridReady}
            suppressRowClickSelection={true}
            suppressLoadingOverlay={true}
            rowSelection={"multiple"}
            ref={gridApi}
            pagination={true}
            paginationPageSize={150}
            enableCellTextSelection={true}
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

              <AgGridColumn
                field="sector"
                resizable={true}
                minWidth={160}
                cellRendererFramework={commonCellRenderer}
              />
              <AgGridColumn
                field="nit"
                resizable={true}
                minWidth={160}
                cellRendererFramework={commonCellRenderer}
              />
            </AgGridColumn>

            <AgGridColumn headerName="Gestión">
              <AgGridColumn
                field="idCreacion"
                resizable={true}
                minWidth={160}
                headerName="ID de creación"
                cellRendererFramework={commonCellRenderer}
              />

              <AgGridColumn
                field="etapa"
                resizable={true}
                minWidth={160}
                headerName="Etapa de gestión"
                cellRendererFramework={commonCellRenderer}
              />

              <AgGridColumn
                field="tipo"
                resizable={true}
                minWidth={160}
                cellRendererFramework={commonCellRenderer}
              />

              <AgGridColumn
                field="tipoCreacion"
                resizable={true}
                minWidth={160}
                headerName="Tipo de creación"
                cellRendererFramework={commonCellRenderer}
              />
            </AgGridColumn>

            <AgGridColumn headerName="Ingresos anuales">
              <AgGridColumn
                field="ingresosMin"
                resizable={true}
                minWidth={200}
                headerName="Ingresos mínimos"
                filter="agNumberColumnFilter"
                cellRendererFramework={commonCellRenderer}
              />

              <AgGridColumn
                field="ingresosMax"
                resizable={true}
                minWidth={200}
                headerName="Ingresos máximos"
                filter="agNumberColumnFilter"
                cellRendererFramework={commonCellRenderer}
              />
            </AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default List;
