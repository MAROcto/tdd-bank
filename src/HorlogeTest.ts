import { Horloge } from './Horloge'

export default class HorlogeTest implements Horloge {
  nbCalls: number
  dates: string[]
  dateIndex: number
  defaultDate: string
  constructor(dates: string[]) {
    this.dates = dates
    this.defaultDate = '01/01/0001 01:01:01.000001'
    this.dateIndex = 0
    this.nbCalls = 0
  }
  getDate(): string {
    this.nbCalls++
    const indexDateToReturn = this.dateIndex
    if (indexDateToReturn > this.dates.length) return this.defaultDate
    this.dateIndex++
    return this.dates[indexDateToReturn]
  }
}
