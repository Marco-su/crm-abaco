import "../../assets/css/navigation/sidebar.css";
import { Link } from "react-router-dom";
import {
  Home,
  Badge,
  Business,
  PriceCheck,
  BusinessCenter,
  Event,
  Call,
  FilterAlt,
  TrendingUp,
  Storefront,
  CurrencyExchange,
  PointOfSale,
  ReportGmailerrorred,
  EmailOutlined,
  Videocam,
  PermContactCalendar,
  BarChart,
} from "@mui/icons-material";

const Sidebar = () => {
  return (
    <div id="sidebar">
      <div className="menuSection">
        <p>Abaco CRM</p>
      </div>

      <div className="menuSection">
        <h3>Principal</h3>
        <ul>
          <li>
            <Link to="/">
              <Home />
              <span>Inicio</span>
            </Link>
            <Link to="/productos">
              <Storefront />
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
              <Business />
              <span>Empresas</span>
            </Link>
          </li>
          <li>
            <Link to="/prospectos">
              <BusinessCenter />
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
              <PermContactCalendar />
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
              <Badge />
              <span>Empleados</span>
            </Link>
          </li>
          <li>
            <Link to="/actividades">
              <Event />
              <span>Actividades</span>
            </Link>
          </li>
          <li>
            <Link to="/oportunidades">
              <CurrencyExchange />
              <span>Oportunidades</span>
            </Link>
          </li>
          <li>
            <Link to="/ventas">
              <PointOfSale />
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
              <Videocam />
              <span>Zoom</span>
            </Link>
          </li>
          <li>
            <Link to="/llamadas">
              <Call />
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
              <FilterAlt />
              <span>Embudo de ventas</span>
            </Link>
          </li>
          <li>
            <Link to="/rendimiento">
              <TrendingUp />
              <span>Rendimiento</span>
            </Link>
          </li>
          <li>
            <Link to="/personal">
              <BarChart />
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
              <ReportGmailerrorred />
              <span>Reportes</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
