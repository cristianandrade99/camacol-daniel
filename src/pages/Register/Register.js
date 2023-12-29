import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import logo from '../../assets/img/logo-cnc-pequeño.png';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const data = {
      first_name: firstName,
      last_name: lastName,
      username: nickname,
      email,
      password
    };

    fetch('http://127.0.0.1:8000/api/auth/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400) {
          throw new Error('El usuario ya existe.');
        } else {
          throw new Error('Error en el servidor o Usuario ya existe.');
        }
      })
      .then(responseData => {
        //console.log(responseData);
        alert('Usuario creado con éxito.');
      })
      .catch(error => {
        console.error('Error:', error.message);
        alert(error.message);
      });
  };

  return (
    <div style={{ overflow: 'hidden', height: '100vh' }}>
      <header className='bg-primary py-3'>
        <MDBContainer className='d-flex align-items-center justify-content-between'>
          <img src={logo} alt='Logo' style={{ height: '60px' }} />
        </MDBContainer>
      </header>
      <MDBContainer fluid className='d-flex align-items-center justify-content-center vh-100'>
        <MDBCard
          className='text-black'
          style={{
            borderRadius: '25px',
            width: '800px',
            marginTop: '-50px',
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)'
          }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md='12' lg='6' className='order-2 order-lg-2'>
                <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>Registrarse</p>

                <form onSubmit={handleSubmit}>
                  <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='user me-3' size='lg' />
                    <MDBInput
                      label='Nombre'
                      id='formFirstName'
                      type='text'
                      className='w-100'
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                    />
                  </div>

                  <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='user me-3' size='lg' />
                    <MDBInput
                      label='Apellido'
                      id='formLastName'
                      type='text'
                      className='w-100'
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                    />
                  </div>

                  <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='user me-3' size='lg' />
                    <MDBInput
                      label='Nickname'
                      id='formNickname'
                      type='text'
                      className='w-100'
                      value={nickname}
                      onChange={e => setNickname(e.target.value)}
                    />
                  </div>

                  <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='envelope me-3' size='lg' />
                    <MDBInput
                      label='Correo Electrónico'
                      id='formEmail'
                      type='email'
                      className='w-100'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>

                  <div className='d-flex flex-row align-items-center mb-4'>
                    <MDBIcon fas icon='lock me-3' size='lg' />
                    <MDBInput
                      label='Contraseña'
                      id='formPassword'
                      type='password'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>

                  <MDBBtn className='mb-4' size='lg' type='submit'>
                    Registrarse
                  </MDBBtn>
                </form>
              </MDBCol>

              <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center justify-content-center'>
                <img src='https://pinegrow.com/wp-content/uploads/Code-collaboration.svg' alt='Image' style={{ width: '80%' }} />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default Register;
