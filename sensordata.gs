function recordTemperature(temperature) {
  const lastSensorData = getLastData("temperature"); //最終data取得
  const lastTemperature = getLastTemperature();    // 前回の温度データ取得
  response = [];

  if(temperature < 10){
    response.push("冬");
  }
  else if(temperature <= 15 ){
    response.push("秋");
  }
  else if (temperature <= 25){
    response.push("春");
  }else{
    response.push("夏");
  }

 // 前回の温度と現在の温度の比較をログに記録
  response.push(lastTemperature);
  response.push(temperature);
  if (temperature > lastTemperature) {
    response.push("温度が上昇しました");
  } else if (temperature < lastTemperature) {
    response.push("温度が低下しました");
  } else {
    response.push("温度は変わりませんでした");
  }
  setSensorData(temperature, lastSensorData + 1, response);
}

function getLastTemperature() {
  const sheet = getSheet('temperature');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return 0; // データが存在しない場合は 0 を返す（初回用）
  }
  const lastTemperature = sheet.getRange(lastRow, 2).getValue(); 
  return lastTemperature;
}
