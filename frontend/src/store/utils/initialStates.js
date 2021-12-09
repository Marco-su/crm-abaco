export const modalsInitial = {
  id: null,
  updateType: "",
  updateIsOpen: false,
  deleteType: "",
  deleteIsOpen: false,
  deleteName: "",
};

export const contactoInitial = {
  lista: [],
  contacto: { nombre: "", apellido: "", cargo: "", correo: "", telefonos: [] },
};

export const empleadoInitial = {
  lista: [],
  empleado: { nombre: "", apellido: "", cargo: "", correo: "", telefonos: [] },
};

export const productoInitial = {
  lista: [],
  producto: {
    nombre: "",
    codigo: "",
    precio: "",
    descripcion: "",
    categoria: "",
  },
};

export const empresaInitial = {
  lista: [],
  prospectos: [],
  clientes: [],
  empresa: { nombre: "", vertical: "", tipo: "", etapa: "" },
};
