export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  token: string;
}

export interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface Booking {
  user_id: any;
  area: any;
  spot: any;
  fromTime: string;
  toTime: string;
  id: any;
  data: any;

}

export interface TimePickerTypes {
  area :string,
  fromTime :string,
  toTime:string,
  onChangeTime:any,
  onChangeFromTime:any,
  updateSpots:any

}

export interface Spot {
  _id: any;
  area: number;
  location: number;
  spot: number;
  booking_count: number;
  fromTime: number;
  toTime: number;

}


export interface SpotData {
  area: number;
  fromTime: any;
  toTime: number;

}

export interface SlotTypes {
  data: any;
  createBooking: any;

}

