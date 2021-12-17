const emptyModel = {
  contacto: {
    nombre: "",
    apellido: "",
    cargo: "",
    correo: "",
    telefonos: [],
    oportunidades: [],
  },

  empleado: {
    nombre: "",
    apellido: "",
    cargo: "",
    correo: "",
    telefonos: [],
    oportunidades: [],
    contactos: [],
  },

  producto: {
    nombre: "",
    codigo: "",
    precio: "",
    descripcion: "",
    categoria: "",
    archivos: [],
    oportunidades: [],
  },

  empresa: {
    nombre: "",
    vertical: "",
    tipo: "",
    etapa: "",
    contactos: [],
    oportunidades: [],
  },
};

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
  contacto: emptyModel.contacto,
};

export const empleadoInitial = {
  lista: [],
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
