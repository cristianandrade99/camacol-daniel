const COMPANIES = [
  { typeCompany: 'Constructora', typeCompanyId: 0 },
  { typeCompany: 'Vendedora', typeCompanyId: 1 },
  { typeCompany: 'Gerencia', typeCompanyId: 2 }
];

const zonasBogota = [
  { nombre: '01 - MARANTA', valor: 1 },
  { nombre: '02 - MAZUREN', valor: 2 },
  { nombre: '03 - BOSQUE DE PINOS', valor: 3 },
  { nombre: '04 - CEDRO GOLF', valor: 4 },
  { nombre: '05 - CEDRITOS', valor: 5 },
  { nombre: '06 - ATABANZA', valor: 6 },
  { nombre: '07 - LA CALLEJA', valor: 7 },
  { nombre: '08 - BOSQUE MEDINA', valor: 8 },
  { nombre: '09 - LA CAROLINA', valor: 9 },
  { nombre: '10 - MULTICENTRO', valor: 10 },
  { nombre: "11: '11 - SANTA ANA", valor: 11 },
  { nombre: '12 - CHICO', valor: 12 },
  { nombre: '13 - ROSALES', valor: 13 },
  { nombre: '14 - CHAPINERO', valor: 14 },
  { nombre: '15 - TEUSAQUILLO', valor: 15 },
  {
    nombre: '16 - CHAPINERO ALTO',
    valor: 16
  },
  { nombre: '17 - CENTRO', valor: 17 },
  { nombre: '18 - SAN FACON', valor: 18 },
  { nombre: '19 - 20 DE JULIO', valor: 19 },
  { nombre: '20 - QUIROGA', valor: 20 },
  {
    nombre: '21 - VILLA DE LOS ALPES',
    valor: 21
  },
  { nombre: '22 - MARRUECOS', valor: 22 },
  { nombre: '23 - TUNJUELITO', valor: 23 },
  { nombre: '24 - AUTOPISTA SUR', valor: 24 },
  { nombre: '25 - AMERICAS', valor: 25 },
  { nombre: '26 - KENNEDY', valor: 26 },
  {
    nombre: '27 - CENTRAL DE ABASTOS',
    valor: 27
  },
  {
    nombre: '28 - PRIMERO DE MAYO',
    valor: 28
  },
  { nombre: '29 - CUNDINAMARCA', valor: 29 },
  { nombre: '30 - PABLO VI', valor: 30 },
  { nombre: '31 - MODELIA', valor: 31 },
  {
    nombre: '32 - MINUTO DE DIOS',
    valor: 32
  },
  { nombre: '33 - METROPOLIS', valor: 33 },
  { nombre: '34 - BOCHICA', valor: 34 },
  { nombre: '35 - LOS ANDES', valor: 35 },
  { nombre: '36 - CORDOBA', valor: 36 },
  {
    nombre: '37 - COLINA CAMPESTRE',
    valor: 37
  },
  { nombre: '38 - NIZA NORTE', valor: 38 },
  {
    nombre: '39 - COLINAS DE SUBA',
    valor: 39
  },
  { nombre: '40 - LA CAMPIÑA', valor: 40 },
  { nombre: '41 - TIBABUYES', valor: 41 },
  { nombre: '42 - FONTIBON', valor: 42 },
  { nombre: '43 - BOSA', valor: 43 }
];

const zonasCundinamarca = [
  { nombre: '116 - ANAPOIMA', value: 116 },
  { nombre: '68 APULO', value: 68 },
  // Otras zonas para diferentes ciudades
  // ...
  { nombre: '59 - MOSQUERA', value: 59 },
  // ...
  { nombre: '56 - LA CALERA', value: 56 },
  // ...
  { nombre: '61 - FACATATIVA', value: 61 },
  // ...
  { nombre: '44 - SOACHA', value: 44 },
  // ...
  { nombre: '113 - SOPO', value: 113 },
  // ...
  { nombre: '48 - TENJO', value: 48 },
  // ...
  { nombre: '115 - TOCANCIPÁ', value: 115 },
  // ...
  { nombre: '120 - VILLETA', value: 120 },
  // ...
  { nombre: '53 - ZIPAQUIRA', value: 53 }
];

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

const certificadosSostenibles = [
  { 0: 'No tiene' },
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

const cundinamarcaDepartments = [
  { key: 116, value: 116, label: 'AGUA DE DIOS' },
  { key: 1, value: 1, label: 'ALBÁN' },
  { key: 2, value: 2, label: 'ANAPOIMA' },
  { key: 3, value: 3, label: 'ANOLAIMA' },
  { key: 4, value: 4, label: 'APULO' },
  { key: 5, value: 5, label: 'ARBELÁEZ' },
  { key: 6, value: 6, label: 'BELTRÁN' },
  { key: 7, value: 7, label: 'BITUIMA' },
  { key: 8, value: 8, label: 'BOJACÁ' },
  { key: 9, value: 9, label: 'CABRERA' },
  { key: 10, value: 10, label: 'CACHIPAY' },
  { key: 11, value: 11, label: 'CAJICÁ' },
  { key: 12, value: 12, label: 'CAPARRAPÍ' },
  { key: 13, value: 13, label: 'CÁQUEZA' },
  { key: 14, value: 14, label: 'CÁQUEZA' },
  { key: 15, value: 15, label: 'CHAGUANÍ' },
  { key: 16, value: 16, label: 'CHÍA' },
  { key: 17, value: 17, label: 'CHIPAQUE' },
  { key: 18, value: 18, label: 'CHOACHÍ' },
  { key: 19, value: 19, label: 'CHOCONTÁ' },
  { key: 20, value: 20, label: 'COGUA' },
  { key: 21, value: 21, label: 'COTA' },
  { key: 22, value: 22, label: 'CUCUNUBÁ' },
  { key: 23, value: 23, label: 'EL COLEGIO' },
  { key: 24, value: 24, label: 'EL PEÑÓN' },
  { key: 25, value: 25, label: 'EL ROSAL' },
  { key: 26, value: 26, label: 'FACATATIVÁ' },
  { key: 27, value: 27, label: 'FÓMEQUE' },
  { key: 28, value: 28, label: 'FOSCA' },
  { key: 29, value: 29, label: 'FUNZA' },
  { key: 30, value: 30, label: 'FÚQUENE' },
  { key: 31, value: 31, label: 'FUSAGASUGÁ' },
  { key: 32, value: 32, label: 'GACHALÁ' },
  { key: 33, value: 33, label: 'GACHANCIPÁ' },
  { key: 34, value: 34, label: 'GACHETÁ' },
  { key: 35, value: 35, label: 'GAMA' },
  { key: 36, value: 36, label: 'GIRARDOT' },
  { key: 37, value: 37, label: 'GRANADA' },
  { key: 38, value: 38, label: 'GUACHETÁ' },
  { key: 39, value: 39, label: 'GUADUAS' },
  { key: 40, value: 40, label: 'GUASCA' },
  { key: 41, value: 41, label: 'GUATAQUÍ' },
  { key: 42, value: 42, label: 'GUATAVITA' },
  { key: 43, value: 43, label: 'GUAYABAL DE SÍQUIMA' },
  { key: 44, value: 44, label: 'GUAYABETAL' },
  { key: 45, value: 45, label: 'GUTIÉRREZ' },
  { key: 46, value: 46, label: 'JERUSALÉN' },
  { key: 47, value: 47, label: 'JUNÍN' },
  { key: 48, value: 48, label: 'LA CALERA' },
  { key: 49, value: 49, label: 'LA MESA' },
  { key: 50, value: 50, label: 'LA PALMA' },
  { key: 51, value: 51, label: 'LA PEÑA' },
  { key: 52, value: 52, label: 'LA VEGA' },
  { key: 53, value: 53, label: 'LENGUAZAQUE' },
  { key: 54, value: 54, label: 'MACHETÁ' },
  { key: 55, value: 55, label: 'MADRID' },
  { key: 56, value: 56, label: 'MANTA' },
  { key: 57, value: 57, label: 'MEDINA' },
  { key: 58, value: 58, label: 'MOSQUERA' },
  { key: 59, value: 59, label: 'NARIÑO' },
  { key: 60, value: 60, label: 'NEMOCÓN' },
  { key: 61, value: 61, label: 'NILO' },
  { key: 62, value: 62, label: 'NIMAIMA' },
  { key: 63, value: 63, label: 'NOCAIMA' },
  { key: 64, value: 64, label: 'PACHO' },
  { key: 65, value: 65, label: 'PAIME' },
  { key: 66, value: 66, label: 'PANDI' },
  { key: 67, value: 67, label: 'PARATEBUENO' },
  { key: 68, value: 68, label: 'PASCA' },
  { key: 69, value: 69, label: 'PUERTO SALGAR' },
  { key: 70, value: 70, label: 'PULÍ' },
  { key: 71, value: 71, label: 'QUEBRADANEGRA' },
  { key: 72, value: 72, label: 'QUETAME' },
  { key: 73, value: 73, label: 'QUIPILE' },
  { key: 74, value: 74, label: 'RICAURTE' },
  { key: 75, value: 75, label: 'SAN ANTONIO DEL TEQUENDAMA' },
  { key: 76, value: 76, label: 'SAN BERNARDO' },
  { key: 77, value: 77, label: 'SAN CAYETANO' },
  { key: 78, value: 78, label: 'SAN FRANCISCO' },
  { key: 79, value: 79, label: 'SAN JUAN DE RIOSECO' },
  { key: 80, value: 80, label: 'SASAIMA' },
  { key: 81, value: 81, label: 'SESQUILÉ' },
  { key: 82, value: 82, label: 'SIBATÉ' },
  { key: 83, value: 83, label: 'SILVANIA' },
  { key: 84, value: 84, label: 'SIMIJACA' },
  { key: 85, value: 85, label: 'SOACHA' },
  { key: 86, value: 86, label: 'SOPÓ' },
  { key: 87, value: 87, label: 'SUBACHOQUE' },
  { key: 88, value: 88, label: 'SUESCA' },
  { key: 89, value: 89, label: 'SUPATÁ' },
  { key: 90, value: 90, label: 'SUSA' },
  { key: 91, value: 91, label: 'SUTATAUSA' },
  { key: 92, value: 92, label: 'TABIO' },
  { key: 93, value: 93, label: 'TAUSA' },
  { key: 94, value: 94, label: 'TENA' },
  { key: 95, value: 95, label: 'TENJO' },
  { key: 96, value: 96, label: 'TIBACUY' },
  { key: 97, value: 97, label: 'TIBIRITA' },
  { key: 98, value: 98, label: 'TOCAIMA' },
  { key: 99, value: 99, label: 'TOCANCIPÁ' },
  { key: 100, value: 100, label: 'TOPAIPÍ' },
  { key: 101, value: 101, label: 'UBALÁ' },
  { key: 102, value: 102, label: 'UBAQUE' },
  { key: 103, value: 103, label: 'UNE' },
  { key: 104, value: 104, label: 'ÚTICA' },
  { key: 105, value: 105, label: 'VENECIA' },
  { key: 106, value: 106, label: 'VERGARA' },
  { key: 107, value: 107, label: 'VIANÍ' },
  { key: 108, value: 108, label: 'VILLA DE SAN DIEGO DE UBATÉ' },
  { key: 109, value: 109, label: 'VILLAGÓMEZ' },
  { key: 110, value: 110, label: 'VILLAPINZÓN' },
  { key: 111, value: 111, label: 'VILLETA' },
  { key: 112, value: 112, label: 'VIOTÁ' },
  { key: 113, value: 113, label: 'YACOPÍ' },
  { key: 114, value: 114, label: 'ZIPACÓN' },
  { key: 115, value: 115, label: 'ZIPAQUIRÁ' }
];

export {
  COMPANIES,
  zonasBogota,
  zonasCundinamarca,
  bogotaLocalidades,
  certificadosSostenibles,
  caracteristicasProyecto,
  exteriorFinishData,
  cundinamarcaDepartments
};
