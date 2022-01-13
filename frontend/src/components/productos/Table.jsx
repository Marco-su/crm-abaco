import "../../assets/css/common/tables.css";

// HOOKS AND FUNCTIONS
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductos } from "../../store/actions/producto.actions";
import {
  toggleUpdate,
  toggleDelete,
  toggleDeleteMany,
  setSelected,
} from "../../store/actions/modals.action";

// COMPONENTS
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
};

const Table = () => {
  // STATES
  const dispatch = useDispatch();

  const columns = [
    {
      field: "Nombre",
      width: 300,
      renderCell: (params) => {
        return (
          <Link to={`/productos/${params.value.id}`}>
            {params.value.nombre}
          </Link>
        );
      },
      sortComparator: (v1, v2) => v1.nombre.localeCompare(v2.nombre),
    },

    { field: "categoria", headerName: "Categoría", width: 250 },
    { field: "desc", headerName: "Descripción", width: 350 },
    { field: "cod", headerName: "Código de producto", width: 200 },
    { field: "precio", headerName: "Costo base", width: 150, align: "right" },

    {
      field: "Acciones",
      type: "action",
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() =>
                dispatch(toggleUpdate("producto", params.value.id))
              }
            >
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="crudIcon editIcon"
              />
            </button>

            <button
              onClick={() =>
                dispatch(
                  toggleDelete("producto", params.value.id, params.value.nombre)
                )
              }
            >
              <FontAwesomeIcon
                icon={faTrashAlt}
                className="crudIcon deleteIcon"
              />
            </button>
          </>
        );
      },
    },
  ];

  const rows = useSelector((store) => store.productos.lista).map((el) => {
    return {
      id: el.id,
      Nombre: el,
      categoria: el.categoria,
      desc: el.descripcion,
      cod: el.codigo,
      precio: `${el.precio}$`,
      Acciones: el,
    };
  });

  // EFFECT
  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);

  // RENDER
  return (
    <div className="mainTableBox1">
      <div className="mainTableBox2">
        <h1 className="tableTitle">Productos</h1>

        <div className="mainTableBox3">
          <DataGrid
            checkboxSelection
            columns={columns}
            rows={rows}
            density="compact"
            pageSize={50}
            components={{
              Toolbar: CustomToolbar,
            }}
            onSelectionModelChange={(newSelection) => {
              dispatch(setSelected(newSelection));
            }}
          />
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

export default Table;
