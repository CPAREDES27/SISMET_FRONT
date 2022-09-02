export interface Root {
    id: number
    userName: string
    contrasena: string
    nombres: string
    apellidos: string
    estado: boolean
    intentos: number
    fechaCreacion: string
    fechaModificacion: string
    tipoDocumento: string
    nroDocumento: string
    correo: string
    empresaId: number
    empresa: Empresa
    rolId: number
    rol: Rol
  }
  
  export interface Empresa {
    id: number
    nombre: string
    descripcion: string
    estacion: Estacion[]
  }
  
  export interface Estacion {
    id: number
    nombreEstacion: string
    latitud: string
    longitud: string
    usuario: string
    clave: string
    token: string
  }
  
  export interface Rol {
    id: number
    nombre: string
    descripcion: string
    estado: boolean
  }


    
  export interface EstacionAll {
    id: number,
    nombreEstacion: string,
    latitud: string,
    longitud: string
  }
  
  