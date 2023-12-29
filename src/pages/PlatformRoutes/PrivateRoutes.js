import SwitchRoutes from "../SwitchRoutes/SwitchRoutes";

const Logged = ({ routes, redirect }) => {
  return <SwitchRoutes routes={routes} redirect={redirect} />;
};

export default Logged;
