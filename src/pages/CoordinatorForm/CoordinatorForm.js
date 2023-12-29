import React, { useState, useEffect } from "react";
// import React from "react";
import "./styles.css";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

const Tab1Form = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/proyecto/datos_proyecto_detail/id=1_10004")
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del servidor: ", error);
      });
  }, []);

  return (
    <form>
      <MDBTable align="middle">
        <MDBTableHead>
          {/* Encabezados de la tabla */}
          <tr>
            <th scope="col">Codigo de proyecto</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Direccion</th>
            <th scope="col">Zona</th>
            <th scope="col">Asignar</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.codigo_proyecto}</td>
              <td>{item.nombre_proyecto}</td>
              <td>
                <MDBBadge color="success" pill>
                  Activo
                </MDBBadge>
              </td>
              <td>{item.direccion_proyecto}</td>
              <td>{item.zona}</td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Asignar
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </form>
  );
};

const Tab2Form = () => {
  return (
    <form>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Codigo de proyecto</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Direccion</th>
            <th scope="col">Zona</th>
            <th scope="col">Asignar</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/007/126/763/original/construction-worker-avatar-icon-vector.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p className="fw-bold mb-1">1_10478</p>
                  {/* <p className="text-muted mb-0">alex.ray@gmail.com</p> */}
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">ARAGON CASTILLA RESERVADO</p>
              {/* <p className="text-muted mb-0">Finance</p> */}
            </td>
            <td>
              <MDBBadge color="success" pill>
                Activo
              </MDBBadge>
            </td>
            <td>Carrera 11 # 146-75</td>
            <td>
              <p className="fw-normal mb-1">16 - CHAPINERO ALTO</p>
              {/* <p className="text-muted mb-0">Finance</p> */}
            </td>
            <td>
              <MDBBtn color="link" rounded size="sm">
                Asignar
              </MDBBtn>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/007/126/763/original/construction-worker-avatar-icon-vector.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p className="fw-bold mb-1">1_10659</p>
                  {/* <p className="text-muted mb-0">kate.hunington@gmail.com</p> */}
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">VOLTERRA VILLAGE</p>
              {/* <p className="text-muted mb-0">UI/UX</p> */}
            </td>
            <td>
              <MDBBadge color="success" pill>
                Activo
              </MDBBadge>
            </td>
            <td>Carrera 50 # 57B-80</td>
            <p className="fw-normal mb-1">30 - PABLO VI</p>
            <td>
              <MDBBtn color="link" rounded size="sm">
                Asignar
              </MDBBtn>
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable>
    </form>
  );
};
const Tab3Form = () => {
  return (
    <form>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Codigo de proyecto</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Direccion</th>
            <th scope="col">Zona</th>
            <th scope="col">Asignar</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/007/126/763/original/construction-worker-avatar-icon-vector.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p className="fw-bold mb-1">1_10349</p>
                  {/* <p className="text-muted mb-0">john.doe@gmail.com</p> */}
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">LA QUINTA</p>
            </td>
            <td>
              <MDBBadge color="success" pill>
                Activo
              </MDBBadge>
            </td>
            <td>Calle 32 # 5 -33</td>
            <td>
              <p className="fw-normal mb-1">17 - CENTRO</p>
            </td>
            <td>
              <MDBBtn color="link" rounded size="sm">
                Asignar
              </MDBBtn>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/007/126/763/original/construction-worker-avatar-icon-vector.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p className="fw-bold mb-1">1_10478</p>
                  {/* <p className="text-muted mb-0">alex.ray@gmail.com</p> */}
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">ARAGON CASTILLA RESERVADO</p>
              {/* <p className="text-muted mb-0">Finance</p> */}
            </td>
            <td>
              <MDBBadge color="success" pill>
                Activo
              </MDBBadge>
            </td>
            <td>Carrera 11 # 146-75</td>
            <td>
              <p className="fw-normal mb-1">16 - CHAPINERO ALTO</p>
              {/* <p className="text-muted mb-0">Finance</p> */}
            </td>
            <td>
              <MDBBtn color="link" rounded size="sm">
                Asignar
              </MDBBtn>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/007/126/763/original/construction-worker-avatar-icon-vector.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p className="fw-bold mb-1">1_10512</p>
                  {/* <p className="text-muted mb-0">kate.hunington@gmail.com</p> */}
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">
                CIUDADELA PARQUE CENTRAL DE OCCIDENTE III
              </p>
              {/* <p className="text-muted mb-0">UI/UX</p> */}
            </td>
            <td>
              <MDBBadge color="success" pill>
                Activo
              </MDBBadge>
            </td>
            <td>Calle 78 C # 130-55</td>
            <p className="fw-normal mb-1">34 - BOCHICA</p>
            <td>
              <MDBBtn color="link" rounded size="sm">
                Asignar
              </MDBBtn>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/007/126/763/original/construction-worker-avatar-icon-vector.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p className="fw-bold mb-1">1_10659</p>
                  {/* <p className="text-muted mb-0">kate.hunington@gmail.com</p> */}
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">VOLTERRA VILLAGE</p>
              {/* <p className="text-muted mb-0">UI/UX</p> */}
            </td>
            <td>
              <MDBBadge color="success" pill>
                Activo
              </MDBBadge>
            </td>
            <td>Carrera 50 # 57B-80</td>
            <p className="fw-normal mb-1">30 - PABLO VI</p>
            <td>
              <MDBBtn color="link" rounded size="sm">
                Asignar
              </MDBBtn>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/007/126/763/original/construction-worker-avatar-icon-vector.jpg"
                  alt=""
                  style={{ width: "45px", height: "45px" }}
                  className="rounded-circle"
                />
                <div className="ms-3">
                  <p className="fw-bold mb-1">1_10712</p>
                  {/* <p className="text-muted mb-0">kate.hunington@gmail.com</p> */}
                </div>
              </div>
            </td>
            <td>
              <p className="fw-normal mb-1">MONTE RIZZO CLUB RESIDENCIAL</p>
              {/* <p className="text-muted mb-0">UI/UX</p> */}
            </td>
            <td>
              <MDBBadge color="warning" pill>
                Esperando
              </MDBBadge>
            </td>
            <td>Calle 24 Sur # 1A-51</td>
            <p className="fw-normal mb-1">34 - BOCHICA</p>
            <td>
              <MDBBtn color="link" rounded size="sm">
                Asignar
              </MDBBtn>
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable>
    </form>
  );
};

const Formulario = () => {
  const handleClearLocalStorage = () => {
    localStorage.clear(); // Limpiar el local storage
    // navigate("/login"); // Redirigir a la página de inicio de sesión u otra
    window.location.reload();
  };
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="container">
        PROYECTOS SUPERVISOR
        <button id="clearButton" onClick={handleClearLocalStorage}>
          Salir
        </button>
      </div>
      <div className="tabs">
        <button
          className={activeTab === "tab1" ? "active" : ""}
          onClick={() => handleTabChange("tab1")}
        >
          Asignar Proyectos
        </button>
        <button
          className={activeTab === "tab2" ? "active" : ""}
          onClick={() => handleTabChange("tab2")}
        >
          Proyectos en Curso
        </button>
        <button
          className={activeTab === "tab3" ? "active" : ""}
          onClick={() => handleTabChange("tab3")}
        >
          Proyectos Validados
        </button>
        {/* Agrega más botones de pestaña según sea necesario */}
      </div>
      <div className="tab-content">
        {activeTab === "tab1" && <Tab1Form />}
        {activeTab === "tab2" && <Tab2Form />}
        {activeTab === "tab3" && <Tab3Form />}
        {/* Agrega más componentes de formulario para otras pestañas */}
      </div>
    </div>
  );
};

export default Formulario;
