import React, { useState, useEffect } from 'react';
import './CreateProject.css';
import { MDBContainer } from 'mdb-react-ui-kit';
import logo from '../../assets/img/logo-cnc-pequeño.png';
import {
  FaSignInAlt,
  FaArrowLeft,
  FaTrash,
  FaPlus,
  FaSave,
  FaTimes,
  FaExclamationCircle,
  FaMapMarker,
  FaChevronDown,
  FaChevronUp,
  FaCheck
} from 'react-icons/fa';
import { Table, Form, Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ZonasComunes, opcionesDepartamentoCiudadZona } from '../../utils';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CustomDropdownMenuTwo from '../DropdownMenuTwo/CustomDropdownMenuTwo';

const CreateProject = () => {
  const [answers, setAnswers] = useState({ q28: {} }, { q27: {} }, { q26: {} });
  const [longitud, setLongitud] = useState('');
  const [addressBuildProject, setAddressBuildProject] = useState('');
  const [latitud, setLatitud] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('');
  const [selectedZone, setSelectedZone] = useState('');
  const [streetType, setStreetType] = useState('');
  const [number, setNumber] = useState('');
  const [bisSales, setBisSales] = useState('');
  const [bis2, setBis2] = useState('');
  const [cardinalPoint, setCardinalPoint] = useState('');
  const [cardinalPointTwo, setCardinalPointTwo] = useState('');
  const [cardinalPointThree, setCardinalPointThree] = useState('');
  const [cardinalPointFour, setCardinalPointFour] = useState('');
  const [letter, setLetter] = useState('');
  const [letter4, setLetter4] = useState('');
  const [letter2, setLetter2] = useState('');
  const [numeral, setNumeral] = useState('#');
  const [address, setAddress] = useState('');
  const [number2, setNumber2] = useState('');
  const [number3, setNumber3] = useState('');
  const [hasSalesRoom, setHasSalesRoom] = useState('');
  const [salesRoomAddress, setSalesRoomAddress] = useState('');
  const [showSalesRoomQuestion, setShowSalesRoomQuestion] = useState(false);
  const [salesNumber, setSalesNumber] = useState('');
  const [salesLetter, setSalesLetter] = useState('');
  const [salesNumeral, setSalesNumeral] = useState('#');
  const [salesNumber2, setSalesNumber2] = useState('');
  const [salesLetter2, setSalesLetter2] = useState('');
  const [salesNumber3, setSalesNumber3] = useState('');
  const [streetType2, setStreetType2] = useState('');
  const [otroTipoVia, setOtroTipoVia] = useState('');
  const [otroTipoVia2, setOtroTipoVia2] = useState('');
  const [errores, setErrores] = useState([]);
  const [salesLetter4, setSalesLetter4] = useState('');
  const [destino, setDestino] = useState('');
  const [contactoProyecto, setContactoProyecto] = useState([]);
  // const [idProjectUseContact, setIdProjectUseContact] = useState("");
  const [nuevaCertificacion, setNuevaCertificacion] = useState(0);
  const [certificaciones, setCertificaciones] = useState([]);
  const [respuestasGuardadas, setRespuestasGuardadas] = useState(false);
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState(0);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [respuestaCorrectaFetch, setRespuestaCorrectaFetch] = useState(false);
  const [projectIdResponse, setProjectIdResponse] = useState(null);
  const [correoValido, setCorreoValido] = useState(true);
  const [direccionNormalizada, setDireccionNormalizada] = useState('');
  const [isTableVisible26, setTableVisible26] = useState(false);
  const [isTableVisible27, setTableVisible27] = useState(false);
  const [isTableVisible28, setTableVisible28] = useState(false);
  const [erroresTelefono, setErroresTelefono] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleTableVisibility26 = () => {
    setTableVisible26(!isTableVisible26);
  };

  const toggleTableVisibility27 = () => {
    setTableVisible27(!isTableVisible27);
  };

  const toggleTableVisibility28 = () => {
    setTableVisible28(!isTableVisible28);
  };

  const validarCorreo = correo => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(correo);
  };

  const [respuestasGuardadasCaracteristicas, setRespuestasGuardadasCaracteristicas] = useState(false);

  const retroceder = () => {
    window.history.back();
  };

  const [usoProyecto, setUsoProyecto] = useState('');

  const handleOptionSelectCharacteristic = (id, caracteristicaId, especificacion) => {
    const newAnswers = { ...answers.q27 };

    if (newAnswers[id] && newAnswers[id][caracteristicaId] && newAnswers[id][caracteristicaId][especificacion]) {
      delete newAnswers[id][caracteristicaId][especificacion];
      if (Object.keys(newAnswers[id][caracteristicaId]).length === 0) {
        delete newAnswers[id][caracteristicaId];
      }

      if (Object.keys(newAnswers[id]).length === 0) {
        delete newAnswers[id];
      }
    } else {
      if (!newAnswers[id]) {
        newAnswers[id] = {};
      }
      if (!newAnswers[id][caracteristicaId]) {
        newAnswers[id][caracteristicaId] = {};
      }
      newAnswers[id][caracteristicaId][especificacion] = true;
    }
    setAnswers({ ...answers, q27: newAnswers });
  };

  const [contactoProyectoArray, setContactoProyectoArray] = useState([
    {
      cargo: '',
      nombre: '',
      apellido: '',
      telefono: '',
      correo: '',
      autorizacion: '0'
    }
  ]);
  const [telefonoProyectoArray, setTelefonoProyectoArray] = useState([
    {
      telefono: ''
    }
  ]);

  const handleCaracteristicaChange = e => {
    setNuevaCaracteristica(parseInt(e.target.value));
  };

  const agregarCaracteristica = () => {
    setCaracteristicas([...caracteristicas, nuevaCaracteristica]);
    setNuevaCaracteristica(0);
  };

  const eliminarCaracteristica = index => {
    const nuevasCaracteristicas = [...caracteristicas];
    nuevasCaracteristicas.splice(index, 1);
    setCaracteristicas(nuevasCaracteristicas);
  };

  const guardarRespuestasCaracteristicas = () => {
    setAnswers({ ...answers, q34: caracteristicas });
    setRespuestasGuardadasCaracteristicas(true);
    // //console.log(answers);
  };

  const handleCertificacionChange = e => {
    setNuevaCertificacion(parseInt(e.target.value));
  };

  const agregarCertificacion = () => {
    setCertificaciones([...certificaciones, nuevaCertificacion]);
    setNuevaCertificacion(0);
  };

  const guardarRespuestas = () => {
    setAnswers({ ...answers, q33: certificaciones });
    setRespuestasGuardadas(true);
    // //console.log(answers);
  };

  const eliminarCertificacion = index => {
    const nuevasCertificaciones = [...certificaciones];
    nuevasCertificaciones.splice(index, 1);
    setCertificaciones(nuevasCertificaciones);
  };

  const agregarFilaContacto = () => {
    const nuevoContacto = {
      cargo: '',
      nombre: '',
      apellido: '',
      telefono: '',
      correo: '',
      autorizacion: '0'
    };
    setContactoProyectoArray([...contactoProyectoArray, nuevoContacto]);
  };

  const agregarFilaTelefono = () => {
    const nuevoTelefono = {
      telefono: ''
    };
    setTelefonoProyectoArray([...telefonoProyectoArray, nuevoTelefono]);
  };
  const eliminarContacto = index => {
    const nuevosContactos = [...contactoProyectoArray];
    nuevosContactos.splice(index, 1);
    setContactoProyectoArray(nuevosContactos);
  };
  const eliminarTelefono = index => {
    const nuevosContactos = [...telefonoProyectoArray];
    nuevosContactos.splice(index, 1);
    setTelefonoProyectoArray(nuevosContactos);
  };
  useEffect(() => {
    setAnswers({ ...answers, q25: contactoProyectoArray });
  }, [contactoProyectoArray]);

  const certificadosSostenibles = [
    { 0: 'Seleccionar opción' },
    { 1: 'LEED - Standard' },
    { 2: 'LEED - Silver' },
    { 3: 'LEED - Gold' },
    { 4: 'LEED - Platinumr' },
    { 5: 'EDGE - Standard' },
    { 6: 'EDGE - Advanced' },
    { 7: 'EDGE - Zero Carbon' },
    { 8: 'CASA' },
    { 9: 'HQE' },
    { 10: 'BREEAM' },
    { 11: 'En proceso - EDGE' },
    { 12: 'En proceso - LEED' },
    { 13: 'En proceso - BREEAM' },
    { 14: 'En proceso - CASA' },
    { 15: 'En proceso - HQE' },
    { 99: 'Sin Asignar' }
  ];

  const caracteristicasProyecto = [
    { 0: 'Coliving' },
    { 1: 'Multifamily' },
    { 2: 'Senior Living - Cohousing' },
    { 3: 'Senior Living - Coliving' },
    { 4: 'Senior Living - Resort' },
    { 5: 'Tradicional' },
    { 6: 'Vivienda para exportar' },
    { 99: 'Sin Asignar' }
  ];

  const exteriorFinishData = [
    {
      id: 1,
      nombre: 'Fachada R',
      residencial: {
        6: 'Bloque de arcilla',
        7: 'Caraplast',
        8: 'Concreto a la vista',
        9: 'Graniplast',
        10: 'Mármol',
        11: 'Ladrillo a la vista',
        12: 'Pañete, estuco, pintura',
        13: 'Piedra',
        14: 'Tableta arcilla',
        15: 'No responde',
        16: 'No aplica',
        17: 'Otro',
        353: 'Sin definir',
        417: 'Porcelanato',
        418: 'Vidrio'
      },
      noResidencial: []
    },
    {
      id: 2,
      nombre: 'Cubiertas R',
      residencial: {
        18: 'Placa en concreto',
        19: 'Teja arcilla',
        20: 'Teja fibrocemento',
        21: 'Teja plastica',
        22: 'Teja termoacústica',
        23: 'Teja zinc',
        24: 'No responde',
        25: 'No aplica',
        26: 'Otro',
        352: 'Sin definir'
      },
      noResidencial: []
    },
    {
      id: 5,
      nombre: 'Ventanería R - NR',
      residencial: {
        47: 'Aluminio',
        48: 'PVC',
        49: 'Acero',
        50: 'No responde',
        51: 'No aplica',
        52: 'Otro',
        349: 'Sin definir'
      },
      noResidencial: {
        27: 'Bloque de hormigon',
        28: 'Bloque de arcilla',
        29: 'Concreto a la vista',
        30: 'Graniplast',
        31: 'Mármol',
        32: 'Ladrillo a la vista',
        33: 'Pañete, estuco, pintura',
        34: 'Piedra',
        35: 'Vidrio',
        36: 'No responde',
        37: 'No aplica',
        38: 'Otro',
        351: 'Sin definir'
      }
    },
    {
      id: 3,
      nombre: 'Fachada NR',
      residencial: [],
      noResidencial: {
        27: 'Bloque de hormigon',
        28: 'Bloque de arcilla',
        29: 'Concreto a la vista',
        30: 'Graniplast',
        31: 'Mármol',
        32: 'Ladrillo a la vista',
        33: 'Pañete, estuco, pintura',
        34: 'Piedra',
        35: 'Vidrio',
        36: 'No responde',
        37: 'No aplica',
        38: 'Otro',
        351: 'Sin definir'
      }
    },
    {
      id: 4,
      nombre: 'Cubiertas NR',
      residencial: [],
      noResidencial: {
        39: 'Placa en concreto',
        40: 'Teja arcilla',
        41: 'Teja fibrocemento',
        42: 'Teja plástica',
        43: 'Teja termoacústica',
        44: 'No responde',
        45: 'No aplica',
        46: 'Otro',
        350: 'Sin definir'
      }
    }
  ];

  const handleOptionSelectExterior = (id, option) => {
    const selectedOptionsExterior = { ...answers.q28 };

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
    setAnswers({ ...answers, q28: selectedOptionsExterior });
  };

  const [dataZonasComunes, setDataZonasComunes] = useState(ZonasComunes);
  const [dataDepartamentoCiudadBarrioZona, setDataDepartamentoCiudadBarrioZona] = useState(opcionesDepartamentoCiudadZona);

  const handleCheckboxChange = idZona => {
    const index = dataZonasComunes.findIndex(item => item.idZona === idZona);

    if (index !== -1) {
      const newDataZonasComunes = [...dataZonasComunes];
      newDataZonasComunes[index].selected = !newDataZonasComunes[index].selected;

      const selectedIds = newDataZonasComunes.filter(item => item.selected).map(item => item.idZona);

      setDataZonasComunes(newDataZonasComunes);
      setAnswers({ ...answers, q26: selectedIds });
    }
  };

  const handleInputTelefonoChange = (e, index) => {
    const { value } = e.target;

    setTelefonoProyectoArray(prevTelefonos => {
      const nuevosTelefonos = [...prevTelefonos];
      nuevosTelefonos[index] = { telefono: value };

      // Actualizar answers.q12 con los teléfonos separados por coma
      const telefonosSeparadosPorComa = nuevosTelefonos
        .map(item => item.telefono)
        .filter(telefono => telefono !== '') // Filtrar números vacíos
        .join(',');

      handleAnswerChange('q12', telefonosSeparadosPorComa);

      return nuevosTelefonos;
    });
  };

  const handleInputChange = (e, index) => {
    e.persist();
    const { name, value } = e.target;
    const newData = [...contactoProyectoArray];
    if (name === 'actualiza') {
      newData[index][name] = !newData[index][name];
    } else {
      newData[index][name] = value;
      if (!newData[index].hasOwnProperty('actualiza')) {
        newData[index].actualiza = false;
      }
      if (name === 'correo') {
        const esValido = validarCorreo(value);
        setCorreoValido(esValido);
      }
      const telefonoError = validarTelefono(value);
      actualizarErrores(index, telefonoError);
    }
    setContactoProyecto(newData);
    setAnswers({
      ...answers,
      q25: newData
    });
  };

  const validarTelefono = telefono => {
    if (telefono.length !== 10 && telefono.length !== 8) {
      return 'El teléfono debe tener entre 8 y 10 dígitos';
    }
    return '';
  };

  const handleNumericInput = e => {
    const inputValue = e.key;
    if (!/^[0-9]$/.test(inputValue)) {
      e.preventDefault();
    }
  };

  const actualizarErrores = (index, error) => {
    setErroresTelefono(prevErrores => {
      const nuevosErrores = [...prevErrores];
      nuevosErrores[index] = error;
      return nuevosErrores;
    });
  };

  const bogotaLocalidades = [
    'Usaquén',
    'Chapinero',
    'Santa Fe',
    'San Cristóbal',
    'Usme',
    'Tunjuelito',
    'Bosa',
    'Kennedy',
    'Fontibón',
    'Engativá',
    'Suba',
    'Barrios Unidos',
    'Teusaquillo',
    'Los Mártires',
    'Antonio Nariño',
    'Puente Aranda',
    'La Candelaria',
    'Rafael Uribe Uribe',
    'Ciudad Bolívar',
    'Sumapaz'
  ];

  const technicalFeaturesData = [
    {
      id: 1,
      categoria: 'Subestructura R-NR',
      caracteristicaId: 7,
      caracteristica: 'Cimentaciones',
      especificacion: {
        21: 'Micropilotes',
        22: 'Pilotes',
        23: 'Caissons',
        24: 'Zapatas',
        25: 'Losas o placas de cimentación',
        26: 'Placa flotada',
        78: 'Estructura metálica',
        88: 'No responde',
        89: 'Sin definir',
        90: 'Otro',
        98: 'No aplica'
      }
    },
    {
      id: 1,
      categoria: 'Subestructura R-NR',
      caracteristicaId: 8,
      caracteristica: 'Sótanos / semisótanos',
      especificacion: {
        27: 'Industrializado',
        28: 'Prefabricados',
        29: 'Mamposteria confinada',
        91: 'No responde',
        92: 'Sin definir',
        93: 'Otro',
        99: 'No aplica'
      }
    },
    {
      id: 2,
      categoria: 'Sistema Constructivo R',
      caracteristicaId: 9,
      caracteristica: 'Tradicional',
      especificacion: {
        60: 'Aporticado'
      }
    },
    {
      id: 2,
      categoria: 'Sistema Constructivo R',
      caracteristicaId: 10,
      caracteristica: 'Mampostería Estructural',
      especificacion: {
        31: 'Mampostería Estructural',
        109: 'Estructura combinada'
      }
    },
    {
      id: 2,
      categoria: 'Sistema Constructivo R',
      caracteristicaId: 11,
      caracteristica: 'Industrializado',
      especificacion: {
        32: 'Forsa',
        33: 'Contech',
        34: 'Outinord',
        35: 'Unispan',
        36: 'Otro tipo de formaleta metálica',
        37: 'Sin definir',
        79: 'Manoportable',
        80: 'Tunel',
        84: 'No responde',
        85: 'Otro',
        100: 'No aplica'
      }
    },
    {
      id: 2,
      categoria: 'Sistema Constructivo R',
      caracteristicaId: 12,
      caracteristica: 'Estructura metálica',
      especificacion: {
        38: 'Estructura metálica'
      }
    },
    {
      id: 3,
      categoria: 'Placa entre piso R',
      caracteristicaId: 13,
      caracteristica: 'Placa entre Piso',
      especificacion: {
        39: 'Aligerada con casetón',
        40: 'Aligerada con icopor',
        41: 'Aligerada Retcell',
        42: 'Bloquelón',
        43: 'Placa con steel deck',
        44: 'Placa o losa maciza',
        45: 'No responde',
        46: 'Sin Definir',
        47: 'Otro',
        101: 'No aplica',
        107: 'Aligerada con Poliestireno'
      }
    },
    {
      id: 4,
      categoria: 'Divisiones interiores R-NR',
      caracteristicaId: 14,
      caracteristica: 'Divisiones interiores',
      especificacion: {
        48: 'Bloque arcilla',
        49: 'Bloque hormigón',
        50: 'Concreto',
        51: 'Dry wall',
        52: 'Durapanel',
        54: 'Ladrillo de arcilla',
        55: 'Ladrillo de hormigon',
        56: 'Super board',
        57: 'No responde',
        58: 'Sin Definir',
        59: 'Otro',
        81: 'Placa Board',
        96: 'No aplica',
        104: 'Vidrio'
      }
    },
    {
      id: 5,
      categoria: 'Sistema Constructivo NR',
      caracteristicaId: 15,
      caracteristica: 'Tradicional',
      especificacion: {
        60: 'Aporticado'
      }
    },
    {
      id: 5,
      categoria: 'Sistema Constructivo NR',
      caracteristicaId: 16,
      caracteristica: 'Mampostería Estructural',
      especificacion: {
        61: 'Mampostería Estructural '
      }
    },
    {
      id: 5,
      categoria: 'Sistema Constructivo NR',
      caracteristicaId: 17,
      caracteristica: 'Industrializado',
      especificacion: {
        62: 'Forsa',
        63: 'Contech',
        64: 'Outinord',
        65: 'Unispan',
        66: 'Otro tipo de formaleta metálica',
        67: 'Sin definir',
        82: 'Manoportable',
        83: 'Tunel',
        86: 'No responde',
        87: 'Otro',
        95: 'No aplica'
      }
    },
    {
      id: 5,
      categoria: 'Sistema Constructivo NR',
      caracteristicaId: 18,
      caracteristica: 'Estructura metálica',
      especificacion: {
        68: 'Estructura metálica'
      }
    },
    {
      id: 5,
      categoria: 'Sistema Constructivo NR',
      caracteristicaId: 19,
      caracteristica: 'Estructura combinada (concreto con metál)',
      especificacion: {
        69: 'Estructura combinada',
        102: 'No aplica',
        103: 'Sin definir'
      }
    },
    {
      id: 6,
      categoria: 'Placa entre piso NR',
      caracteristicaId: 20,
      caracteristica: 'Placa entre Piso',
      especificacion: {
        70: 'Aligerada con casetón',
        71: 'Aligerada con icopor',
        72: 'Aligerada Retcell',
        73: 'Placa con steel deck',
        74: 'Placa o losa maciza',
        75: 'No responde',
        76: 'Sin Definir',
        77: 'Otro',
        94: 'No aplica'
      }
    }
  ];

  const handleStreetTypeChange = e => {
    setStreetType(e.target.value);
  };
  const handleBisSalesChange = e => {
    setBisSales(e.target.value);
  };
  const handleBis2Change = e => {
    setBis2(e.target.value);
  };

  const handleCardinalPointChange = e => {
    setCardinalPoint(e.target.value);
  };

  const handleCardinalPointTwoChange = e => {
    setCardinalPointTwo(e.target.value);
    // buildAddress();
  };

  const handleCardinalPointThreeChange = e => {
    setCardinalPointThree(e.target.value);
  };

  const handleCardinalPointFourChange = e => {
    setCardinalPointFour(e.target.value);
    // buildSalesRoomAddress();
  };

  const handleNumberChange = e => {
    setNumber(e.target.value);
  };

  const handleLetterChange = e => {
    setLetter(e.target.value);
  };
  const handleLetter4Change = e => {
    setLetter4(e.target.value);
  };

  const handleNumeralChange = e => {
    setNumeral(e.target.value);
  };

  const handleNumberChange2 = e => {
    setNumber2(e.target.value);
  };

  const handleLetterChange2 = e => {
    setLetter2(e.target.value);
  };

  const handleNumberChange3 = e => {
    setNumber3(e.target.value);
    // buildAddress();
  };
  const handleStreetTypeChangeSales = e => {
    setStreetType2(e.target.value);
  };

  const handleOtroTipoViaChange = e => {
    setOtroTipoVia(e.target.value);
  };

  const handleOtroTipoVia2Change = e => {
    setOtroTipoVia2(e.target.value);
  };

  const handleNumberChangeSales = e => {
    setSalesNumber(e.target.value);
  };

  const handleLetterChangeSales = e => {
    setSalesLetter(e.target.value);
  };
  const handleLetterChangeSales4 = e => {
    setSalesLetter4(e.target.value);
  };

  const handleNumeralChangeSales = e => {
    setSalesNumeral(e.target.value);
  };

  const handleNumberChange2Sales = e => {
    setSalesNumber2(e.target.value);
  };

  const handleLetterChange2Sales = e => {
    setSalesLetter2(e.target.value);
  };

  const handleNumberChange3Sales = e => {
    setSalesNumber3(e.target.value);
  };

  const buildAddress = () => {
    const parts = [
      streetType === 'Otro' ? '' : streetType,
      otroTipoVia2,
      number,
      letter,
      cardinalPoint,
      bis2,
      letter4,
      numeral,
      number2,
      letter2,
      number3,
      cardinalPointTwo
    ].filter(Boolean);
    const newAddress = parts.join(' ');
    setAnswers({ ...answers, q11: newAddress });
    setAddressBuildProject(newAddress);
  };

  const buildSalesRoomAddress = () => {
    const partsTwo = [
      streetType2 === 'Otro' ? '' : streetType2,
      otroTipoVia,
      salesNumber,
      salesLetter,
      cardinalPointThree,
      bisSales,
      salesLetter4,
      salesNumeral,
      salesNumber2,
      salesLetter2,
      salesNumber3,
      cardinalPointFour
    ].filter(Boolean);
    const newAddressSales = partsTwo.join(' ');
    setAnswers({ ...answers, q16: newAddressSales });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitud(position.coords.latitude);
      setLongitud(position.coords.longitude);
    });
  }, []);

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption
    });
    if (questionId === 'q15') {
      setHasSalesRoom(selectedOption);
      setShowSalesRoomQuestion(selectedOption === '1');
    }

    // Agregar la lógica para verificar si la dirección normalizada está vacía
    if (questionId === 'q11') {
      setDireccionNormalizada(selectedOption);
    }
  };

  const mostrarAvisoDireccionDescriptiva = direccionNormalizada === '';
  const handleDepartmentChange = event => {
    const selectedValue = event.target.value;
    setAnswers({ ...answers, q6: selectedValue });
    setSelectedDepartment(selectedValue);
  };

  const handleLocationChange = e => {
    const selectedValue = e.target.value;
    setSelectedLocation(selectedValue);
    setAnswers({
      ...answers,
      q7: selectedValue
    });
  };

  const handleLocalityChange = event => {
    const selectedValue = event.target.value;
    setAnswers({ ...answers, q8: selectedValue });
    setSelectedLocality(selectedValue);
  };

  const handleZoneChange = e => {
    const selectedValue = e.target.value;
    setSelectedZone(selectedValue);
    setAnswers({
      ...answers,
      q9: selectedValue
    });
  };

  const handleBuildButtonClick = () => {
    buildAddress();
  };

  const handleRoomAddressButtonClick = () => {
    buildSalesRoomAddress();
  };

  // const getCurrentDate = () => {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = String(today.getMonth() + 1).padStart(2, "0");
  //   const day = String(today.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };

  const handleSubmit = async e => {
    e.preventDefault();
    //console.log("Respuestas:", answers);

    const randomUUID = 'xxxx-xxxx'.replace(/[x]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      return r.toString(16);
    });

    const formData = [
      {
        codigo_proyecto: `proyectoN-${randomUUID}`,
        nombre_proyecto: answers.q4,
        longitud: answers.q99.toString(),
        latitud: answers.q98.toString(),
        regional: parseInt(answers.q5),
        departamento: parseInt(answers.q6),
        ciudad: parseInt(answers.q7),
        localidad: answers.q8,
        zona: parseInt(answers.q9),
        barrio: answers.q10,
        direccion_proyecto: answers.q11,
        direccion_descriptiva: answers.q11a,
        tiene_sala_ventas: parseInt(answers.q15),
        direccion_sala_ventas: answers.q16,
        estrato: parseInt(answers.q18),
        area_lote: parseInt(answers.q22),
        area_construida: parseInt(answers.q23),
        area_vendible: parseInt(answers.q24),
        fecha_corte_censo: answers.q2,
        fecha_inicio_proyecto: getCurrentDate(),
        num_bloques: parseInt(answers.q21),
        parqueaderos_visitantes: parseInt(answers.q29),
        parqueaderos_propietarios: parseInt(answers.q30),
        destino_proyecto: parseInt(answers.q13),
        telefono: answers.q17,
        uso_general_proyecto: parseInt(answers.q14),
        estado: 2,
        fecha_creado: answers.q1,
        fecha_modificado: '2023-08-02T22:26:07.785317Z',
        comentarios: {
          Barrio: 'Barrio confirmado'
        },
        certificaciones_sostenibles: answers.q33,
        caracteristicas_proyecto: answers.q34,
        zona_comun: answers.q26,
        medicion: '630d3ab5-2a22-4ab6-a21e-3f198f515f84'
      }
    ];

    const urlCreateProject = 'https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto/datos_proyecto/';
    const urlAddContact = 'https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto/contacto/';
    const urlAddExteriorFinishes = 'https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto/acabado_exterior/';
    const urlAddCharacteristic = 'https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto/caracteristica_tecnica/';
    // const urlGetIdProject = `https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto/datos_proyecto_detail/id=${formData[0].codigo_proyecto}/`;

    try {
      const response = await fetch(urlCreateProject, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        //console.log("Solicitud exitosa");
        const dataResponseCreateProject = await response.json();
        const id = dataResponseCreateProject[0]['id'];
        alert('Datos ingresados con exito');
        const datosContactos = answers.q25;
        if (Array.isArray(datosContactos) && datosContactos.length > 0) {
          const formatedContact = datosContactos.map(contacto => ({
            proyecto: id,
            nombre: contacto.nombre + ' ' + contacto.apellido,
            cargo: contacto.cargo,
            telefono: contacto.telefono,
            email: contacto.correo,
            tiene_autorizacion: contacto.autorizacion
          }));
          try {
            const response = await fetch(urlAddContact, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formatedContact)
            });
            //console.log("Datos del id en contactos", formatedContact);

            if (response.ok) {
              //console.log("Contactos agregados con exito");
            } else {
              console.error('Error al enviar la solicitud de contactos');
            }
          } catch (error) {
            console.error('Error al realizar la solicitud contactos:', error);
          }
        }
        const arrayOptionsExteriorFinishes = [];

        for (const key in answers.q28) {
          if (answers.q28.hasOwnProperty(key)) {
            const categoria = parseInt(key);
            const acabados = answers.q28[key].map(acabado => ({
              proyecto: id,
              categoria,
              acabado: parseInt(acabado)
            }));
            arrayOptionsExteriorFinishes.push(...acabados);
          }
        }

        try {
          console.log('Estos son los cabados q envio', arrayOptionsExteriorFinishes);
          const response = await fetch(urlAddExteriorFinishes, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(arrayOptionsExteriorFinishes)
          });
          console.log('estos son los datos de caracteristicas', arrayOptionsExteriorFinishes);

          if (response.ok) {
            //console.log("Agregados exteriores con exito");
          } else {
            console.error('Error al enviar la solicitud de exteriores');
          }
        } catch (error) {
          if (error instanceof TypeError) {
            console.error('Error de tipo:', error);
          } else if (error instanceof SyntaxError) {
            console.error('Error de sintaxis JSON:', error);
          } else {
            console.error('Error al realizar la solicitud exteriores:', error);
          }
        }
        const arrayOptionsCharacteristic = [];

        for (const keyCategoria in answers.q27) {
          if (answers.q27.hasOwnProperty(keyCategoria)) {
            const categoria = parseInt(keyCategoria);

            for (const keyCaracteristicas in answers.q27[keyCategoria]) {
              if (answers.q27[keyCategoria].hasOwnProperty(keyCaracteristicas)) {
                const caracteristica = parseInt(keyCaracteristicas);

                for (const keyEspecificaciones in answers.q27[keyCategoria][keyCaracteristicas]) {
                  if (answers.q27[keyCategoria][keyCaracteristicas].hasOwnProperty(keyEspecificaciones)) {
                    const especificacion = parseInt(keyEspecificaciones);

                    arrayOptionsCharacteristic.push({
                      categoria,
                      caracteristica,
                      especificacion,
                      proyecto: id
                    });
                  }
                }
              }
            }
          }
        }

        try {
          console.log('Este es el arreglo de caracteristicas', arrayOptionsCharacteristic);
          const response = await fetch(urlAddCharacteristic, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(arrayOptionsCharacteristic)
          });

          if (response.ok) {
            //console.log("Agregados caracteristicas con exito");
          } else {
            console.error('Error al enviar la solicitud de caracteristicas');
          }
        } catch (error) {
          console.error('Error al realizar la solicitud caracteristicas:', error);
        }
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const handleLetterInput = e => {
    const inputValue = e.target.value;

    // Filtrar solo letras y permitir una longitud máxima de 1
    const filteredValue = inputValue.replace(/[^A-Za-z]/g, '');

    // Actualizar el valor del campo
    e.target.value = filteredValue;
  };

  const handleKeyPress = e => {
    const inputValue = e.key;
    if (!/^[0-9,]$/.test(inputValue)) {
      e.preventDefault();
    }
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;

    return `${year}-${month}-${day}`;
  }

  return (
    <div>
      {' '}
      <AppBar position='static'>
        <Toolbar>
          <a href='/pollsterForm'>
            <img src={logo} alt='Logo' style={{ marginRight: '20px' }} />
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
      <h1 style={{ marginTop: '30px' }}>
        Ingresar proyecto <FaSignInAlt size={30} />
      </h1>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            marginTop: '30px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 1: Fecha creación del proyecto </label>
          <input type='date' value={getCurrentDate()} readOnly />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 2: Fecha corte censo </label>
          <input type='date' value={answers.q2} onChange={e => handleAnswerChange('q2', e.target.value)} />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 3: ¿Cuál es el código del proyecto? </label>
          <input type='text' value={answers.q3} onChange={e => handleAnswerChange('q3', e.target.value)} disabled />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 4: ¿Cuál es el nombre del proyecto? </label>
          <input type='text' value={answers.q4} onChange={e => handleAnswerChange('q4', e.target.value)} />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 5: ¿Regional donde se encuentra ubicado el proyecto?</label>
          <select onChange={e => handleAnswerChange('q5', e.target.value)}>
            <option value={(answers.q5 = '0')}>Bogotá & Cundinamarca</option>
          </select>
        </div>

        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Latitud:</label>
          <input type='text' value={(answers.q99 = latitud)} readOnly />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Longitud:</label>
          <input type='text' value={(answers.q98 = longitud)} readOnly />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 6: ¿Departamento donde se encuentra ubicado el proyecto?</label>
          <select onChange={handleDepartmentChange} value={answers.q6}>
            <option value=''>Seleccione un departamento</option>
            {opcionesDepartamentoCiudadZona.map(departamento => (
              <option key={departamento.value} value={departamento.value}>
                {departamento.nombre}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 7: ¿Ciudad o municipio donde se encuentra ubicado el proyecto?</label>
          <select onChange={handleLocationChange} value={selectedLocation}>
            <option value=''>Seleccione una ubicación</option>
            {opcionesDepartamentoCiudadZona
              .find(departamento => departamento.value === parseInt(selectedDepartment))
              ?.ciudades.map(ciudad => (
                <option key={ciudad.value} value={ciudad.value}>
                  {ciudad.nombre}
                </option>
              ))}
          </select>
        </div>

        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 8: ¿Localidad donde se encuentra ubicado el proyecto?</label>
          <select onChange={handleLocalityChange} value={answers.q8} disabled={selectedDepartment === '1'}>
            <option value=''>Seleccione una localidad</option>
            {selectedDepartment === '0' &&
              bogotaLocalidades.map(localidad => (
                <option key={localidad} value={localidad}>
                  {localidad}
                </option>
              ))}
          </select>
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 9: ¿Zona donde se encuentra ubicado el proyecto?</label>

          <select onChange={handleZoneChange} value={answers.q9}>
            <option value=''>Seleccione una zona</option>
            {selectedDepartment === '0' &&
              opcionesDepartamentoCiudadZona
                .find(departamento => departamento.value === 0)
                .ciudades[0].zonas.map(zona => (
                  <option key={zona.valor} value={zona.valor}>
                    {zona.nombre}
                  </option>
                ))}
            {selectedDepartment === '1' &&
              opcionesDepartamentoCiudadZona
                .find(departamento => departamento.value === 1)
                .ciudades.map(ciudad =>
                  ciudad.zonas.map(zona => (
                    <option key={zona.valor} value={zona.valor}>
                      {zona.nombre}
                    </option>
                  ))
                )}
          </select>
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 10: ¿Cuál es el barrio del proyecto?</label>
          <input type='text' value={answers.q10} onChange={e => handleAnswerChange('q10', e.target.value)} />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
          <label style={{ marginBottom: '30px' }}>Pregunta 11: ¿Cuál es la dirección del proyecto?</label>
          <div id='item-container' className='top-row' style={{ display: 'flex', marginBottom: '20px' }}>
            <div className='item' style={{ padding: '10px' }}>
              <label>Tipo Vía:</label>
              <select onChange={handleStreetTypeChange} value={streetType} className='select-tipovia'>
                <option value=''>Seleccione</option>
                <option value='Avenida_Calle'>Avendia Calle</option>
                <option value='Avenida_Carrera'>Avendia Carrera</option>
                <option value='Calle'>Calle</option>
                <option value='Carrera'>Carrera</option>
                <option value='Diagonal'>Diagonal</option>
                <option value='Transversal'>Transversal</option>
                <option value='Avenida'>Avenida</option>
                <option value='Circular'>Circular</option>
                <option value='Autopista'>Autopista</option>
                <option value='Manzana'>Manzana</option>
                <option value='Circunvalar'>Circunvalar</option>
                <option value='Otro'>Otro</option>
              </select>
            </div>
            {streetType === 'Otro' && (
              <div id='item-container-numeral' className='item' style={{ padding: '10px' }}>
                <label>¿Cuál?</label>
                <input type='text' value={otroTipoVia2} onChange={handleOtroTipoVia2Change} className='input-numeral' />
              </div>
            )}
            <div className='item' style={{ padding: '10px' }}>
              <label>Número:</label>
              <input type='number' value={number} onChange={handleNumberChange} min='0' className='input-numeral' />
            </div>
            <div className='item' style={{ padding: '10px' }}>
              <label>Letra:</label>
              <input type='text' value={letter} onChange={handleLetterChange} onInput={handleLetterInput} className='input-numeral' />
            </div>
            <div className='item' style={{ padding: '10px' }}>
              <label>Bis:</label>
              <select onChange={handleBis2Change} value={bis2} className='select-tipovia'>
                <option value=''></option>
                <option value='Bis'>Bis</option>
              </select>
            </div>
            <div className='item' style={{ padding: '10px' }}>
              <label>Letra:</label>
              <input
                type='text'
                value={letter4}
                onChange={handleLetter4Change}
                onInput={handleLetterInput}
                className='input-numeral'
              />
            </div>
            <div className='item' style={{ padding: '10px' }}>
              <label>Punto cardinal:</label>
              <select
                onChange={handleCardinalPointChange}
                value={cardinalPoint}
                className='select-punto-cardinal'
                // disabled={!(answers.q15 == "1")
              >
                <option value=''>Seleccione</option>
                <option value='Norte'>Norte</option>
                <option value='Sur'>Sur</option>
                <option value='Este'>Este</option>
                <option value='Oeste'>Oeste</option>
              </select>
            </div>
          </div>
          <div id='item-container' className='bottom-row' style={{ display: 'flex', padding: '10px' }}>
            <div className='item'>
              <label>Numeral:</label>
              <input type='text' value='#' onChange={handleNumeralChange} disabled id='input-numeral' />
            </div>
            <div className='item' style={{ padding: '10px' }}>
              <label>Número:</label>
              <input type='number' value={number2} onChange={handleNumberChange2} min='0' />
            </div>
            <div className='item' style={{ padding: '10px' }}>
              <label>Letra:</label>
              <input type='text' value={letter2} onChange={handleLetterChange2} onInput={handleLetterInput} />
            </div>
            <div className='item' style={{ padding: '10px' }}>
              <label>Placa:</label>
              <input type='number' value={number3} onChange={handleNumberChange3} min='0' />
            </div>
            <div className='item' style={{ padding: '10px' }}>
              <label>Punto cardinal:</label>
              <select onChange={handleCardinalPointTwoChange} value={cardinalPointTwo} className='select-punto-cardinal'>
                <option value=''>Seleccione</option>
                <option value='Norte'>Norte</option>
                <option value='Sur'>Sur</option>
                <option value='Este'>Este</option>
                <option value='Oeste'>Oeste</option>
              </select>
            </div>
          </div>
          <button className='button-direccion' onClick={handleBuildButtonClick} style={{ marginBottom: '30px' }}>
            <FaMapMarker style={{ marginRight: '5px', marginTop: '-6px' }} />
            Construir dirección
          </button>
          {addressBuildProject && (
            <div>
              <label className='label-direccion-construida'>
                <FaCheck style={{ marginRight: '5px', color: 'green' }} />
                Dirección construida:
              </label>
              <p>{addressBuildProject}</p>
            </div>
          )}
          <div
            style={{
              color: 'green',
              marginTop: '10px',
              display: 'flex',
              alignItems: 'center'
            }}>
            <FaExclamationCircle style={{ marginRight: '5px', marginTop: '-2px' }} />
            Si no tiene dirección normalizada debe ingresar la dirección descriptiva (Pregunta 11 - b).
          </div>
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 11 - b: ¿Cuál es la dirección descriptiva del proyecto?</label>
          <input
            type='text'
            // value={answers.q11}
            onChange={e => handleAnswerChange('q11a', e.target.value)}
          />
          {mostrarAvisoDireccionDescriptiva && (
            <div
              style={{
                color: 'red',
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center'
              }}>
              <FaExclamationCircle style={{ marginRight: '5px' }} />
              Por favor, ingrese la dirección descriptiva.
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 12: ¿Cuál es el número de teléfono del proyecto? </label>
          <div class='table-responsive'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                    <strong>TELÉFONO</strong>
                  </th>
                  <th>
                    <strong>ACCIONES</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {telefonoProyectoArray.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        type='number'
                        name='telefono'
                        value={item.telefono}
                        onChange={e => handleInputTelefonoChange(e, index)}
                        className={`FormControl ${errores[index] ? 'ErrorBorder' : ''}`}
                        style={{
                          borderColor: errores[index] ? '#FF0000' : ''
                        }}
                        min='0'
                        onKeyPress={handleNumericInput}
                      />
                      {errores[index] && <div style={{ color: '#FF0000', marginTop: '5px' }}>{errores[index]}</div>}
                    </td>
                    <td>
                      <Button style={{ backgroundColor: '#EF5350', color: 'white' }} onClick={() => eliminarTelefono(index)}>
                        <FaTrash style={{ marginRight: '5px', marginBottom: '5px' }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Button onClick={agregarFilaTelefono}>
            <FaPlus style={{ marginRight: '5px', marginBottom: '5px' }} />
            Agregar nuevo teléfono
          </Button>
        </div>

        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 13: ¿Cuál es el destino?</label>
          <select
            onChange={e => {
              setDestino(e.target.value); // Actualizar el estado de destino
              handleAnswerChange('q13', e.target.value); // Actualizar answers.q13
            }}
            value={destino}>
            <option value=''>Seleccione una opción</option>
            <option value='1'>Venta</option>
            <option value='2'>Uso Propio</option>
            <option value='3'>Arrendamiento</option>
            <option value='4'>Adjudicación</option>
          </select>
        </div>
        <div>
          <div
            style={{
              marginTop: '40px',
              backgroundColor: '#EAEAEA',
              padding: '20px',
              borderRadius: '10px'
            }}>
            <label>Pregunta 14: ¿Cuál es el uso general del proyecto?</label>
            <select
              onChange={e => {
                setUsoProyecto(e.target.value);
                handleAnswerChange('q14', e.target.value);
              }}
              value={usoProyecto}>
              <option value=''>Seleccione una opción</option>
              <option value='1'>Residencial</option>
              <option value='0'>No Residencial</option>
            </select>
          </div>
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 15: ¿Tiene sala de ventas?</label>
          <select onChange={e => handleAnswerChange('q15', e.target.value)} value={(answers.q15 = hasSalesRoom)}>
            <option value=''>Seleccione una opción</option>
            <option value='1'>Sí</option>
            <option value='0'>No</option>
          </select>
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
          <label style={{ marginBottom: '30px' }}>Pregunta 16: ¿Cuál es dirección de la sala de ventas? </label>
          <div id='item-container' className='top-row' style={{ display: 'flex', marginBottom: '20px' }}>
            <div className='item' style={{ padding: '10px' }}>
              <label>Tipo Vía:</label>
              <select
                onChange={handleStreetTypeChangeSales}
                value={streetType2}
                className='select-tipovia'
                disabled={!(answers.q15 === '1')}>
                <option value=''>Seleccione</option>
                <option value='Avenida_Calle'>Avendia Calle</option>
                <option value='Avenida_Carrera'>Avendia Carrera</option>
                <option value='Calle'>Calle</option>
                <option value='Carrera'>Carrera</option>
                <option value='Diagonal'>Diagonal</option>
                <option value='Transversal'>Transversal</option>
                <option value='Avenida'>Avenida</option>
                <option value='Circular'>Circular</option>
                <option value='Autopista'>Autopista</option>
                <option value='Manzana'>Manzana</option>
                <option value='Circunvalar'>Circunvalar</option>
                <option value='Otro'>Otro</option>
              </select>
            </div>
            {streetType2 === 'Otro' && (
              <div className='item' style={{ padding: '10px' }}>
                <label>¿Cuál?</label>
                <input type='text' value={otroTipoVia} onChange={handleOtroTipoViaChange} />
              </div>
            )}
            <div className='item' style={{ padding: '10px' }}>
              <label>Número:</label>
              <input type='number' value={salesNumber} onChange={handleNumberChangeSales} disabled={!(answers.q15 == '1')} min='0' />
            </div>
            <div className='item' style={{ padding: '10px' }}>
              <label>Letra:</label>
              <input
                type='text'
                value={salesLetter}
                onChange={handleLetterChangeSales}
                onInput={handleLetterInput}
                disabled={!(answers.q15 === '1')}
              />
            </div>
            <div className='item' style={{ padding: '10px' }}>
              <label>Bis:</label>
              <select onChange={handleBisSalesChange} value={bisSales} className='select-tipovia' disabled={!(answers.q15 === '1')}>
                <option value=''></option>
                <option value='Bis'>Bis</option>
              </select>
            </div>
            <div className='item' style={{ padding: '10px' }}>
              <label>Letra:</label>
              <input
                type='text'
                value={salesLetter4}
                onChange={handleLetterChangeSales4}
                onInput={handleLetterInput}
                disabled={!(answers.q15 === '1')}
              />
            </div>
            <div className='item' style={{ padding: '10px' }}>
              <label>Punto cardinal:</label>
              <select
                onChange={handleCardinalPointThreeChange}
                value={cardinalPointThree}
                className='select-punto-cardinal'
                disabled={!(answers.q15 === '1')}>
                <option value=''>Seleccione</option>
                <option value='Norte'>Norte</option>
                <option value='Sur'>Sur</option>
                <option value='Este'>Este</option>
                <option value='Oeste'>Oeste</option>
              </select>
            </div>
          </div>
          <div id='item-container' className='bottom-row' style={{ display: 'flex' }}>
            <div className='item' style={{ padding: '10px' }}>
              <label>Numeral:</label>
              <input type='text' value='#' onChange={handleNumeralChangeSales} disabled />
            </div>
            <div className='item' style={{ padding: '10px' }}>
              <label>Número:</label>
              <input type='number' value={salesNumber2} onChange={handleNumberChange2Sales} disabled={!(answers.q15 == '1')} min='0' />
            </div>
            <div className='item' style={{ padding: '10px' }}>
              <label>Letra:</label>
              <input
                type='text'
                value={salesLetter2}
                onChange={handleLetterChange2Sales}
                onInput={handleLetterInput}
                disabled={!(answers.q15 === '1')}
              />
            </div>
            <div className='item' style={{ padding: '10px' }}>
              <label>Placa:</label>
              <input type='number' value={salesNumber3} onChange={handleNumberChange3Sales} disabled={!(answers.q15 == '1')} min='0' />
            </div>
            <div className='item' style={{ padding: '10px' }}>
              <label>Punto cardinal:</label>
              <select
                onChange={handleCardinalPointFourChange}
                value={cardinalPointFour}
                className='select-punto-cardinal'
                disabled={!(answers.q15 === '1')}>
                <option value=''>Seleccione</option>
                <option value='Norte'>Norte</option>
                <option value='Sur'>Sur</option>
                <option value='Este'>Este</option>
                <option value='Oeste'>Oeste</option>
              </select>
            </div>
          </div>
          <button className='button-direccion' onClick={handleRoomAddressButtonClick} style={{ marginBottom: '30px' }}>
            <FaMapMarker style={{ marginRight: '5px', marginTop: '-6px' }} />
            Construir dirección
          </button>
          {answers.q16 && (
            <div>
              <label className='label-direccion-construida'>
                <FaCheck style={{ marginRight: '5px', color: 'green' }} />
                Dirección construida:
              </label>
              <p>{answers.q16}</p>
            </div>
          )}
        </div>
        {/* <div
          style={{
            marginTop: "40px",
            backgroundColor: "#EAEAEA",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <label>
            Pregunta 16 - b: ¿Cuál es la dirección descriptiva de la sala de
            ventas?
          </label>
          <input
            type="text"
            value={answers.q16}
            onChange={(e) => handleAnswerChange("q16", e.target.value)}
          />
        </div> */}
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 17: ¿Cuál es el número de telefono sala de ventas? "Separe cada numero por coma" </label>
          <input
            type='number'
            value={answers.q17}
            disabled={!(answers.q15 === '1')}
            onChange={e => handleAnswerChange('q17', e.target.value)}
            onKeyPress={e => handleKeyPress(e)}
            min='0'
          />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          {usoProyecto === '1' ? (
            <div>
              <label>Pregunta 18: ¿Cuál es el estrato del proyecto?</label>
              <select onChange={e => handleAnswerChange('q18', e.target.value)} value={answers.q18}>
                <option value=''>Seleccione una opción</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
              </select>
            </div>
          ) : (
            <div>
              <label>Pregunta 18: ¿Cuál es el estrato del proyecto?</label>
              <select onChange={e => handleAnswerChange('q18', e.target.value)} value={answers.q18}>
                <option value=''>Seleccione una opción</option>
                <option value='0'>0</option>
              </select>
            </div>
          )}
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>
            Pregunta 19: ¿Cuál es el número total de segmentos o etapas en los que está dividido el proyecto y que se planean
            construir, ya sea para la venta o para uso propio?{' '}
          </label>
          <input
            type='number'
            onChange={e => handleAnswerChange('q19', e.target.value)}
            value={answers.q19}
            min='0'
            onKeyPress={handleNumericInput}
          />
          {/* <select
            onChange={(e) => handleAnswerChange("q19", e.target.value)}
            value={answers.q19}
          >
            <option value="1">Torres</option>
            <option value="2">Manzanas</option>
            <option value="3">Bloques</option>
          </select> */}
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 20: ¿De cuántas unidades o número total de soluciones inmobiliarias consta el proyecto? </label>
          <input
            type='number'
            value={answers.q20}
            onChange={e => handleAnswerChange('q20', e.target.value)}
            min='0'
            onKeyPress={handleNumericInput}
          />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 21: ¿Cuál es el número de torres, bloques o edificios de los que está compuesto el proyecto total? </label>
          <input
            type='number'
            value={answers.q21}
            onChange={e => handleAnswerChange('q21', e.target.value)}
            min='0'
            onKeyPress={handleNumericInput}
          />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 22: ¿Cuál es el área del terreno donde se construirá el proyecto? (en metros cuadrados). </label>
          <input
            type='number'
            value={answers.q22}
            onChange={e => handleAnswerChange('q22', e.target.value)}
            min='0'
            onKeyPress={handleNumericInput}
          />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>
            Pregunta 23: ¿Cuál es el área total de construcción del proyecto?, por favor incluir las zonas comunes (en metros
            cuadrados){' '}
          </label>
          <input
            type='number'
            value={answers.q23}
            onChange={e => handleAnswerChange('q23', e.target.value)}
            min='0'
            onKeyPress={handleNumericInput}
          />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>
            Pregunta 24: ¿Cuánto es el área de construcción de todos los espacios vendibles que componen el destino? (incluido el
            garaje cubierto y los depósitos o cuartos útiles).{' '}
          </label>
          <input
            type='number'
            value={answers.q24}
            onChange={e => handleAnswerChange('q24', e.target.value)}
            min='0'
            onKeyPress={handleNumericInput}
          />
        </div>
        <div
          class='table-responsive'
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px',
            overflowX: 'auto'
          }}
          id='contacto-proyecto-table'>
          <label>
            Pregunta 25: Nos gustaría tener algunos datos de contacto de la obra con el fin de realizar la actualización
            correspondiente:{' '}
          </label>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <strong>Cargo</strong>
                </th>
                <th>
                  <strong>Nombre completo</strong>
                </th>
                {/* <th>
                  <strong>Apellido</strong>
                </th> */}
                <th>
                  <strong>Teléfono</strong>
                </th>
                <th>
                  <strong>Correo</strong>
                </th>
                <th>
                  <strong>Autoriza</strong>
                </th>
                <th>
                  <strong>Actualiza</strong>
                </th>
                <th>
                  <strong>Acción</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {contactoProyectoArray.map((item, index) => (
                <tr key={index}>
                  <td style={{ width: '20%' }}>
                    <Form.Control
                      as='select'
                      name='cargo'
                      value={item.cargo}
                      onChange={e => handleInputChange(e, index)}
                      style={{
                        fontSize: '16px',
                        padding: '10px',
                        width: '100%',
                        marginLeft: '-4px'
                      }}
                      required>
                      <option value=''></option>
                      <option value='0'>Almacenista / Maestro de Obra</option>
                      <option value='1'>Contacto/Informante</option>
                      <option value='2'>Director/Gerente de Obra/Proyecto</option>
                      <option value='3'>Ingeniero Residente/Arquitecto</option>
                      <option value='4'>Propietario</option>
                      <option value='5'>Venta/Comercial</option>
                      <option value='99'>Otro</option>
                    </Form.Control>
                  </td>
                  <td style={{ width: '17%' }}>
                    <Form.Control
                      type='text'
                      name='nombre'
                      value={item.nombre}
                      onChange={e => handleInputChange(e, index)}
                      style={{
                        fontSize: '16px',
                        padding: '10px',
                        width: '115%',
                        marginLeft: '-17px'
                      }}
                      onKeyPress={e => {
                        if (!/^[A-Za-z\s]+$/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      required
                    />
                  </td>
                  <td style={{ width: '10%' }}>
                    <Form.Control
                      type='number'
                      name='telefono'
                      value={item.telefono}
                      onChange={e => handleInputChange(e, index)}
                      style={{
                        fontSize: '16px',
                        padding: '10px',
                        width: '110%',
                        marginLeft: '-5px'
                      }}
                      min='0'
                      onInput={handleNumericInput}
                      required
                    />
                    {erroresTelefono[index] && <div style={{ color: '#FF0000', marginTop: '5px' }}>{erroresTelefono[index]}</div>}
                  </td>
                  <td style={{ width: '20%' }}>
                    <Form.Control
                      type='email'
                      name='correo'
                      value={item.correo}
                      onChange={e => handleInputChange(e, index)}
                      style={{
                        fontSize: '16px',
                        padding: '10px',
                        width: '110%',
                        marginLeft: '-17px',
                        borderColor: correoValido ? '' : 'red'
                      }}
                      required
                    />
                    {!correoValido && (
                      <div style={{ color: 'red', fontSize: '14px' }}>
                        Correo inválido <FaTimes />
                      </div>
                    )}
                  </td>
                  <td className='col-auto' style={{ width: '7%' }}>
                    <Form.Control
                      as='select'
                      name='autorizacion'
                      value={item.autorizacion}
                      onChange={e => handleInputChange(e, index)}
                      style={{
                        fontSize: '16px',
                        padding: '10px',
                        width: '155%',
                        marginLeft: '-20px'
                      }}
                      required>
                      <option value=''>Seleccione</option>
                      <option value='0'>No</option>
                      <option value='1'>Si</option>
                      <option value='2'>Pendiente</option>
                    </Form.Control>
                  </td>
                  <td className='col-auto' style={{ width: '5%' }}>
                    <Form.Check
                      type='checkbox'
                      name='actualiza'
                      checked={item.actualiza}
                      onChange={e => handleInputChange(e, index)}
                    />
                  </td>
                  <td className='col-auto'>
                    <Button style={{ backgroundColor: '#EF5350', color: 'white' }} onClick={() => eliminarContacto(index)}>
                      <FaTrash style={{ marginRight: '5px', marginBottom: '5px' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* {errorMessage && (
            <div style={{ color: "red", marginTop: "10px" }}>
              {errorMessage}
            </div>
          )} */}
          <Button onClick={agregarFilaContacto}>
            <FaPlus style={{ marginRight: '5px', marginBottom: '5px' }} />
            Agregar Nuevo Contacto
          </Button>
        </div>
        <div
          style={{
            marginTop: '30px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <Form.Group>
            <Form.Label style={{ fontSize: '20px', fontWeight: 'bold' }}>Seleccione una certificación:</Form.Label>
            <Form.Control as='select' value={nuevaCertificacion} onChange={handleCertificacionChange}>
              {certificadosSostenibles.map((certificado, valor) => (
                <option key={valor} value={valor}>
                  {certificado[valor]}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button onClick={agregarCertificacion}>
            <FaPlus style={{ marginRight: '5px', marginBottom: '5px' }} />
            Agregar Certificación
          </Button>
          <div style={{ marginTop: '30px' }} class='table-responsive'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                    <strong>Certificación</strong>
                  </th>
                  <th>
                    <strong>Acciones</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {certificaciones.map((certificacion, index) => (
                  <tr key={index}>
                    <td>{certificadosSostenibles[certificacion][certificacion]}</td>
                    <td>
                      <Button style={{ backgroundColor: '#EF5350', color: 'white' }} onClick={() => eliminarCertificacion(index)}>
                        <FaTrash style={{ marginRight: '5px', marginBottom: '5px' }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Button style={{ backgroundColor: '#00ACC1', color: 'white' }} onClick={guardarRespuestas}>
            <FaSave style={{ marginRight: '5px', marginBottom: '5px' }} />
            Guardar Respuestas
          </Button>
          {respuestasGuardadas && <span> ✔ Respuestas guardadas</span>}
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <Form.Group>
            <Form.Label>Seleccione una característica del proyecto:</Form.Label>
            <Form.Control as='select' value={nuevaCaracteristica} onChange={handleCaracteristicaChange}>
              {caracteristicasProyecto.map((caracteristica, valor) => (
                <option key={valor} value={valor}>
                  {caracteristica[valor]}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button onClick={agregarCaracteristica}>
            <FaPlus style={{ marginRight: '5px', marginBottom: '5px' }} />
            Agregar Característica
          </Button>
          <div style={{ marginTop: '30px' }} class='table-responsive'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                    <strong>Característica del Proyecto</strong>
                  </th>
                  <th>
                    <strong>Acciones</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {caracteristicas.map((caracteristica, index) => (
                  <tr key={index}>
                    <td>{caracteristicasProyecto[caracteristica][caracteristica]}</td>
                    <td>
                      <Button style={{ backgroundColor: '#EF5350', color: 'white' }} onClick={() => eliminarCaracteristica(index)}>
                        <FaTrash style={{ marginRight: '5px', marginBottom: '5px' }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Button style={{ backgroundColor: '#00ACC1', color: 'white' }} onClick={guardarRespuestasCaracteristicas}>
            <FaSave style={{ marginRight: '5px', marginBottom: '5px' }} />
            Guardar Respuestas
          </Button>
          {respuestasGuardadasCaracteristicas && <span> ✔ Respuestas guardadas</span>}
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <div className='acordeon-container'>
            <label>
              Pregunta 26: A continuación, encontrará la lista completa de las áreas o zonas comunes, por favor seleccione todas las
              que tenga el proyecto:{' '}
            </label>
            <div className='acordeon-header'>
              <Button
                className='center-button'
                style={{
                  backgroundColor: '#3b71ca',
                  color: 'white',
                  marginTop: '50px'
                }}
                variant='link'
                onClick={toggleTableVisibility26}>
                {isTableVisible26 ? <FaChevronUp /> : <FaChevronDown />}
                &nbsp;&nbsp; {/* Espacio entre el icono y el texto del botón */}
                {isTableVisible26 ? 'Contraer zonas comunes' : 'Mostrar zonas comunes'}
              </Button>
            </div>
            {isTableVisible26 && (
              <div className='acordeon-body'>
                <div id='zonas-comunes' class='table-responsive'>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>
                          <strong>Seleccionar</strong>
                        </th>
                        <th>
                          <strong>Id</strong>
                        </th>
                        <th>
                          <strong>Zona Comun</strong>
                        </th>
                        <th>
                          <strong>Residencial</strong>
                        </th>
                        <th>
                          <strong>No Residencial</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataZonasComunes.map(item => (
                        <tr key={item.idZona}>
                          <td>
                            <Form.Check
                              type='checkbox'
                              id={`seleccionar_${item.idZona}`}
                              checked={item.selected}
                              onChange={() => handleCheckboxChange(item.idZona)}
                            />
                          </td>
                          <td>{item.idZona}</td>
                          <td>{item.zonasComunes}</td>
                          <td>{item.residencial}</td>
                          <td>{item.noResidencial}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <div className='acordeon-container'>
            <label>Pregunta 27: A continuación, es posible seleccionar cada especificación de acuerdo a las características </label>
            <div className='acordeon-header'>
              <Button
                className='center-button'
                style={{
                  backgroundColor: '#3b71ca',
                  color: 'white',
                  marginTop: '50px'
                }}
                variant='link'
                onClick={toggleTableVisibility27}>
                {isTableVisible27 ? <FaChevronUp /> : <FaChevronDown />}
                &nbsp;&nbsp; {/* Espacio entre el icono y el texto del botón */}
                {isTableVisible27 ? 'Contraer P 27' : 'Mostrar P 27'}
              </Button>
            </div>
            {isTableVisible27 && (
              <div className='acordeon-body'>
                <div id='especificaciones' class='table-responsive'>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>
                          <strong>Id</strong>
                        </th>
                        <th>
                          <strong>Categoría</strong>
                        </th>
                        <th>
                          <strong>Característica</strong>
                        </th>
                        <th>
                          <strong>Especificación</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {technicalFeaturesData.map(item => (
                        <tr key={item.caracteristicaId}>
                          <td>{item.id}</td>
                          <td>{item.categoria}</td>
                          <td>{item.caracteristica}</td>
                          <td>
                            {Object.keys(item.especificacion).map(especificacionKey => (
                              <div key={especificacionKey}>
                                <Form.Check
                                  type='checkbox'
                                  id={`categoria_${item.id}_caracteristica_${item.caracteristicaId}_${especificacionKey}`}
                                  label={item.especificacion[especificacionKey]}
                                  checked={answers.q27?.[item.id]?.[item.caracteristicaId]?.[especificacionKey] || false}
                                  onChange={() => handleOptionSelectCharacteristic(item.id, item.caracteristicaId, especificacionKey)}
                                />
                              </div>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <div className='acordeon-container'>
            <label>
              Pregunta 28: La siguiente tabla pertenece a los acabados exteriores, y se pueden seleccionar los que corresponden de
              acuerdo al uso:{' '}
            </label>
            <div className='acordeon-header'>
              <Button
                className='center-button'
                style={{
                  backgroundColor: '#3b71ca',
                  color: 'white',
                  marginTop: '50px'
                }}
                variant='link'
                onClick={toggleTableVisibility28}>
                {isTableVisible28 ? <FaChevronUp /> : <FaChevronDown />}
                &nbsp;&nbsp; {/* Espacio entre el icono y el texto del botón */}
                {isTableVisible28 ? 'Contraer P 28' : 'Mostrar P 28'}
              </Button>
            </div>
            {isTableVisible28 && (
              <div className='acordeon-body'>
                <div id='acabados' class='table-responsive'>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>
                          <strong>Id</strong>
                        </th>
                        <th>
                          <strong>Nombre</strong>
                        </th>
                        <th>
                          <strong>Residencial</strong>
                        </th>
                        <th>
                          <strong>No Residencial</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {exteriorFinishData.map(row => (
                        <tr key={row.id}>
                          <td>{row.id}</td>
                          <td>{row.nombre}</td>
                          <td>
                            {Object.entries(row.residencial).map(([optionId, optionLabel]) => (
                              <div key={optionId}>
                                <Form.Check
                                  type='checkbox'
                                  label={optionLabel}
                                  checked={answers.q28[row.id]?.includes(optionId.toString()) || false}
                                  onChange={() => handleOptionSelectExterior(row.id, optionId.toString())}
                                />
                              </div>
                            ))}
                          </td>
                          <td>
                            {Object.entries(row.noResidencial).map(([optionId, optionLabel]) => (
                              <div key={optionId}>
                                <Form.Check
                                  type='checkbox'
                                  label={optionLabel}
                                  checked={answers.q28[row.id]?.includes(optionId.toString()) || false}
                                  onChange={() => handleOptionSelectExterior(row.id, optionId.toString())}
                                />
                              </div>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 29: ¿Cuántos son los parqueaderos de visitantes? (Solo para carros) </label>
          <input
            type='number'
            value={answers.q29}
            onChange={e => handleAnswerChange('q29', e.target.value)}
            min='0'
            onKeyPress={handleNumericInput}
          />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 30: ¿Cuántos son los parqueaderos de propietarios? (Solo para carros) </label>
          <input
            type='number'
            value={answers.q30}
            onChange={e => handleAnswerChange('q30', e.target.value)}
            min='0'
            onKeyPress={handleNumericInput}
          />
        </div>
        <button type='submit'>Enviar</button>
        {respuestaCorrectaFetch && <div className='alert'>Datos ingresados correctamente</div>}
      </form>
    </div>
  );
};

export default CreateProject;
