import { useRef } from "react";
import { Link } from "react-router-dom";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { getProductos } from "../../store/actions/producto.actions";
import { capitalizeFirstLetter as capitalize } from "../../helpers/firstLetterUppercase";
import { Button } from "@mui/material";
import { toggleUpdate } from "../../store/actions/modals.action";
import { gridEs } from "../../constants/gridEs";

const List = ({ getInitial, titulo }) => {
  // INITIALIZATION
  const dispatch = useDispatch();
  const gridApi = useRef();

  // FUNCTIONS
  const linkRenderer = (params) => {
    return <Link to={`/contactos/${params.data.id}`}>{params.value}</Link>;
  };

  const valueFormatterPrice = (params) => {
    if (params.value) {
      return `${params.value}$`;
    } else return "";
  };

  // GETTING ROWS
  const rows = useSelector((store) => store.contactos.lista).map((el) => {
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
    dispatch(getProductos());
    gridApi.current = params.api;
  };

  // FUNCTIONS

  // console.log(gridApi.current.getSelectedNodes());

  // RENDER
  return (
    <div className="mainTableBox1">
      <div className="mainTableBox2">
        <h1 className="tableTitle">Productos</h1>

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
              />

              <AgGridColumn field="categoria" resizable={true} minWidth={160} />

              <AgGridColumn
                field="precio"
                resizable={true}
                minWidth={160}
                filter="agNumberColumnFilter"
                valueFormatter={valueFormatterPrice}
              />
            </AgGridColumn>
          </AgGridReact>
        </div>

        <div className="tablefooterBtn">
          <Button
            className="ms-3"
            variant="contained"
            onClick={() => dispatch(toggleUpdate("productoCreate", null))}
          >
            Crear nuevo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default List;
