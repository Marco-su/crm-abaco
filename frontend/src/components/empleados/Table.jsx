// HOOKS AND FUNCTIONS
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmpleados } from "../../store/actions/empleado.actions";
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
  const findPhone = (employee) => {
    const item = employee.telefonos.find((el) => el.tipo === "telefono");
    return item ? `+${item.codPais} ${item.numero}` : "";
  };

  const findMovile = (employee) => {
    const item = employee.telefonos.find((el) => el.tipo === "movil");
    return item ? `+${item.codPais} ${item.numero}` : "";
  };

  // STATES
  const dispatch = useDispatch();

  const columns = [
    {
      field: "Nombre",
      width: 200,
      renderCell: (params) => {
        return (
          <Link to={`/empleados/${params.value.id}`}>
            {params.value.nombre} {params.value.apellido}
          </Link>
        );
      },
    },

    { field: "Cargo", width: 200 },
    { field: "Correo", width: 300 },
    { field: "dni", headerName: "Documento de identidad", width: 200 },
    {
      field: "empleados",
      headerName: "Empleados a cargo",
      width: 150,
      align: "center",
    },
    { field: "telf", headerName: "Teléfono", width: 200 },
    { field: "movil", headerName: "Móvil", width: 200 },

    {
      field: "Acciones",
      type: "action",
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() =>
                dispatch(toggleUpdate("empleado", params.value.id))
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
                  toggleDelete("empleado", params.value.id, params.value.nombre)
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

  const rows = useSelector((store) => store.empleados.lista).map((el) => {
    return {
      id: el.id,
      Nombre: el,
      Cargo: el.cargo,
      Correo: el.correo,
      dni: el.dni,
      empleados: el.empleados,
      telf: findPhone(el),
      movil: findMovile(el),
      Acciones: el,
    };
  });

  // EFFECT
  useEffect(() => {
    dispatch(getEmpleados());
  }, [dispatch]);

  // RENDER
  return (
    <div className="mainTableBox1">
      <div className="mainTableBox2">
        <h1 className="tableTitle">Empleados</h1>

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
            onClick={() => dispatch(toggleUpdate("empleadoCreate", null))}
          >
            Crear nuevo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Table;
