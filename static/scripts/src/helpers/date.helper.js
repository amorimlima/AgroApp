'use strict'

import angular from 'angular'

class DateHelper {
  constructor() {
    throw new Error('Absctract classes cannot be instantiated')
  }

  static format(date) {
    const fmt = new Date(date)
    const day   = fmt.getDate()  < 10 ? '0' + fmt.getDate()        : fmt.getDate()
    const month = fmt.getMonth() < 9  ? '0' + (fmt.getMonth() + 1) : (fmt.getMonth() + 1)
    const year  = fmt.getFullYear()

    return `${day}/${month}/${year}`
  }

  static toIsoStandard(date) {
    const fmt = new Date(date)
    const day   = fmt.getDate()  < 10 ? '0' + fmt.getDate()        : fmt.getDate()
    const month = fmt.getMonth() < 9  ? '0' + (fmt.getMonth() + 1) : (fmt.getMonth() + 1)
    const year  = fmt.getFullYear()

    return `${year}-${month}-${day}`
  }
}

const getDateHelper = () => DateHelper

angular
  .module('app')
  .factory('DateHelper', getDateHelper)
