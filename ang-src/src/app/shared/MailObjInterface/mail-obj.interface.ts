export interface Mail {
  _id?: string,
  fromName: string
  fromAddress: string,
  to: string,
  category: string,
  subject: string,
  date: number,
  body: string,
  sent: boolean,
  starred: boolean,
  read: boolean,
  openedTimes: number,
  __v?: number
}
