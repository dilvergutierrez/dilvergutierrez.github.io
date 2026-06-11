/* SGT - Data Layer (localStorage mock DB) */
const DB = {
  _get(key) { const d = localStorage.getItem('sgt_' + key); return d ? JSON.parse(d) : null; },
  _set(key, val) { localStorage.setItem('sgt_' + key, JSON.stringify(val)); },

  /* ── Seed demo data ── */
  seed() {
    if (this._get('seeded')) return;

    /* Plans */
    this._set('planes', [
      { id: 'free', nombre: 'Aficionado', precio_mensual: 0, precio_anual: 0, max_galpones: 0, max_aves: 0, max_delegados: 0 },
      { id: 'standard', nombre: 'Criador Estándar', precio_mensual: 29, precio_anual: 290, max_galpones: 1, max_aves: 100, max_delegados: 1 },
      { id: 'premium', nombre: 'Galpón Premium', precio_mensual: 79, precio_anual: 790, max_galpones: 5, max_aves: 9999, max_delegados: 99 }
    ]);

    /* Demo user */
    const userId = 'u-001';
    this._set('users', [
      { id: userId, nombre: 'Carlos Mendoza', telefono: '987654321', email: 'carlos@demo.com', plan_id: 'premium', fecha_registro: '2025-06-01', vista_preferida: 'PROPIETARIO' }
    ]);

    /* Galpón */
    const galponId = 'g-001';
    this._set('galpones', [
      { id: galponId, nombre: 'Galpón El Campeón', ubicacion: 'Chiclayo, Lambayeque', foto_url: '', titular_id: userId }
    ]);

    /* Ejemplares */
    this._set('ejemplares', [
      { placa_ala:'GC-001', galpon_id:galponId, nombre:'Trueno', fecha_nacimiento:'2024-03-15', sexo:'Macho', rol:'Pelea', linea_genetica:'Kelso', origen:'Comprado', criadero_externo:'Hacienda Norte', padre_placa:'EXT-P1', madre_placa:'EXT-M1', visibilidad:'Publico', fenotipo_json:{plumaje:'Giro',ojos:'Perla',patas:'Amarillas',cresta:'Pea'} },
      { placa_ala:'GC-002', galpon_id:galponId, nombre:'Reina', fecha_nacimiento:'2024-01-20', sexo:'Hembra', rol:'Madrilla', linea_genetica:'Hatch', origen:'Comprado', criadero_externo:'Criadero Sol', padre_placa:'EXT-P2', madre_placa:'EXT-M2', visibilidad:'Privado', fenotipo_json:{plumaje:'Cenizo',ojos:'Rojo',patas:'Verdes',cresta:'Rosa'} },
      { placa_ala:'GC-003', galpon_id:galponId, nombre:'Rayo', fecha_nacimiento:'2025-01-10', sexo:'Macho', rol:'Pollo', linea_genetica:'Kelso-Hatch', origen:'Nacido', criadero_externo:'', padre_placa:'GC-001', madre_placa:'GC-002', visibilidad:'Publico', fenotipo_json:{plumaje:'Colorado',ojos:'Perla',patas:'Amarillas',cresta:'Pea'} },
      { placa_ala:'GC-004', galpon_id:galponId, nombre:'Centella', fecha_nacimiento:'2025-01-10', sexo:'Hembra', rol:'Pollo', linea_genetica:'Kelso-Hatch', origen:'Nacido', criadero_externo:'', padre_placa:'GC-001', madre_placa:'GC-002', visibilidad:'Privado', fenotipo_json:{plumaje:'Jabado',ojos:'Rojo',patas:'Verdes',cresta:'Rosa'} },
      { placa_ala:'GC-005', galpon_id:galponId, nombre:'Tempestad', fecha_nacimiento:'2024-06-01', sexo:'Macho', rol:'Padrillo', linea_genetica:'Sweater', origen:'Comprado', criadero_externo:'Galpón Sur', padre_placa:'EXT-P3', madre_placa:'EXT-M3', visibilidad:'Publico', fenotipo_json:{plumaje:'Blanco',ojos:'Blanco',patas:'Blancas',cresta:'Pea'} },
      { placa_ala:'GC-006', galpon_id:galponId, nombre:'Tormenta', fecha_nacimiento:'2025-06-01', sexo:'Pendiente', rol:'Pollo', linea_genetica:'Sweater-Hatch', origen:'Nacido', criadero_externo:'', padre_placa:'GC-005', madre_placa:'GC-002', visibilidad:'Privado', fenotipo_json:{plumaje:'Giro',ojos:'Perla',patas:'Amarillas',cresta:'Pea'} }
    ]);

    /* Pesos */
    this._set('pesos', [
      { id:'w1', placa_ala:'GC-001', edad_meses:6, peso_gramos:1200, fecha_pesaje:'2024-09-15' },
      { id:'w2', placa_ala:'GC-001', edad_meses:9, peso_gramos:1450, fecha_pesaje:'2024-12-15' },
      { id:'w3', placa_ala:'GC-001', edad_meses:12, peso_gramos:1680, fecha_pesaje:'2025-03-15' },
      { id:'w4', placa_ala:'GC-003', edad_meses:6, peso_gramos:1100, fecha_pesaje:'2025-07-10' }
    ]);

    /* Camadas */
    this._set('camadas', [
      { id:'c-001', galpon_id:galponId, padrillo_placa:'GC-001', madrilla_placa:'GC-002', fecha_incubacion:'2024-12-20', coeficiente_wright:0.0, huevos_totales:8, notas:'Primera nidada del cruce Kelso x Hatch' },
      { id:'c-002', galpon_id:galponId, padrillo_placa:'GC-005', madrilla_placa:'GC-002', fecha_incubacion:'2025-05-10', coeficiente_wright:0.0, huevos_totales:6, notas:'Cruce Sweater x Hatch' }
    ]);

    /* Historial Clasificación */
    this._set('historial_clasificacion', [
      { id:'h1', placa_ala:'GC-005', fecha:'2025-03-01', rol_anterior:'Pelea', rol_nuevo:'Padrillo', motivo:'Excelente línea genética, se retira de competencia', usuario_id:userId }
    ]);

    /* Torneo demo */
    this._set('campeonatos', [
      { id:'t-001', nombre:'Copa Lambayeque 2025', pozo_premio:15000, estado:'Activo' }
    ]);
    this._set('fechas_evento', [
      { id:'f-001', campeonato_id:'t-001', nombre:'Inauguración', fecha_calendario:'2025-07-20', ubicacion:'Coliseo El Gallo de Oro, Chiclayo', cupo_size:8, habilitar_salto:false, salto_destino_id:null },
      { id:'f-002', campeonato_id:'t-001', nombre:'Semifinal', fecha_calendario:'2025-08-10', ubicacion:'Coliseo El Gallo de Oro, Chiclayo', cupo_size:4, habilitar_salto:true, salto_destino_id:'f-003' },
      { id:'f-003', campeonato_id:'t-001', nombre:'Gran Final', fecha_calendario:'2025-09-01', ubicacion:'Coliseo El Gallo de Oro, Chiclayo', cupo_size:4, habilitar_salto:false, salto_destino_id:null }
    ]);
    this._set('participantes', [
      { id:'p-001', fecha_id:'f-001', nombre_galpon:'Galpón El Campeón', es_comodin:false },
      { id:'p-002', fecha_id:'f-001', nombre_galpon:'Galpón Los Bravos', es_comodin:false },
      { id:'p-003', fecha_id:'f-001', nombre_galpon:'Galpón El Dorado', es_comodin:false },
      { id:'p-004', fecha_id:'f-001', nombre_galpon:'Galpón La Estrella', es_comodin:false },
      { id:'p-005', fecha_id:'f-001', nombre_galpon:'Galpón del Norte', es_comodin:false },
      { id:'p-006', fecha_id:'f-001', nombre_galpon:'Galpón San Martín', es_comodin:false },
      { id:'p-007', fecha_id:'f-001', nombre_galpon:'Galpón Trujillo', es_comodin:false },
      { id:'p-008', fecha_id:'f-001', nombre_galpon:'Galpón Piura', es_comodin:false }
    ]);
    this._set('llaves', [
      { id:'l-001', fecha_id:'f-001', ronda:1, participante_a_id:'p-001', participante_b_id:'p-002', gallo_a_placa:null, gallo_b_placa:null, ganador_id:null, estado:'Pendiente', duracion_segundos:0 },
      { id:'l-002', fecha_id:'f-001', ronda:1, participante_a_id:'p-003', participante_b_id:'p-004', gallo_a_placa:null, gallo_b_placa:null, ganador_id:null, estado:'Pendiente', duracion_segundos:0 },
      { id:'l-003', fecha_id:'f-001', ronda:1, participante_a_id:'p-005', participante_b_id:'p-006', gallo_a_placa:null, gallo_b_placa:null, ganador_id:null, estado:'Pendiente', duracion_segundos:0 },
      { id:'l-004', fecha_id:'f-001', ronda:1, participante_a_id:'p-007', participante_b_id:'p-008', gallo_a_placa:null, gallo_b_placa:null, ganador_id:null, estado:'Pendiente', duracion_segundos:0 }
    ]);

    /* Delegados */
    this._set('delegados', [
      { id:'d-001', galpon_id:galponId, usuario_id:'u-002', nombre:'Juan Pérez', permisos:{ can_create_birds:true, can_edit_fenotipo:false, can_add_weights:true, can_manage_tournaments:false, can_view_finances:false } }
    ]);

    /* Suscripciones */
    this._set('suscripciones', [
      { id:'s-001', usuario_id:userId, plan_id:'premium', estado:'Activa', fecha_inicio:'2025-06-01', fecha_fin:'2026-06-01', token_pago:'tok_demo_12345' }
    ]);

    /* Admin */
    this._set('admins', [
      { id:'a-001', email:'admin@sgt.pe', nombre:'Admin SGT', rol:'CEO', permisos:{ finanzas:true, soporte:true, ventas:true } }
    ]);

    this._set('seeded', true);
  },

  /* ── CRUD helpers ── */
  getAll(key) { return this._get(key) || []; },
  getById(key, id, idField='id') { return this.getAll(key).find(i => i[idField] === id); },
  add(key, item) { const arr = this.getAll(key); arr.push(item); this._set(key, arr); },
  update(key, id, data, idField='id') {
    const arr = this.getAll(key).map(i => i[idField] === id ? { ...i, ...data } : i);
    this._set(key, arr);
  },
  remove(key, id, idField='id') {
    this._set(key, this.getAll(key).filter(i => i[idField] !== id));
  },
  filter(key, fn) { return this.getAll(key).filter(fn); }
};

/* Auto-seed on load */
DB.seed();
