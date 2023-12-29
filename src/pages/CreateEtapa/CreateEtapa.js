import React, { useState, useEffect } from 'react';
import '../CreateProject/CreateProject.css';
import { MDBContainer } from 'mdb-react-ui-kit';
import logo from '../../assets/img/logo-cnc-pequeño.png';
import { FaArrowLeft, FaTrash, FaPlus, FaCog, FaSave, FaTimes, FaChevronUp, FaChevronDown, FaCheck, FaSearch } from 'react-icons/fa';
import { Table, Form, FormControl, Button, Modal } from 'react-bootstrap';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useParams } from 'react-router-dom';
import CustomDropdownMenuTwo from '../DropdownMenuTwo/CustomDropdownMenuTwo';
import './CreateEtapa.css';
import { innerFinishDataStage } from '../../utils';
import ProjectStageForm from '../../Components/ProjectStageForm/ProjectStageForm';

const StageProject = ({ usoProyecto }) => {
  const [answers, setAnswers] = useState({ q18: {} });
  const [hasSalesRoom, setHasSalesRoom] = useState('');
  const [showSalesRoomQuestion, setShowSalesRoomQuestion] = useState(false);
  const [tiposProyecto, setTiposProyecto] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({});
  const [datosGuardadosTabla, setDatosGuardadosTabla] = useState([]);
  const [residencial, setResidencial] = useState(true);
  const [correoValido, setCorreoValido] = useState(true);
  const [isTableVisible1, setTableVisible1] = useState(false);
  const [errores, setErrores] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showModalDotacion3, setShowModalDotacion3] = useState(false);
  const [showModalDotacion4, setShowModalDotacion4] = useState(false);
  const [showModalDotacion5, setShowModalDotacion5] = useState(false);
  const [dotacion3, setDotacion3] = useState('');
  const [dotacion4, setDotacion4] = useState('');
  const [dotacion5, setDotacion5] = useState('');
  const [unidades3, setUnidades3] = useState(0);
  const [unidades4, setUnidades4] = useState(0);
  const [unidades5, setUnidades5] = useState(0);
  const [dotacion, setDotacion] = useState('');
  const [unidades, setUnidades] = useState(0);

  const USO_TIPOS_RESIDENCIALES = [
    { value: '', label: 'Seleccione' },
    { value: 0, label: 'Apartamento' },
    { value: 1, label: 'Casa' }
  ];

  const USO_TIPOS_NO_RESIDENCIALES = [
    { value: '', label: 'Seleccione' },
    { value: 0, label: 'Apartamento' },
    { value: 1, label: 'Bodega' },
    { value: 2, label: 'Comunal' },
    { value: 3, label: 'Consultorio' },
    { value: 4, label: 'Institucional' },
    { value: 5, label: 'Local' },
    { value: 6, label: 'Oficina' },
    { value: 7, label: 'Parqueadero' },
    { value: 8, label: 'Servicios' },
    { value: 9, label: 'Sin definir NR' }
  ];

  const toggleTableVisibility1 = () => {
    setTableVisible1(!isTableVisible1);
  };

  const [tipoVivienda, setTipoVivienda] = useState('');

  const handleTipoViviendaChange = e => {
    setTipoVivienda(e.target.value);
    // setResidencial(e.target.value === "1"); // Actualiza el estado residencial si el valor es "1" (Residencial)
  };

  const validarCorreo = correo => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(correo);
  };

  // Funciones para mostrar y cerrar los modales individuales
  const handleModalShowDotacion3 = () => {
    setShowModalDotacion3(true);
  };

  const handleModalCloseDotacion3 = () => {
    setShowModalDotacion3(false);
  };

  const handleModalShowDotacion4 = () => {
    setShowModalDotacion4(true);
  };

  const handleModalCloseDotacion4 = () => {
    setShowModalDotacion4(false);
  };

  const handleModalShowDotacion5 = () => {
    setShowModalDotacion5(true);
  };

  const handleModalCloseDotacion5 = () => {
    setShowModalDotacion5(false);
  };

  const handleModalSubmit = (dotacionField, unidadesField) => {
    const requestBody = {
      // tipo: id_tipo,
      dotacion: dotacionField,
      unidades: unidades
    };

    //console.log("Petición enviada:", requestBody);
    // handleModalClose();
    if (dotacionField === 'dotacion_3') {
      handleModalCloseDotacion3();
    } else if (dotacionField === 'dotacion_4') {
      handleModalCloseDotacion4();
    } else if (dotacionField === 'dotacion_5') {
      handleModalCloseDotacion5();
    }
  };

  const handleSaveData = () => {
    const constructoraData = {
      Compañía: '0',
      nit: answers.constructoraNIT,
      direccion: answers.constructoraDireccion,
      nombre: answers.constructoraNombre,
      telefono: answers.constructoraTelefono
      // correo: answers.constructoraCorreo,
    };

    if (Object.values(constructoraData).filter(value => value).length > 1) {
      datosGuardadosTabla.push(constructoraData);
    }

    const vendedoraData = {
      Compañía: '1',
      nit: answers.vendedoraNIT,
      direccion: answers.vendedoraDireccion,
      nombre: answers.vendedoraNombre,
      telefono: answers.vendedoraTelefono
      // correo: answers.vendedoraCorreo,
    };

    if (Object.values(vendedoraData).filter(value => value).length > 1) {
      datosGuardadosTabla.push(vendedoraData);
    }

    const gerenciaData = {
      Compañía: '2',
      nit: answers.gerenciaNIT,
      direccion: answers.gerenciaDireccion,
      nombre: answers.gerenciaNombre,
      telefono: answers.gerenciaTelefono
      // correo: answers.gerenciaCorreo,
    };

    if (Object.values(gerenciaData).filter(value => value).length > 1) {
      setDatosGuardadosTabla([...datosGuardadosTabla, gerenciaData]);
    }

    //console.log("Datos guardados:", datosGuardadosTabla);
    setShowSuccessMessage(true);
    // setTimeout(() => {
    //   setShowSuccessMessage(false);
    // }, 3000);
  };

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption
    });
    if (questionId === 'q15') {
      setHasSalesRoom(selectedOption);
      setShowSalesRoomQuestion(selectedOption === '1');
    }
  };

  const retroceder = () => {
    window.history.back();
  };

  const handleOptionSelectExterior = (id, option) => {
    const selectedOptionsExterior = { ...answers.q18 };

    if (!selectedOptionsExterior[id]) {
      selectedOptionsExterior[id] = [option];
    } else {
      const optionIndex = selectedOptionsExterior[id].indexOf(option);
      if (optionIndex === -1) {
        selectedOptionsExterior[id].push(option);
      } else {
        selectedOptionsExterior[id].splice(optionIndex, 1);
        if (selectedOptionsExterior[id].length === 0) {
          delete selectedOptionsExterior[id];
        }
      }
    }
    setAnswers({ ...answers, q18: selectedOptionsExterior });
  };

  const handleOptionSelect = (categoriaId, caracteristicaId, especificacion) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [categoriaId]: {
        ...prevState[categoriaId],
        [caracteristicaId]: !prevState[categoriaId]?.[caracteristicaId]
      }
    }));
  };

  const [tiposProyectoArray, setTiposProyectoArray] = useState([
    {
      nombre: '',
      tipo_vivienda: '',
      numero_unidades: '',
      uso: '',
      area: '',
      dotacion_1: '',
      dotacion_2: '',
      dotacion_3: '',
      dotacion_4: '',
      dotacion_5: '',
      venta: '',
      renuncias: '',
      saldo: '',
      precio: '',
      precio_m2: '',
      novedad: ''
    }
  ]);

  const handleInputChangeTipo = (e, index) => {
    const { name, value } = e.target;
    const newData = [...tiposProyectoArray];
    newData[index][name] = value;
    //console.log("Este es el arreglo de tipos de handle", tiposProyectoArray);

    if (name === 'correo') {
      const esValido = validarCorreo(value);
      setCorreoValido(esValido);
    }

    // Validación del número de teléfono
    const telefonoError = validarTelefono(value);
    actualizarErrores(index, telefonoError);

    setTiposProyecto(newData);
    setAnswers({
      ...answers,
      q17: newData
    });
  };

  const validarTelefono = telefono => {
    if (telefono.length !== 10 && telefono.length !== 8) {
      return 'El teléfono debe tener entre 8 y 10 dígitos';
    }
    return '';
  };

  const actualizarErrores = (index, error) => {
    setErrores(prevErrores => {
      const nuevosErrores = [...prevErrores];
      nuevosErrores[index] = error;
      return nuevosErrores;
    });
  };

  const agregarFilaTipo = () => {
    const nuevoTipo = {
      nombre: '',
      tipo_vivienda: '',
      uso: '',
      area: '',
      dotacion_1: '',
      dotacion_2: '',
      dotacion_3: '',
      dotacion_4: '',
      dotacion_5: '',
      venta: '',
      renuncias: '',
      saldo: '',
      precio: '',
      precio_m2: '',
      novedad: ''
    };
    setTiposProyectoArray([...tiposProyectoArray, nuevoTipo]);
  };
  const eliminarTipo = index => {
    const nuevosTipos = [...tiposProyectoArray];
    nuevosTipos.splice(index, 1);
    setTiposProyectoArray(nuevosTipos);
  };
  useEffect(() => {
    setAnswers({ ...answers, q17: tiposProyectoArray });
  }, [tiposProyectoArray]);

  const params = useParams();
  // //console.log(params);

  const handleSubmit = async e => {
    e.preventDefault();
    //console.log("Respuestas:", answers);

    const randomUUID = 'xxxxxxxx'.replace(/[x]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      return r.toString(16);
    });

    const formData = {
      id: randomUUID,
      comment: '',
      proyecto: params.id,
      codigo_etapa: `EtapaN-${randomUUID}`,
      destino_etapa: answers.q3,
      nombre: answers.q1,
      numero_unidades: answers.q2,
      uso: answers.q4,
      pisos_por_bloque_area_construida: answers.q6,
      apto_piso_area_vendible: answers.q5,
      apto_piso_bloque_etapa_residencial: answers.q5a,
      apto_piso_etapa_residencial: answers.q6a,
      fecha_inicio_ventas: answers.q7,
      fecha_inicio_construccion: answers.q8,
      fecha_fin_construccion: answers.q9,
      fecha_entrega_construccion: answers.q10,
      es_estado: answers.q11,
      fa_fase: answers.q12,
      entidad_credito_constructor: answers.q14,
      entidad_fiduciaria: answers.q15,
      condicion_entrega: answers.q16,
      observacion_etapa: answers.q99
    };

    // //console.log("Estos el el arreglo de tipos ", tiposProyectoArray);

    const formDataTipo = {
      tiposProyectoArray: tiposProyectoArray.map(item => ({
        id: params.id,
        nombre: item.nombre,
        tipo_vivienda: item.tipo_vivienda,
        uso: item.uso,
        numero_unidades: item.numero_unidades,
        area: item.area,
        dotacion_1: item.dotacion_1,
        dotacion_2: item.dotacion_2,
        dotacion_3: item.dotacion_3,
        dotacion_4: item.dotacion_4,
        dotacion_5: item.dotacion_5,
        // venta: item.venta,
        // renuncias: item.renuncias,
        // saldo: item.saldo,
        // precio: item.precio,
        // precio_m2: item.precio_m2,
        novedad: item.novedad
      }))
    };

    //console.log("Este es el formData", formData);

    // //console.log("Este es el formulario para el fetch de tipo", formDataTipo);

    const urlCreateStage = `http://127.0.0.1:8000/proyecto/cambiar_datos_etapa/`;
    // const urlCreateStage = `https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto/cambiar_datos_etapa/`;
    const urlAddExteriorFinishes = 'https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto/acabado_interior/';
    const urlAddCompany = 'https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto/company_etapa/';

    // const urlChangeType =
    //   "https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto/datos_tipo/id=e0949940-5414-418f-857e-3c82d73fc3c7/";

    try {
      // const responseEtapa = await fetch(urlChangeType, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formDataTipo),
      // });

      // if (responseEtapa.ok) {
      //   //console.log("Solicitud de etapa exitosa");
      // }

      const response = await fetch(urlCreateStage, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        //console.log("Solicitud exitosa", response);
        alert('Datos ingresados con exito');
        const dataResponseCreateStage = await response.json();
        const arrayOptionsExteriorFinishes = [];
        const stageId = dataResponseCreateStage[0]['id'];

        for (const key in answers.q18) {
          if (answers.q18.hasOwnProperty(key)) {
            const categoria = parseInt(key);
            const acabados = answers.q18[key].map(acabado => ({
              categoria,
              acabado: parseInt(acabado),
              proyecto: params.id
            }));
            arrayOptionsExteriorFinishes.push(...acabados);
          }
        }

        try {
          const response = await fetch(urlAddExteriorFinishes, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(arrayOptionsExteriorFinishes)
          });
          console.log('Estos son los acabados interiores q se envian', arrayOptionsExteriorFinishes);
          if (response.ok) {
            //console.log("Agregados exteriores con exito");
          } else {
            console.error('Error al enviar la solicitud de exteriores');
          }
        } catch (error) {
          console.error('Error al realizar la solicitud exteriores:', error);
        }
        const datosOrganizados = [];

        datosGuardadosTabla.forEach(item => {
          const tipo_compañia = item.Compañía || '';
          const nombre = item.nombre || '';
          const nit = item.nit || '';
          const direccion = item.direccion || '';
          const telefono = item.telefono || '';
          const correo = item.correo || '';
          const etapa = stageId;

          const datos = {
            tipo_compañia,
            nombre,
            etapa,
            nit,
            direccion,
            telefono,
            correo
          };

          datosOrganizados.push(datos);
          //console.log("Datos organizados:", datosOrganizados);
        });
        fetch(urlAddCompany, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datosOrganizados)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('No se pudo completar la solicitud al servidor');
            }
            return response.json();
          })
          .then(data => {
            //console.log("Se agrego correctamente la compañia", data);
          })
          .catch(error => {
            // Manejar los errores de la solicitud
            console.error('Error en la solicitud:', error);
          });
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const handleLetterInput = e => {
    if (e.target.value.length === 1) {
      e.preventDefault();
    }
    const inputValue = e.key;
    const regex = /^[A-Za-z]$/;
    if (!regex.test(inputValue)) {
      e.preventDefault();
    }
  };

  const handleKeyPress = e => {
    const inputValue = e.key;
    if (!/^[0-9,]$/.test(inputValue)) {
      e.preventDefault();
    }
  };

  const handleNumericInput = e => {
    const inputValue = e.target.value;
    // Filtrar solo números
    const filteredValue = inputValue.replace(/[^0-9]/g, '');

    e.target.value = filteredValue;
  };

  return (
    <div>
      {' '}
      <AppBar position='static'>
        <Toolbar>
          <a href='/pollsterForm'>
            <img src={logo} alt='Logo' style={{ marginRight: '50px' }} />
          </a>
          <Button
            style={{ color: 'white', marginRight: '10px' }}
            id='ButtonNav'
            color='primary'
            href='/pollsterForm'
            variant='contained'>
            Proyectos Encuestador
          </Button>
          <Button style={{ color: 'white' }} id='ButtonNav' color='primary' href='/createProject' variant='contained'>
            Ingresar Proyecto
          </Button>
          <div id='ButtonNavLeft' style={{ marginLeft: 'auto' }}>
            <Button color='inherit' onClick={retroceder}>
              <FaArrowLeft size={25} />
            </Button>
          </div>
          <div className='menu-container'>
            <CustomDropdownMenuTwo />
          </div>
        </Toolbar>
      </AppBar>
      <ProjectStageForm />
    </div>
  );
};

export default StageProject;
