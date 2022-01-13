import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  ExpandMore,
  Feed,
  History,
  CurrencyExchange,
  Public,
} from "@mui/icons-material";
import EditorInfo from "./EditorInfo";
import EditorWebSites from "./EditorWebSites";
import { useForm } from "react-hook-form";
import { updateEmpresa } from "../../store/actions/empresa.actions";
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

  const item = useSelector((store) => store.empresas.empresa);
  const { id } = useParams();

  // EFFECTS
  useEffect(() => {
    setValue("nombre", item.nombre);
    setValue("vertical", item.vertical);
    setValue("propiedad", item.propiedad);
    setValue("ingresos_anuales", item.ingresos_anuales);
    setValue("web", item.web);
    setValue("linkedin", item.linkedin);
    setValue("facebook", item.facebook);
    setValue("instagram", item.instagram);
    setValue("twitter", item.twitter);
  }, [item, setValue]);

  // HANDLES
  const onSubmit = (data) => {
    Object.keys(data).forEach((el) => {
      if (el === "nombre") {
        data[el] = capitalizeFirstLetter(data[el]);
      }
    });

    dispatch(
      updateEmpresa({
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
              Información
            </h2>
          </AccordionSummary>

          <AccordionDetails>
            <EditorInfo register={register} errors={errors} />
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
      </form>
    </div>
  );
};

export default DetailAccordion;
