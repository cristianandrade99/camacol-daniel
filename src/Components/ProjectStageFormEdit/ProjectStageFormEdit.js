import React, { useState } from 'react';
import { Table, Form, FormControl, Button, Modal } from 'react-bootstrap';

import { FaSave, FaCheck, FaTrash, FaPlus, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import './StageFormEdit.css';
import { exteriorFinishDataStage } from '../../utils';
import { COMPANIES } from '../../helpers/constants';

const ProjectStageFormEdit = ({ etapa, allStagesCompanies, setAllStageCompanies }) => {
  const [answers, setAnswers] = useState(etapa);
  const [hasSalesRoom, setHasSalesRoom] = useState('');
  const [showSalesRoomQuestion, setShowSalesRoomQuestion] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dotacion, setDotacion] = useState('');
  const [unidades, setUnidades] = useState(0);
  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  const [correoValido, setCorreoValido] = useState(true);
  const [errores, setErrores] = useState([]);
  const [tiposProyecto, setTiposProyecto] = useState('');
  const [isTableVisible1, setTableVisible1] = useState(false);
  const [tipoVivienda, setTipoVivienda] = useState('');
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
  const handleSubmit = async e => {
    e.preventDefault();
    //console.log("Respuestas:", answers);

    const urlCreateStage = `https://back-camacol-service-q2nhgfzuoq-uc.a.run.app/proyecto/cambiar_datos_etapa/`;
    const formData = {
      id: answers['id'],
      comment: answers['comment:'],
      proyecto: answers['proyecto'],
      codigo_etapa: answers['codigo_etapa'],
      destino_etapa: answers['destino_etapa'],
      nombre: answers['nombre'],
      numero_unidades: answers['numero_unidades'],
      uso: answers['uso'],
      pisos_por_bloque_area_construida: answers['pisos_por_bloque_area_construida'],
      apto_piso_area_vendible: answers['apto_piso_area_vendible'],
      apto_piso_bloque_etapa_residencial: answers['apto_piso_bloque_etapa_residencial'],
      apto_piso_etapa_residencial: answers['apto_piso_etapa_residencial'],
      fecha_inicio_ventas: answers['fecha_inicio_ventas'],
      fecha_inicio_construccion: answers['fecha_inicio_construccion'],
      fecha_fin_construccion: answers['fecha_fin_construccion'],
      fecha_entrega_construccion: answers['fecha_entrega_construccion'],
      es_estado: answers['es_estado'],
      fa_fase: answers['fa_fase'],
      entidad_credito_constructor: answers['entidad_credito_constructor'],
      entidad_fiduciaria: answers['entidad_fiduciaria'],
      condicion_entrega: answers['condicion_entrega'],
      observacion_etapa: answers['observacion_etapa']
    };

    try {
      const response = await fetch(urlCreateStage, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      //console.log("Estos son los datos editados de la etapa", answers);
      console.log('Estos son los datos editados de la etapa', JSON.stringify(answers));
      if (response.ok) {
        //console.log("Datos de la etapa actualizados correctamente");
      } else {
        console.error('Error al enviar la solicitud de actualizacion de etapa');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud actualizacion de etapa:', error);
    }
  };

  const toggleTableVisibility1 = () => {
    setTableVisible1(!isTableVisible1);
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

  const eliminarTipo = index => {
    const nuevosTipos = [...tiposProyectoArray];
    nuevosTipos.splice(index, 1);
    setTiposProyectoArray(nuevosTipos);
  };

  const validarCorreo = correo => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(correo);
  };

  const handleModalSubmit = () => {
    const requestBody = {
      // tipo: id_tipo,
      dotacion: dotacion,
      unidades: unidades
    };
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

  const handleInputChangeTipo = (e, index) => {
    const { name, value } = e.target;
    const newData = [...tiposProyectoArray];
    newData[index][name] = value;
    //console.log(tiposProyectoArray);

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

  const handleTipoViviendaChange = e => {
    setTipoVivienda(e.target.value);
    // setResidencial(e.target.value === "1"); // Actualiza el estado residencial si el valor es "1" (Residencial)
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

  const handleSaveData = () => {
    const data = ['Constructora', 'Vendedora', 'Gerencia'].map((key, index) => {
      return {
        Compañia: index,
        nombre: answers[`${key}nombre`],
        nit: answers[`${key}nit`],
        direccion: answers[`${key}direccion`],
        telefono: answers[`${key}telefono`]
      };
    });
    //console.log(data);
    // const constructoraData = {
    //   Compañía: "0",
    //   nit: answers.constructoraNIT,
    //   direccion: answers.constructoraDireccion,
    //   nombre: answers.constructoraNombre,
    //   telefono: answers.constructoraTelefono,
    //   // correo: answers.constructoraCorreo,
    // };
  };
  const handleNumericInput = e => {
    const inputValue = e.target.value;
    // Filtrar solo números
    const filteredValue = inputValue.replace(/[^0-9]/g, '');

    e.target.value = filteredValue;
  };

  return (
    <div className='form-container'>
      <div className='form-group'>
        <label>Pregunta 1:</label>
        <input type='text' value={answers.nombre} onChange={e => handleAnswerChange('nombre', e.target.value)} />
      </div>
      <div className='form-group'>
        <label>
          Pregunta 2: ¿Cuál es la cantidad de soluciones (# casas, apartamentos, locales, oficinas, etc) inmobiliarias para esta etapa?
        </label>
        <input type='number' value={answers.numero_unidades} onChange={e => handleAnswerChange('numero_unidades', e.target.value)} />
      </div>
      <div classname='form-group'>
        <label>Pregunta 3: ¿Cuál es el destino, fin o propósito de esta etapa?</label>
        <input type='text' value={answers.destino_etapa} onChange={e => handleAnswerChange('destino_etapa', e.target.value)} />
      </div>
      <div classname='form-group'>
        <label>Pregunta 4: ¿Cuál es el uso general de la etapa?</label>
        <input type='text' value={answers.uso} onChange={e => handleAnswerChange('uso', e.target.value)} />
      </div>
      <div classname='form-group'>
        <label>Pregunta 5: ¿Cuál es el área vendible de esta etapa? _______ Mts2</label>
        <input
          type='text'
          value={answers.apto_piso_area_vendible}
          onChange={e => handleAnswerChange('apto_piso_area_vendible', e.target.value)}
        />
      </div>
      <div classname='form-group'>
        <label> Pregunta 6: ¿Cuál es el área construida de esta etapa? ______ Mts2</label>
        <input
          type='text'
          value={answers.pisos_por_bloque_area_construida}
          readOnly
          onChange={e => handleAnswerChange('pisos_por_bloque_area_construida', e.target.value)}
        />
      </div>
      <div classname='form-group'>
        <label> Pregunta 7: ¿En qué fecha se inició preventa o en qué fecha salió al mercado el proyecto?</label>
        <input
          type='text'
          value={answers.fecha_inicio_ventas}
          onChange={e => handleAnswerChange('fecha_inicio_ventas', e.target.value)}
        />
      </div>
      <div classname='form-group'>
        <label>
          Pregunta 8: ¿En qué fecha se inicia la de construcción de esta etapa (limpieza del terreno, cerramiento de lote, movimiento
          de tierras)?
        </label>
        <input
          type='text'
          value={answers.fecha_inicio_construccion}
          onChange={e => handleAnswerChange('fecha_inicio_construccion', e.target.value)}
        />
      </div>
      <div classname='form-group'>
        <label>Pregunta 9: ¿En qué fecha finaliza el proceso constructivo de esta etapa (Terminados)?</label>
        <input
          type='text'
          value={answers.fecha_fin_construccion}
          onChange={e => handleAnswerChange('fecha_fin_construccion', e.target.value)}
        />
      </div>
      <div classname='form-group'>
        <label>
          Pregunta 10: ¿En qué fecha se entrega la última unidad de la etapa, sin importar si el resto de la obra esta entregado o si
          la construcción se terminó con mucha anterioridad?
        </label>
        <input
          type='text'
          value={answers.fecha_entrega_construccion}
          onChange={e => handleAnswerChange('fecha_entrega_construccion', e.target.value)}
        />
      </div>
      <div classname='form-group'>
        <label>
          Pregunta 11: El estado constructivo indica en qué situación o proceso de construcción está la obra. De acuerdo a esta
          definición anterior y al siguiente listado de opciones, ¿En que estado constructivo se encuentra etapa en mes de ______?
        </label>
        <input type='text' value={answers.es_estado} onChange={e => handleAnswerChange('es_estado', e.target.value)} />
      </div>
      <div classname='form-group'>
        <label>
          Pregunta 12: Las fases corresponden a cada una de las diversas apariencias en las que se encuentra el proceso de
          construcción. De acuerdo a las siguientes definiciones, ¿En que fase constructivo se encuentra etapa en mes de ______?
        </label>
        <input type='text' value={answers.fa_fase} onChange={e => handleAnswerChange('fa_fase', e.target.value)} />
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
            <strong>3. Gerencia:</strong> Razón social o nombre de la empresa que gerencia el proyecto (puede o no ser la misma empresa
            que construye o vende).
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
              </tr>
            </thead>
            <tbody>
              {COMPANIES.map(({ typeCompany, typeCompanyId }, index) => (
                <tr>
                  <td>
                    <strong>{typeCompany}</strong>
                  </td>
                  {[
                    { type: 'text', key: 'nombre' },
                    { type: 'number', key: 'nit' },
                    { type: 'text', key: 'direccion' },
                    { type: 'text', key: 'telefono' }
                  ].map(({ type, key }) => {
                    const findedCompany = allStagesCompanies.find(
                      item => item.tipo_compañia === typeCompanyId && item.etapa === etapa.id
                    );
                    const value = findedCompany?.[key] || '';

                    return (
                      <td>
                        <input
                          type={type}
                          value={value}
                          onChange={e =>
                            setAllStageCompanies(prev => {
                              const companyToUpdateIndex = allStagesCompanies.findIndex(
                                item => +item.tipo_compañia === typeCompanyId && item.etapa === etapa.id
                              );
                              const companyToUpdate = {
                                ...allStagesCompanies[companyToUpdateIndex]
                              };
                              companyToUpdate[key] = e.target.value;
                              const newCompanies = [...allStagesCompanies];
                              newCompanies[companyToUpdateIndex] = companyToUpdate;
                              return newCompanies;
                            })
                          }
                          style={{
                            fontSize: '16px',
                            padding: '10px',
                            width: '130%',
                            marginLeft: '-20px'
                          }}
                          min='0'
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
              <div style={{ color: 'black', marginTop: '10px' }}>
                <FaCheck style={{ marginRight: '5px' }} />
                Valide todos los datos antes de guardarlos
              </div>
            </tbody>

            {/* <Button
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
            </Button> */}
            {showSuccessMessage && (
              <div style={{ color: 'green', marginTop: '10px' }}>
                <FaCheck style={{ marginRight: '5px' }} />
                Datos guardados correctamente
              </div>
            )}
          </Table>
        </div>
      </div>
      <label>Pregunta 14. La financiación de la construcción de esta etapa fue con:</label>
      <select
        value={answers.entidad_credito_constructor}
        onChange={e => handleAnswerChange('entidad_credito_constructor', e.target.value)}>
        <option value=''>Seleccione una opción</option>
        <option value='Recursos Propios'>Recursos Propios</option>
        <option value='Crédito con una entidad'>Crédito con una entidad</option>
      </select>

      <label>
        Pregunta 15. ¿Cuál es la entidad con quien la construcción maneja la fiducia antes de cumplir el punto de equilibrio del
        proyecto?
      </label>
      <input type='text' value={answers.entidad_fiduciaria} onChange={e => handleAnswerChange('entidad_fiduciaria', e.target.value)} />
      <label>Pregunta 16. ¿En qué condición se hará entrega de esta etapa?</label>
      <input type='text' value={answers.condicion_entrega} onChange={e => handleAnswerChange('condicion_entrega', e.target.value)} />
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
                {[
                  'NOMBRE',
                  'TIPO VIVIENDA',
                  'USO',
                  '# UNID',
                  'ÁREA',
                  'ALCOBAS',
                  'BAÑOS',
                  'DOTACIÓN.3',
                  'DOTACIÓN.4',
                  'DOTACIÓN.5',
                  'VENTA',
                  'RENUNCIAS',
                  'SALDO',
                  'PRECIO',
                  'PRECIO M2',
                  'NOVEDAD',
                  'ACCIONES'
                ].map(label => (
                  <th>
                    <strong>{label}</strong>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tiposProyectoArray.map((item, index) => (
                <tr key={index}>
                  {[{ key: '' }].map(({ key }) => (
                    <td>
                      <Form.Control
                        type='text'
                        name={key}
                        value={'XXX'}
                        onChange={event => {}}
                        style={{
                          fontSize: '16px',
                          padding: '10px',
                          width: '155%',
                          marginLeft: '-18px'
                        }}
                      />
                    </td>
                  ))}

                  {/* <td>
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
                      value={tipoVivienda}
                      onChange={handleTipoViviendaChange}
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
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
          <Button onClick={agregarFilaTipo}>
            <FaPlus style={{ marginRight: '5px', marginBottom: '5px' }} /> Agregar Nuevo Tipo
          </Button>
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
                      {exteriorFinishDataStage.map(row => (
                        <tr key={row.id}>
                          <td>{row.id}</td>
                          <td>{row.nombre}</td>
                          <td>
                            {Object.entries(row.residencial).map(([optionId, optionLabel]) => (
                              <div key={optionId}>
                                <Form.Check
                                  type='checkbox'
                                  label={optionLabel}
                                  checked={answers?.q18?.[row.id]?.includes(optionId.toString()) || false}
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
                                  checked={answers?.q18?.[row.id]?.includes(optionId.toString()) || false}
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
      </div>
      <label>Observación:</label>
      <textarea value={answers.observacion_etapa} onChange={e => handleAnswerChange('observacion_etapa', e.target.value)} />
      <div style={{ display: 'flex' }}>
        <button style={{ marginRight: '5px', flex: 1 }} onClick={handleSubmit}>
          Enviar
        </button>
      </div>
    </div>
  );
};
export default ProjectStageFormEdit;
