export interface BoligaResponse {
    items: BoligaResponseItem[]
  }
  
  export interface BoligaResponseItem {
    boligaUniqueNumber: string
    boligtype: string
    adresseid: string
    adresse_bo: string
    vejnavn: string
    husnr: string
    postnr: number
    postnrby: string
    insertdate: string
    updatedate: string
    udbudspris: number
    kvmpris: number
    rooms: number
    nettoYdelse: number
    bruttoYdelse: number
    andelsYdelse: number
    ejerudgYdelse: number
    agentlink: string
    fromdate: string
    energimaerke: string
    boligm2: number
    boligm2vaegtet: number
    grundm2: number
    lat_aws: number
    lon_aws: number
    utmx: number
    utmy: number
    liggetid: number
    aws_ok: boolean
    imageFetched: number
    noLongerAvailable: boolean
    maxnoise: number
    byggeaar: number
    maxMobil4GMbit: number
    maxMobilNet?: string
    masteafstand: number
    bevaringsvaerdi: number
    indbrudprocent: number
    imageUrl: string
    etage?: string
    door?: string
  }
  