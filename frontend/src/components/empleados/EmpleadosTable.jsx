
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmpleados } from "../../store/actions/empleado.actions";
import {
  toggleUpdate,
  toggleDelete,
  toggleDeleteMany,
  setSelected,
} from "../../store/actions/modals.action";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const headCells = [
  {
    id: "nombre",
    numeric: false,
    disablePadding: true,
    label: "Nombre completo",
  },
  {
    id: "cargo",
    numeric: true,
    disablePadding: false,
    label: "Cargo",
  },
  {
    id: "telefono",
    numeric: true,
    disablePadding: false,
    label: "Tel??fono",
  },
  {
    id: "movil",
    numeric: true,
    disablePadding: false,
    label: "M??vil",
  },
  {
    id: "correo",
    numeric: true,
    disablePadding: false,
    label: "Correo",
  },
];

const EnhancedTableHead = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell className="cellIcons"></TableCell>
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, dispatch, selected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
      className="tableTitle"
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected === 1
            ? `${numSelected} empleado seleccionado`
            : `${numSelected} empleados seleccionados`}
        </Typography>
      ) : (
        <h1 className="tableTitle">Empleados</h1>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Eliminar Seleccionados">
          <button
            className="redIconBtn"
            onClick={() => dispatch(toggleDeleteMany("empleado", selected))}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="deleteManyIcon" />
          </button>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nombre");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);

  const selected = useSelector((store) => store.modals.arrayIds);

  const dispatch = useDispatch();

  const createData = (id, nombre, cargo, telefono, movil, correo) => {
    return {
      id,
      nombre,
      cargo,
      telefono,
      movil,
      correo,
    };
  };

  const findPhone = (employee) => {
    const item = employee.telefonos.find((el) => el.tipo === "telefono");
    return item ? `+${item.codPais} ${item.numero}` : "";
  };

  const findMovile = (employee) => {
    const item = employee.telefonos.find((el) => el.tipo === "movil");
    return item ? `+${item.codPais} ${item.numero}` : "";
  };

  const createRows = (list) => {
    const createdList = [];

    list.forEach((row) => {
      const nombre = `${row.nombre} ${row.apellido}`;
      const telefono = findPhone(row);
      const movil = findMovile(row);

      createdList.push(
        createData(row.id, nombre, row.cargo, telefono, movil, row.correo)
      );
    });

    return createdList;
  };

  const rows = createRows(useSelector((store) => store.empleados.lista));

  useEffect(() => {
    dispatch(getEmpleados());
  }, [dispatch]);

  const handleRequestSort = (e, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      dispatch(setSelected(newSelecteds));
      return;
    }
    dispatch(setSelected([]));
  };

  const handleClick = (e, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    dispatch(setSelected(newSelected));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div className="mainTableBox">
      <EnhancedTableToolbar
        numSelected={selected.length}
        dispatch={dispatch}
        selected={selected}
      />
      <TableContainer className="tableContainer">
        <Table aria-labelledby="tableTitle" size="small">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(e) => handleClick(e, row.id)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <Link to={`/empleados/${row.id}`}>{row.nombre}</Link>
                    </TableCell>
                    <TableCell>{row.cargo}</TableCell>
                    <TableCell>+{row.telefono}</TableCell>
                    <TableCell>+{row.movil}</TableCell>
                    <TableCell>{row.correo}</TableCell>
                    <TableCell className="cellIcons">
                      <button
                        onClick={() =>
                          dispatch(toggleUpdate("empleado", row.id))
                        }
                      >
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          className="crudIcon editIcon"
                        />
                      </button>
                      <button
                        onClick={() =>
                          dispatch(toggleDelete("empleado", row.id, row.nombre))
                        }
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="crudIcon deleteIcon"
                        />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 33 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="paginationBox">
        <div className="tablefooterBtn">
          <Button
            className="ms-3"
            variant="contained"
            onClick={() => dispatch(toggleUpdate("empleadoCreate", null))}
          >
            Crear nuevo
          </Button>
        </div>

        <TablePagination
          rowsPerPageOptions={[30, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          // labelDisplayedRows={({ from, to, count }) =>
          //   `${from}-${to} de ${count}`
          // }
          className="tablePagination"
        />
      </div>
    </div>
  );
}
