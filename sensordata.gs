function recordSensorData() {
  const deviceData = getNatureRemoData("devices");　　　　//data取得
  const lastSensorData = getLastData("sensor");　　　　　//最終data取得
  const lastTemperature = getLastTemperature();    // 前回の温度データ取得
  let season = 0


  var arg = {
    te:deviceData[0].newest_events.te.val,　　//温度
    hu:deviceData[0].newest_events.hu.val,　　//湿度
    il:deviceData[0].newest_events.il.val,　　//照度
    timestamp: deviceData[0].newest_events.timestamp  //時刻データ
  }
  //温度によって違う結果を出力
  if(lastTemperature < 10){

     season = 1 

  }else if(lastTemperature <= 15 ){

     season = 2

  }else if (lastTemperature <= 25){

     season = 3

  }else{

      season = 4
    
  }
  if(arg.te < 10){
    if(season == 1){
      Logger.log("季節が変わっていない")
    
    }

    Logger.log("冬") 

  }else if(arg.te <= 15 ){
    if(season == 2){
      Logger.log("季節が変わっていない")
    
    }

    Logger.log("秋")

  }else if (arg.te <= 25){
    if(season == 3){
      Logger.log("季節が変わっていない")  
      
      }

    Logger.log("春")

  }else{
    if(season == 4){
      Logger.log("季節が変わっていない")
      
    }

    Logger.log("冬")
    
  }
 // 前回の温度と現在の温度の比較をログに記録
 
  Logger.log("前回の温度: " + lastTemperature);
  Logger.log("現在の温度: " + arg.te);
  if (arg.te > lastTemperature) {
    Logger.log("温度が上昇しました");
  } else if (arg.te < lastTemperature) {
    Logger.log("温度が低下しました");
  } else {
    Logger.log("温度は変わりませんでした");
  }

  

  setSensorData(arg, lastSensorData + 1);
}
function getLastTemperature() {
  const sheet = getSheet('sensor');
  const lastRow = sheet.getLastRow();
  if (lastRow < 1) {
    return 0; // データが存在しない場合は 0 を返す（初回用）
  }
  const lastTemperature = sheet.getRange(lastRow, 2).getValue(); 
  return lastTemperature;
}
function setSensorData(data, row) {
  getSheet('sensor').getRange(row, 1, 1, 4).setValues([[new Date(), data.te, data.hu, data.il]])
}
