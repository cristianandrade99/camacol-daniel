import SwitchRoutes from "../SwitchRoutes/SwitchRoutes";

const NotLogged = ({ routes, redirect }) => {
  return <SwitchRoutes routes={routes} redirect={redirect} />;
};

export default NotLogged;
