'use client';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faTrash, faGear } from '@fortawesome/free-solid-svg-icons';
import Label from '@/components/Label';
import Input from '@/components/Input';
import Button from '@/components/Button';

const FormatPage = () => {
    const [formatos, setFormatos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState(null);
    const [newFormat, setNewFormat] = useState({ codigo_id: '', name: '', tipo: '', value: '', config: '' });
    const [error, setError] = useState(null);

    // Fetch formatos
    const fetchFormatos = async () => {
        try {
            const response = await axios.get('/api/formatoestudio');
            setFormatos(response.data.data);
        } catch (err) {
            console.error(err);
            setError('Error al cargar los formatos');
        }
    };

    // Crear un nuevo formato
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/formatoestudio', newFormat);
            setNewFormat({ codigo_id: '', name: '', tipo: '', value: '', config: '' });
            setModalOpen(false);
            fetchFormatos();
        } catch (err) {
            console.error(err);
            setError('Error al crear el formato');
        }
    };

    // Editar un formato
    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/formatoestudio/${selectedFormat.id}`, selectedFormat);
            setSelectedFormat(null);
            setEditModalOpen(false);
            fetchFormatos();
        } catch (err) {
            console.error(err);
            setError('Error al editar el formato');
        }
    };

    // Eliminar un formato
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/formatoestudio/${id}`);
            fetchFormatos();
        } catch (err) {
            console.error(err);
            setError('Error al eliminar el formato');
        }
    };

    useEffect(() => {
        fetchFormatos();
    }, []);

    return (
        <div className="px-5 bg-gray-100">
            <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-8 bg-white">
                        <h3 className='font-bold mb-6'>Home / Estudio de lubricación / <span className='font-normal'>Formatos de lubricación</span></h3>
                        <h2 className="text-2xl font-bold mb-6">Formatos de estudios de lubricación</h2>
                       

                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Configuración</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {formatos.map((formato) => (
                                        <tr key={formato.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formato.codigo_id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{formato.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{formato.tipo}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{formato.config}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                <button className="text-blue-500 hover:text-blue-700" onClick={() => { setSelectedFormat(formato); setEditModalOpen(true); }}>
                                                    <FontAwesomeIcon icon={faPencilAlt} />
                                                </button>
                                                <button className="text-gray-500 hover:text-gray-700" onClick={() => setModalOpen(true)}>
                                                    <FontAwesomeIcon icon={faGear} />
                                                </button>
                                                <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(formato.id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </div>
                </div>
            </div>

            {/* Modal para Crear */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-[500px]">
                        <h2 className="font-bold mb-4">Crear Nuevo Formato</h2>
                        <form onSubmit={handleCreate}>
                            <Label htmlFor="codigo_id">Código</Label>
                            <Input id="codigo_id" value={newFormat.codigo_id} onChange={(e) => setNewFormat({ ...newFormat, codigo_id: e.target.value })} required />

                            <Label htmlFor="name">Nombre</Label>
                            <Input id="name" value={newFormat.name} onChange={(e) => setNewFormat({ ...newFormat, name: e.target.value })} required />

                            <Label htmlFor="tipo">Tipo</Label>
                            <Input id="tipo" value={newFormat.tipo} onChange={(e) => setNewFormat({ ...newFormat, tipo: e.target.value })} required />

                            <Label htmlFor="value">Valor</Label>
                            <Input id="value" value={newFormat.value} onChange={(e) => setNewFormat({ ...newFormat, value: e.target.value })} />

                            <Label htmlFor="config">Configuración</Label>
                            <Input id="config" value={newFormat.config} onChange={(e) => setNewFormat({ ...newFormat, config: e.target.value })} />

                            <div className="flex justify-end space-x-2 mt-4">
                                <Button type="button" className="bg-gray-500 text-white" onClick={() => setModalOpen(false)}>Cancelar</Button>
                                <Button type="submit" className="bg-blue-500 text-white">Guardar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal para Editar */}
            {editModalOpen && selectedFormat && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-[500px]">
                        <h2 className="font-bold mb-4">Editar Formato</h2>
                        <form onSubmit={handleEdit}>
                            <Label htmlFor="codigo_id">Código</Label>
                            <Input id="codigo_id" value={selectedFormat.codigo_id} onChange={(e) => setSelectedFormat({ ...selectedFormat, codigo_id: e.target.value })} required />

                            <Label htmlFor="name">Nombre</Label>
                            <Input id="name" value={selectedFormat.name} onChange={(e) => setSelectedFormat({ ...selectedFormat, name: e.target.value })} required />

                            <Label htmlFor="tipo">Tipo</Label>
                            <Input id="tipo" value={selectedFormat.tipo} onChange={(e) => setSelectedFormat({ ...selectedFormat, tipo: e.target.value })} required />

                            <Label htmlFor="value">Valor</Label>
                            <Input id="value" value={selectedFormat.value} onChange={(e) => setSelectedFormat({ ...selectedFormat, value: e.target.value })} />

                            <Label htmlFor="config">Configuración</Label>
                            <Input id="config" value={selectedFormat.config} onChange={(e) => setSelectedFormat({ ...selectedFormat, config: e.target.value })} />

                            <div className="flex justify-end space-x-2 mt-4">
                                <Button type="button" className="bg-gray-500 text-white" onClick={() => setEditModalOpen(false)}>Cancelar</Button>
                                <Button type="submit" className="bg-blue-500 text-white">Actualizar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormatPage;
