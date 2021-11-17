export interface Patients  {
    id: string;
    name: string;
    lastName: string;
    adress: string;
    phoneNumber: string;
    age: number;
    gender: string;
  }
  
  export interface Medicine  {
    id: string;
    medicationName: string;
    unit: string;
    strength: number	
    form: string;
    expDate: string;
    patientIds:	string[]
  }