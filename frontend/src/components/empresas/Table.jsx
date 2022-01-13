import "../../assets/css/common/tables.css";

// HOOKS AND FUNCTIONS
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
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

const Table = ({ getInitial, titulo }) => {
  // STATES
  const dispatch = useDispatch();
  const location = useLocation();

  const columns = [
    {
      field: "Nombre",
      width: 370,
      renderCell: (params) => {
        return (
          <Link to={`/empresas/${params.value.id}`}>{params.value.nombre}</Link>
        );
      },
    },

    { field: "Sector", width: 200 },
    { field: "Tipo", width: 300 },

    {
      field: "Acciones",
      type: "action",
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => dispatch(toggleUpdate("empresa", params.value.id))}
            >
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="crudIcon editIcon"
              />
            </button>

            <button
              onClick={() =>
                dispatch(
                  toggleDelete("empresa", params.value.id, params.value.nombre)
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
      Nombre: el,
      Sector: el.vertical,
      Tipo: el.tipo,
      Acciones: el,
    };
  });

  // EFFECT
  useEffect(() => {
    dispatch(getInitial());
  }, [dispatch, getInitial]);

  // RENDER
  return (
    <div className="mainTableBox1">
      <div className="mainTableBox2">
        <h1 className="tableTitle">{titulo}</h1>

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
            onClick={() => dispatch(toggleUpdate("empresaCreate", null))}
          >
            Crear nuevo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Table;
