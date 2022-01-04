import { IconButton, Tooltip } from "@mui/material";
import { Attachment } from "@mui/icons-material";

const AduntarBtn = ({ selectedFiles, setSelectedFiles }) => {
  return (
    <label htmlFor="upload-photo">
      <input
        multiple
        style={{ display: "none" }}
        id="upload-photo"
        name="upload-photo"
        type="file"
        onChange={(e) =>
          setSelectedFiles([...selectedFiles, ...e.target.files])
        }
      />

      <Tooltip placement="top" title="Adjuntar archivos">
        <IconButton color="info" component="span" className="ms-2">
          <Attachment />
        </IconButton>
      </Tooltip>
    </label>
  );
};

export default AduntarBtn;
