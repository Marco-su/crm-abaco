import path from "path";
import csv from "../../assets/img/csv.png";
import docx from "../../assets/img/docx.png";
import excel from "../../assets/img/excel.png";
import exe from "../../assets/img/exe.png";
import gif from "../../assets/img/gif.png";
import image from "../../assets/img/image.png";
import mp4 from "../../assets/img/mp4.png";
import otro from "../../assets/img/otro.png";
import pdf from "../../assets/img/pdf.png";
import png from "../../assets/img/png.png";
import rar from "../../assets/img/rar.png";
import txt from "../../assets/img/txt.png";
import video from "../../assets/img/video.png";
import zip from "../../assets/img/zip.png";

const FileImage = ({ file }) => {
  const ext = path.extname(file.name);

  switch (ext) {
    case ".csv":
      return (
        <>
          <img src={csv} alt={file.name} />
        </>
      );

    case ".xlsx" ||
      ".xlsm" ||
      ".xlsb" ||
      ".xltx" ||
      ".xltm" ||
      ".xls" ||
      ".xlt" ||
      ".xls" ||
      ".xml" ||
      ".xml" ||
      ".xlam" ||
      ".xla" ||
      ".xlw" ||
      ".xlr":
      return (
        <>
          <img src={excel} alt={file.name} />
        </>
      );

    case ".exe":
      return (
        <>
          <img src={exe} alt={file.name} />
        </>
      );

    case ".gif":
      return (
        <>
          <img src={gif} alt={file.name} />
        </>
      );

    case ".mp4":
      return (
        <>
          <img src={mp4} alt={file.name} />
        </>
      );

    case ".pdf":
      return (
        <>
          <img src={pdf} alt={file.name} />
        </>
      );

    case ".png":
      return (
        <>
          <img src={png} alt={file.name} />
        </>
      );

    case ".rar":
      return (
        <>
          <img src={rar} alt={file.name} />
        </>
      );

    case ".zip":
      return (
        <>
          <img src={zip} alt={file.name} />
        </>
      );

    case ".txt":
      return (
        <>
          <img src={txt} alt={file.name} />
        </>
      );

    case ".webm" ||
      ".mpg" ||
      ".mp2" ||
      ".mpeg" ||
      ".mpe" ||
      ".mpv" ||
      ".ogg" ||
      ".m4p" ||
      ".m4v" ||
      ".avi" ||
      ".wmv" ||
      ".mov" ||
      ".qt" ||
      ".flv" ||
      ".swf":
      return (
        <>
          <img src={video} alt={file.name} />
        </>
      );

    case ".jpg" || ".jpeg" || ".bmp" || ".tif" || ".tiff":
      return (
        <>
          <img src={image} alt={file.name} />
        </>
      );

    case ".docx":
      return (
        <>
          <img src={docx} alt={file.name} />
        </>
      );

    default:
      return (
        <>
          <img src={otro} alt={file.name} />
        </>
      );
  }
};

export default FileImage;
