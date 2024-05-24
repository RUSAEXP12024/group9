function Playmusic(token, device, playlist){
  url = "https://api.spotify.com/v1/me/player/play?device_id=" + device;
    var body = {
    "context_uri":  playlist,
  };
  var params = {
    method : "put",
    contentType : "application/json",
    headers : {'Authorization': 'Bearer ' + token},
    payload : JSON.stringify(body)
  };

   try { // get request
      UrlFetchApp.fetch(url, params);
  } catch (e) { // error メッセージ表示
      Logger.log('Fetch failed: ' + e.toString());
      Logger.log("Cannot play music");
  }
}

function getPlaylist(temperature){
   var playlist = {
    "spring": "spotify:playlist:37i9dQZF1DX6jhLZd8I8Wh",
    "summer": "spotify:playlist:37i9dQZF1DWSUbEozh68df",
    "autumn": "spotify:playlist:37i9dQZF1DWSNsgRcxy0mH",
    "winter": "spotify:playlist:37i9dQZF1DWTZMm3WdVVwc",
  };
  if(temperature <= 10)
    return playlist.winter;
  else if(temperature <= 15)
    return playlist.autumn;
  else if(temperature <= 25)
    return playlist.spring;
  else 
    return playlist.summer;
}

function getcurrentPlaylist(token, playlist){
  url = "https://api.spotify.com/v1/playlists/" + playlist;
  var params = {
    method : "get",
     headers : {
    'Authorization': 'Bearer ' + token,
    },
  };

  try { // get request
     response = UrlFetchApp.fetch(url, params);
  } catch (e) { // error メッセージ表示
    Logger.log('Fetch failed: ' + e.toString());
    Logger.log("Cannot get current playlist");
    return;
  }

  var ls = [];
  var data = JSON.parse(response.getContentText());
  music_track = data.tracks.items;
  recordCurrentPlaylist(music_track);
}

function stopMusic(token, deviceId){
  url = "https://api.spotify.com/v1/me/player/pause?device_id=" + deviceId;
  var params = {
    method: "put",
    headers : {'Authorization': 'Bearer ' + token}
  };

  try { // get request
    UrlFetchApp.fetch(url, params);
  } catch (e) { // error メッセージ表示
    Logger.log('Fetch failed: ' + e.toString());
    Logger.log("Cannot stop music");
  }
}

function playNext(token, deviceId){
  url = "https://api.spotify.com/v1/me/player/next?device_id=" + deviceId;
   var params = {
    method: "post",
    headers : {'Authorization': 'Bearer ' + token}
  };

  try { // get request
    UrlFetchApp.fetch(url, params);
  } catch (e) { // error メッセージ表示
    Logger.log('Fetch failed: ' + e.toString());
    Logger.log("Cannot play next");
  }
}

function playPrevious(token, deviceId){
  url = "https://api.spotify.com/v1/me/player/previous?device_id=" + deviceId;
  var params = {
  method: "post",
  headers : {'Authorization': 'Bearer ' + token}
  };

  try { // get request
    UrlFetchApp.fetch(url, params);
  } catch (e) { // error メッセージ表示
    Logger.log('Fetch failed: ' + e.toString());
    Logger.log("Cannot play previous");
  }
}

