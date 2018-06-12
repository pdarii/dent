export interface Client {
  _id: string;
  name: string;
  surname: string;
  tel: string;
  clientbirthday: string;
  clientnum: number;
  comment: string;
}

export interface Jobs {
  _id: string;
  job: string;
}

export interface Plan {
  tel: string;
  date: string;
  job: string;
  comment?: string;
  clientId?: string;
}
