import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import logo from "../../assets/img/logo-cnc-pequeño.png";
// import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authSuccessMessage, setAuthSuccessMessage] = useState("");

  const users = [
    { email: "admin@admin.com", password: "admin", role: "admin" },
    { email: "user@user.com", password: "user", role: "user" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.reload();
      // setLoginMessage("Usuario autenticado con éxito");
      // // setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    } else {
      setLoginMessage("Error al iniciar sesión");
    }
  };

  return (
    <div style={{ overflow: "hidden", height: "100vh" }}>
      <header className="bg-primary py-3">
        <MDBContainer className="d-flex align-items-center justify-content-between">
          <img src={logo} alt="Logo" style={{ height: "60px" }} />
        </MDBContainer>
      </header>
      <MDBContainer className="d-flex justify-content-center align-items-center h-100">
        <MDBRow>
          <MDBCol md="6">
            <img
              src="https://img.freepik.com/fotos-premium/plantilla-poster-dia-trabajo-celebracion-dia-trabajo-ee-uu-bandera-estadounidense-casco-seguridad-herramientas_852336-3303.jpg?w=1380"
              className="img-fluid"
              alt=""
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCard className="shadow-lg">
              <MDBCardBody>
                <h2 className="text-center mb-4">Inicio de Sesión</h2>
                <form onSubmit={handleLogin}>
                  {/* <form onSubmit={handleSubmit}> */}
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email"
                    id="formControlLg"
                    type="email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-8"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className="d-grid gap-2">
                    <MDBBtn type="submit" size="md">
                      Iniciar Sesión
                    </MDBBtn>
                  </div>
                </form>

                <div className="text-center mt-4">
                  <MDBBtn className="w-100" size="md">
                    Registrarse
                  </MDBBtn>
                </div>

                <div className="text-center mt-4">
                  <a href="!#" className="text-decoration-none">
                    Olvidaste la contraseña
                  </a>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Login;
