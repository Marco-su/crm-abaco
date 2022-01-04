import "../../assets/css/common/tables.css";

// HOOKS AND FUNCTIONS
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContactos } from "../../store/actions/contacto.actions";
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
  const [selected, setSelected] = useState([]);

  const dispatch = useDispatch();

  const columns = [
    {
      field: "Nombre",
      width: 200,
      renderCell: (params) => {
        return (
          <Link to={`/contactos/${params.value.id}`}>
            {params.value.nombre} {params.value.apellido}
          </Link>
        );
      },
    },

    { field: "Cargo", width: 200 },
    { field: "Correo", width: 300 },
    { field: "Empresa", width: 320 },
    { field: "Teléfono", width: 150 },
    { field: "Móvil", width: 150 },

    {
      field: "Acciones",
      type: "action",
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() =>
                dispatch(toggleUpdate("contacto", params.value.id))
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
                  toggleDelete("contacto", params.value.id, params.value.nombre)
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

  const rows = useSelector((store) => store.contactos.lista).map((el) => {
    return {
      id: el.id,
      Nombre: el,
      Cargo: el.cargo,
      Correo: el.correo,
      Empresa: el.empresa.nombre,
      Acciones: el,
    };
  });

  // EFFECT
  useEffect(() => {
    dispatch(getContactos());
  }, [dispatch]);

  // RENDER
  return (
    <div className="mainTableBox1">
      <div className="mainTableBox2">
        <h1 className="tableTitle">Contactos</h1>

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
              setSelected(newSelection);
            }}
          />
        </div>

        <div className="tablefooterBtn">
          <Button
            className="ms-3"
            variant="contained"
            onClick={() => dispatch(toggleUpdate("contactoCreate", null))}
          >
            Crear nuevo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Table;
