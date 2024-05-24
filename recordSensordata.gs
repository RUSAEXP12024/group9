function setSensorData(temperature, row, response) {
  today = Utilities.formatDate(new Date(), "GMT+9", "yyyy/MM/dd HH:mm:ss");
  getSheet('temperature').getRange(row, 1, 1, 6).setValues([[today, temperature, response[0], response[1], response[2], response[3]]]);
}

