function getRefreshToken(){
   var url = "https://accounts.spotify.com/api/token";

  var params = {
    method: "post",
    headers: { "Authorization": "Basic " + Utilities.base64Encode(clientId + ":" + clientSecret) },
    payload: { grant_type: "authorization_code", code : authorization_code, redirect_uri: "http://localhost:4000"},
  };

  try { // get request
    var response = UrlFetchApp.fetch(url, params)
  } catch (e) { // error メッセージ表示
    Logger.log('Fetch failed: ' + e.toString());
    Logger.log("Cannot get refresh token");
    return;
  }
  var result = JSON.parse(response.getContentText());
  return result.refresh_token;
}

function getAccessToken(){
  var url = "https://accounts.spotify.com/api/token";
  var params = {
  method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Basic " + Utilities.base64Encode(clientId + ":" + clientSecret)
    },
    payload : {
      grant_type: 'refresh_token',
      refresh_token: refresh_token,    
    },
  } ;
  
  try { // get request
    var response = UrlFetchApp.fetch(url, params);  
  } catch (e) { // error メッセージ表示
    Logger.log('Fetch failed: ' + e.toString());
    Logger.log("Cannot get access token");
    return;
  }

  var access_token = JSON.parse(response.getContentText()).access_token;
  return access_token;
}

function getDevice(token){
  url = "https://api.spotify.com/v1/me/player/devices";
  var params = {
    method : "get",
     headers : {
    'Authorization': 'Bearer ' + token,
    "Content-Type" : "application/json;"},
    };

  try { // get request
    var response = UrlFetchApp.fetch(url, params);
  } catch (e) { // error メッセージ表示
    Logger.log('Fetch failed: ' + e.toString());
    Logger.log("Cannot get device");
    return;
  }
  device = JSON.parse(response.getContentText()).devices;

  if(Object.keys(device).length == 0) // deviceがないとき
    return false
    
  return JSON.parse(UrlFetchApp.fetch(url, params).getContentText()).devices[0].id;
}
