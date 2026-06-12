import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/common/BackButton.jsx';
import { createTurno } from '@/services/turnosService.js';
import s from './turnoNuevo.module.css';
import { searchClients } from '@/services/users.service.js';


const OFICIOS = ['electricista', 'jardineria', 'pintor', 'plomero', 'gasista', 'herrero'];

export default function TurnoNuevo() {
  const navigate = useNavigate();

  const [oficio, setOficio] = useState('');
  const [clientNumber, setClientNumber] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [clientQuery, setClientQuery] = useState('');
  const [clientResults, setClientResults] = useState([]);
  const [clientSelected, setClientSelected] = useState(null);



  const timeOptions = useMemo(() => {
    const opts = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        opts.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
      }
    }
    return opts;
  }, []);

  const onSave = async (e) => {
  e.preventDefault();
  setError('');

  if (!oficio || !clientNumber || !fecha || !hora) {
    setError('Completá todos los campos obligatorios');
    return;
  }

  try {
    setLoading(true);

    await createTurno({
      clientNumber: Number(clientNumber),
      oficio,
      fecha,
      hora,
    });

    // 🔥 RESET DE CAMPOS
    setOficio('');
    setClientNumber('');
    setFecha('');
    setHora('');

  } catch (err) {
    setError(err.message || 'Error al crear el turno');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (clientQuery.length < 1) {
      setClientResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await searchClients(clientQuery);
        setClientResults(res);
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [clientQuery]);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest(`.${s.field}`)) {
      setClientResults([]);
    }
  };

  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);


  return (
    <div className={s.card}>

      {/* HEADER */}
      <div className={s.header}>
        <h2 className={s.title}>Nuevo turno</h2>
        <div className={s.back}>
          <BackButton to="/service-home" />
        </div>
      </div>

      <form onSubmit={onSave}>

        {/* GRID */}
        <div className={s.grid}>

          {/* OFICIO */}
          <div className={s.field} style={{ gridArea: 'oficio' }}>
            <label>Oficio *</label>
            <select
              className={s.select}
              value={oficio}
              onChange={e => setOficio(e.target.value)}
            >
              <option value="">Seleccione oficio</option>
              {OFICIOS.map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          {/* CLIENTE */}
          <div className={`${s.field} ${s.relative}`} style={{ gridArea: 'cliente' }}>
            <label>N° de cliente *</label>
            <input className={s.buscador} 
              type="search"
              value={clientQuery}
              onChange={e => {
                setClientQuery(e.target.value);
                setClientSelected(null);
              }}
              placeholder="Buscar cliente por número"
            />

            {clientResults.length > 0 && (
              <ul className={s.dropdown}>
                {clientResults.map(c => (
                  <li
                    key={c.clientNumber}
                    onClick={() => {
                      setClientSelected(c);
                      setClientNumber(c.clientNumber);
                      setClientQuery(String(c.clientNumber));
                      setClientResults([]);
                    }}
                  >
                    cliente: {c.clientNumber} – {c.nombre}
                  </li>
                ))}
              </ul>
            )}

          </div>

          {/* FECHA + HORA */}
          <div className={s.field} style={{ gridArea: 'fecha' }}>
            <label>Turno *</label>
            <div style={{ display: 'flex', gap: 12 }}>
              <input
                className={s.input}
                type="date"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
              />
              <select
                className={s.select}
                value={hora}
                onChange={e => setHora(e.target.value)}
              >
                <option value="">--</option>
                {timeOptions.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* ERROR */}
        {error && <p className={s.error}>{error}</p>}

        {/* ACTIONS */}
        <div className={s.actions}>
          <button type="submit" className={s.primary} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar turno'}
          </button>

          <button
            type="button"
            className={s.link}
            onClick={() => navigate('/service-home/turnos')}
          >
            Ver turnos
          </button>
        </div>

      </form>
    </div>
  );
}
