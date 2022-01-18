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
  PermContactCalendarOutlined,
} from "@mui/icons-material";
import EditorInfo from "./EditorInfo";
import EditorWebSites from "./EditorWebSites";
import { useForm } from "react-hook-form";
import { updateEmpresa } from "../../store/actions/empresa.actions";
import { capitalizeFirstLetter } from "../../helpers/firstLetterUppercase";

const DetailAccordion = () => {
  // STATES
  const dispatch = useDispatch();

  const item = useSelector((store) => store.empresas.empresa);
  const otrasWebsDefault = item.webs.filter((el) => el.tipo === "otro");
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      webs: otrasWebsDefault,
    },
  });

  // EFFECTS
  useEffect(() => {
    const setValueByTerm = (term) => {
      const website = item.webs.find((el) => el.tipo === term);

      if (website) {
        setValue(term, website.url);
      }
    };

    setValue("nombre", item.nombre);
    setValue("vertical", item.vertical);
    setValue("propiedad", item.propiedad);
    setValue("ingresos_anuales", item.ingresos_anuales);
    setValue("representante", item.representante);
    setValue("nit", item.nit);
    setValue("correo", item.correo);
    setValue("empleados", item.empleados);

    if (item.webs.length > 0) {
      setValueByTerm("web");
      setValueByTerm("linkedin");
      setValueByTerm("facebook");
      setValueByTerm("instagram");
      setValueByTerm("twitter");
    }
  }, [item, setValue]);

  // HANDLES
  const onSubmit = async (data) => {
    Object.keys(data).forEach((el) => {
      if (el === "nombre" || el === "representante") {
        data[el] = capitalizeFirstLetter(data[el]);
      }
    });

    const {
      nombre,
      nit,
      representante,
      correo,
      vertical,
      propiedad,
      empleados,
      ingresos,
      nota,
    } = data;

    const newData = {
      nombre,
      nit,
      representante,
      correo,
      vertical,
      propiedad,
      empleados,
      ingresos,
      nota,
    };

    console.log(data);

    // dispatch(
    //   updateEmpresa({
    //     ...data,
    //     id,
    //   })
    // );
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
            <EditorWebSites
              register={register}
              errors={errors}
              item={item}
              control={control}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <h2>
              <PermContactCalendarOutlined color="info" className="me-3" />
              Contactos
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
