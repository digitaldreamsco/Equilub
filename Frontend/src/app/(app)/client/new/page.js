'use client'
import { useTypeOfIdentity } from "@/hooks/typeOfIdentity"
import { useClient } from "@/hooks/clients"
import { useEffect, useState } from "react"
import Input from "@/components/Input"
import Label from "@/components/Label"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp, faRandom } from "@fortawesome/free-solid-svg-icons"
import Button from "@/components/Button"


 const NewServicePage = () => {
// Tipo de identificación
const [typeOfIdentitys, setTypeOfIdentitys] = useState([])

 // campos de crear nuevo cliente
 const [tipodecliente, setTipodeCliente] = useState(1) // empresa o cliente normal
 const [tipodeidentidad, setTipodeIdentidad] = useState('')
 const [numeroidentidad, setNumeroidentidad] = useState('')
 const [nombreClients, setNombreClients] = useState('')
 const [apellidoClients, setApellidoClients] = useState('')
 const [sexoClients, setSexoClients] = useState('')
 const [direccionClients, setDireccionClients] = useState('')
 const [telefonoClients, setTelefonoClients] = useState('')
 const [correoClients, setCorreoClients] = useState('')
 const [apellidolegal, setApellidolegal] = useState('')
 const [direccionLegal, setDireccionLegal] = useState('')
 const [telefonoLegal, setTelefonoLegal] = useState('')
 const [correoLegal, setCorreoLegal] = useState('')
 const [nombrelegal, setNombrelegal] = useState('')
 const [sexoLegal, setSexoLegal] = useState('')
 const [usuario, setUsuario] = useState('')
 const [password, setPassword] = useState('')

 const [sex, setSex] = useState([
    { id: 'M', name: 'Masculino' },
    { id: 'F', name: 'Femenino' },
    { id: 'NB', name: 'No Binario' },
    { id: 'LBGTI', name: 'LBGTI' },
])

     // tab mostrar información 
     const [isOpenTablegal, setisOpenTablegal] = useState(false)
     const [isOpenTabCredentials, setIsOpenTabCredentials] = useState(false)

 const handletipeOfIdentity = () =>{
    const { getActiveTypeOfIdentity } = useTypeOfIdentity()

    getActiveTypeOfIdentity({
        setTypeOfIdentitys,
    })
}

// cargar maquinas
useEffect(() => {
    handletipeOfIdentity()
}, [])

const handleSubmitClients = async (e) => {
    e.preventDefault()
        const {saveNewClient} = useClient()
        saveNewClient({
            type_client: tipodecliente,
            type_id: tipodeidentidad,
            number_id: numeroidentidad,
            name: nombreClients,
            lastname: apellidoClients, 
            cellphone: telefonoClients, 
            address: direccionClients, 
            email: correoClients, 
            Sex: sexoClients, 
            People_legal: `${nombrelegal},${apellidolegal}`,
            cellphone_legal: telefonoLegal, 
            email_legal: correoLegal, 
            Sex_legal: sexoLegal, 
            stated: 1,
            user: user,
            password: password, 
            setClient
        })
        
        // Limpia los campos del modal
        setNombreMaquina('')
        setEstado('')
        setTipoMaquina('')
        setObservacion('')
        setDescripcion('')
        
    
}

    return (
        <div className="py-5 px-5 bg-gray-100">
            <div className="max-w-7xl mx-auto sm:px-1 lg:px-1">
                <div className="overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-8 bg-white">
                        <h3 className='font-bold mb-6'>Home / Servicios / <span className='font-normal'>Nuevo Servicio</span></h3>
                        <h3 className='font-bold mb-6'>Nuevo Servicio</h3>
                        <form onSubmit={handleSubmitClients}>
                                <div className='flex mb-5 space-x-8'>
                                    <div className='cursor-pointer' onClick={() => setTipodeCliente(1)}>
                                        <Input type='radio' name='clients' className={'mr-3'} checked={tipodecliente === 1} onChange={() => setTipodeCliente(1)}></Input> Empresa
                                    </div>
                                    <div className='cursor-pointer' onClick={() => setTipodeCliente(2)}>
                                        <Input type='radio' name='clients'  className={'mr-3'} checked={tipodecliente === 2} onChange={() => setTipodeCliente(2)}></Input> Persona Natural
                                    </div>
                                </div>
                                    <div className='flex space-x-4'>
                                        <div className="mb-4 w-1/2">
                                            
                                            <Label htmlFor="nombreMaquina">Tipo de identidad</Label>
                                            <select
                                                id="tipodeidentidad"
                                                type="text"
                                                value={tipodeidentidad}
                                                onChange={(e) => setTipodeIdentidad(e.target.value)}
                                                required
                                                className="w-full rounded-full text-sm  border-1 border-gray-300"
                                            >
                                                
                                                <option value="">Seleccione</option>
                                                {
                                                    (typeOfIdentitys?.length > 0) ? (
                                                        typeOfIdentitys.map((identity) => (
                                                            <option key={identity.id} value={identity.id}>
                                                                {`${identity.name}`}
                                                            </option>
                                                        ))
                                                    ): null
                                                }
                                            </select> 
                                        </div>
                                        <div className="mb-4 w-1/2">
                                            <Label htmlFor="nombreMaquina">Numero de identidad</Label>
                                            <Input
                                                id="numerodeidentidad"
                                                type="number"
                                                value={numeroidentidad}
                                                onChange={(e) => setNumeroidentidad(e.target.value)}
                                                required
                                                placeholder="No 13531816"
                                                className="w-full text-sm rounded-full"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className='flex space-x-4 w-full'>
                                    {(tipodecliente === 2)?(
                                        <div className="mb-4 w-1/2">
                                            <Label htmlFor="nombreMaquina">Primer Apellido</Label>
                                            <Input
                                                id="nombreMaquina"
                                                type="text"
                                                value={apellidoClients}
                                                onChange={(e) => setApellidoClients(e.target.value)}
                                                required
                                                placeholder="Escribe el primer apellido"
                                                className="w-full text-sm rounded-full"
                                            />
                                        </div>
                                    ):null}
                                    
                                        <div className={(tipodecliente === 2)?"mb-4 w-1/2":"mb-4 w-full"}>
                                            <Label htmlFor="nombreMaquina">Primer Nombre</Label>
                                            <Input
                                                id="nombreMaquina"
                                                type="text"
                                                value={nombreClients}
                                                onChange={(e) => setNombreClients(e.target.value)}
                                                required
                                                placeholder={(tipodecliente === 'natural')?"Escribe el primer nombre":"Escribe el nombre de la comprañia"}
                                                className="w-full text-sm rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <div className='flex space-x-4 w-full'>
                                    {(tipodecliente === 2) ? (
                                        <div className="mb-4 w-1/3">
                                                <Label htmlFor="nombreMaquina">Sexo</Label>
                                                <select
                                                    id="tipodeidentidad"
                                                    type="text"
                                                    value={sexoClients}
                                                    onChange={(e) => setSexoClients(e.target.value)}
                                                    required
                                                    className="w-full rounded-full text-sm  border-1 border-gray-300"
                                                >
                                                    
                                                    <option value="">Seleccione</option>
                                                    {
                                                        (sex?.length > 0) ? (
                                                            sex.map((identity) => (
                                                                <option key={identity.id} value={identity.id}>
                                                                    {`${identity.name}`}
                                                                </option>
                                                            ))
                                                        ): null
                                                    }
                                                </select> 
                                        </div>
                                    ) : null}
                                    
                                    <div className={(tipodecliente === 2)?"mb-4 w-1/3":"mb-4 w-1/2"}>
                                            <Label htmlFor="nombreMaquina">Telefono <span className='text-xs'>(contacto)</span></Label>
                                            <Input
                                                id="nombreMaquina"
                                                type="text"
                                                value={telefonoClients}
                                                onChange={(e) => setTelefonoClients(e.target.value)}
                                                required
                                                placeholder={(tipodecliente === 2)?"Escribe telefono ":"Escribe tel. de oficina"}
                                                className="w-full text-sm rounded-full"
                                            />
                                        </div>
                                        <div className={(tipodecliente === 2)?"mb-4 w-1/3":"mb-4 w-1/2"}>
                                            <Label htmlFor="nombreMaquina">Dirección</Label>
                                            <Input
                                                id="nombreMaquina"
                                                type="text"
                                                value={direccionClients}
                                                onChange={(e) => setDireccionClients(e.target.value)}
                                                required
                                                placeholder={(tipodecliente === 2)?"Escribe dirección residencial":"Escribe dirección de ofi."}
                                                className="w-full text-sm rounded-full"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <Label htmlFor="tipoMaquina">Correo Electrónico</Label>
                                        <Input
                                            id="tipoMaquina"
                                            type="text"
                                            value={correoClients}
                                            onChange={(e) => {setCorreoClients(e.target.value), setUsuario(e.target.value)}}
                                            required
                                            placeholder={(tipodecliente === 2)?"Escribe correo personal":"Escribe correo empresarial."}
                                            className="w-full text-sm rounded-full"
                                        />
                                    </div>

                                    {(tipodecliente === 1)?(
                                        <>
                                        <div className='flex border-b-1 border-gray-400 place-content-between mb-1'>
                                            <h3 className='mt-2'>Información del Representante legal <span className='text-xs'>(opcional)</span></h3>
                                            <button type='button' onClick={()=>{(isOpenTablegal)?setisOpenTablegal(false):setisOpenTablegal(true)}} className='mt-2'><FontAwesomeIcon icon={(isOpenTablegal)?faChevronUp:faChevronDown}></FontAwesomeIcon></button>
                                        </div>
                                            
                                            
                                            {isOpenTablegal && (
                                                <>
                                                <div className='flex space-x-4'>
                                                    <div className="mb-4 w-1/2">
                                                        <Label htmlFor="nombreMaquina">Primer Apellido</Label>
                                                        <Input
                                                            id="nombreMaquina"
                                                            type="text"
                                                            value={apellidolegal}
                                                            onChange={(e) => setApellidolegal(e.target.value)}
                                                            
                                                            placeholder="Escribe apellido"
                                                            className="w-full text-sm rounded-full"
                                                        />
                                                    </div>
                                                    <div className="mb-4 w-1/2">
                                                        <Label htmlFor="nombreMaquina">Primer Nombre</Label>
                                                        <Input
                                                            id="nombreMaquina"
                                                            type="text"
                                                            value={nombrelegal}
                                                            onChange={(e) => setNombrelegal(e.target.value)}
                                                            
                                                            placeholder="Escribe nombre"
                                                            className="w-full text-sm rounded-full"
                                                        />
                                                    </div>
                                                    </div>
                                                    <div className='flex space-x-4'>
                                                    <div className={"mb-4 w-1/2"}>
                                                        <Label htmlFor="nombreMaquina">Telefono <span className='text-xs'>(contacto)</span></Label>
                                                        <Input
                                                            id="nombreMaquina"
                                                            type="text"
                                                            value={telefonoLegal}
                                                            onChange={(e) => setTelefonoLegal(e.target.value)}
                                                            
                                                            placeholder={"Escribe tel. de contacto"}
                                                            className="w-full text-sm rounded-full"
                                                        />
                                                    </div>
                                                    <div className={"mb-4 w-1/2"}>
                                                        <Label htmlFor="nombreMaquina">Dirección</Label>
                                                        <Input
                                                            id="nombreMaquina"
                                                            type="text"
                                                            value={direccionLegal}
                                                            onChange={(e) => setDireccionLegal(e.target.value)}
                                                            
                                                            placeholder={"Escribe dirección."}
                                                            className="w-full text-sm rounded-full"
                                                        />
                                                    </div>
                                                    <div className="mb-4 w-1/3">
                                                            <Label htmlFor="nombreMaquina">Sexo</Label>
                                                            <select
                                                                id="tipodeidentidad"
                                                                type="text"
                                                                value={sexoLegal}
                                                                onChange={(e) => setSexoLegal(e.target.value)}
                                                                required
                                                                className="w-full rounded-full text-sm  border-1 border-gray-300"
                                                            >
                                                                
                                                                <option value="">Seleccione</option>
                                                                {
                                                                    (sex?.length > 0) ? (
                                                                        sex.map((identity) => (
                                                                            <option key={identity.id} value={identity.id}>
                                                                                {`${identity.name}`}
                                                                            </option>
                                                                        ))
                                                                    ): null
                                                                }
                                                            </select> 
                                                    </div>
                                            </div>
                                            
                                            <div className="mb-4">
                                                <Label htmlFor="email">Correo Electrónico</Label>
                                                <Input
                                                    id="email"
                                                    type="text"
                                                    value={correoLegal}
                                                    onChange={(e) => setCorreoLegal(e.target.value)}
                                                    required
                                                    placeholder={"Escribe correo personal o corporativo"}
                                                    className="w-full text-sm rounded-full"
                                                />
                                            </div>
                                                </>
                                            )}
                                            
                                            
                                        </>
                                    ):null}

                                
                                        <div className='flex border-b-1 border-gray-400 place-content-between mb-8'>
                                            <h3 className='mt-2'>Credenciales Inicio de sesión <span className='text-xs'>(opcional)</span></h3>
                                            <button type='button' onClick={()=>{(isOpenTabCredentials)?setIsOpenTabCredentials(false):setIsOpenTabCredentials(true)}} className='mt-2'><FontAwesomeIcon icon={(isOpenTabCredentials)?faChevronUp:faChevronDown}></FontAwesomeIcon></button>
                                        </div>
                                            
                                            
                                            {isOpenTabCredentials && (
                                                <>
                                                <div className='flex space-x-4'>
                                                    <div className="mb-4 w-1/2">
                                                        <Label htmlFor="user">Usuario</Label>
                                                        <Input
                                                            id="user"
                                                            type="text"
                                                            value={usuario}
                                                            onChange={(e) => setUsuario(e.target.value)}
                                                            
                                                            placeholder="Escribe usuario"
                                                            className="w-full text-sm rounded-full"
                                                        />
                                                    </div>
                                                    <div className="mb-4 w-1/2 relative">
                                                        <Label htmlFor="password">Contraseña</Label>
                                                        <Input
                                                            id="password"
                                                            type="text"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            
                                                            placeholder="Escribe la contraseña"
                                                            className="w-full text-sm rounded-full"
                                                        />
                                                        <button type='button' onClick={()=>randomNumber()} className='absolute right-4 top-7'><FontAwesomeIcon icon={faRandom} /></button>
                                                    </div>
                                                    </div>
                                            
                                                </>
                                            )}
                                            
                                    
                                
                                    <div className="flex justify-end">
                                        <Button className='text-xs' type="submit">Crear nuevo cliente</Button>
                                        
                                    </div>
                    </form>
            </div>
              
        </div>
        </div>
        </div>
    )
}
export default NewServicePage