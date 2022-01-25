import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  ExpandMore,
  Feed,
  History,
  CurrencyExchange,
  Public,
  PermContactCalendarOutlined,
  EventNote,
  Business,
} from "@mui/icons-material";
import EditorInfo from "./EditorInfo";
import EditorWebSites from "./EditorWebSites";
import { useForm } from "react-hook-form";
import { updateEmpresa } from "../../store/actions/empresa.actions";
import { capitalizeFirstLetter } from "../../helpers/firstLetterUppercase";
import ProgressCircle from "../common/ProgressCircle";
import DireccionesInputs from "./DireccionesInputs";

const DetailAccordion = () => {
  // STATES
  const [radioIngresos, setRadioIngresos] = useState("puntual");
  const [radioEmpleados, setRadioEmpleados] = useState("puntual");
  const [ingresosAnuales, setIngresosAnuales] = useState({
    puntual: 0,
    limInf: 0,
    limSup: 0,
  });
  const [empleadosNumber, setEmpleadosNumber] = useState({
    puntual: 0,
    limInf: 0,
    limSup: 0,
  });
  const [porcentajes, setPorcentajes] = useState({
    info: 0,
    webs: 0,
    nota: 0,
    direcciones: 0,
    data: 0,
    contactos: 0,
    total: 0,
  });
  const dispatch = useDispatch();

  const item = useSelector((store) => store.empresas.empresa);
  const { id } = useParams();

  // Default variable inputs
  let otrasWebsDefault = [];
  let direccionesDefault = [];
  let correosDefault = [];
  let telefonosDefault = [];

  if (item.webs) {
    otrasWebsDefault = item.webs.filter((el) => el.tipo === "otro");
  }

  if (item.direcciones) {
    if (item.direcciones.length > 0) {
      direccionesDefault = item.direcciones;
    } else {
      direccionesDefault = [
        {
          calle: "",
          ciudad: "",
          estado: "",
          codigoPostal: "",
          pais: "",
          tipo: "",
        },
      ];
    }
  }

  if (item.correos) {
    if (item.correos.length > 0) {
      correosDefault = item.correos;
    } else {
      correosDefault = [
        {
          correo: "",
        },
      ];
    }
  }

  if (item.telefonos) {
    if (item.telefonos.length > 0) {
      telefonosDefault = item.telefonos;
    } else {
      telefonosDefault = [
        {
          numero: "",
        },
      ];
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      webs: otrasWebsDefault,
      direcciones: direccionesDefault,
      correos: correosDefault,
      telefonos: telefonosDefault,
    },
  });

  // EFFECTS
  useEffect(() => {
    // SETTING VALUES
    const setValueByTerm = (term) => {
      const website = item.webs.find((el) => el.tipo === term);

      if (website) {
        setValue(term, website.url);
      }
    };

    setValue("nombre", item.nombre);
    setValue("vertical", item.vertical);
    setValue("propiedad", item.propiedad);
    setValue("representante", item.representante);
    setValue("nit", item.nit);
    setValue("nota", item.nota);

    if (item.empleados) {
      if (item.empleados.includes("-")) {
        const array = item.empleados.split("-");
        setRadioEmpleados("rango");
        setEmpleadosNumber({
          ...empleadosNumber,
          limInf: Number(array[0].trim()),
          limSup: Number(array[1].trim()),
        });
      } else {
        setRadioEmpleados("puntual");
        setEmpleadosNumber({ ...empleadosNumber, puntual: item.empleados });
      }
    }

    if (item.ingresos_anuales) {
      if (item.ingresos_anuales.includes("-")) {
        const array = item.ingresos_anuales.split("-");
        setRadioIngresos("rango");
        setIngresosAnuales({
          ...ingresosAnuales,
          limInf: Number(array[0].trim()),
          limSup: Number(array[1].trim()),
        });
      } else {
        setRadioIngresos("puntual");
        setIngresosAnuales({
          ...ingresosAnuales,
          puntual: item.ingresos_anuales,
        });
      }
    }

    if (item.webs.length > 0) {
      setValueByTerm("web");
      setValueByTerm("linkedin");
      setValueByTerm("facebook");
      setValueByTerm("instagram");
      setValueByTerm("twitter");
    }

    // SETTING PERCENTS
    let websValue = 0,
      infoValue = 0,
      notaValue = 0,
      direccionesValue = 0,
      dataValue = 0,
      contactosValue = 0,
      totalValue = 0;

    // webs
    if (item.webs.length >= 5) {
      websValue = 100;
    } else {
      websValue = (item.webs.length * 100) / 5;
    }

    // info
    const array = [
      "nombre",
      "propiedad",
      "vertical",
      "ingresos_anuales",
      "representante",
      "nit",
      "empleados",
    ];

    let completados = 0;

    array.forEach((el) => {
      if (item[el]) {
        completados++;
      }
    });

    if (item.telefonos.length > 0) {
      completados++;
    }

    if (item.correos.length > 0) {
      completados++;
    }

    infoValue = (completados * 100) / 9;

    // direcciones
    if (item.direcciones.length > 0) {
      direccionesValue = 100;
    } else {
      direccionesValue = 0;
    }

    // data
    if (item.nota) {
      if (item.direcciones.length > 0) {
        dataValue = ((completados + 2) * 100) / 10;
      } else {
        dataValue = ((completados + 1) * 100) / 10;
      }

      notaValue = 100;
    } else {
      if (item.direcciones.length > 0) {
        dataValue = ((completados + 1) * 100) / 10;
      } else {
        dataValue = (completados * 100) / 10;
      }

      notaValue = 0;
    }

    // contactos
    if (item.contactos.length >= 4) {
      contactosValue = 100;
    } else {
      contactosValue = (item.contactos.length * 100) / 4;
    }

    // total
    totalValue = (contactosValue + dataValue + websValue) / 3;

    // response
    setPorcentajes({
      info: infoValue,
      webs: websValue,
      nota: notaValue,
      direcciones: direccionesValue,
      data: dataValue,
      contactos: contactosValue,
      total: totalValue,
    });
    // eslint-disable-next-line
  }, [item, setValue]);

  // HANDLES
  const onSubmit = async (data) => {
    Object.keys(data).forEach((el) => {
      if (el === "nombre" || el === "representante") {
        data[el] = capitalizeFirstLetter(data[el]);
      }
    });

    const webName = ["web", "linkedin", "facebook", "instagram", "twitter"];
    const socialMedia = [];

    webName.forEach((el) => {
      const foundElement = item.webs.find((el) => el.tipo === el);

      if (foundElement) {
        socialMedia.push({ url: data[el], tipo: el, id: foundElement.id });
      } else if (!foundElement && data[el]) {
        socialMedia.push({ url: data[el], tipo: el, id: null });
      }
    });

    const {
      nombre,
      nit,
      representante,
      correos,
      vertical,
      propiedad,
      nota,
      webs,
      empleados,
      empleadosInf,
      empleadosSup,
      empleadosFuente,
      ingresos_anuales,
      ingresosInf,
      ingresosSup,
      ingresosFuente,
      direcciones,
    } = data;

    // Ingresos
    let newIngresos = "";
    let newIngresosFuente = "";

    if (radioIngresos === "puntual") {
      if (ingresos_anuales && ingresosFuente) {
        newIngresos = ingresos_anuales;
        newIngresosFuente = ingresosFuente;
      }
    } else {
      if (ingresosInf && ingresosSup && ingresosFuente) {
        let ingresosMin = 0;
        let ingresosMax = 0;

        if (Number(ingresosInf) <= Number(ingresosSup)) {
          ingresosMin = ingresosInf;
          ingresosMax = ingresosSup;
        } else {
          ingresosMin = ingresosSup;
          ingresosMax = ingresosInf;
        }

        newIngresos = `${ingresosMin} - ${ingresosMax}`;
        newIngresosFuente = ingresosFuente;
      }
    }

    // Empleados
    let newEmpleados = "";
    let newEmpleadosFuente = "";

    if (radioEmpleados === "puntual") {
      if (empleados && empleadosFuente) {
        newEmpleados = empleados;
        newEmpleadosFuente = empleadosFuente;
      }
    } else {
      if (empleadosInf && empleadosSup && empleadosFuente) {
        let empleadosMin = 0;
        let empleadosMax = 0;

        if (Number(empleadosInf) <= Number(empleadosSup)) {
          empleadosMin = empleadosInf;
          empleadosMax = empleadosSup;
        } else {
          empleadosMin = empleadosSup;
          empleadosMax = empleadosInf;
        }

        newEmpleados = `${empleadosMin} - ${empleadosMax}`;
        newEmpleadosFuente = empleadosFuente;
      }
    }

    const newData = {
      nombre,
      nit,
      representante,
      correos,
      vertical,
      propiedad,
      ingresos_anuales: newIngresos,
      ingresosFuente: newIngresosFuente,
      empleados: newEmpleados,
      empleadosFuente: newEmpleadosFuente,
      nota,
      direcciones,
      webs: [...webs, ...socialMedia],
    };

    console.log(data);
    console.log(newData);

    // dispatch(
    //   updateEmpresa({
    //     ...newData,
    //     id,
    //   })
    // );
  };

  // RULES
  const notasRules = register("nota", {
    maxLength: {
      value: 1000,
      message: "Nota muy larga (máximo 1000 caracteres).",
    },
  });

  // RENDER
  return (
    <div className="detailAccordion box">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <h2 className="accordionTitle">
              <Feed color="primary" className="me-3" />
              Información
              <ProgressCircle value={porcentajes.info} />
            </h2>
          </AccordionSummary>

          <AccordionDetails>
            <EditorInfo
              register={register}
              errors={errors}
              radioIngresos={radioIngresos}
              setRadioIngresos={setRadioIngresos}
              radioEmpleados={radioEmpleados}
              setRadioEmpleados={setRadioEmpleados}
              control={control}
              empresa={item}
              empleadosDefault={empleadosNumber}
              ingresosDefault={ingresosAnuales}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <h2 className="accordionTitle">
              <Public color="primary" className="me-3" />
              Sitios web
              <ProgressCircle value={porcentajes.webs} />
            </h2>
          </AccordionSummary>

          <AccordionDetails>
            <EditorWebSites
              register={register}
              errors={errors}
              control={control}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <h2 className="accordionTitle">
              <Business color="primary" className="me-3" />
              Direcciones
              <ProgressCircle value={porcentajes.direcciones} />
            </h2>
          </AccordionSummary>

          <AccordionDetails>
            <DireccionesInputs control={control} errors={errors} />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <h2 className="accordionTitle">
              <EventNote color="primary" className="me-3" />
              Notas e información adicional
              <ProgressCircle value={porcentajes.nota} />
            </h2>
          </AccordionSummary>

          <AccordionDetails>
            <div className="upFormInputsBox">
              <TextField
                label="Notas adicionales"
                size="small"
                multiline
                rows={3}
                maxRows={5}
                {...notasRules}
                error={errors.nota ? true : false}
                helperText={errors.nota ? errors.nota.message : ""}
              />
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <h2 className="accordionTitle">
              <PermContactCalendarOutlined color="primary" className="me-3" />
              Contactos ({item.contactos.length})
              <ProgressCircle value={porcentajes.contactos} />
            </h2>
          </AccordionSummary>

          <AccordionDetails>Body</AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <h2 className="accordionTitle">
              <History color="primary" className="me-3" />
              Historial
            </h2>
          </AccordionSummary>

          <AccordionDetails>Body</AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <h2 className="accordionTitle">
              <CurrencyExchange color="primary" className="me-3" />
              Oportunidades
            </h2>
          </AccordionSummary>

          <AccordionDetails>Body</AccordionDetails>
        </Accordion>

        <div className="editorButtonBox">
          <div>
            Perfil Completo en <ProgressCircle value={porcentajes.total} />
          </div>
          <Button
            className="me-2 text-white"
            type="button"
            variant="contained"
            color="warning"
            disabled={
              item.contactos.length > 0 && porcentajes.total > 65 ? false : true
            }
          >
            Activar prospecto
          </Button>

          <Button type="submit" variant="contained">
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DetailAccordion;
