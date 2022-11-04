import { Horloge } from './Horloge'

export default class HorlogeTest implements Horloge {
  dates: string[]
  dateIndex: number
  defaultDate: string
  constructor(dates: string[]) {
    this.dates = dates
    this.defaultDate = '01/01/0001 01:01:01.000001'
    this.dateIndex = 0
  }
  getDate(): string {
    const indexDateToReturn = this.dateIndex
    if (indexDateToReturn > this.dates.length) return this.defaultDate
    this.dateIndex++
    return this.dates[indexDateToReturn]
  }
}
