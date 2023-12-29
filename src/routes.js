import { lazy } from "react";

const Login = lazy(() => import("./pages/Login/Login"));
const Form_data_person = lazy(() =>
  import("./pages/Forms_data_Pollster/Forms_data_Pollster")
);
const Register = lazy(() => import("./pages/Register/Register"));
const PollsterForm = lazy(() => import("./pages/PollsterForm/PollsterForm"));
const CoordinatorForm = lazy(() =>
  import("./pages/CoordinatorForm/CoordinatorForm")
);
const EditProject = lazy(() => import("./pages/EditProjects/EditProjects"));
const CreateProject = lazy(() => import("./pages/CreateProject/CreateProject"));
const CreateEtapa = lazy(() => import("./pages/CreateEtapa/CreateEtapa"));

export const paths = {
  root: "/",
  login: "login",
  register: "/register",
  data_person: "/data-person",
  pollsterForm: "/pollsterForm",
  coordinatorForm: "/coordinatorForm",
  editProject: "/editproject/:id",
  createProject: "/createProject",
  createEtapa: "/createEtapa/:id",
};

const routes = {
  public: [
    { path: paths.login, Component: Login, title: "Iniciar sesión" },
    { path: paths.register, Component: Register, title: "Registro" },
  ],

  private: [
    {
      path: paths.pollsterForm,
      Component: PollsterForm,
      title: "Tabla Encuestador",
    },
    {
      path: paths.coordinatorForm,
      Component: CoordinatorForm,
      title: "Tabla Supervisor",
    },
    {
      path: paths.data_person,
      Component: Form_data_person,
      title: "form-data",
    },
    {
      path: paths.editProject,
      Component: EditProject,
      title: "edit-project",
    },
    {
      path: paths.createProject,
      Component: CreateProject,
      title: "create-project",
    },
    {
      path: paths.createEtapa,
      Component: CreateEtapa,
      title: "create-etapa",
    },
  ],
};

export default routes;
