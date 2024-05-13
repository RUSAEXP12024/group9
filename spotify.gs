function SpotifyFunction() {
  var clientId = "your client id"
  var clientSecret = "your client secret"

  authorization_code = "your code "

  var url = "https://accounts.spotify.com/api/token";
  /*
  var params = {
    method: "post",
    headers: { "Authorization": "Basic " + Utilities.base64Encode(clientId + ":" + clientSecret) },
    payload: { grant_type: "authorization_code", code : authorization_code, redirect_uri: "your spotify redirect uri"},
  };
  console.log(UrlFetchApp.fetch(url, params).getContentText())
  */
  refresh_token = "Write your Refresh Token"

  var params = {
    method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Basic " + Utilities.base64Encode(clientId + ":" + clientSecret)
      },
      payload : {
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
        
      },
  } 

  var response = UrlFetchApp.fetch(url, params);
  var access_token = JSON.parse(response.getContentText()).access_token;

    device = getDevice(access_token)
    if(device == false){
      console.log("Cannot find Available Device")
      return
    }
    device_id = "https://api.spotify.com/v1/me/player/play?device_id=" + device
    tmp = SensorData()
    playlist = getPlaylist(tmp)
    var body = {
      "context_uri": playlist,
    }
    var p = {
      method : "put",
      contentType : "application/json",
      headers : {'Authorization': 'Bearer ' + access_token},
      payload : JSON.stringify(body)
    };
    UrlFetchApp.fetch(device_id, p)
}

function getDevice(token){
  url = "https://api.spotify.com/v1/me/player/devices"
  var params = {
    method : "get",
    headers : {
    'Authorization': 'Bearer ' + token,
    "Content-Type" : "application/json;"},
    };
    device = JSON.parse(UrlFetchApp.fetch(url, params).getContentText()).devices
    console.log(device)
    if(Object.keys(device).length == 0)
      return false
    return JSON.parse(UrlFetchApp.fetch(url, params).getContentText()).devices[0].id
}

function getPlaylist(temperature){
  var playlist = {
    "spring": "spotify:playlist:6z6fhgl6T0S0Hpoa1HgUVp",
    "summer": "spotify:playlist:2db8MQ07n0i3HqvHJquTZr",
    "autumn": "spotify:playlist:4bg7Ot9mKUU5f6ZLOLnUME",
    "winter": "spotify:playlist:7tedBOXy75Nm8XcXojLYV8",
  }
  if(temperature <= 10)
    return playlist.winter
  else if(temperature <= 15)
    return playlist.autumn
  else if(temperature <= 25)
    return playlist.spring
  else 
    return playlist.summer
}

function getcurrentPlaylist(token, playlist){
  url = "https://api.spotify.com/v1/playlists/" + playlist
  var params = {
    method : "get",
    headers : {
    'Authorization': 'Bearer ' + token,
    },
  };
    
    var response = UrlFetchApp.fetch(url, params)
    var data = JSON.parse(response.getContentText());
    
    music_track = data.tracks.items;
    lastSheetData = getLastData("{Sheet_name}");
    for(let i = 0; i < music_track.length; i++){
    minutes = music_track[i].track.duration_ms / 1000
    minute = Math.floor(minutes / 60)
    second = Math.floor(minutes % 60)
    if(second < 10)
      play_time = minute + ": 0" + second
    else
      play_time = minute + ": " + second
    getSheet('Spotify').getRange(lastSheetData + i + 1, 1, 1, 4).setValues([[music_track[i].track.name, play_time, music_track[i].track.href, music_track[i].track.uri]])
    }
}
