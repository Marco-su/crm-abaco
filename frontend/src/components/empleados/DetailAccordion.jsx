import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  ExpandMore,
  Feed,
  History,
  CurrencyExchange,
  Public,
  Work,
} from "@mui/icons-material";
import EditorPersonalInfo from "./EditorPersonalInfo";
import EditorWorkingInfo from "./EditorWorkingInfo";
import EditorWebSites from "./EditorWebSites";
import { useForm } from "react-hook-form";
import { updateEmpleado } from "../../store/actions/empleado.actions";
import { capitalizeFirstLetter } from "../../helpers/firstLetterUppercase";

const DetailAccordion = () => {
  // STATES
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const item = useSelector((store) => store.empleados.empleado);
  const { id } = useParams();

  // EFFECT
  useEffect(() => {
    setValue("nombre", item.nombre);
    setValue("apellido", item.apellido);
    setValue("dni", item.dni);
    setValue("correo", item.correo);
    setValue("correoEmpresa", item.correoEmpresa);
    setValue("cargo", item.cargo);
    setValue("linkedin", item.linkedin);
    setValue("facebook", item.facebook);
    setValue("instagram", item.instagram);
    setValue("twitter", item.twitter);
  }, [item, setValue]);

  // HANDLES
  const onSubmit = (data) => {
    Object.keys(data).forEach((el) => {
      if (el === "nombre" || el === "apellido") {
        data[el] = capitalizeFirstLetter(data[el]);
      }
    });

    dispatch(
      updateEmpleado({
        ...data,
        id,
      })
    );
  };

  // RENDER
  return (
    <div className="detailAccordion box">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <h2>
              <Feed color="info" className="me-3" />
              Información Personal
            </h2>
          </AccordionSummary>

          <AccordionDetails>
            <EditorPersonalInfo register={register} errors={errors} />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <h2>
              <Work color="info" className="me-3" />
              Información Laboral
            </h2>
          </AccordionSummary>

          <AccordionDetails>
            <EditorWorkingInfo register={register} errors={errors} />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <h2>
              <Public color="info" className="me-3" />
              Sitios web
            </h2>
          </AccordionSummary>

          <AccordionDetails>
            <EditorWebSites register={register} errors={errors} />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <h2>
              <History color="info" className="me-3" />
              Historial
            </h2>
          </AccordionSummary>

          <AccordionDetails>Body</AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <h2>
              <CurrencyExchange color="info" className="me-3" />
              Oportunidades
            </h2>
          </AccordionSummary>

          <AccordionDetails>Body</AccordionDetails>
        </Accordion>

        <div className="editorButtonBox">
          <Button type="submit" variant="contained">
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DetailAccordion;
