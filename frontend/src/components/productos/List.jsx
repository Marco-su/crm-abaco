import { useRef } from "react";
import { Link } from "react-router-dom";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { getProductos } from "../../store/actions/producto.actions";
import { capitalizeFirstLetter as capitalize } from "../../helpers/firstLetterUppercase";
import { Button, Tooltip, IconButton } from "@mui/material";
import { Spinner } from "reactstrap";
import { toggleUpdate } from "../../store/actions/modals.action";
import { gridEs } from "../../constants/gridEs";
import { FilterAltOffOutlined, Replay } from "@mui/icons-material";

const List = () => {
  // INITIALIZATION
  const dispatch = useDispatch();
  const gridApi = useRef();
  const isLoading = useSelector((store) => store.global.tableLoading);

  // FUNCTIONS
  const linkRenderer = (params) => {
    return <Link to={`/contactos/${params.data.id}`}>{params.value}</Link>;
  };

  const commonCellRenderer = (params) => {
    if (params.value) {
      return <span>{params.value}</span>;
    } else {
      return <span className="text-gray">Vacío</span>;
    }
  };

  const valueFormatterPrice = (params) => {
    if (params.value) {
      return <span>{params.value}$</span>;
    } else {
      return <span className="text-gray">Vacío</span>;
    }
  };

  // GETTING ROWS
  const list = useSelector((store) => store.contactos.lista);
  const rows = list.map((el) => {
    return {
      id: el.id,
      nombre: capitalize(el.nombre),
      categoria: el.categoria ? capitalize(el.categoria) : "",
      desc: el.descripcion ? capitalize(el.descripcion) : "",
      cod: el.codigo ? el.codigo : "",
      precio: el.precio ? el.precio : "",
      acciones: el.nombre,
    };
  });

  // SETTING COLS
  const onGridReady = (params) => {
    if (list.length === 0) {
      dispatch(getProductos());
    }

    gridApi.current = params.api;
  };

  // FUNCTIONS

  // console.log(gridApi.current.getSelectedNodes());

  // RENDER
  return (
    <div className="mainTableBox1">
      <div className="table-btn-box">
        <Button
          className="ms-3 pill-button"
          variant="contained"
          onClick={() => dispatch(toggleUpdate("productoCreate", null))}
        >
          Crear nuevo
        </Button>
      </div>

      <div className="mainTableBox2">
        <div className="titleTableBox">
          <h1 className="tableTitle">Productos</h1>

          <Tooltip title="Actualizar lista">
            {isLoading ? (
              <div className="spinnerBox">
                <Spinner color="primary" />
              </div>
            ) : (
              <IconButton
                color="info"
                onClick={() => {
                  dispatch(getProductos());
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
            rowData={isLoading ? null : rows}
            suppressLoadingOverlay={true}
            suppressRowClickSelection={true}
            rowSelection={"multiple"}
            ref={gridApi}
            pagination={true}
            paginationPageSize={150}
            enableCellTextSelection={true}
          >
            <AgGridColumn headerName="Datos">
              <AgGridColumn
                field="nombre"
                headerName="Nombre de producto"
                resizable={true}
                cellRendererFramework={linkRenderer}
                minWidth={250}
                headerCheckboxSelection={true}
                headerCheckboxSelectionFilteredOnly={true}
                checkboxSelection={true}
              />

              <AgGridColumn
                field="desc"
                resizable={true}
                minWidth={180}
                maxWidth={400}
                headerName="Descripcion de producto"
                cellRendererFramework={commonCellRenderer}
              />

              <AgGridColumn field="categoria" resizable={true} minWidth={160} />

              <AgGridColumn
                field="precio"
                resizable={true}
                minWidth={160}
                filter="agNumberColumnFilter"
                cellRendererFramework={valueFormatterPrice}
              />
            </AgGridColumn>
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default List;
