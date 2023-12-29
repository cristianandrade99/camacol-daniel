import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import logo from '../../assets/img/logo-cnc-pequeño.png';
import './forms.scss';
import { FaSignOutAlt } from 'react-icons/fa';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Table } from 'react-bootstrap';
import { AiFillEdit, AiOutlineCheck, AiOutlineClose, AiOutlineComment } from 'react-icons/ai';

export default function DataFormsPersonsForm() {
  const [nombre, setNombre] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [barrio, setBarrio] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccionSv, setDireccionSv] = useState('');
  const [areaLote, setAreaLote] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [direccionProyecto, setdireccionProyecto] = useState('');
  const [destino, setDestino] = useState('');
  const [estrato, setEstrato] = useState('');
  const [areaTotalConst, setAreaTotalConst] = useState('');
  const [fechaCreacionProyecto, setFechaCreacionProyecto] = useState('');
  const [codigo, setCodigo] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [dirDesc, setDirDesc] = useState('');
  const [usoGenProy, setUsoGenProy] = useState('');
  const [etapas, setEtapas] = useState('');
  const [areaTotalVendida, setareaTotalVendida] = useState('');
  const [fechaCoteCenso, setCoteCenso] = useState('');
  const [regional, setRegional] = useState('');
  const [zona, setZona] = useState('');
  const [salaVentas, setSalaVentas] = useState('');
  const [unidadesTotales, setUnidadesTotales] = useState('');
  const [bloques, setBloques] = useState('');

  const [certificaciones, setCertificaciones] = useState(['']); // Iniciamos con un input vacío
  const [proyectos, setProyectos] = useState(['']); // Iniciamos con un input vacío

  const agregarCertificacion = () => {
    setCertificaciones([...certificaciones, '']); // Agregar un input vacío al final
  };

  const eliminarCertificacion = index => {
    const nuevasCertificaciones = [...certificaciones];
    nuevasCertificaciones.splice(index, 1); // Eliminar el input en el índice especificado
    setCertificaciones(nuevasCertificaciones);
  };

  const actualizarCertificacion = (index, valor) => {
    const nuevasCertificaciones = [...certificaciones];
    nuevasCertificaciones[index] = valor; // Actualizar el valor del input en el índice especificado
    setCertificaciones(nuevasCertificaciones);
  };
  const agregarProyectos = () => {
    setCertificaciones([...certificaciones, '']); // Agregar un input vacío al final
  };

  const eliminarProyectos = index => {
    const nuevasCertificaciones = [...certificaciones];
    nuevasCertificaciones.splice(index, 1); // Eliminar el input en el índice especificado
    setCertificaciones(nuevasCertificaciones);
  };

  const actualizarProyectos = (index, valor) => {
    const nuevasCertificaciones = [...certificaciones];
    nuevasCertificaciones[index] = valor; // Actualizar el valor del input en el índice especificado
    setCertificaciones(nuevasCertificaciones);
  };

  const handleLogout = () => {
    fetch('http://127.0.0.1:8000/api/auth/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(response => response.json())
      .then(responseData => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        localStorage.setItem('isLoggedIn', 'false');
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const formData = {
      nombre: nombre,
      departamento: departamento,
      barrio: barrio,
      telefono: telefono,
      direccionSv: direccionSv,
      areaLote: areaLote,
      ciudad: ciudad,
      direccionProyecto: direccionProyecto,
      destino: destino,
      estrato: estrato,
      areaTotalConst: areaTotalConst,
      fechaCreacionProyecto: fechaCreacionProyecto,
      codigo: codigo,
      localidad: localidad,
      dirDesc: dirDesc,
      usoGenProy: usoGenProy,
      etapas: etapas,
      areaTotalVendida: areaTotalVendida,
      fechaCoteCenso: fechaCoteCenso,
      regional: regional,
      zona: zona,
      salaVentas: salaVentas,
      unidadesTotales: unidadesTotales,
      bloques: bloques
    };

    //console.log(formData);

    fetch('URL_DEL_ENDPOINT_DEL_BACKEND', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const ActionIcons = () => (
    <>
      <span style={{ marginLeft: '10px', cursor: 'pointer' }}>
        <AiFillEdit size={40} />
      </span>
      <span style={{ marginLeft: '10px', cursor: 'pointer' }}>
        <AiOutlineCheck size={40} />
      </span>
      <span style={{ marginLeft: '10px', cursor: 'pointer' }}>
        <AiOutlineClose size={40} />
      </span>
      <span style={{ marginLeft: '10px', cursor: 'pointer' }}>
        <AiOutlineComment size={40} />
      </span>
    </>
  );

  return (
    <div>
      <header className='bg-primary py-3'>
        <MDBContainer className='d-flex align-items-center justify-content-between'>
          <img src={logo} alt='Logo' style={{ height: '60px' }} />
          {/* {userName && ( */}
          <div className='d-flex align-items-center'>
            {/* <p className="text-white me-3">{userName}</p> */}
            <FaSignOutAlt className='text-white' size={20} style={{ cursor: 'pointer' }} onClick={handleLogout} />
          </div>
          {/* )} */}
        </MDBContainer>
      </header>
      <div className='container'>
        <h1 className='mt-5'>Informacion General Proyecto</h1>
        <div style={{ height: 'calc(100vh - 80px)' }}>
          <MDBContainer fluid className='py-5'>
            {/* <h1>Registro de Datos Personales</h1> */}
            <form onSubmit={handleSubmit}>
              <MDBCard className='text-black'>
                <MDBCardBody className='text-center'>
                  <MDBRow className='mb-4'>
                    <MDBCol md='3'>
                      <MDBInput label='Nombre' value={nombre} onChange={e => setNombre(e.target.value)} />
                    </MDBCol>
                    <MDBCol md='3'>
                      {/* <label htmlFor="departamento">Departamento</label> */}
                      <select
                        id='departamento'
                        className='form-select'
                        value={departamento}
                        onChange={e => setDepartamento(e.target.value)}>
                        <option value=''>Departamento</option>
                        <option value='Antioquia'>Antioquia</option>
                        <option value='Arauca'>Arauca</option>
                        <option value='Amazonas'>Amazonas</option>
                      </select>
                    </MDBCol>

                    <MDBCol md='3'>
                      <MDBInput label='Barrio' value={barrio} onChange={e => setBarrio(e.target.value)} />
                    </MDBCol>
                    <MDBCol md='3'>
                      <MDBInput label='Telefono' value={telefono} onChange={e => setTelefono(e.target.value)} />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className='mb-4'>
                    <MDBCol md='3'>
                      <MDBInput label='Direccion S.V' value={direccionSv} onChange={e => setDireccionSv(e.target.value)} />
                    </MDBCol>
                    <MDBCol md='2'>
                      <MDBInput label='Area Lote' value={areaLote} onChange={e => setAreaLote(e.target.value)} />
                    </MDBCol>
                    <MDBCol md='2'>
                      <MDBInput label='Ciudad' value={ciudad} onChange={e => setCiudad(e.target.value)} />
                    </MDBCol>
                    <MDBCol md='2'>
                      <MDBInput
                        label='Direccion Proyecto'
                        value={direccionProyecto}
                        onChange={e => setdireccionProyecto(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md='3'>
                      <MDBInput label='Destino' value={destino} onChange={e => setDestino(e.target.value)} />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className='mb-4'>
                    <MDBCol md='2'>
                      <MDBInput label='Estrato' value={estrato} onChange={e => setEstrato(e.target.value)} />
                    </MDBCol>

                    <MDBCol md='2'>
                      <MDBInput
                        label='Area Total Construida'
                        value={areaTotalConst}
                        onChange={e => setAreaTotalConst(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md='2'>
                      <MDBInput
                        label='Fecha Creacion Proyecto'
                        value={fechaCreacionProyecto}
                        onChange={e => setFechaCreacionProyecto(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md='3'>
                      <MDBInput label='Codigo' value={codigo} onChange={e => setCodigo(e.target.value)} />
                    </MDBCol>
                    <MDBCol md='3'>
                      <MDBInput label='Localidad' value={localidad} onChange={e => setLocalidad(e.target.value)} />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className='mb-4'>
                    <MDBCol md='3'>
                      <MDBInput label='Ciudad' value={ciudad} onChange={e => setCiudad(e.target.value)} />
                    </MDBCol>
                    <MDBCol md='3'>
                      <MDBInput label='Dir Desc' value={dirDesc} onChange={e => setDirDesc(e.target.value)} />
                    </MDBCol>
                    <MDBCol md='3'>
                      <MDBInput
                        label='Uso Gen Proy'
                        value={usoGenProy}
                        // placeholder="Casa,Apto,etc"
                        onChange={e => setUsoGenProy(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md='3'>
                      <MDBInput label='Etapas' value={etapas} onChange={e => setEtapas(e.target.value)} />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className='mb-4'>
                    <MDBCol md='4'>
                      <MDBInput
                        label='Area Total Vendida'
                        value={areaTotalVendida}
                        onChange={e => setareaTotalVendida(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md='3'>
                      <MDBInput label='Fecha Cote Censo' value={fechaCoteCenso} onChange={e => setCoteCenso(e.target.value)} />
                    </MDBCol>
                    <MDBCol md='3'>
                      <MDBInput label='Regional' value={regional} onChange={e => setRegional(e.target.value)} />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className='mb-4'>
                    <MDBCol md='3'>
                      <MDBInput label='Zona' value={zona} onChange={e => setZona(e.target.value)} />
                    </MDBCol>
                    <MDBCol md='3'>
                      <MDBInput label='Sala Ventas' value={salaVentas} onChange={e => setSalaVentas(e.target.value)} />
                    </MDBCol>
                    <MDBCol md='3'>
                      <MDBInput
                        label='# Unidades Totales'
                        value={unidadesTotales}
                        onChange={e => setUnidadesTotales(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md='3'>
                      <MDBInput label='Bloques' value={bloques} onChange={e => setBloques(e.target.value)} />
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
              <div
                style={{
                  marginTop: '20px'
                }}>
                <MDBCard className='text-black'>
                  <MDBCardBody className='text-center'>
                    <div className='mb-4 certificaciones-box'>
                      <div
                        style={{
                          height: 'calc(20vh - 80px)',
                          // border: "2px solid",
                          marginTop: '10px'
                        }}>
                        <h1 className='mt-5'>Certificaciones Sostenibles</h1>
                        {certificaciones.map((certificacion, index) => (
                          <MDBRow className='mb-4' key={index}>
                            <MDBCol md='3'>
                              <MDBInput
                                label='Certificacion'
                                value={certificacion}
                                onChange={e => actualizarCertificacion(index, e.target.value)}
                              />
                            </MDBCol>
                            <MDBCol md='3'>
                              <MDBBtn color='primary' onClick={agregarCertificacion}>
                                Agregar
                              </MDBBtn>
                            </MDBCol>
                            <MDBCol md='3'>
                              <MDBBtn color='danger' onClick={() => eliminarCertificacion(index)}>
                                Eliminar
                              </MDBBtn>
                            </MDBCol>
                          </MDBRow>
                        ))}
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </div>
              <div
                style={{
                  marginTop: '20px'
                }}>
                <MDBCard className='text-black'>
                  <MDBCardBody className='text-center'>
                    <h1 className='mt-5'>Caracteristicas Proyecto</h1>
                    {proyectos.map((certificacion, index) => (
                      <MDBRow className='mb-4' key={index}>
                        <MDBCol md='3'>
                          <MDBInput
                            label='Proyecto'
                            value={certificacion}
                            onChange={e => actualizarProyectos(index, e.target.value)}
                          />
                        </MDBCol>
                        <MDBCol md='3'>
                          <MDBBtn color='primary' onClick={agregarProyectos}>
                            Agregar
                          </MDBBtn>
                        </MDBCol>
                        <MDBCol md='3'>
                          <MDBBtn color='danger' onClick={() => eliminarProyectos(index)}>
                            Eliminar
                          </MDBBtn>
                        </MDBCol>
                      </MDBRow>
                    ))}
                  </MDBCardBody>
                </MDBCard>
              </div>
              <div
                style={{
                  marginTop: '20px'
                }}>
                <MDBCard className='text-black'>
                  <MDBCardBody className='text-center'>
                    <MDBContainer>
                      <h1 className='mt-5'>Contactos</h1>
                      <div className='p-5'>
                        <Table striped bordered hover size='sm'>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Nombre</th>
                              <th>Telefono</th>
                              <th>Correo</th>
                              <th>Cargo</th>
                              <th>Autorizacion</th>
                              <th>Validar</th>
                              <th>Editar</th>
                              <th>Eliminar</th>
                              <th>Observaciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>John Doe</td>
                              <td>123-456-7890</td>
                              <td>john@example.com</td>
                              <td>Gerente</td>
                              <td>Aprobado</td>
                              <td>
                                <input type='checkbox' name='validar' />
                              </td>
                              <td>
                                <a href='#'>Editar</a>
                              </td>
                              <td>
                                <a href='#'>Eliminar</a>
                              </td>
                              <td>Todo en orden</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Jane Smith</td>
                              <td>555-123-4567</td>
                              <td>jane@example.com</td>
                              <td>Analista</td>
                              <td>Pendiente</td>
                              <td>
                                <input type='checkbox' name='validar' />
                              </td>
                              <td>
                                <a href='#'>Editar</a>
                              </td>
                              <td>
                                <a href='#'>Eliminar</a>
                              </td>
                              <td>Necesita capacitación</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </MDBContainer>
                  </MDBCardBody>
                </MDBCard>
              </div>
              <div style={{ marginTop: '20px' }}>
                <MDBCard className='text-black'>
                  <MDBCardBody className='text-center'>
                    <div className='mb-4 certificaciones-box'>
                      <h1 className='mt-5'>Informacion Zonas Comunes</h1>
                      <MDBCol md='5'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <MDBInput label='Zona 1' />
                          <span style={{ marginLeft: '10px', cursor: 'pointer' }}>
                            <AiFillEdit size={40} />
                          </span>
                          <span style={{ marginLeft: '10px', cursor: 'pointer' }}>
                            <AiOutlineCheck size={40} />
                          </span>
                          <span style={{ marginLeft: '10px', cursor: 'pointer' }}>
                            <AiOutlineClose size={40} />
                          </span>
                          <span style={{ marginLeft: '10px', cursor: 'pointer' }}>
                            <AiOutlineComment size={40} />
                          </span>
                        </div>
                      </MDBCol>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </div>
              <div
                style={{
                  marginTop: '20px'
                }}>
                <MDBCard className='text-black'>
                  <MDBCardBody className='text-center'>
                    <MDBContainer>
                      <h1 className='mt-5'>Caracteristicas Tecnicas</h1>
                      <div className='p-5'>
                        <Table striped bordered hover size='sm'>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Categoria</th>
                              <th>Caracteristicas</th>
                              <th>Especificacion</th>
                              <th>Validar</th>
                              <th>Editar</th>
                              <th>Eliminar</th>
                              <th>Observaciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Categoria 1</td>
                              <td>Caracteristica 1</td>
                              <td>Especificacion 1</td>
                              <td>
                                <input type='checkbox' name='validar' />
                              </td>
                              <td>
                                <a href='#'>Editar</a>
                              </td>
                              <td>
                                <a href='#'>Eliminar</a>
                              </td>
                              <td>Todo en orden</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Categoria 2</td>
                              <td>Caracteristica 2</td>
                              <td>Especificacion 2</td>
                              <td>
                                <input type='checkbox' name='validar' />
                              </td>
                              <td>
                                <a href='#'>Editar</a>
                              </td>
                              <td>
                                <a href='#'>Eliminar</a>
                              </td>
                              <td>Necesita capacitación</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </MDBContainer>
                  </MDBCardBody>
                </MDBCard>
              </div>
              <div
                style={{
                  marginTop: '20px'
                }}>
                <MDBCard className='text-black'>
                  <MDBCardBody className='text-center'>
                    <MDBContainer>
                      <h1 className='mt-5'>Acabados Exteriores</h1>
                      <div className='p-5'>
                        <Table striped bordered hover size='sm'>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Categoria</th>
                              <th>Acabado</th>
                              <th>Validar</th>
                              <th>Editar</th>
                              <th>Eliminar</th>
                              <th>Observaciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Categoria 1</td>
                              <td>Acabado 1</td>
                              <td>
                                <input type='checkbox' name='validar' />
                              </td>
                              <td>
                                <a href='#'>Editar</a>
                              </td>
                              <td>
                                <a href='#'>Eliminar</a>
                              </td>
                              <td>Todo en orden</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Categoria 2</td>
                              <td>Acabado 2 2</td>
                              <td>
                                <input type='checkbox' name='validar' />
                              </td>
                              <td>
                                <a href='#'>Editar</a>
                              </td>
                              <td>
                                <a href='#'>Eliminar</a>
                              </td>
                              <td>Todo mal</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </MDBContainer>
                  </MDBCardBody>
                </MDBCard>
              </div>
              <div style={{ marginTop: '20px' }}>
                <MDBCard className='text-black'>
                  <MDBCardBody className='text-center'>
                    <div className='mb-4 certificaciones-box'>
                      <h1 className='mt-5'>Parqueaderos</h1>
                      <MDBCol md='5'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <h6>Parqueadero Visitantes</h6>
                          <MDBInput label='Parqueadero Visitantes' />
                          <ActionIcons />
                        </div>
                      </MDBCol>
                      <MDBCol md='5'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <h6>Parqueadero Propietarios</h6>
                          <MDBInput label='Parqueadero Propietarios' />
                          <ActionIcons />
                        </div>
                      </MDBCol>
                      <MDBCol md='5'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <h6>Total Parqueaderos</h6>
                          <MDBInput label='Total Parqueaderos' />
                          <ActionIcons />
                        </div>
                      </MDBCol>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </div>
              <MDBBtn className='mb-5' type='submit' block>
                Enviar
              </MDBBtn>
            </form>
          </MDBContainer>
        </div>
      </div>
    </div>
  );
}
