export type InfoLocationType = {
  name: string,
  emails: string[],
  telefonos: string[],
  status: string,
  creationDate: Date,
  location: {
    cityName: string,
    stateName: string,
    longitude: number,
    latitude: number
  }
}
