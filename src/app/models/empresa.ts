export interface Politica{
    politica?:string;
}

export interface Servicio{
    nameTypeService?:string;
    descriptionTypeService?:string;
}

export interface Tarifa{
    nameFare?:string;
    nameService?:string;
    idTypeServiceFare?:string;
    minFare?:string;
    maxFare?:string;
    priceFare?:string;
    idCompanyFare?:string
}

export interface Empresa{
    ruc?:string;
    nameCompany:string;
    direccion?:string;
    telefono?:string;
    correo?:string;
}