import "../../assets/css/navigation/sidebar.css";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  BadgeOutlined,
  BusinessOutlined,
  PriceCheck,
  BusinessCenterOutlined,
  EventOutlined,
  CallOutlined,
  FilterAltOutlined,
  TrendingUpOutlined,
  StorefrontOutlined,
  CurrencyExchangeOutlined,
  PointOfSaleOutlined,
  ReportGmailerrorredOutlined,
  EmailOutlined,
  VideocamOutlined,
  PermContactCalendarOutlined,
  BarChartOutlined,
} from "@mui/icons-material";

const Sidebar = () => {
  return (
    <div id="sidebar">
      <div className="menuSection">
        <h3>Principal</h3>
        <ul>
          <li>
            <Link to="/">
              <HomeOutlined />
              <span>Inicio</span>
            </Link>
            <Link to="/productos">
              <StorefrontOutlined />
              <span>Productos</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="menuSection">
        <h3>Empresas</h3>
        <ul>
          <li>
            <Link to="/empresas">
              <BusinessOutlined />
              <span>Empresas</span>
            </Link>
          </li>
          <li>
            <Link to="/prospectos">
              <BusinessCenterOutlined />
              <span>Prospectos</span>
            </Link>
          </li>
          <li>
            <Link to="/clientes">
              <PriceCheck />
              <span>Clientes</span>
            </Link>
          </li>
          <li>
            <Link to="/contactos">
              <PermContactCalendarOutlined />
              <span>Contactos</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="menuSection">
        <h3>Personal</h3>
        <ul>
          <li>
            <Link to="/empleados">
              <BadgeOutlined />
              <span>Empleados</span>
            </Link>
          </li>
          <li>
            <Link to="/actividades">
              <EventOutlined />
              <span>Actividades</span>
            </Link>
          </li>
          <li>
            <Link to="/oportunidades">
              <CurrencyExchangeOutlined />
              <span>Oportunidades</span>
            </Link>
          </li>
          <li>
            <Link to="/ventas">
              <PointOfSaleOutlined />
              <span>Ventas</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="menuSection">
        <h3>Contacto</h3>
        <ul>
          <li>
            <Link to="/correo">
              <EmailOutlined />
              <span>Correo</span>
            </Link>
          </li>
          <li>
            <Link to="/zoom">
              <VideocamOutlined />
              <span>Zoom</span>
            </Link>
          </li>
          <li>
            <Link to="/llamadas">
              <CallOutlined />
              <span>Llamada</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="menuSection">
        <h3>Estadisticas</h3>
        <ul>
          <li>
            <Link to="/embudo">
              <FilterAltOutlined />
              <span>Embudo de ventas</span>
            </Link>
          </li>
          <li>
            <Link to="/rendimiento">
              <TrendingUpOutlined />
              <span>Rendimiento</span>
            </Link>
          </li>
          <li>
            <Link to="/personal">
              <BarChartOutlined />
              <span>Personal</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="menuSection">
        <h3>Gerencia</h3>
        <ul>
          <li>
            <Link to="/reportes">
              <ReportGmailerrorredOutlined />
              <span>Reportes</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
