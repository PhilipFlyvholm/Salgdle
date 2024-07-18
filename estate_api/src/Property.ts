export enum PropertyType {
    //"Villa" | "Apartment" | "Co-operative housing" | "Country property" | "Leisure plot" | "Terraced house" | "Holiday home" | "Villa apartment" | "Year-round plot"
    Villa = "Villa",
    Apartment = "Apartment",
    CoOperativeHousing = "Co-operative housing",
    CountryProperty = "Country property",
    LeisurePlot = "Leisure plot",
    TerracedHouse = "Terraced house",
    HolidayHome = "Holiday home",
    VillaApartment = "Villa apartment",
    YearRoundPlot = "Year-round plot"
}

export interface BaseProperty {
	vendor: string,
	vendor_url: URL,
  vendor_id: string,
  full_url: URL,
	price: number,
	pricem2:number,
	address_display_name: string,
	propertym2: number,
	rooms: number,
	type: PropertyType,
  images: string[]
}

export interface NyboligProperty extends BaseProperty{
  caseNumber: string
  addressLongitude: number
  addressLatitude: number
  addressCity: string
  isSharedAgriculturalCase: boolean
  hasBeenSold: boolean
  isSaleInProgress: boolean
  isRental: boolean
  streetAddress: string
  houseNumber: string
  floorSide: string
  floor: number
  projectCaseReserved: boolean
  newLabelEventEnd: string
  isNew: boolean
  showOffersLabel: boolean
  totalNumberOfRooms: number
  propertySize: number
  plotSizeHa: number
  livingSpace: number
  farmbuildingsSize: number
  basementSize: number
  energyClassification: string
}

