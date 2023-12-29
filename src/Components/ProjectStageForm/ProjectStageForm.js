import React, { useState, useEffect } from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import logo from '../../assets/img/logo-cnc-pequeño.png';
import { useParams } from 'react-router-dom';
import { FaTrash, FaPlus, FaCog, FaSave, FaChevronUp, FaChevronDown, FaCheck } from 'react-icons/fa';
import { Table, Form, Button, Modal } from 'react-bootstrap';
import '../../pages/CreateEtapa/CreateEtapa.css';
import { innerFinishDataStage } from '../../utils';
import { v4 as uuidv4 } from 'uuid';

const ProjectStageForm = (
  {
    //   handleSubmit,
    //   handleAnswerChange,
    //   answers,
    //   handleNumericInput,
    //   handleSaveData,
    //   setButtonClicked,
    //   handleModalClose,
    //   buttonClicked,
    //   showSuccessMessage,
    //   showModal,
    //   dotacion,
    //   unidades,
    //   setUnidades,
    //   handleModalSubmit,
    //   setDotacion,
    //   tiposProyectoArray,
    //   handleInputChangeTipo,
    //   tipoVivienda,
    //   handleTipoViviendaChange,
    //   USO_TIPOS_NO_RESIDENCIALES,
    //   USO_TIPOS_RESIDENCIALES,
    //   handleModalShow,
    //   eliminarTipo,
    //   agregarFilaTipo,
    //   toggleTableVisibility1,
    //   isTableVisible1,
    //   handleOptionSelectExterior,
  }
) => {
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
  const [showModal, setShowModal] = useState(false);
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

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleModalSubmit = () => {
    const requestBody = {
      // tipo: id_tipo,
      dotacion: dotacion,
      unidades: unidades
    };

    //console.log("Petición enviada:", requestBody);
    handleModalClose();
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
    //console.log(tiposProyectoArray);

    if (name === 'correo') {
      const esValido = validarCorreo(value);
      setCorreoValido(esValido);
    }

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

    const UUID = uuidv4();

    //console.log("Este es el formulario de formdata", formData);

    // //console.log("Este es el formulario para el fetch de tipo", formDataTipos);

    // const urlCreateStage = `http://127.0.0.1:8000/proyecto/cambiar_datos_etapa/`;
    const urlCreateStage = `https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto/cambiar_datos_etapa/`;
    const urlAddExteriorFinishes = 'https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto/acabado_interior/';
    const urlAddCompany = 'https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto/company_etapa/';

    const urlChangeType = `https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto/cambiar_datos_tipo/`;
    const urlCreateSale = `https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto/datos_historico_ventas_unidades_detail/`;
    const urlCreateDotacion = `https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto/datos_dotacion_detail/`;

    try {
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
        const stageId = dataResponseCreateStage.id;
        const formDataTipos = tiposProyectoArray.map(item => ({
          nombre: item.nombre,
          tipo_vivienda: item.tipo_vivienda,
          uso: item.uso,
          numero_unidades: item.numero_unidades,
          area_unidades_area_disponible: item.area,
          etapa: stageId,
          id_tipo: randomUUID
        }));

        //console.log("Formulario de tipos a enviar", formDataTipos);

        const responseTipoEtapa = await fetch(urlChangeType, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formDataTipos)
        });

        if (responseTipoEtapa.ok) {
          const dataResponseCreateTypeStage = await responseTipoEtapa.json();
          //console.log(dataResponseCreateTypeStage);
          //console.log("Solicitud de tipos etapa exitosa", formDataTipos);
          const formDataVentas = tiposProyectoArray.map(item => ({
            venta: item.venta,
            renuncias: item.renuncias,
            saldo: item.saldo,
            precio_miles: item.precio,
            precio_m2_miles: item.precio_m2,
            novedad: item.novedad,
            tipo: dataResponseCreateTypeStage[0]['id']
          }));
          const responseCreateSale = await fetch(urlCreateSale, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataVentas)
          });
          if (responseCreateSale.ok) {
            //console.log("Solicitud de ventas etapa exitosa", formDataVentas);
            const formDataDotaciones = tiposProyectoArray.map(item => ({
              tipo: dataResponseCreateTypeStage[0]['id'],
              alcoba: item.dotacion_1,
              baño: item.dotacion_2,
              dotacion_3: item.dotacion_3,
              dotacion_4: item.dotacion_4,
              dotacion_5: item.dotacion_5
            }));
            const responseCreateDotaciones = await fetch(urlCreateDotacion, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formDataDotaciones)
            });
            if (responseCreateDotaciones.ok) {
              console.log('Solicitud de dotaciones etapa exitosa', formDataDotaciones);
            } else {
              //console.log("Solicitud de dotaciones etapa fallo");
            }
          } else {
            //console.log("Solicitud de ventas etapa fallo", formDataVentas);
          }
        } else {
          //console.log("Solicitud de tipos etapa fallo");
        }

        for (const key in answers.q18) {
          if (answers.q18.hasOwnProperty(key)) {
            const categoria = parseInt(key);
            const acabados = answers.q18[key].map(acabado => ({
              categoria,
              acabado: parseInt(acabado),
              proyecto: params.id,
              etapa: stageId
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
      <h1 style={{ marginTop: '30px' }}>
        Etapa de proyecto <FaCog size={25} />
      </h1>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <h4>
            <strong>
              Información de las etapas. Es necesario realizar el módulo completo para cada una de las etapas o segmentos del proyecto.
            </strong>
          </h4>
          <label>
            Pregunta 1: ¿Cuál es el nombre o identificación de la etapa o segmento del proyecto? Ejemplo (TORRE 1, MANZANA 4, LOCALES)
          </label>
          <input type='text' value={answers.q1} onChange={e => handleAnswerChange('q1', e.target.value)} />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>
            Pregunta 2: ¿Cuál es la cantidad de soluciones (# casas, apartamentos, locales, oficinas, etc) inmobiliarias para esta
            etapa?
          </label>
          <input type='number' value={answers.q2} onChange={e => handleAnswerChange('q2', e.target.value)} min='0' />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 3: ¿Cuál es el destino, fin o propósito de esta etapa? </label>
          <select onChange={e => handleAnswerChange('q3', e.target.value)} value={answers.q3}>
            <option value=''>Seleccione una opción</option>
            <option value='0'>Venta</option>
            <option value='1'>Uso Propio</option>
            <option value='2'>Arrendamiento</option>
            <option value='3'>Adjudicacion</option>
            <option value='4'>Sin Definir</option>
          </select>
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 4: ¿Cuál es el uso general de la etapa?</label>
          <select onChange={e => handleAnswerChange('q4', e.target.value)} value={answers.q4}>
            <option value=''>Seleccione una opción</option>
            <option value='1'>Vivienda (Apartamentos)</option>
            <option value='0'>Vivienda (Casas)</option>
            <option value='3'>Oficinas</option>
            <option value='7'>Consultorios</option>
            <option value='4'>Bodegas</option>
            <option value='2'>Locales</option>
            <option value='6'>Industrial</option>
            <option value='10'>Parqueaderos</option>
            <option value='8'>Institucional</option>
            <option value='12'>Lote/Parcelación</option>
          </select>
        </div>
        {answers.q4 === '1' || answers.q4 === '0' ? (
          <div
            style={{
              marginTop: '40px',
              backgroundColor: '#EAEAEA',
              padding: '20px',
              borderRadius: '10px'
            }}>
            <label>Pregunta 5 - a: ¿Cuántos pisos por bloque tiene la etapa?</label>
            <input
              type='number'
              value={answers.q5a}
              onChange={e => handleAnswerChange('q5a', e.target.value)}
              min='0'
              onInput={handleNumericInput}
            />
          </div>
        ) : null}
        {answers.q4 === '1' || answers.q4 === '0' ? (
          <div
            style={{
              marginTop: '40px',
              backgroundColor: '#EAEAEA',
              padding: '20px',
              borderRadius: '10px'
            }}>
            <label>Pregunta 6 - a: ¿Cuántos apartamentos por piso tiene la etapa?</label>
            <input
              type='number'
              value={answers.q6a}
              onChange={e => handleAnswerChange('q6a', e.target.value)}
              min='0'
              onInput={handleNumericInput}
            />
          </div>
        ) : null}
        {answers.q4 !== '1' && answers.q4 !== '0' ? (
          <div
            style={{
              marginTop: '40px',
              backgroundColor: '#EAEAEA',
              padding: '20px',
              borderRadius: '10px'
            }}>
            <label>Pregunta 5: ¿Cuál es el área vendible de esta etapa? _______ Mts2</label>
            <input
              type='number'
              value={answers.q5}
              onChange={e => handleAnswerChange('q5', e.target.value)}
              disabled={!(answers.q4 !== '1' && answers.q4 !== '0' && answers.q3 !== '1')}
              min='0'
              onInput={handleNumericInput}
            />
          </div>
        ) : null}
        {answers.q4 !== '1' && answers.q4 !== '0' ? (
          <div
            style={{
              marginTop: '40px',
              backgroundColor: '#EAEAEA',
              padding: '20px',
              borderRadius: '10px'
            }}>
            <label>Pregunta 6: ¿Cuál es el área construida de esta etapa? ______ Mts2</label>
            <input
              type='number'
              value={answers.q6}
              onChange={e => handleAnswerChange('q6', e.target.value)}
              disabled={!(answers.q4 !== '1' && answers.q4 !== '0')}
              min='0'
              onInput={handleNumericInput}
            />
          </div>
        ) : null}
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 7: ¿En qué fecha se inició preventa o en qué fecha salió al mercado el proyecto?</label>
          <input
            type='date'
            value={answers.q7}
            onChange={e => handleAnswerChange('q7', e.target.value)}
            disabled={!(answers.q3 !== '1' && answers.q3 !== '2' && answers.q3 !== '3' && answers.q3 !== '4')}
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
            Pregunta 8: ¿En qué fecha se inicia la de construcción de esta etapa (limpieza del terreno, cerramiento de lote, movimiento
            de tierras)?
          </label>
          <input type='date' value={answers.q8} onChange={e => handleAnswerChange('q8', e.target.value)} />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 9: ¿En qué fecha finaliza el proceso constructivo de esta etapa (Terminados)?</label>
          <input type='date' value={answers.q9} onChange={e => handleAnswerChange('q9', e.target.value)} />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>
            Pregunta 10: ¿En qué fecha se entrega la última unidad de la etapa, sin importar si el resto de la obra esta entregado o si
            la construcción se terminó con mucha anterioridad?
          </label>
          <input type='date' value={answers.q10} onChange={e => handleAnswerChange('q10', e.target.value)} />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>
            Pregunta 11: El estado constructivo indica en qué situación o proceso de construcción está la obra. De acuerdo a esta
            definición anterior y al siguiente listado de opciones, ¿En que estado constructivo se encuentra etapa en mes de ______?
          </label>
          <select onChange={e => handleAnswerChange('q11', e.target.value)} value={answers.q11}>
            <option value=''>Seleccione una opción</option>
            <option value='0'>Proyectado</option>
            <option value='1'>Preventa</option>
            <option value='2'>Construcción</option>
            <option value='3'>TVE</option>
            <option value='9'>TE</option>
            <option value='4'>Cancelado</option>
            <option value='5'>Paralizado</option>
            <option value='6'>Rediseñado</option>
          </select>
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>
            Pregunta 12: Las fases corresponden a cada una de las diversas apariencias en las que se encuentra el proceso de
            construcción. De acuerdo a las siguientes definiciones, ¿En que fase constructivo se encuentra etapa en mes de ______?
          </label>
          <select onChange={e => handleAnswerChange('q12', e.target.value)} value={answers.q12}>
            <option value=''>Seleccione una opción</option>
            <option value='0'>Sin iniciar</option>
            {/* <option value="">Urbanismo</option> */}
            <option value='1'>Preliminar</option>
            <option value='2'>Cimentación</option>
            <option value='3'>Estructura</option>
            <option value='4'>Obra Negra</option>
            <option value='5'>Acabados</option>
            <option value='6'>Terminado</option>
          </select>
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>
            Pregunta 13: En la siguiente tabla se debe registrar las empresas, compañías o personas que intervienen en la construcción
            venta y gerencia de la obra:
            <p>
              <strong>1. Constructora:</strong> La compañía que construye el proyecto (compañía constructora: En algunos casos
              corresponde al nombre del director de obra y no necesariamente es la misma empresa vendedora).
              <strong>2. Vendedora :</strong> Razón social o nombre de la empresa que promueve y vende el proyecto (puede o no ser la
              misma empresa que construye).
              <strong>3. Gerencia:</strong> Razón social o nombre de la empresa que gerencia el proyecto (puede o no ser la misma
              empresa que construye o vende).
            </p>
          </label>
          <div class='table-responsive'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                    <strong>COMPAÑÍA</strong>
                  </th>
                  <th>
                    <strong>NOMBRE</strong>
                  </th>
                  <th>
                    <strong>NIT</strong>
                  </th>
                  <th>
                    <strong>DIRECCIÓN</strong>
                  </th>
                  <th>
                    <strong>TELÉFONO</strong>
                  </th>
                  {/* <th>
                        <strong>CORREO</strong>
                      </th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Constructora</strong>
                  </td>
                  <td>
                    <input
                      type='text'
                      value={answers.constructoraNombre}
                      onChange={e => handleAnswerChange('constructoraNombre', e.target.value)}
                      style={{
                        fontSize: '16px',
                        padding: '10px',
                        width: '125%',
                        marginLeft: '-20px'
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      value={answers.constructoraNIT}
                      onChange={e => handleAnswerChange('constructoraNIT', e.target.value)}
                      style={{
                        fontSize: '16px',
                        padding: '10px',
                        width: '130%',
                        marginLeft: '-20px'
                      }}
                      min='0'
                      onInput={handleNumericInput}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={answers.constructoraDireccion}
                      onChange={e => handleAnswerChange('constructoraDireccion', e.target.value)}
                      style={{
                        fontSize: '16px',
                        padding: '10px',
                        width: '125%',
                        marginLeft: '-20px'
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      value={answers.constructoraTelefono}
                      onChange={e => handleAnswerChange('constructoraTelefono', e.target.value)}
                      style={{
                        fontSize: '16px',
                        padding: '10px',
                        width: '125%',
                        marginLeft: '-20px'
                      }}
                      min='0'
                      onInput={handleNumericInput}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Vendedora</strong>
                  </td>
                  <td>
                    <input
                      type='text'
                      value={answers.vendedoraNombre}
                      onChange={e => handleAnswerChange('vendedoraNombre', e.target.value)}
                      disabled={answers.q3 !== '0'}
                      style={{
                        fontSize: '16px',
                        padding: '10px',
                        width: '125%',
                        marginLeft: '-20px'
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      value={answers.vendedoraNIT}
                      onChange={e => handleAnswerChange('vendedoraNIT', e.target.value)}
                      disabled={answers.q3 !== '0'}
                      style={{
                        fontSize: '16px',
                        padding: '10px',
                        width: '130%',
                        marginLeft: '-20px'
                      }}
                      min='0'
                      onInput={handleNumericInput}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={answers.vendedoraDireccion}
                      onChange={e => handleAnswerChange('vendedoraDireccion', e.target.value)}
                      disabled={answers.q3 !== '0'}
                      style={{
                        fontSize: '16px',
                        padding: '10px',
                        width: '125%',
                        marginLeft: '-20px'
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      value={answers.vendedoraTelefono}
                      onChange={e => handleAnswerChange('vendedoraTelefono', e.target.value)}
                      disabled={answers.q3 !== '0'}
                      style={{
                        fontSize: '16px',
                        padding: '10px',
                        width: '125%',
                        marginLeft: '-20px'
                      }}
                      min='0'
                      onInput={handleNumericInput}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Gerencia</strong>
                  </td>
                  <td>
                    <input
                      type='text'
                      value={answers.gerenciaNombre}
                      onChange={e => handleAnswerChange('gerenciaNombre', e.target.value)}
                      style={{
                        fontSize: '16px',
                        padding: '10px',
                        width: '125%',
                        marginLeft: '-20px'
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      value={answers.gerenciaNIT}
                      onChange={e => handleAnswerChange('gerenciaNIT', e.target.value)}
                      style={{
                        fontSize: '16px',
                        padding: '10px',
                        width: '130%',
                        marginLeft: '-20px'
                      }}
                      min='0'
                      onInput={handleNumericInput}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={answers.gerenciaDireccion}
                      onChange={e => handleAnswerChange('gerenciaDireccion', e.target.value)}
                      style={{
                        fontSize: '16px',
                        padding: '10px',
                        width: '125%',
                        marginLeft: '-20px'
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      value={answers.gerenciaTelefono}
                      onChange={e => handleAnswerChange('gerenciaTelefono', e.target.value)}
                      style={{
                        fontSize: '16px',
                        padding: '10px',
                        width: '125%',
                        marginLeft: '-20px'
                      }}
                      min='0'
                      onInput={handleNumericInput}
                    />
                  </td>
                </tr>
                <div style={{ color: 'black', marginTop: '10px' }}>
                  <FaCheck style={{ marginRight: '5px' }} />
                  Valide todos los datos antes de guardarlos
                </div>
              </tbody>
              <Button
                style={{
                  backgroundColor: buttonClicked ? 'gray' : '#00ACC1',
                  color: 'white',
                  marginTop: '20px'
                }}
                onClick={() => {
                  handleSaveData();
                  setButtonClicked(true);
                }}
                disabled={buttonClicked}>
                <FaSave style={{ marginRight: '5px', marginBottom: '5px' }} />
                Guardar datos
              </Button>
              {showSuccessMessage && (
                <div style={{ color: 'green', marginTop: '10px' }}>
                  <FaCheck style={{ marginRight: '5px' }} />
                  Datos guardados correctamente
                </div>
              )}
            </Table>
          </div>
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 14. La financiación de la construcción de esta etapa fue con:</label>
          <select value={answers.q14} onChange={e => handleAnswerChange('q14', e.target.value)}>
            <option value=''>Seleccione una opción</option>
            <option value='Recursos Propios'>Recursos Propios</option>
            <option value='Crédito con una entidad'>Crédito con una entidad</option>
          </select>
          {answers.q14 === 'Crédito con una entidad' && (
            <div>
              <span style={{ marginRight: '10px' }}>¿Cuál?</span>
              <input
                type='text'
                // value={answers.q14}
                onChange={e => handleAnswerChange('q14', e.target.value)}
                style={{ marginTop: '30px' }}
              />
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
            Pregunta 15. ¿Cuál es la entidad con quien la construcción maneja la fiducia antes de cumplir el punto de equilibrio del
            proyecto?
          </label>
          <input
            type='text'
            value={answers.q15}
            onChange={e => handleAnswerChange('q15', e.target.value)}
            disabled={answers.q3 !== '0'}
          />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 16. ¿En qué condición se hará entrega de esta etapa?</label>
          <input type='text' value={answers.q16} onChange={e => handleAnswerChange('q16', e.target.value)} />
        </div>
        <div
          style={{
            marginTop: '40px',
            backgroundColor: '#EAEAEA',
            padding: '20px',
            borderRadius: '10px'
          }}>
          <label>Pregunta 17:</label>
          <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Agregar Dotación y Unidades</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId='formDotacion'>
                  <Form.Label>Dotación</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Ingrese dotación'
                    value={dotacion}
                    onChange={e => setDotacion(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId='formUnidades'>
                  <Form.Label>Unidades</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Ingrese unidades'
                    value={unidades}
                    onChange={e => setUnidades(parseInt(e.target.value, 10))}
                    min='0'
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleModalClose}>
                Cerrar
              </Button>
              <Button variant='primary' onClick={handleModalSubmit}>
                Enviar
              </Button>
            </Modal.Footer>
          </Modal>
          <div class='table-responsive'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className='column-large'>
                    <strong>NOMBRE</strong>
                  </th>
                  <th>
                    <strong>TIPO VIVIENDA</strong>
                  </th>
                  <th>
                    <strong>USO</strong>
                  </th>
                  <th>
                    <strong># UNID</strong>
                  </th>
                  <th>
                    <strong>ÁREA</strong>
                  </th>
                  <th>
                    <strong>ALCOBAS</strong>
                  </th>
                  <th>
                    <strong>BAÑOS</strong>
                  </th>
                  <th>
                    <strong>DOTACIÓN.3</strong>
                  </th>
                  <th>
                    <strong>DOTACIÓN.4</strong>
                  </th>
                  <th>
                    <strong>DOTACIÓN.5</strong>
                  </th>
                  <th>
                    <strong>VENTA</strong>
                  </th>
                  <th>
                    <strong>RENUNCIAS</strong>
                  </th>
                  <th>
                    <strong>SALDO</strong>
                  </th>
                  <th>
                    <strong>PRECIO</strong>
                  </th>
                  <th>
                    <strong>PRECIO M2</strong>
                  </th>
                  <th>
                    <strong>NOVEDAD</strong>
                  </th>
                  <th>
                    <strong>ACCIONES</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tiposProyectoArray.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        type='text'
                        name='nombre'
                        value={item.nombre}
                        onChange={e => handleInputChangeTipo(e, index)}
                        style={{
                          fontSize: '16px',
                          padding: '10px',
                          width: '155%',
                          marginLeft: '-18px'
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        as='select'
                        name='tipo_vivienda'
                        value={item.tipo_vivienda}
                        // onChange={handleTipoViviendaChange}
                        onChange={e => handleInputChangeTipo(e, index)}
                        style={{
                          fontSize: '16px',
                          padding: '10px',
                          width: '155%',
                          marginLeft: '-18px'
                        }}
                        disabled={answers.q4 !== '0' && answers.q4 !== '1'}>
                        <option value=''>Seleccione</option>
                        <option value='0'>Vivienda de Interés Social (VIS)</option>
                        <option value='1'>Vivienda de Interés Prioritario (VIP)</option>
                        <option value='2'>No Vivienda de Interés social ( No Vis) </option>
                      </Form.Control>
                    </td>
                    <td>
                      <Form.Control
                        as='select'
                        type='text'
                        name='uso'
                        value={item.uso}
                        onChange={e => handleInputChangeTipo(e, index)}
                        style={{
                          fontSize: '16px',
                          padding: '10px',
                          width: '210%',
                          marginLeft: '-17px'
                        }}>
                        {tipoVivienda === ''
                          ? // Si no se ha seleccionado un tipo de vivienda, mostrar opciones no residenciales
                            USO_TIPOS_NO_RESIDENCIALES.map(opcion => (
                              <option key={opcion.value} value={opcion.value}>
                                {opcion.label}
                              </option>
                            ))
                          : // Si se seleccionó un tipo de vivienda, mostrar opciones residenciales
                            USO_TIPOS_RESIDENCIALES.map(opcion => (
                              <option key={opcion.value} value={opcion.value}>
                                {opcion.label}
                              </option>
                            ))}
                      </Form.Control>
                    </td>
                    <td>
                      <Form.Control
                        type='text'
                        name='numero_unidades'
                        value={item.numero_unidades}
                        onChange={e => handleInputChangeTipo(e, index)}
                        disabled={answers.q3 !== '0'}
                        style={{
                          fontSize: '16px',
                          padding: '10px',
                          width: '198%',
                          marginLeft: '-17px'
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type='number'
                        name='area'
                        value={item.area}
                        onChange={e => handleInputChangeTipo(e, index)}
                        onInput={handleNumericInput}
                        style={{
                          fontSize: '16px',
                          padding: '10px',
                          width: '185%',
                          marginLeft: '-17px'
                        }}
                        min='0'
                      />
                    </td>
                    <td>
                      <Form.Control
                        type='number'
                        name='dotacion_1'
                        value={item.dotacion_1}
                        onChange={e => handleInputChangeTipo(e, index)}
                        style={{
                          fontSize: '16px',
                          padding: '10px',
                          width: '138%',
                          marginLeft: '-17px'
                        }}
                        min='0'
                        onInput={handleNumericInput}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type='number'
                        name='dotacion_2'
                        value={item.dotacion_2}
                        onChange={e => handleInputChangeTipo(e, index)}
                        style={{
                          fontSize: '16px',
                          padding: '10px',
                          width: '138%',
                          marginLeft: '-17px'
                        }}
                        min='0'
                        onInput={handleNumericInput}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type='number'
                        name='dotacion_3'
                        value={item.dotacion_3}
                        onChange={e => handleInputChangeTipo(e, index)}
                        onClick={handleModalShow}
                        style={{
                          fontSize: '16px',
                          padding: '10px',
                          width: '138%',
                          marginLeft: '-17px'
                        }}
                        min='0'
                        onInput={handleNumericInput}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type='number'
                        name='dotacion_4'
                        value={item.dotacion_4}
                        onChange={e => handleInputChangeTipo(e, index)}
                        onClick={handleModalShow}
                        style={{
                          fontSize: '16px',
                          padding: '10px',
                          width: '138%',
                          marginLeft: '-17px'
                        }}
                        min='0'
                        onInput={handleNumericInput}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type='number'
                        name='dotacion_5'
                        value={item.dotacion_5}
                        onChange={e => handleInputChangeTipo(e, index)}
                        onClick={handleModalShow}
                        style={{
                          fontSize: '16px',
                          padding: '10px',
                          width: '138%',
                          marginLeft: '-17px'
                        }}
                        min='0'
                        onInput={handleNumericInput}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type='number'
                        name='venta'
                        value={item.venta}
                        onChange={e => handleInputChangeTipo(e, index)}
                        disabled={answers.q3 !== '0'}
                        style={{
                          fontSize: '16px',
                          padding: '10px',
                          width: '170%',
                          marginLeft: '-17px'
                        }}
                        min='0'
                        onInput={handleNumericInput}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type='number'
                        name='renuncias'
                        value={item.renuncias}
                        onChange={e => handleInputChangeTipo(e, index)}
                        disabled={answers.q3 !== '0'}
                        style={{
                          fontSize: '16px',
                          padding: '10px',
                          width: '140%',
                          marginLeft: '-17px'
                        }}
                        min='0'
                        onInput={handleNumericInput}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type='number'
                        name='saldo'
                        value={item.saldo}
                        onChange={e => handleInputChangeTipo(e, index)}
                        disabled={answers.q3 !== '0'}
                        style={{
                          fontSize: '16px',
                          padding: '10px',
                          width: '165%',
                          marginLeft: '-17px'
                        }}
                        min='0'
                        onInput={handleNumericInput}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type='number'
                        name='precio'
                        value={item.precio}
                        onChange={e => handleInputChangeTipo(e, index)}
                        disabled={answers.q3 !== '0'}
                        style={{
                          fontSize: '16px',
                          padding: '10px',
                          width: '165%',
                          marginLeft: '-17px'
                        }}
                        min='0'
                        onInput={handleNumericInput}
                        required
                      />
                    </td>
                    <td>
                      <Form.Control
                        type='text'
                        name='precio_m2'
                        value={item.precio_m2}
                        onChange={e => handleInputChangeTipo(e, index)}
                        disabled={answers.q3 !== '0'}
                        style={{
                          fontSize: '16px',
                          padding: '10px',
                          width: '165%',
                          marginLeft: '-17px'
                        }}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type='text'
                        name='novedad'
                        value={item.novedad}
                        onChange={e => handleInputChangeTipo(e, index)}
                        style={{
                          fontSize: '16px',
                          padding: '10px',
                          width: '145%',
                          marginLeft: '-17px'
                        }}
                      />
                    </td>
                    <td>
                      <Button style={{ backgroundColor: '#EF5350', color: 'white' }} onClick={() => eliminarTipo(index)}>
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button onClick={agregarFilaTipo}>
              <FaPlus style={{ marginRight: '5px', marginBottom: '5px' }} /> Agregar Nuevo Tipo
            </Button>
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
            <h4 style={{ marginBottom: '30px' }}>
              <strong>
                A continuación, vamos a hablar de los tipos que se construirán en este proyecto. Por favor para cada tipo de esta etapa
                responder cada una de las preguntas.
              </strong>
            </h4>
            <label style={{ marginBottom: '30px' }}>
              Pregunta 1: A continuación, es posible seleccionar cada especificación de acuerdo a las características{' '}
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
                onClick={toggleTableVisibility1}>
                {isTableVisible1 ? <FaChevronUp /> : <FaChevronDown />}
                &nbsp;&nbsp; {/* Espacio entre el icono y el texto del botón */}
                {isTableVisible1 ? 'Contraer P 1' : 'Mostrar P 1'}
              </Button>
            </div>
            {isTableVisible1 && (
              <div className='acordeon-body'>
                <div id='exteriores' class='table-responsive'>
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
                      {innerFinishDataStage.map(row => (
                        <tr key={row.id}>
                          <td>{row.id}</td>
                          <td>{row.nombre}</td>
                          <td>
                            {Object.entries(row.residencial).map(([optionId, optionLabel]) => (
                              <div key={optionId}>
                                <Form.Check
                                  type='checkbox'
                                  label={optionLabel}
                                  checked={answers.q18[row.id]?.includes(optionId.toString()) || false}
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
                                  checked={answers.q18[row.id]?.includes(optionId.toString()) || false}
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
        <div style={{ display: 'flex' }}>
          <button style={{ marginRight: '5px', flex: 1 }} type='submit'>
            Enviar
          </button>
          <button style={{ marginLeft: '5px', flex: 1 }} href='/createEtapa'>
            Ingresar otra etapa
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectStageForm;
