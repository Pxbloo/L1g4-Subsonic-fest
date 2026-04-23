import React, { useEffect, useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import SearchBar from '@/components/ui/SearchBar.jsx';
import ConfirmDialog from '@/components/ui/ConfirmDialog.jsx';
import API_BASE_URL from '@/config/api';
import { getAuth } from 'firebase/auth';

const DEFAULT_GROUND_IMAGE = 'https://www.boombasticfestival.com/images/passes/abono-vip-pass.jpg';

const emptyGround = {
  name: '',
  area: '',
  capacity: 0,
  status: 'Operativo',
  image: ''
};

const statusStyles = {
  Operativo: 'bg-green-500/20 text-green-300',
  'En montaje': 'bg-yellow-500/20 text-yellow-300',
  'Solo staff': 'bg-red-500/20 text-red-300',
};

const GroundFormModal = ({ isOpen, onClose, onSave, data, onChange, isEditing }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-subsonic-border bg-subsonic-navfooter shadow-2xl">
        <div className="flex shrink-0 items-center justify-between border-b border-subsonic-border px-6 py-4">
          <h2 className="text-xl font-black uppercase tracking-tight text-subsonic-accent">
            {isEditing ? 'Editar recinto' : 'Nuevo recinto'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-lg text-subsonic-muted hover:text-subsonic-text"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSave} className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Nombre"
              name="name"
              value={data.name}
              onChange={(e) => onChange({ ...data, name: e.target.value })}
              placeholder="Escenario Norte"
              required
            />

            <Input
              label="Área"
              name="area"
              value={data.area}
              onChange={(e) => onChange({ ...data, area: e.target.value })}
              placeholder="Zona principal"
              required
            />

            <Input
              label="Capacidad"
              name="capacity"
              type="number"
              min="0"
              value={data.capacity}
              onChange={(e) => onChange({ ...data, capacity: Number(e.target.value || 0) })}
              placeholder="10000"
              required
            />

            <Input
              label="Foto (URL)"
              name="image"
              type="url"
              value={data.image || ''}
              onChange={(e) => onChange({ ...data, image: e.target.value })}
              placeholder="https://..."
              className="md:col-span-2"
            />

            <div className="w-full space-y-1 md:col-span-2">
              <label className="block text-xs font-montserrat text-subsonic-muted uppercase tracking-widest ml-1">
                Estado
              </label>
              <select
                name="status"
                value={data.status}
                onChange={(e) => onChange({ ...data, status: e.target.value })}
                className="w-full rounded-md border border-subsonic-border bg-subsonic-surface px-4 py-3 text-sm text-subsonic-text outline-none focus:ring-2 focus:ring-subsonic-accent/30"
              >
                <option value="Operativo">Operativo</option>
                <option value="En montaje">En montaje</option>
                <option value="Solo staff">Solo staff</option>
              </select>
            </div>
          </div>

          <div className="rounded-xl border border-subsonic-border bg-subsonic-surface/40 p-4">
            <p className="text-xs uppercase tracking-wider text-subsonic-muted mb-2">Vista previa de foto</p>
            <div className="h-36 w-full overflow-hidden rounded-md border border-subsonic-border bg-subsonic-border">
              <img
                src={data.image || DEFAULT_GROUND_IMAGE}
                alt={data.name || 'Recinto'}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_GROUND_IMAGE;
                }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-subsonic-border bg-subsonic-surface/40 p-4">
            <p className="text-sm text-subsonic-muted">
              Configura capacidad y estado para que el equipo de ventas y logística tenga datos actualizados.
            </p>
          </div>

          <div className="flex justify-end gap-3 border-t border-subsonic-border pt-4">
            <Button
              type="submit"
              className="bg-subsonic-accent px-5 py-2 text-subsonic-bg"
            >
              {isEditing ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const GroundsManagement = () => {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGround, setSelectedGround] = useState(null);
  const [groundToDelete, setGroundToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentGround, setCurrentGround] = useState(emptyGround);
  const [canSubmit, setCanSubmit] = useState(true);

  const fetchGrounds = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/grounds`);
      if (!response.ok) {
        throw new Error('Error al cargar recintos');
      }
      const data = await response.json();
      setGrounds(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching grounds:', error);
      setGrounds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrounds();
  }, []);

  const filteredGrounds = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) return grounds;

    return grounds.filter((ground) =>
      [ground.id, ground.name, ground.area, ground.status, ground.capacity, ground.image]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    );
  }, [grounds, searchTerm]);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedGround(null);
    setCurrentGround(emptyGround);
  };

  const handleNewGround = () => {
    setSelectedGround(null);
    setCurrentGround(emptyGround);
    setModalOpen(true);
  };

  const handleEditGround = (ground) => {
    setSelectedGround(ground);
    setCurrentGround({
      ...emptyGround,
      ...ground,
      capacity: Number(ground?.capacity ?? 0),
      status: ground?.status || 'Operativo',
      image: ground?.image || '',
    });
    setModalOpen(true);
  };

  const handleSaveGround = async (e) => {
    e.preventDefault();

    if (!canSubmit) {
      alert('Por favor, espera antes de hacer más peticiones.');
      return;
    }

    setCanSubmit(false);

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error('No user is currently logged in or user is not authenticated.');
      }

      const token = await currentUser.getIdToken();
      const isNew = !selectedGround?.id;
      const groundId = String(selectedGround?.id || '').trim();

      if (!isNew && !groundId) {
        alert('No se pudo identificar el recinto a actualizar.');
        return;
      }

      const payload = {
        name: String(currentGround.name || '').trim(),
        area: String(currentGround.area || '').trim(),
        capacity: Number(currentGround.capacity || 0),
        status: String(currentGround.status || 'Operativo'),
        image: String(currentGround.image || '').trim(),
      };

      const method = isNew ? 'POST' : 'PUT';
      const url = isNew
        ? `${API_BASE_URL}/grounds`
        : `${API_BASE_URL}/grounds/${groundId}`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed: ${response.status} ${errorText}`);
      }

      closeModal();
      await fetchGrounds();
    } catch (error) {
      console.error('Error saving ground:', error);
    } finally {
      setCanSubmit(true);
    }
  };

  const handleDeleteGround = async (ground) => {
    if (!canSubmit) {
      alert('Por favor, espera antes de hacer más peticiones.');
      return;
    }

    if (!ground?.id) return;

    setCanSubmit(false);

    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error('No user is currently logged in or user is not authenticated.');
      }

      const token = await currentUser.getIdToken();

      const response = await fetch(`${API_BASE_URL}/grounds/${ground.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed: ${response.status} ${errorText}`);
      }

      setGroundToDelete(null);
      await fetchGrounds();
    } catch (error) {
      console.error('Error deleting ground:', error);
    } finally {
      setCanSubmit(true);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Cargando recintos...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black text-subsonic-accent uppercase tracking-tight">
          Gestión de Recintos
        </h1>
        <Button
          onClick={handleNewGround}
          className="border border-subsonic-border text-subsonic-bg font-black px-5 py-2 rounded-full uppercase text-sm hover:border-subsonic-bg transition"
        >
          + Nuevo Recinto
        </Button>
      </div>

      <div className="mb-6 max-w-md">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar por nombre, id, área, estado o capacidad..."
          showButton={false}
          className="w-full"
          inputClassName="w-full rounded-md border border-subsonic-border bg-subsonic-surface px-4 py-2 text-sm text-subsonic-text placeholder:text-subsonic-muted outline-none focus:ring-2 focus:ring-subsonic-accent/30"
        />
      </div>

      <div className="bg-subsonic-navfooter border border-subsonic-border rounded-2xl overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="min-w-225 w-full divide-y divide-subsonic-border">
            <thead className="bg-subsonic-surface/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-subsonic-muted uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-subsonic-muted uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-subsonic-muted uppercase tracking-wider">Área</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-subsonic-muted uppercase tracking-wider">Capacidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-subsonic-muted uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-subsonic-muted uppercase tracking-wider">Foto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-subsonic-muted uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subsonic-border">
              {filteredGrounds.length > 0 ? (
                filteredGrounds.map((ground) => (
                  <tr key={ground.id} className="hover:bg-subsonic-surface/20 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-subsonic-text">{ground.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-subsonic-text">{ground.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-subsonic-text">{ground.area}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-subsonic-text">
                      {Number(ground.capacity || 0).toLocaleString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[ground.status] || 'bg-subsonic-border text-subsonic-muted'}`}>
                        {ground.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${ground.image ? 'bg-green-500/20 text-green-300' : 'bg-subsonic-border text-subsonic-muted'}`}>
                        {ground.image ? 'Sí' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <Button
                        onClick={() => handleEditGround(ground)}
                        className="bg-subsonic-border text-subsonic-accent hover:text-opacity-80 hover:bg-subsonic-accent hover:text-subsonic-bg px-6 py-2"
                        variant=""
                      >
                        Editar
                      </Button>
                      <Button
                        onClick={() => setGroundToDelete(ground)}
                        className="bg-subsonic-border text-red-400 hover:bg-red-500 hover:text-subsonic-bg px-6 py-2"
                        variant=""
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-10 text-center text-sm text-subsonic-muted">
                    No se encontraron recintos con ese filtro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <GroundFormModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSaveGround}
        data={currentGround}
        onChange={setCurrentGround}
        isEditing={!!selectedGround}
      />

      <ConfirmDialog
        isOpen={!!groundToDelete}
        onClose={() => setGroundToDelete(null)}
        onConfirm={handleDeleteGround}
        title="Eliminar recinto"
        message={`¿Estás seguro de que deseas eliminar "${groundToDelete?.name}"? Esta acción no se puede deshacer.`}
        user={groundToDelete}
      />
    </div>
  );
};

export default GroundsManagement;
