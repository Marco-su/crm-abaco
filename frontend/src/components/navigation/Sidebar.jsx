import "../../assets/css/navigation/sidebar.css";
import { NavLink } from "react-router-dom";
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
      <div>
        <div className="menuSection">
          <p>Abaco CRM</p>
        </div>

        <div className="menuSection">
          <h3>Principal</h3>
          <ul>
            <li>
              <NavLink to="/">
                <Home />
                <span>Inicio</span>
              </NavLink>
              <NavLink to="/productos">
                <Storefront />
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
                <Business />
                <span>Empresas</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/prospectos">
                <BusinessCenter />
                <span>Prospectos</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/clientes">
                <PriceCheck />
                <span>Clientes</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/contactos">
                <PermContactCalendar />
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
                <Badge />
                <span>Empleados</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/actividades">
                <Event />
                <span>Actividades</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/oportunidades">
                <CurrencyExchange />
                <span>Oportunidades</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/ventas">
                <PointOfSale />
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
                <Videocam />
                <span>Zoom</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/llamadas">
                <Call />
                <span>Llamada</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="menuSection">
          <h3>Estadisticas</h3>
          <ul>
            <li>
              <NavLink to="/embudo">
                <FilterAlt />
                <span>Embudo de ventas</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/rendimiento">
                <TrendingUp />
                <span>Rendimiento</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/personal">
                <BarChart />
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
                <ReportGmailerrorred />
                <span>Reportes</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
