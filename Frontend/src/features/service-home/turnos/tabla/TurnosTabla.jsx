import { useEffect, useState } from 'react';
import Table from '@/components/common/Table.jsx';
import s from './TurnosTabla.module.css';
import { turnosApi } from '@/api/turnosApi.js';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Check, X, Pencil, Printer, Search } from "lucide-react";
import BackButton from '@/components/common/BackButton';


/* ============================= */
/* Helpers */
/* ============================= */

function formatDia(value) {
  if (!value) return '-';

  const d = new Date(
    String(value).length === 10 ? `${value}T00:00:00` : value
  );

  if (Number.isNaN(d.getTime())) return '-';

  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(d);
}

function toRow(turno) {
  return {
    key: turno._id,
    turnoNumber: turno.turnoNumber,
    oficio: turno.oficio,
    dia: turno.fecha,
    hora: turno.hora,
    cliente: turno.cliente
      ? `${turno.cliente.clientNumber} - ${turno.cliente.nombre}`
      : String(turno.clientNumber),
    status: turno.status
  };
}

/* ============================= */
/* Componente */
/* ============================= */

export default function TurnosTabla() {

  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [modal, setModal] = useState(null);

  const [filterOficio, setFilterOficio] = useState('');
  const [filterCliente, setFilterCliente] = useState('');
  const clearFilters = () => { setFilterOficio(''); setFilterCliente(''); };
  const [modalOpen, setModalOpen] = useState(false);
  const [turnoEditando, setTurnoEditando] = useState(null);
  const [actionModal, setActionModal] = useState(null);
  const [editFecha, setEditFecha] = useState('');
  const [editHora, setEditHora] = useState('');


  const [editData, setEditData] = useState({
    fecha: "",
    hora: ""
  });

  /* ============================= */
  /* Load turnos */
  /* ============================= */

  useEffect(() => {
    async function load() {
      const data = await turnosApi.list();
      setRows(Array.isArray(data) ? data.map(toRow) : []);
    }
    load();
  }, []);

  const refetchTurnos = async () => {
    const data = await turnosApi.list();
    setRows(Array.isArray(data) ? data.map(toRow) : []);
  };


  /* ============================= */
  /* Filtering */
  /* ============================= */

  const filteredRows = rows.filter(r => {
    const matchOficio = filterOficio
      ? r.oficio.toLowerCase().includes(filterOficio.toLowerCase())
      : true;

    const matchCliente = filterCliente
      ? r.cliente.toLowerCase().includes(filterCliente.toLowerCase())
      : true;

    return matchOficio && matchCliente;
  });

  /* ============================= */
  /* Selection */
  /* ============================= */

  const toggleSelect = (turnoNumber) => {
    setSelected(prev =>
      prev.includes(turnoNumber)
        ? prev.filter(n => n !== turnoNumber)
        : [...prev, turnoNumber]
    );
  };

  /* ============================= */
  /* Print */
  /* ============================= */
  const handleAction = async ({ type, turno }) => {
    try {
      if (type === "confirmar") {
        await turnosApi.confirmar(turno.turnoNumber);
      }

      if (type === "cancelar") {
        await turnosApi.cancelar(turno.turnoNumber);
      }

      closeActionModal();
      refetchTurnos();
    } catch (err) {
      console.error(err);
    }
  };



  const handlePrint = () => {
    const doc = new jsPDF();

    const rowsToPrint =
      selected.length > 0
        ? filteredRows.filter(r =>
          selected.includes(r.turnoNumber)
        )
        : filteredRows;

    autoTable(doc, {
      head: [['Oficio', 'Día', 'Hora', 'Cliente', 'Estado']],
      body: rowsToPrint.map(r => [
        r.oficio,
        formatDia(r.dia),
        r.hora,
        r.cliente,
        r.status
      ])
    });

    doc.save('turnos.pdf');
  };

  const handleSaveEdit = async () => {
    try {
      await turnosApi.update(turnoEditando.turnoNumber, editData);

      setModalOpen(false);
      refetchTurnos();
    } catch (err) {
      console.error(err);
    }
  };


  /* ============================= */
  /* Modal */
  /* ============================= */

  const openModal = (row) => {
    setTurnoEditando(row);
    setModalOpen(true);
  };

  const openActionModal = (type, turno) => {
    setActionModal({ type, turno });
  };

  const closeActionModal = () => {
    setActionModal(null);
  };
  const guardarModal = (row) => {
    setTurnoEditando(row);

    setEditData({
      fecha: formatForInput(row.dia),
      hora: row.hora
    });

    setModalOpen(true);
  };



  /* ============================= */
  /* Columns */
  /* ============================= */

  const columns = [
    {
      header: '',
      render: (_, row) => (
        <input
          type="checkbox"
          checked={selected.includes(row.turnoNumber)}
          onChange={() => toggleSelect(row.turnoNumber)}
        />
      )
    },
    {
      header: 'Acciones',
      render: (_, row) => (
        <div className={s.actions}>
          <button
            className={s.iconButton}
            disabled={row.status === 'cancelado' || row.status === 'confirmado'}
            onClick={() => openActionModal('confirmar', row)}
            title="Confirmar"
          >
            <Check size={18} />
          </button>

          <button
            className={s.iconButton}
            disabled={row.status === 'cancelado'}
            onClick={() => openActionModal('cancelar', row)}
            title="Cancelar"
          >
            <X size={18} />
          </button>

          <button
            className={s.iconButton}
            disabled={row.status === 'cancelado'}
            onClick={() => openModal(row)}
            title="Editar"
          >
            <Pencil size={18} />
          </button>
        </div>
      )
    },
    { header: 'Oficio', accessor: 'oficio' },
    { header: 'Día', accessor: 'dia', render: formatDia },
    { header: 'Hora', accessor: 'hora' },
    { header: 'Cliente', accessor: 'cliente' },
    {
      header: 'Estado',
      accessor: 'status',
      render: (value) => (
        <span className={`${s.badge} ${s[value]}`}>
          {value}
        </span>
      )
    }
    ,
  ];

  const [page, setPage] = useState(1);
  const pageSize = 15; // cantidad por página

  const totalPages = Math.ceil(filteredRows.length / pageSize);

  const paginatedRows = filteredRows.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const formatForInput = (isoDate) => {
    if (!isoDate) return '';
    return new Date(isoDate).toISOString().split('T')[0];
  };

  /* ============================= */
  /* Render */
  /* ============================= */

  return (
    <>
      <div className={s.header}>
        <h2 className={s.title}>Turnos de servicios</h2>
        <div className={s.back}>
          <BackButton to="/service-home" />
        </div>
      </div>


      {/* Filters */}
      <div className={s.toolbar}>

        <div className={s.filters}>
          <div className={s.inputGroup}>
            <Search size={16} />
            <input
              placeholder="Filtrar por oficio"
              value={filterOficio}
              onChange={(e) => setFilterOficio(e.target.value)}
            />
          </div>

          <div className={s.inputGroup}>
            <Search size={16} />
            <input
              placeholder="Filtrar por cliente"
              value={filterCliente}
              onChange={(e) => setFilterCliente(e.target.value)}
            />
          </div>
        </div>

        <div className={s.actionsBar}>
          <button
            className={s.iconButton}
            onClick={clearFilters}
            title="Limpiar filtros"
          >
            <X size={18} />
          </button>

          <button
            className={s.printButton}
            onClick={handlePrint}
            title="Imprimir"
          >
            <Printer size={18} />
          </button>
        </div>

      </div>


      {/* Bulk Info */}
      {selected.length > 0 && (
        <div className={s.bulkBar}>
          {selected.length} turnos seleccionados
        </div>
      )}

      {/* Table */}
      <div className={s.tableContainer}>
        <div className={s.tableScroll}>
          <Table
            columns={columns}
            rows={paginatedRows}
            getKey={(r) => r.turnoNumber}
          />
        </div>
      </div>

      <div className={s.pager}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ←
        </button>

        <span>
          Página {page} de {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          →
        </button>
      </div>


      {/* Modal */}
      {actionModal && (
        <div className={s.modalOverlay}>
          <div className={s.modalContent}>
            <h3>
              {actionModal.type === 'confirmar'
                ? 'Confirmar turno'
                : 'Cancelar turno'}
            </h3>

            <p>
              ¿Desea {actionModal.type} el turno del día{' '} <br />
              {formatDia(actionModal.turno.dia)} <br />
              a las {actionModal.turno.hora}?
            </p>

            <div className={s.modalActions}>
              <button onClick={closeActionModal}>
                Cancelar
              </button>

              <button
                className={s.primary}
                onClick={() => handleAction(actionModal)}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}


      {modalOpen && (
        <div className={s.modalOverlay}>
          <div className={s.modalContent}>
            <h3>Editar turno</h3>

            <p className={s.warning}>
              Solo se puede modificar fecha y hora.
              Para otros cambios debe crearse un nuevo turno.
            </p>

            <div className={s.formGroup}>
              <label>Fecha</label>
              <input
                type="date"
                value={editData.fecha}
                onChange={(e) =>
                  setEditData(prev => ({ ...prev, fecha: e.target.value }))
                }
              />

            </div>

            <div className={s.formGroup}>
              <label>Hora</label>
              <input
                type="time"
                value={editData.hora}
                onChange={(e) =>
                  setEditData(prev => ({ ...prev, hora: e.target.value }))
                }
              />

            </div>

            <div className={s.modalActions}>
              <button onClick={() => setModalOpen(false)}>
                Cancelar
              </button>

              <button
                className={s.primary}
                onClick={handleSaveEdit}
              >
                Guardar cambios
              </button>


            </div>
          </div>
        </div>
      )}


    </>

  );
}
