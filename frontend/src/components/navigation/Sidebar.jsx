import "../../assets/css/navigation/sidebar.css";
import { NavLink } from "react-router-dom";
import {
  HomeOutlined,
  BadgeOutlined,
  BusinessOutlined,
  PriceCheckOutlined,
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
            <NavLink to="/">
              <HomeOutlined />
              <span>Inicio</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/productos">
              <StorefrontOutlined />
              <span>Productos</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="menuSection">
        <h3>Empresas</h3>
        <ul>
          <li>
            <NavLink to="/empresas">
              <BusinessOutlined />
              <span>Empresas</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/prospectos">
              <BusinessCenterOutlined />
              <span>Prospectos</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/clientes">
              <PriceCheckOutlined />
              <span>Clientes</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contactos">
              <PermContactCalendarOutlined />
              <span>Contactos</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="menuSection">
        <h3>Personal</h3>
        <ul>
          <li>
            <NavLink to="/empleados">
              <BadgeOutlined />
              <span>Empleados</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/actividades">
              <EventOutlined />
              <span>Actividades</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/oportunidades">
              <CurrencyExchangeOutlined />
              <span>Oportunidades</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/ventas">
              <PointOfSaleOutlined />
              <span>Ventas</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="menuSection">
        <h3>Contacto</h3>
        <ul>
          <li>
            <NavLink to="/correo">
              <EmailOutlined />
              <span>Correo</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/zoom">
              <VideocamOutlined />
              <span>Zoom</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/llamadas">
              <CallOutlined />
              <span>Llamadas</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="menuSection">
        <h3>Estadisticas</h3>
        <ul>
          <li>
            <NavLink to="/embudo">
              <FilterAltOutlined />
              <span>Embudo de ventas</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/rendimiento">
              <TrendingUpOutlined />
              <span>Rendimiento</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/personal">
              <BarChartOutlined />
              <span>Personal</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="menuSection">
        <h3>Gerencia</h3>
        <ul>
          <li>
            <NavLink to="/reportes">
              <ReportGmailerrorredOutlined />
              <span>Reportes</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
