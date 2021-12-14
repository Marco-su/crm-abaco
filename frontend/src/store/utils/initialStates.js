export const modalsInitial = {
  id: null,
  updateType: "",
  updateIsOpen: false,
  deleteType: "",
  deleteIsOpen: false,
  deleteName: "",
  deleteManyIsOpen: false,
  arrayIds: [],
};

export const contactoInitial = {
  lista: [],
  contacto: {
    nombre: "",
    apellido: "",
    cargo: "",
    correo: "",
    telefonos: [],
    oportunidades: [],
  },
};

export const empleadoInitial = {
  lista: [],
  empleado: {
    nombre: "",
    apellido: "",
    cargo: "",
    correo: "",
    telefonos: [],
    oportunidades: [],
    contactos: [],
  },
};

export const productoInitial = {
  lista: [],
  producto: {
    nombre: "",
    codigo: "",
    precio: "",
    descripcion: "",
    categoria: "",
    archivos: [],
  },
};

export const empresaInitial = {
  lista: [],
  prospectos: [],
  clientes: [],
  empresa: { nombre: "", vertical: "", tipo: "", etapa: "", contactos: [] },
};
