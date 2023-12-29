import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import logo from '../../assets/img/logo-cnc-pequeño.png';
import { FaEdit, FaArrowLeft, FaPlus, FaTrash, FaSave, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ZonasComunes, technicalFeaturesData } from '../../utils';
import { Table, Form, Button } from 'react-bootstrap';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from "@mui/material/Button";
import './style.css';
import CustomDropdownMenuTwo from '../DropdownMenuTwo/CustomDropdownMenuTwo';
import ProjectStageFormEdit from '../../Components/ProjectStageFormEdit/ProjectStageFormEdit';
import {
  COMPANIES,
  bogotaLocalidades,
  caracteristicasProyecto,
  certificadosSostenibles,
  cundinamarcaDepartments,
  exteriorFinishData,
  zonasBogota,
  zonasCundinamarca
} from '../../helpers/constants';
// import { id } from "date-fns/locale";

const BACK_API_URL = 'https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto';

const queryBackend = async (method, path, body) => {
  let data = null;
  try {
    const response = await fetch(`${BACK_API_URL}/${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    data = await response.json();
  } catch (error) {
    const errorMessage = `Error al llamar la api ${path}`;
    console.error(errorMessage, error);
    const errorAlert = document.createElement('div');
    errorAlert.classList.add('custom-alert', 'alert', 'alert-danger');
    errorAlert.setAttribute('role', 'alert');
    errorAlert.innerHTML = errorMessage;
    document.body.appendChild(errorAlert);
    setTimeout(() => {
      errorAlert.remove();
    }, 4000);
  }
  return data;
};

const queryGETBackend = async path => {
  let data = null;
  try {
    const response = await fetch(`${BACK_API_URL}/${path}`, {});
    data = await response.json();
  } catch (error) {
    const errorMessage = `Error al llamar la api ${path}`;
    console.error(errorMessage, error);
    const errorAlert = document.createElement('div');
    errorAlert.classList.add('custom-alert', 'alert', 'alert-danger');
    errorAlert.setAttribute('role', 'alert');
    errorAlert.innerHTML = errorMessage;
    document.body.appendChild(errorAlert);
    setTimeout(() => {
      errorAlert.remove();
    }, 4000);
  }
  return data;
};

const getAcabadosExterioresCheckboxes = (checkboxOptions, acabadosExterioresFetch, row, setAcabadosExterioresFetch) =>
  checkboxOptions.map(([id, label]) => {
    const currentValues = acabadosExterioresFetch[row.id] || [];
    const isChecked = currentValues?.includes(+id) || false;
    return (
      <div>
        <Form.Check
          type='checkbox'
          label={label}
          checked={isChecked}
          onChange={event => {
            setAcabadosExterioresFetch(prev => {
              let newValues;
              if (isChecked) {
                newValues = currentValues.filter(item => item !== +id);
              } else {
                newValues = [...currentValues, +id];
              }
              const updatedState = { ...prev, [row.id]: newValues };
              //console.log('Nuevos valores Tabla acabados:', updatedState);
              return updatedState;
            });
          }}
        />
      </div>
    );
  });
const getTechnicalFeauresCheckboxes = (checkboxOptions, caracteristicasFetch, row, setCaracteristicasFetch) =>
  checkboxOptions.map(([id, label]) => {
    // const currentValues = caracteristicasFetch[row.id] || [];
    // const isChecked = currentValues?.some?.((item) => item.id === +id) || false;
    const currentUniqueId = `${row.id}-${row.caracteristicaId}-${id}`;
    const isChecked = caracteristicasFetch.some(item => item.uniqueId === currentUniqueId);
    return (
      <div>
        <Form.Check
          type='checkbox'
          label={label}
          checked={isChecked}
          onChange={event => {
            setCaracteristicasFetch(prev =>
              isChecked
                ? prev.filter(item => item.uniqueId !== currentUniqueId)
                : prev.concat({
                    uniqueId: currentUniqueId,
                    caracteristica: row.caracteristicaId,
                    categoria: row.id,
                    comment: '',
                    especificacion: id
                  })
            );
          }}
        />
      </div>
    );
  });

const InsertarProyectoForm = () => {
  const [answers, setAnswers] = useState({
    q28: {},
    q27: {},
    q26: []
  });
  const [allStagesCompanies, setAllStageCompanies] = useState([]);
  const [codigoProyecto, setCodigoProyecto] = useState('');
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [longitud, setLongitud] = useState('');
  const [latitud, setLatitud] = useState('');
  const [regional, setRegional] = useState('Bogotá & Cundinamarca');
  const [departamento, setDepartamento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [zona, setZona] = useState('');
  const [barrio, setBarrio] = useState('');
  const [direccionProyecto, setDireccionProyecto] = useState('');
  const [direccionDescriptiva, setDireccionDescriptiva] = useState('');
  const [tieneSalaVentas, setTieneSalaVentas] = useState('');
  const [direccionSalaVentas, setDireccionSalaVentas] = useState('');
  const [estrato, setEstrato] = useState('');
  const [areaLote, setAreaLote] = useState('');
  const [areaConstruida, setAreaConstruida] = useState('');
  const [areaVendible, setAreaVendible] = useState('');
  const [fechaCorteCenso, setFechaCorteCenso] = useState('');
  const [fechaInicioProyecto, setFechaInicioProyecto] = useState('');
  const [numBloques, setNumBloques] = useState('');
  const [parqueaderoVisitantes, setParqueaderoVisitantes] = useState('');
  const [parqueaderoPropietarios, setParqueaderoPropietarios] = useState('');
  const [destinoProyecto, setDestinoProyecto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [errorTelefono, setErrorTelefono] = useState('');
  const [usoGeneralProyecto, setUsoGeneralProyecto] = useState('');
  const [estado, setEstado] = useState('');
  const [zonaComun, setZonaComun] = useState('');
  const [contactoProyecto, setContactoProyecto] = useState([]);
  const [idProject, setIdProject] = useState('');
  const [nuevaCertificacion, setNuevaCertificacion] = useState(null);
  const [certificaciones, setCertificaciones] = useState([]);
  const [respuestasGuardadas, setRespuestasGuardadas] = useState(false);
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [correoValido, setCorreoValido] = useState(true);
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState(0);
  const [isTableVisible28, setTableVisible28] = useState(false);
  const [errores, setErrores] = useState([]);
  const [isTableVisible27, setTableVisible27] = useState(false);

  const [respuestasGuardadasCaracteristicas, setRespuestasGuardadasCaracteristicas] = useState(false);
  const [listStageProyectoArray, setListStageProyectoArray] = useState([]);

  const [expandedStages, setExpandedStages] = useState([]);

  const toggleDetails = stageId => {
    setExpandedStages(prev => (prev.includes(stageId) ? prev.filter(id => id !== stageId) : [...prev, stageId]));
  };

  const isExpanded = stageId => expandedStages.includes(stageId);

  const retroceder = () => {
    window.history.back();
  };
  // const [, setIdProject] = useState("");

  const toggleTableVisibility28 = () => {
    setTableVisible28(!isTableVisible28);
  };

  const validarTelefono = telefono => {
    if (telefono.length !== 10 && telefono.length !== 8) {
      return 'El teléfono debe tener entre 8 y 10 dígitos';
    }
    return '';
  };

  const handleTelefonoChange = e => {
    const nuevoTelefono = e.target.value;

    if (nuevoTelefono === '') {
      setTelefono('');
      setErrorTelefono('');
    } else {
      if (/^[36]/.test(nuevoTelefono)) {
        if ((nuevoTelefono.startsWith('3') || nuevoTelefono.startsWith('6')) && nuevoTelefono.length <= 10) {
          setTelefono(nuevoTelefono);
          setErrorTelefono('');
        }
        if (!(nuevoTelefono.startsWith('3') || nuevoTelefono.startsWith('6')) && nuevoTelefono.length <= 7) {
          setTelefono(nuevoTelefono);
          setErrorTelefono('');
        } else {
          // Establecer un mensaje de error si la longitud no es válida
          setErrorTelefono('Número de dígitos incorrecto');
        }
      } else {
        // Establecer un mensaje de error si no empieza con 3 o 6
        setErrorTelefono('El número de teléfono debe empezar con 3 o 6');
      }
    }
  };

  const handleNumericInput = e => {
    const inputValue = e.key;
    if (!/^[0-9]$/.test(inputValue)) {
      e.preventDefault();
    }
  };

  const actualizarErrores = (index, error) => {
    setErrores(prevErrores => {
      const nuevosErrores = [...prevErrores];
      nuevosErrores[index] = error;
      return nuevosErrores;
    });
  };

  const [contactoProyectoArray, setContactoProyectoArray] = useState([
    {
      cargo: '',
      nombre: '',
      // apellido: "",
      telefono: '',
      correo: '',
      autorizacion: '0'
    }
  ]);

  const [acabadosExterioresFetch, setAcabadosExterioresFetch] = useState({});
  const [caracteristicasFetch, setCaracteristicasFetch] = useState([]);

  const toggleTableVisibility27 = () => {
    setTableVisible27(!isTableVisible27);
  };

  const handleCertificacionChange = e => {
    const valorSeleccionado = parseInt(e.target.value, 10);

    if (valorSeleccionado === 0) {
      // Si se selecciona "No tiene", deshabilitar la selección de otras certificaciones
      // setCertificaciones([]);
      setNuevaCertificacion(null);
    } else {
      setNuevaCertificacion(valorSeleccionado);
    }
  };

  const agregarCertificacion = () => {
    if (nuevaCertificacion !== null && !certificaciones.includes(nuevaCertificacion)) {
      setCertificaciones([...certificaciones, nuevaCertificacion]);
    }
  };

  const guardarRespuestas = () => {
    setAnswers({ ...answers, q33: certificaciones });
    setRespuestasGuardadas(true);
    // //console.log("Estas son las certifiaciones", certificaciones);
  };

  const eliminarCertificacion = index => {
    const nuevasCertificaciones = [...certificaciones];
    nuevasCertificaciones.splice(index, 1);
    setCertificaciones(nuevasCertificaciones);
  };

  const handleCaracteristicaChange = e => {
    const valorSeleccionado = parseInt(e.target.value, 10);
    setNuevaCaracteristica(valorSeleccionado);
  };

  const agregarCaracteristica = () => {
    // Verificar si la característica ya está en la lista
    if (nuevaCaracteristica !== null) {
      if (!caracteristicas.includes(nuevaCaracteristica)) {
        setCaracteristicas([...caracteristicas, nuevaCaracteristica]);
      } else {
        // Puedes mostrar un mensaje o hacer algo si la característica ya está en la lista
        //console.log('La característica ya está en la lista');
      }
    } else {
      // Puedes mostrar un mensaje o hacer algo si no se ha seleccionado ninguna característica
      //console.log('No se ha seleccionado ninguna característica');
    }
  };

  const eliminarCaracteristica = index => {
    const nuevasCaracteristicas = [...caracteristicas];
    nuevasCaracteristicas.splice(index, 1);
    setCaracteristicas(nuevasCaracteristicas);
  };

  const guardarRespuestasCaracteristicas = () => {
    setAnswers({ ...answers, q34: caracteristicas });
    setRespuestasGuardadasCaracteristicas(true);
    //console.log('Estas son las caracteristicas', caracteristicas);
  };

  const agregarFilaContacto = () => {
    const nuevoContacto = {
      cargo: '',
      nombre: '',
      // apellido: "",
      telefono: '',
      correo: '',
      autorizacion: '0'
    };
    setContactoProyectoArray([...contactoProyectoArray, nuevoContacto]);
  };
  const eliminarContacto = index => {
    const nuevosContactos = [...contactoProyectoArray];
    nuevosContactos.splice(index, 1);
    setContactoProyectoArray(nuevosContactos);
  };

  useEffect(() => {
    // window.location.reload();
    setAnswers({ ...answers, q25: contactoProyectoArray });
  }, []);

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
    // //console.log(contactoProyecto);
  };

  const soloNumerosEnteros = input => {
    // Filtra solo los dígitos y permite la entrada vacía
    const soloDigitos = input.replace(/[^0-9]/g, '');
    return soloDigitos;
  };

  const handleSetAreaLote = value => {
    // Aplica la función soloNumerosEnteros a la entrada
    const numeroEntero = soloNumerosEnteros(value);
    // Actualiza el estado
    setAreaLote(numeroEntero);
  };

  const handleSetAreaConstruida = value => {
    const numeroEntero = soloNumerosEnteros(value);
    setAreaConstruida(numeroEntero);
  };

  const handleSetAreaVendible = value => {
    const numeroEntero = soloNumerosEnteros(value);
    setAreaVendible(numeroEntero);
  };
  const handleSetNumBloques = value => {
    const numeroEntero = soloNumerosEnteros(value);
    setNumBloques(numeroEntero);
  };

  const handleSetParqueaderoVisitantes = value => {
    const numeroEntero = soloNumerosEnteros(value);
    setParqueaderoVisitantes(numeroEntero);
  };

  const handleSetParqueaderoPropietarios = value => {
    const numeroEntero = soloNumerosEnteros(value);
    setParqueaderoPropietarios(numeroEntero);
  };

  const validarCorreo = correo => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(correo);
  };

  const [dataZonasComunes, setDataZonasComunes] = useState(ZonasComunes);

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

  const params = useParams();

  useEffect(() => {
    const asyncFunction = async () => {
      const proyecto = await queryGETBackend(`datos_proyecto_detail/id=${params.id}/`);

      if (!proyecto) return;

      //console.log('Datos del proyecto encontrados:', proyecto);
      ZonasComunes.forEach(zonaComun => {
        zonaComun.selected = proyecto.zona_comun.includes(zonaComun.idZona);
      });
      setCodigoProyecto(proyecto.codigo_proyecto);
      setNombreProyecto(proyecto.nombre_proyecto);
      setRegional(proyecto.regional);
      setDepartamento(proyecto.departamento);
      setCiudad(proyecto.ciudad);
      setLocalidad(proyecto.localidad);
      setZona(proyecto.zona);
      setBarrio(proyecto.barrio);
      setDireccionProyecto(proyecto.direccion_proyecto);
      setDireccionDescriptiva(proyecto.direccion_descriptiva);
      setTieneSalaVentas(proyecto.tiene_sala_ventas);
      setDireccionSalaVentas(proyecto.direccion_sala_ventas);
      setEstrato(proyecto.estrato);
      setAreaLote(proyecto.area_lote);
      setAreaConstruida(proyecto.area_construida);
      setAreaVendible(proyecto.area_vendible);
      setFechaCorteCenso(proyecto.fecha_corte_censo);
      setFechaInicioProyecto(proyecto.fecha_inicio_proyecto);
      setNumBloques(proyecto.num_bloques);
      setParqueaderoVisitantes(proyecto.parqueaderos_visitantes);
      setParqueaderoPropietarios(proyecto.parqueaderos_propietarios);
      setDestinoProyecto(proyecto.destino_proyecto);
      setTelefono(proyecto.telefono);
      setUsoGeneralProyecto(proyecto.uso_general_proyecto);
      setEstado(proyecto.estado);
      setLongitud(proyecto.longitud);
      setLatitud(proyecto.latitud);
      setZonaComun(proyecto.zona_comun);
      setAnswers({ ...answers, q26: proyecto.zona_comun });
      setIdProject(proyecto.id);
      setCertificaciones(proyecto.certificaciones_sostenibles);
      setCaracteristicas(proyecto.caracteristicas_proyecto);
      //console.log('Datos de id', proyecto.id);

      const contactoData = await queryGETBackend(`contacto_detail/id=${proyecto.id}/`);
      setContactoProyectoArray(contactoData);

      const acabadosExterioresData = await queryGETBackend(`acabado_exterior_detail/id=${proyecto.id}/`);
      //console.log('Datos de acabados exteriores encontrados', acabadosExterioresData);
      const grouping = {};
      for (const item of acabadosExterioresData) {
        if (grouping[item.categoria]) {
          grouping[item.categoria].push(+item.acabado);
        } else {
          grouping[item.categoria] = [+item.acabado];
        }
      }
      setAcabadosExterioresFetch(grouping);

      const caracteristicasData = await queryGETBackend(`caracteristica_tecnica_detail/id=${proyecto.id}/`);
      setCaracteristicasFetch(
        caracteristicasData.map(item => ({
          uniqueId: `${item.categoria}-${item.caracteristica}-${item.especificacion}`,
          ...item
        }))
      );

      const listStageData = await queryGETBackend(`lista_etapas/id_proyecto=${proyecto.id}/`);
      //console.log('Datos de lista etapas encontrados', listStageData);
      const responses = await Promise.all(
        listStageData.map(async item => {
          // Compañias
          const fetchedCompanies = await queryGETBackend(`company_etapa_list/id=${item.id}/`);
          const allCurrentCompanies = COMPANIES.map(itemCompany => {
            const existingCompany = fetchedCompanies.find(item => item.tipo_compañia === itemCompany.typeCompanyId);
            return (
              existingCompany || {
                // comment: {
                //   hola: "mundo",
                //   prueba: "patch",
                // },
                tipo_compañia: itemCompany.typeCompanyId,
                nombre: '',
                nit: '',
                direccion: '',
                telefono: '',
                etapa: item.id
              }
            );
          });

          // Datos de tipo
          const stageTypeData = await queryGETBackend(`datos_tipo/id=${item.id}/`);

          // Datos dotaciones
          const stageDotationsData = await queryGETBackend(`datos_dotacion/id=${item.id}/`);

          // Datos historico ventas
          const stageHistoricSales = await queryGETBackend(`datos_historico_ventas_unidades/id=${item.id}/`);

          // Acabados interiores
          const stageInnerFinished = await queryGETBackend(`acabado_interior_list/id_etapa=${item.id}/`);

          console.log({});

          return { stageId: item.id, allCurrentCompanies, stageTypeData, stageDotationsData, stageHistoricSales, stageInnerFinished };
        })
      );

      console.log({ responses });

      const listStageProyectoArrayNew = responses.reduce((prev, { allCurrentCompanies }) => {
        return prev.concat(
          allCurrentCompanies.map(item => ({
            ...(item.id && { id: item.id }),
            // comment: {
            //   hola: "mundo",
            //   prueba: "patch",
            // },
            tipo_compañia: item.tipo_compañia,
            nombre: item.nombre || '',
            nit: item.nit || '',
            direccion: item.direccion || '',
            telefono: item.telefono || '',
            etapa: item.etapa
          }))
        );
      }, []);
      //console.log('Responses stages companies', responses);
      //console.log('Responses listStageNew', listStageProyectoArrayNew);
      setListStageProyectoArray(listStageData);
      setAllStageCompanies(listStageProyectoArrayNew);
    };
    asyncFunction();
  }, []);

  const handleSubmit = async event => {
    //console.log(caracteristicasFetch, 'Estas son las caracteristicas de el proyecto de la tabla');
    event.preventDefault();
    const formData = {
      id: idProject,
      codigo_proyecto: codigoProyecto,
      nombre_proyecto: nombreProyecto,
      longitud: longitud,
      latitud: latitud,
      regional: regional,
      departamento: departamento,
      ciudad: ciudad,
      localidad: localidad,
      zona: zona,
      barrio: barrio,
      direccion_proyecto: direccionProyecto,
      direccion_descriptiva: direccionDescriptiva,
      tiene_sala_ventas: tieneSalaVentas,
      direccion_sala_ventas: direccionSalaVentas,
      estrato: estrato,
      area_lote: areaLote,
      area_construida: areaConstruida,
      area_vendible: areaVendible,
      fecha_corte_censo: fechaCorteCenso,
      fecha_inicio_proyecto: fechaInicioProyecto,
      num_bloques: numBloques,
      parqueaderos_visitantes: parqueaderoVisitantes,
      parqueaderos_propietarios: parqueaderoPropietarios,
      destino_proyecto: destinoProyecto,
      telefono: telefono,
      uso_general_proyecto: usoGeneralProyecto,
      estado: estado,
      fecha_modificado: '2023-08-02T22:26:07.785317Z',
      comentarios: {
        Barrio: 'Barrio confirmado'
      },
      certificaciones_sostenibles: answers.q34,
      caracteristicas_proyecto: caracteristicas,
      zona_comun: answers.q26,

      medicion: '630d3ab5-2a22-4ab6-a21e-3f198f515f84'
    };

    //console.log('Estos son los datos del patch', formData);

    const insertedProjectData = await queryBackend('PATCH', 'datos_proyecto/', formData);
    //console.log('Proyecto insertado exitosamente', insertedProjectData);

    if (Array.isArray(contactoProyecto) && contactoProyecto.length > 0) {
      const formatedContact = contactoProyecto.map(contacto => ({
        proyecto: idProject,
        nombre: contacto.nombre + ' ' + contacto.apellido,
        cargo: contacto.cargo,
        telefono: contacto.telefono,
        email: contacto.correo,
        tiene_autorizacion: contacto.autorizacion
      }));
      const contactsResponse = await queryBackend('PATCH', 'contacto/', formatedContact);
      //console.log('Contactos actualizados correctamente', contactsResponse);
    }
    const patchAcabadosExteriores = [];
    for (const [categoria, acabados] of Object.entries(acabadosExterioresFetch)) {
      acabados.forEach(acabado => {
        const patchItem = {
          proyecto: idProject,
          categoria: parseInt(categoria),
          acabado: parseInt(acabado)
          // id: id,
        };
        patchAcabadosExteriores.push(patchItem);
      });
    }

    //console.log(patchAcabadosExteriores, 'Estos son los datos q vamos a enviar de acabados exteriores');

    const finishedDetailsResponse = await queryBackend('PATCH', 'acabado_exterior/', patchAcabadosExteriores);
    //console.log('acabados actualizados correctamente', finishedDetailsResponse);

    const patchTechnicalFeatures = caracteristicasFetch.map(item => ({
      ...(item.id && { id: item.id }),
      proyecto: idProject,
      categoria: parseInt(item.categoria),
      caracteristica: parseInt(item.caracteristica),
      especificacion: parseInt(item.especificacion)
    }));

    //console.log('Estos son los datos q enviamos a caracteristicas:', patchTechnicalFeatures);

    const technicalCharacteristicsResponse = await queryBackend('PATCH', 'caracteristica_tecnica/', patchTechnicalFeatures);
    //console.log('caracteristicas tecnicas actualizados correctamente', technicalCharacteristicsResponse);

    //console.log('https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto/company_etapa/ allStagesCompanies', allStagesCompanies);

    const company_etapa = await queryBackend('PATCH', 'company_etapa/', allStagesCompanies);
    //console.log('compañias actualizados correctamente', stagesCompaniesResponse);

    const cambiar_datos_tipo = await queryBackend('PATCH', 'cambiar_datos_tipo/', [
      {
        id_tipo: null,
        Etapa: null,
        Nombre: null,
        Tipo_vivieda: null,
        Uso: null,
        numero_unidades: null,
        area_unidades_area_disponible: null
      }
    ]);

    const datos_dotacion_detail = await queryBackend('PATCH', 'datos_dotacion_detail/', [
      {
        tipo: null,
        Alcoba: null,
        Baño: null,
        dotacion_3: null,
        dotacion_4: null,
        dotación_5: null
      }
    ]);

    const datos_historico_ventas_unidades_detail = await queryBackend('PATCH', 'datos_historico_ventas_unidades_detail/', [
      {
        tipo: null,
        venta: null,
        renuncias: null,
        saldo: null,
        precios_miles: null,
        precios_m2_miles: null,
        novedad: null
      }
    ]);
  };

  if (!exteriorFinishData || exteriorFinishData.length === 0) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div>
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
          <Button style={{ color: 'white' }} id='ButtonNav' olor='primary' href='/createProject' variant='contained'>
            Ingresar Proyecto
          </Button>
          <div id='ButtonNavLeft' style={{ marginLeft: 'auto' }}>
            <Button color='inherit' onClick={retroceder}>
              <FaArrowLeft size={25} />
            </Button>
          </div>
        </Toolbar>
        <div style={{ marginLeft: 'auto' }}>
          <CustomDropdownMenuTwo />
        </div>
      </AppBar>
      {/* </div> */}
      <h1 className='mt-5'>
        Editar proyecto <FaEdit size={25} style={{ marginRight: '8px' }} />
      </h1>
      <div style={{ height: 'calc(100vh - 80px)' }}>
        <MDBContainer fluid className='py-5'>
          <div>
            <div className='container'>
              <MDBCard className='text-black'>
                <MDBCardBody className='text-center'>
                  <MDBRow className='mb-4'>
                    <MDBCol md='3' className='mb-4'>
                      <MDBInput
                        label='Código Proyecto'
                        name='codigoProyecto'
                        value={codigoProyecto}
                        readOnly
                        onChange={e => setCodigoProyecto(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md='3' className='mb-4'>
                      <MDBInput
                        label='Nombre Proyecto'
                        name='NombreProyecto'
                        value={nombreProyecto}
                        onChange={e => setNombreProyecto(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md='2' className='mb-4'>
                      <MDBInput
                        label='Longitud'
                        name='Longitud'
                        value={longitud}
                        readOnly
                        onChange={e => setLongitud(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md='2' className='mb-4'>
                      <MDBInput label='Latitud' name='Latitud' value={latitud} readOnly onChange={e => setLatitud(e.target.value)} />
                    </MDBCol>
                    <MDBCol md='2' className='mb-4'>
                      <MDBInput
                        label='Regional'
                        name='Regional'
                        value={regional === 0 ? 'Bogotá & Cundinamarca' : regional}
                        readOnly
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className='mb-4' style={{ position: 'relative' }}>
                    <MDBCol md='3' className='mb-4'>
                      <div
                        style={{
                          position: 'absolute',
                          top: '-17px',
                          left: '15px',
                          color: 'rgba(64, 64, 64, 0.9)',
                          fontSize: '13px'
                        }}>
                        Departamento
                      </div>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={departamento}
                        onChange={e => setDepartamento(e.target.value)}
                        style={{ width: '100%', height: '40px' }}
                        placeholder='Departamento'
                        allowCreate={true}>
                        <MenuItem value='' disabled>
                          Departamento
                        </MenuItem>
                        <MenuItem value={0}>BOGOTÁ D.C.</MenuItem>
                        <MenuItem value={1}>CUNDINAMARCA</MenuItem>
                      </Select>
                    </MDBCol>
                    <MDBCol md='3' className='mb-4'>
                      <div
                        style={{
                          position: 'absolute',
                          top: '-17px',
                          left: '200',
                          color: 'rgba(64, 64, 64, 0.9)',
                          fontSize: '13px'
                        }}>
                        Ciudad
                      </div>

                      <Select
                        labelId='ciudad-select-label'
                        id='ciudad-select'
                        value={ciudad}
                        onChange={e => {
                          //console.log('Nuevo valor de ciudad:', e.target.value);
                          setCiudad(e.target.value);
                        }}
                        style={{
                          width: '100%',
                          height: '40px',
                          marginTop: '10px'
                        }}
                        placeholder='Ciudad'
                        allowCreate={true}>
                        <MenuItem value={''}>Seleccione una opción</MenuItem>
                        {departamento === 0
                          ? [
                              <MenuItem key={'BOGOTA D.C'} value={0}>
                                BOGOTA D.C
                              </MenuItem>
                            ]
                          : departamento === 1
                          ? [
                              cundinamarcaDepartments.map(({ key, value, label }) => (
                                <MenuItem key={key} value={value}>
                                  {label}
                                </MenuItem>
                              ))
                            ]
                          : null}
                      </Select>
                    </MDBCol>
                    <MDBCol md='3' className='mb-4'>
                      <div
                        style={{
                          position: 'absolute',
                          top: '-17px',
                          left: '200',
                          color: 'rgba(64, 64, 64, 0.9)',
                          fontSize: '13px'
                        }}>
                        Localidad
                      </div>

                      <Select
                        labelId='localidad-select-label'
                        id='localidad-select'
                        value={localidad}
                        onChange={e => {
                          //console.log('Nuevo valor de localidad:', e.target.value);
                          setLocalidad(e.target.value);
                        }}
                        style={{
                          width: '80%',
                          height: '40px',
                          marginTop: '10px'
                        }}
                        placeholder='Localidad'
                        disabled={departamento !== 0}>
                        <MenuItem value={''}>Seleccione una opción</MenuItem>
                        {departamento === 0
                          ? bogotaLocalidades.map(localidadOption => (
                              <MenuItem key={localidadOption} value={localidadOption}>
                                {localidadOption}
                              </MenuItem>
                            ))
                          : null}
                      </Select>
                    </MDBCol>
                    <MDBCol md='3' className='mb-4'>
                      <div
                        style={{
                          position: 'absolute',
                          top: '-17px',
                          left: '200',
                          color: 'rgba(64, 64, 64, 0.9)',
                          fontSize: '13px'
                        }}>
                        Zona
                      </div>
                      <Select
                        labelId='zona-select-label'
                        id='zona-select'
                        value={zona}
                        onChange={e => setZona(e.target.value)}
                        style={{
                          width: '100%',
                          height: '40px',
                          marginTop: '10px'
                        }}
                        placeholder='Zona'
                        // disabled={departamento !== 0}
                      >
                        <MenuItem value={''}>Seleccione una opción</MenuItem>
                        {departamento === 0
                          ? zonasBogota.map(zonaOption => (
                              <MenuItem key={zonaOption.valor} value={zonaOption.valor}>
                                {zonaOption.nombre}
                              </MenuItem>
                            ))
                          : zonasCundinamarca.map(zonaOption => (
                              <MenuItem key={zonaOption.valor} value={zonaOption.valor}>
                                {zonaOption.nombre}
                              </MenuItem>
                            ))}
                      </Select>
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className='mb-4'>
                    <MDBCol md='2' className='mb-4'>
                      <MDBInput label='Barrio' name='Barrio' value={barrio} onChange={e => setBarrio(e.target.value)} />
                    </MDBCol>
                    <MDBCol md='3' className='mb-4'>
                      <MDBInput
                        label='Dirección Proyecto'
                        name='Direccion Proyecto'
                        value={direccionProyecto}
                        onChange={e => setDireccionProyecto(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md='3' className='mb-4'>
                      <MDBInput
                        label='Dirección Descriptiva'
                        name='Direccion Descriptiva'
                        value={direccionDescriptiva}
                        onChange={e => setDireccionDescriptiva(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md='2' style={{ position: 'relative' }} className='mb-4'>
                      <div
                        style={{
                          position: 'absolute',
                          top: '-17px',
                          left: '15px',
                          color: 'rgba(64, 64, 64, 0.9)',
                          fontSize: '13px'
                        }}>
                        Tiene sala de ventas
                      </div>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={tieneSalaVentas}
                        onChange={e => setTieneSalaVentas(e.target.value)}
                        style={{ width: '100%', height: '40px' }}
                        placeholder='Tiene Sala de Ventas'
                        allowCreate={true}>
                        <MenuItem value='' disabled>
                          Tiene Sala de Ventas
                        </MenuItem>
                        <MenuItem value={1}>Si</MenuItem>
                        <MenuItem value={0}>No</MenuItem>
                      </Select>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className='mb-4'>
                    <MDBCol md='3' className='mb-4'>
                      <MDBInput
                        label='Direccion Sala de Ventas'
                        name='Direccion Sala de Ventas'
                        value={direccionSalaVentas}
                        onChange={e => setDireccionSalaVentas(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md='2' style={{ position: 'relative' }} className='mb-4'>
                      <div
                        style={{
                          position: 'absolute',
                          top: '-17px',
                          left: '15px',
                          color: 'rgba(64, 64, 64, 0.9)',
                          fontSize: '13px'
                        }}>
                        Estrato
                      </div>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={estrato}
                        onChange={e => setEstrato(e.target.value)}
                        style={{ width: '100%', height: '40px' }}
                        placeholder='Estrato'
                        allowCreate={true}>
                        <MenuItem value='' disabled>
                          Estrato
                        </MenuItem>
                        {/* <MenuItem value={0}>Estrato</MenuItem> */}
                        <MenuItem value={0}>Estrato 0</MenuItem>
                        <MenuItem value={1}>Estrato 1</MenuItem>
                        <MenuItem value={2}>Estrato 2</MenuItem>
                        <MenuItem value={3}>Estrato 3</MenuItem>
                        <MenuItem value={4}>Estrato 4</MenuItem>
                        <MenuItem value={5}>Estrato 5</MenuItem>
                        <MenuItem value={6}>Estrato 6</MenuItem>
                      </Select>
                    </MDBCol>
                    <MDBCol md='2' className='mb-4'>
                      <MDBInput
                        label='Area del Lote'
                        name='Area del Lote'
                        value={areaLote}
                        onChange={e => handleSetAreaLote(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md='2' className='mb-4'>
                      <MDBInput
                        label='Area Contruida'
                        name='Area Contruida'
                        value={areaConstruida}
                        onChange={e => handleSetAreaConstruida(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md='2' className='mb-4'>
                      <MDBInput
                        label='Area Vendible'
                        name='Area Vendible'
                        value={areaVendible}
                        onChange={e => handleSetAreaVendible(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md='2' className='mb-4'>
                      <MDBInput
                        label='Fecha Corte Censo'
                        name='Fecha Corte Censo'
                        value={fechaCorteCenso}
                        onChange={e => setFechaCorteCenso(e.target.value)}
                        type='date'
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className='mb-4'>
                    <MDBCol md='3' className='mb-4'>
                      <MDBInput
                        label='Fecha Inicio Proyecto'
                        name='Fecha Inicio Proyecto'
                        value={fechaInicioProyecto}
                        onChange={e => setFechaInicioProyecto(e.target.value)}
                        type='date'
                      />
                    </MDBCol>
                    <MDBCol md='3' className='mb-4'>
                      <MDBInput
                        label='Número de Bloques'
                        name='Numero de Bloques'
                        value={numBloques}
                        onChange={e => handleSetNumBloques(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md='2' className='mb-4'>
                      <MDBInput
                        label='Parqueadero Visitantes'
                        name='Parqueadero Visitantes'
                        value={parqueaderoVisitantes}
                        onChange={e => handleSetParqueaderoVisitantes(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md='2' className='mb-4'>
                      <MDBInput
                        label='Parqueadero Propietarios'
                        name='Parqueadero Propietarios'
                        value={parqueaderoPropietarios}
                        onChange={e => handleSetParqueaderoPropietarios(e.target.value)}
                      />
                    </MDBCol>
                    <MDBCol md='2' style={{ position: 'relative' }} className='mb-4'>
                      <div
                        style={{
                          position: 'absolute',
                          top: '-17px',
                          left: '15px',
                          color: 'rgba(64, 64, 64, 0.9)',
                          fontSize: '13px'
                        }}>
                        Destino proyecto
                      </div>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={destinoProyecto}
                        onChange={e => setDestinoProyecto(e.target.value)}
                        style={{ width: '100%', height: '40px' }}
                        placeholder='Destino del proyecto'
                        allowCreate={true}>
                        <MenuItem value='' disabled>
                          Destino proyecto
                        </MenuItem>
                        {/* <MenuItem value={0}>destinodelproyecto</MenuItem> */}
                        <MenuItem value={0}>Venta</MenuItem>
                        <MenuItem value={1}>Uso Propio</MenuItem>
                        <MenuItem value={2}>Arrendar</MenuItem>
                        <MenuItem value={3}>Adjudicación</MenuItem>
                        <MenuItem value={4}>Sin Definir</MenuItem>
                      </Select>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className='mb-4'>
                    <MDBCol md='3' className='mb-4'>
                      <MDBInput
                        label='Telefono'
                        name='Telefono'
                        value={telefono}
                        onChange={handleTelefonoChange}
                        errorMessage={errorTelefono}
                      />
                    </MDBCol>
                    <MDBCol md='2' style={{ position: 'relative' }} className='mb-4'>
                      <div
                        style={{
                          position: 'absolute',
                          top: '-17px',
                          left: '15px',
                          color: 'rgba(64, 64, 64, 0.9)',
                          fontSize: '13px'
                        }}>
                        Uso General Proyecto
                      </div>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={usoGeneralProyecto}
                        onChange={e => setUsoGeneralProyecto(e.target.value)}
                        style={{ width: '100%', height: '40px' }}
                        placeholder='Uso General Proyecto'
                        allowCreate={true}>
                        <MenuItem value='' disabled>
                          Uso General Proyecto
                        </MenuItem>
                        {/* <MenuItem value={0}>destinodelproyecto</MenuItem> */}
                        <MenuItem value={0}>Residencial</MenuItem>
                        <MenuItem value={1}>No Residencial</MenuItem>
                      </Select>
                    </MDBCol>
                    <MDBCol md='2' style={{ position: 'relative' }} className='mb-4'>
                      <div
                        style={{
                          position: 'absolute',
                          top: '-17px',
                          left: '15px',
                          color: 'rgba(64, 64, 64, 0.9)',
                          fontSize: '13px'
                        }}>
                        Estado
                      </div>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={estado}
                        onChange={e => setEstado(e.target.value)}
                        style={{ width: '100%', height: '40px' }}
                        readOnly
                        placeholder='Estado'
                        allowCreate={true}>
                        <MenuItem value='' disabled>
                          Estado
                        </MenuItem>
                        {/* <MenuItem value={0}>Estado</MenuItem> */}
                        <MenuItem value={1}>Asignado</MenuItem>
                        <MenuItem value={2}>En curso</MenuItem>
                        <MenuItem value={3}>Por validar</MenuItem>
                        <MenuItem value={4}>Validado</MenuItem>
                        <MenuItem value={5}>Finalizado</MenuItem>
                        <MenuItem value={6}>Corregir</MenuItem>
                      </Select>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
              <div style={{ marginTop: '80px' }}>
                <label style={{ marginBottom: '10px' }}>
                  <b>
                    A continuación, encontrará la lista completa de las áreas o zonas comunes, por favor seleccione todas las que tenga
                    el proyecto:{' '}
                  </b>
                </label>
                <div id='zonas-comunes-edit' class='table-responsive'>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Seleccionar</th>
                        <th>Id</th>
                        <th>Zona Comun</th>
                        <th>Residencial</th>
                        <th>No Residencial</th>
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
                              value={item.id}
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
                              <Button
                                style={{
                                  backgroundColor: '#EF5350',
                                  color: 'white'
                                }}
                                onClick={() => eliminarCertificacion(index)}>
                                <FaTrash
                                  style={{
                                    marginRight: '5px',
                                    marginBottom: '5px'
                                  }}
                                />
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
                    <Form.Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
                      Seleccione una característica del proyecto:
                    </Form.Label>
                    <Form.Control as='select' value={nuevaCaracteristica} onChange={handleCaracteristicaChange}>
                      {caracteristicasProyecto.map((caracteristica, index) => {
                        const key = Object.keys(caracteristica);
                        const valor = Object.values(caracteristica);
                        return (
                          <option key={key} value={key}>
                            {valor}
                          </option>
                        );
                      })}
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
                              <Button
                                style={{
                                  backgroundColor: '#EF5350',
                                  color: 'white'
                                }}
                                onClick={() => eliminarCaracteristica(index)}>
                                <FaTrash
                                  style={{
                                    marginRight: '5px',
                                    marginBottom: '5px'
                                  }}
                                />
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

                <label>
                  <b>Datos de contacto de la obra . </b>
                </label>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>CARGO</th>
                      <th>NOMBRE</th>
                      {/* <th>APELLIDO</th> */}
                      <th>TELÉFONO</th>
                      <th>CORREO</th>
                      <th>AUTORIZACIÓN</th>
                      <th>ACCIONES</th>
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
                            }}>
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
                            onKeyPress={handleNumericInput}
                          />
                          {errores[index] && <div style={{ color: '#FF0000', marginTop: '5px' }}>{errores[index]}</div>}
                        </td>
                        <td style={{ width: '20%' }}>
                          <Form.Control
                            type='email'
                            name='correo'
                            value={item.email}
                            onChange={e => handleInputChange(e, index)}
                            style={{
                              fontSize: '16px',
                              padding: '10px',
                              width: '110%',
                              marginLeft: '-17px',
                              borderColor: correoValido ? '' : 'red'
                            }}
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
                            value={item.tiene_autorizacion}
                            onChange={e => handleInputChange(e, index)}
                            style={{
                              fontSize: '16px',
                              padding: '10px',
                              width: '155%',
                              marginLeft: '-20px'
                            }}>
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
                          <Button
                            style={{
                              backgroundColor: '#EF5350',
                              color: 'white'
                            }}
                            onClick={() => eliminarContacto(index)}>
                            <FaTrash
                              style={{
                                marginRight: '5px',
                                marginBottom: '5px'
                              }}
                            />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button onClick={agregarFilaContacto}>Agregar Nuevo Contacto</Button>
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
                    La siguiente tabla pertenece a los acabados exteriores, y se pueden seleccionar los que corresponden de acuerdo al
                    uso:
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
                      &nbsp;&nbsp;
                      {isTableVisible28 ? 'Contraer P 28' : 'Mostrar P 28'}
                    </Button>
                  </div>
                  {isTableVisible28 && (
                    <div className='acordeon-body'>
                      <div id='acabados' className='table-responsive'>
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
                            {exteriorFinishData.map(row => {
                              const isResidencial = !Array.isArray(row.residencial);
                              const checkboxOptions = Object.entries(row[isResidencial ? 'residencial' : 'noResidencial']);
                              return (
                                <tr key={row.id}>
                                  <td>{row.categoria}</td>
                                  <td>{row.nombre}</td>
                                  <td>
                                    {isResidencial &&
                                      getAcabadosExterioresCheckboxes(
                                        checkboxOptions,
                                        acabadosExterioresFetch,
                                        row,
                                        setAcabadosExterioresFetch
                                      )}
                                  </td>
                                  <td>
                                    {!isResidencial &&
                                      getAcabadosExterioresCheckboxes(
                                        checkboxOptions,
                                        acabadosExterioresFetch,
                                        row,
                                        setAcabadosExterioresFetch
                                      )}
                                  </td>
                                </tr>
                              );
                            })}
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
                    Pregunta 27: A continuación, es posible seleccionar cada especificación de acuerdo a las características{' '}
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
                            {technicalFeaturesData.map(item => {
                              const checkboxOptions = Object.entries(item.especificacion);
                              return (
                                <tr key={item.caracteristicaId}>
                                  <td>{item.id}</td>
                                  <td>{item.categoria}</td>
                                  <td>{item.caracteristica}</td>
                                  <td>
                                    {getTechnicalFeauresCheckboxes(
                                      checkboxOptions,
                                      caracteristicasFetch,
                                      item,
                                      setCaracteristicasFetch
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h1>Lista de etapas del proyecto</h1>
                {listStageProyectoArray.length === 0 ? (
                  <span>No hay etapas creadas en este proyecto.</span>
                ) : (
                  listStageProyectoArray.map(stage => (
                    <div className='acordeon-container' key={stage.id}>
                      <div className='acordeon-header'>
                        <Button
                          className='center-button'
                          style={{
                            backgroundColor: '#3b71ca',
                            color: 'white',
                            marginTop: '50px'
                          }}
                          variant='link'
                          onClick={() => toggleDetails(stage.id)}>
                          {isExpanded(stage.id) ? <FaChevronUp /> : <FaChevronDown />}
                          &nbsp;&nbsp;
                          {isExpanded(stage.id) ? 'Contraer' : 'Mostrar'} {stage.nombre}
                        </Button>
                      </div>
                      {isExpanded(stage.id) && (
                        <div className='acordeon-body'>
                          <ProjectStageFormEdit
                            etapa={stage}
                            allStagesCompanies={allStagesCompanies}
                            setAllStageCompanies={setAllStageCompanies}
                          />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
            <button
              style={{
                borderRadius: '5px',
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                cursor: 'pointer'
              }}
              type='submit'
              onClick={handleSubmit}>
              Enviar
            </button>
          </div>
        </MDBContainer>
      </div>
    </div>
  );
};

export default InsertarProyectoForm;
