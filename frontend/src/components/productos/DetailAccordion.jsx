import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  ExpandMore,
  Feed,
  History,
  CurrencyExchange,
  InsertDriveFileOutlined,
} from "@mui/icons-material";
import EditorInfo from "./EditorInfo";
import { useForm } from "react-hook-form";
import { updateProducto } from "../../store/actions/producto.actions";
import { capitalizeFirstLetter } from "../../helpers/firstLetterUppercase";

const DetailAccordion = () => {
  // STATES
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  const item = useSelector((store) => store.productos.producto);
  const { id } = useParams();

  // EFFECT
  useEffect(() => {
    setValue("nombre", item.nombre);
    setValue("codigo", item.codigo);
    setValue("descripcion", item.descripcion);
    setValue("precio", item.precio);
  }, [item, setValue]);

  // HANDLES
  const onSubmit = (data) => {
    Object.keys(data).forEach((el) => {
      if (el === "nombre") {
        data[el] = capitalizeFirstLetter(data[el]);
      }
    });

    dispatch(
      updateProducto({
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
            <EditorInfo register={register} errors={errors} control={control} />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <h2>
              <InsertDriveFileOutlined color="info" className="me-3" />
              Archivos
            </h2>
          </AccordionSummary>

          <AccordionDetails>Body</AccordionDetails>
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
