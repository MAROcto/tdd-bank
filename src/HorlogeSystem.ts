import { Horloge } from './Horloge'
import moment = require('moment')

export default class HorlogeSystem implements Horloge {
  getDate(): string {
    return moment(new Date()).format('DD/MM/YYYY HH:mm:ss.SSSSSSS')
  }
}
