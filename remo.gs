function getNatureRemoData(endpoint) {
  const REMO_ACCESS_TOKEN = "Write your Remo access token";
  const headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };

  const options = {
    "method" : "get",
    "headers" : headers,
  };
  try { // get request
    response = UrlFetchApp.fetch("https://api.nature.global/1/" + endpoint, options);
    return JSON.parse(response);
  } catch (e) { // error メッセージ表示
    Logger.log('Fetch failed: ' + e.toString());
    Logger.log("Cannot get remo device");
  }
}

function SensorData() {
 const deviceData = getNatureRemoData("devices");  //data取得  
  var arg = {
    te:deviceData[0].newest_events.te.val,  //温度
    hu:deviceData[0].newest_events.hu.val,  //湿度
    il:deviceData[0].newest_events.il.val,  //照度
  };
  return arg.te;
}