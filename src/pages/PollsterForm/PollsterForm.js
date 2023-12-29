import React, { useEffect, useState, useTransition } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PollsterForm.css';
import 'react-table-filter/lib/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import ReactPaginate from 'react-paginate';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { FaSignOutAlt } from 'react-icons/fa';
import logo from '../../assets/img/logo-cnc-pequeño.png';
import { FaSearch, FaPencilAlt, FaFile } from 'react-icons/fa';
import CustomDropdownMenu from '../DropdownMenu/CustomDropdownMenu';

const Tab1Form = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermByCode, setSearchTermByCode] = useState('');

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleContinue = path => {
    startTransition(() => {
      navigate(path);
    });
  };

  const handleEditarClick = id => {
    handleContinue(`/editproject/${id}`);
    // const id = id;
  };
  const handleCrearEtapaClick = id => {
    handleContinue(`/createEtapa/${id}`);
    // const id = id;
  };

  useEffect(() => {
    fetch('https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto/lista_proyectos/')
      .then(response => response.json())
      .then(responseData => {
        setData(responseData);
      })
      .catch(error => {
        console.error('Error al obtener los datos del servidor: ', error);
      });
  }, []);

  return (
    <div className='container-fluid'>
      <div className='container-search'>
        <div className='input-group mb-3'>
          <div className='input-group-prepend'>
            <span className='input-group-text' id='search-addon'>
              <FaSearch className='fa-search' />
            </span>
          </div>
          <input
            type='text'
            className='form-control'
            placeholder='Buscar por nombre...'
            aria-label='Search'
            aria-describedby='search-addon'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className='input-group mb-3'>
          <div className='input-group-prepend'>
            <span className='input-group-text' id='search-addon'>
              <FaSearch className='fa-search' />
            </span>
          </div>
          <input
            type='text'
            className='form-control'
            placeholder='Buscar por código...'
            aria-label='Search by Code'
            value={searchTermByCode}
            onChange={e => setSearchTermByCode(e.target.value)}
          />
        </div>
      </div>
      <div className='table-responsive'>
        <table className='table table-striped'>
          <thead>
            {/* Encabezados de la tabla */}
            <tr>
              <th scope='col'>Código de proyecto</th>
              <th scope='col'>Nombre</th>
              <th scope='col'>Estado</th>
              {/* <th scope="col">Dirección</th> */}
              {/* <th scope="col">Zona</th> */}
              <th scope='col'>Editar</th>
              <th scope='col'>Agregar etapa</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter(
                item =>
                  item.nombre_proyecto.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  item.codigo_proyecto.toLowerCase().includes(searchTermByCode.toLowerCase())
              )
              .slice(startIndex, endIndex)
              .map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <img
                        src='https://static.vecteezy.com/system/resources/previews/007/126/763/original/construction-worker-avatar-icon-vector.jpg'
                        alt=''
                        style={{ width: '45px', height: '45px' }}
                        className='rounded-circle'
                      />
                      <div className='ms-3'>
                        <p className='fw-bold mb-1'>{item.codigo_proyecto}</p>
                      </div>
                    </div>
                  </td>
                  <td>{item.nombre_proyecto}</td>
                  <td>
                    <MDBBadge color='success' pill>
                      Activo
                    </MDBBadge>
                  </td>
                  {/* <td>{item.direccion_descriptiva}</td> */}
                  {/* <td>{item.zona}</td> */}
                  <td>
                    <button className='editar-button' onClick={() => handleEditarClick(item.codigo_proyecto)}>
                      <FaPencilAlt />
                    </button>
                  </td>
                  <td>
                    <button className='crear-button' onClick={() => handleCrearEtapaClick(item.id)}>
                      <FaFile />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel='Anterior'
        nextLabel='Siguiente'
        breakLabel='...'
        breakClassName='break-me'
        pageCount={Math.ceil(data.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName='pagination'
        subContainerClassName='pages pagination'
        activeClassName='active'
        previousClassName='page-item'
        nextClassName='page-item'
        previousLinkClassName='page-link'
        nextLinkClassName='page-link'
        pageClassName='page-item'
        pageLinkClassName='page-link'
      />
    </div>
  );
};
const Tab2Form = () => {
  return (
    <form>
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>Código de proyecto</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Estado</th>
            <th scope='col'>Dirección</th>
            <th scope='col'>Zona</th>
            <th scope='col'>Editar</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            <td>
              <div className='d-flex align-items-center'>
                <img
                  src='https://static.vecteezy.com/system/resources/previews/007/126/763/original/construction-worker-avatar-icon-vector.jpg'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>1_10349</p>
                  {/* <p className="text-muted mb-0">john.doe@gmail.com</p> */}
                </div>
              </div>
            </td>
            <td>
              <p className='fw-normal mb-1'>LA QUINTA</p>
            </td>
            <td>
              <MDBBadge color='success' pill>
                Activo
              </MDBBadge>
            </td>
            <td>Calle 32 # 5 -33</td>
            <td>
              <p className='fw-normal mb-1'>17 - CENTRO</p>
            </td>
            <td>
              <MDBBtn color='link' rounded size='sm'>
                Editar
              </MDBBtn>
            </td>
          </tr>
          <tr>
            <td>
              <div className='d-flex align-items-center'>
                <img
                  src='https://static.vecteezy.com/system/resources/previews/007/126/763/original/construction-worker-avatar-icon-vector.jpg'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>1_10478</p>
                  {/* <p className="text-muted mb-0">alex.ray@gmail.com</p> */}
                </div>
              </div>
            </td>
            <td>
              <p className='fw-normal mb-1'>ARAGON CASTILLA RESERVADO</p>
              {/* <p className="text-muted mb-0">Finance</p> */}
            </td>
            <td>
              <MDBBadge color='success' pill>
                Activo
              </MDBBadge>
            </td>
            <td>Carrera 11 # 146-75</td>
            <td>
              <p className='fw-normal mb-1'>16 - CHAPINERO ALTO</p>
              {/* <p className="text-muted mb-0">Finance</p> */}
            </td>
            <td>
              <MDBBtn color='link' rounded size='sm'>
                Editar
              </MDBBtn>
            </td>
          </tr>
          <tr>
            <td>
              <div className='d-flex align-items-center'>
                <img
                  src='https://static.vecteezy.com/system/resources/previews/007/126/763/original/construction-worker-avatar-icon-vector.jpg'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>1_10512</p>
                  {/* <p className="text-muted mb-0">kate.hunington@gmail.com</p> */}
                </div>
              </div>
            </td>
            <td>
              <p className='fw-normal mb-1'>CIUDADELA PARQUE CENTRAL DE OCCIDENTE III</p>
              {/* <p className="text-muted mb-0">UI/UX</p> */}
            </td>
            <td>
              <MDBBadge color='success' pill>
                Activo
              </MDBBadge>
            </td>
            <td>Calle 78 C # 130-55</td>
            <p className='fw-normal mb-1'>34 - BOCHICA</p>
            <td>
              <MDBBtn color='link' rounded size='sm'>
                Editar
              </MDBBtn>
            </td>
          </tr>
          <tr>
            <td>
              <div className='d-flex align-items-center'>
                <img
                  src='https://static.vecteezy.com/system/resources/previews/007/126/763/original/construction-worker-avatar-icon-vector.jpg'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>1_10659</p>
                  {/* <p className="text-muted mb-0">kate.hunington@gmail.com</p> */}
                </div>
              </div>
            </td>
            <td>
              <p className='fw-normal mb-1'>VOLTERRA VILLAGE</p>
              {/* <p className="text-muted mb-0">UI/UX</p> */}
            </td>
            <td>
              <MDBBadge color='success' pill>
                Activo
              </MDBBadge>
            </td>
            <td>Carrera 50 # 57B-80</td>
            <p className='fw-normal mb-1'>30 - PABLO VI</p>
            <td>
              <MDBBtn color='link' rounded size='sm'>
                Editar
              </MDBBtn>
            </td>
          </tr>
          <tr>
            <td>
              <div className='d-flex align-items-center'>
                <img
                  src='https://static.vecteezy.com/system/resources/previews/007/126/763/original/construction-worker-avatar-icon-vector.jpg'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>1_10712</p>
                  {/* <p className="text-muted mb-0">kate.hunington@gmail.com</p> */}
                </div>
              </div>
            </td>
            <td>
              <p className='fw-normal mb-1'>MONTE RIZZO CLUB RESIDENCIAL</p>
              {/* <p className="text-muted mb-0">UI/UX</p> */}
            </td>
            <td>
              <MDBBadge color='warning' pill>
                Esperando
              </MDBBadge>
            </td>
            <td>Calle 24 Sur # 1A-51</td>
            <p className='fw-normal mb-1'>34 - BOCHICA</p>
            <td>
              <MDBBtn color='link' rounded size='sm'>
                Editar
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
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>Código de proyecto</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Estado</th>
            <th scope='col'>Dirección</th>
            <th scope='col'>Zona</th>
            <th scope='col'>Editar</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            <td>
              <div className='d-flex align-items-center'>
                <img
                  src='https://static.vecteezy.com/system/resources/previews/007/126/763/original/construction-worker-avatar-icon-vector.jpg'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>1_10478</p>
                  {/* <p className="text-muted mb-0">alex.ray@gmail.com</p> */}
                </div>
              </div>
            </td>
            <td>
              <p className='fw-normal mb-1'>ARAGON CASTILLA RESERVADO</p>
              {/* <p className="text-muted mb-0">Finance</p> */}
            </td>
            <td>
              <MDBBadge color='success' pill>
                Activo
              </MDBBadge>
            </td>
            <td>Carrera 11 # 146-75</td>
            <td>
              <p className='fw-normal mb-1'>16 - CHAPINERO ALTO</p>
              {/* <p className="text-muted mb-0">Finance</p> */}
            </td>
            <td>
              <MDBBtn color='link' rounded size='sm'>
                Editar
              </MDBBtn>
            </td>
          </tr>
          <tr>
            <td>
              <div className='d-flex align-items-center'>
                <img
                  src='https://static.vecteezy.com/system/resources/previews/007/126/763/original/construction-worker-avatar-icon-vector.jpg'
                  alt=''
                  style={{ width: '45px', height: '45px' }}
                  className='rounded-circle'
                />
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>1_10659</p>
                  {/* <p className="text-muted mb-0">kate.hunington@gmail.com</p> */}
                </div>
              </div>
            </td>
            <td>
              <p className='fw-normal mb-1'>VOLTERRA VILLAGE</p>
              {/* <p className="text-muted mb-0">UI/UX</p> */}
            </td>
            <td>
              <MDBBadge color='success' pill>
                Activo
              </MDBBadge>
            </td>
            <td>Carrera 50 # 57B-80</td>
            <p className='fw-normal mb-1'>30 - PABLO VI</p>
            <td>
              <MDBBtn color='link' rounded size='sm'>
                Editar
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
    localStorage.clear();
    // navigate("/login");
    window.location.reload();
  };

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    //console.log(user);
    if (user.role === 'admin') {
      navigate('/coordinatorForm');
    } else if (user.role === 'user') {
      navigate('/pollsterForm');
    }
  }, []);
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  return (
    <div>
      {/* <div className="container_nav"> */}
      <AppBar position='static'>
        <Toolbar>
          <a href='/pollsterForm'>
            <img src={logo} alt='Logo' style={{ marginRight: '20px' }} />{' '}
          </a>
          {/* Agrega el logo */}
          <Button
            style={{ color: 'white', fontSize: '0.8em' }}
            id='clearButton'
            color='primary'
            href='/pollsterForm'
            variant='contained'
            className='individual-buttons'>
            Proyectos Encuestador
          </Button>
          <Button
            style={{ color: 'white', fontSize: '0.8em' }}
            id='clearButton'
            color='primary'
            href='/createProject'
            variant='contained'
            className='individual-buttons'>
            Ingresar Proyecto
          </Button>
          <div style={{ marginLeft: 'auto' }}>
            <Button
              style={{ color: 'white' }}
              color='primary'
              id='clearButton'
              variant='contained'
              onClick={handleClearLocalStorage}
              className='individual-buttons'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.9em'
                }}>
                <FaSignOutAlt size={20} style={{ marginRight: '8px' }} />
                Cerrar sesión
              </div>
            </Button>
          </div>
          <CustomDropdownMenu />
        </Toolbar>
      </AppBar>
      {/* </div> */}
      <div style={{ marginTop: '40px' }} className='tabs d-flex justify-content-center'>
        <button
          className={`tab-button ${activeTab === 'tab1' ? 'active' : ''}`}
          onClick={() => handleTabChange('tab1')}
          style={{ marginLeft: '10px' }}>
          Proyectos Asignados
        </button>
        <button className={`tab-button ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => handleTabChange('tab2')}>
          Proyectos en Curso
        </button>
        <button className={`tab-button ${activeTab === 'tab3' ? 'active' : ''}`} onClick={() => handleTabChange('tab3')}>
          Proyectos Validados
        </button>
        {/* Agrega más botones de pestaña según sea necesario */}
      </div>
      <div style={{ marginTop: '30px' }} className='tab-content'>
        {activeTab === 'tab1' && <Tab1Form />}
        {activeTab === 'tab2' && <Tab2Form />}
        {activeTab === 'tab3' && <Tab3Form />}
        {/* Agrega más componentes de formulario para otras pestañas */}
      </div>
    </div>
  );
};

export default Formulario;
