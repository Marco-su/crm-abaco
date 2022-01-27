const emptyModel = {
  contacto: {
    id: "",
    nombre: "",
    apellido: "",
    cargo: "",
    correo: "",
    telefonos: [],
    oportunidades: [],
  },

  empleado: {
    id: "",
    nombre: "",
    apellido: "",
    cargo: "",
    correo: "",
    telefonos: [],
    oportunidades: [],
    contactos: [],
  },

  producto: {
    id: "",
    nombre: "",
    codigo: "",
    precio: "",
    descripcion: "",
    categoria: "",
    archivos: [],
    oportunidades: [],
  },

  empresa: {
    id: "",
    nombre: "",
    vertical: "",
    tipo: "",
    etapa: "",
    contactos: [],
    oportunidades: [],
    correos: [],
    telefonos: [],
    webs: [],
  },
};

export const globalInitial = {
  isAuth: localStorage.getItem("token") ? true : false,
  isMenuOpen: true,
  tableLoading: true,
  detailViewType: "amplia",
  actualMasiveStep: 0,
};

export const modalsInitial = {
  id: null,
  updateType: "",
  updateIsOpen: false,
  deleteType: "",
  deleteIsOpen: false,
  deleteName: "",
  deleteManyIsOpen: false,
  readOnlyEmpresa: false,
  arrayIds: [],
};

export const contactoInitial = {
  lista: [],
  contacto: emptyModel.contacto,
};

export const empleadoInitial = {
  lista: [],
  errorLogin: "",
  empleado: emptyModel.empleado,
};

export const productoInitial = {
  lista: [],
  producto: emptyModel.producto,
};

export const empresaInitial = {
  lista: [],
  prospectos: [],
  clientes: [],
  empresa: emptyModel.empresa,
};

export const oportunidadInitial = {
  lista: [],
  oportunidad: {
    nombre: "",
    empresa: emptyModel.empresa,
    contacto: emptyModel.contacto,
    empleado: emptyModel.empleado,
    etapa: "",
  },
};
