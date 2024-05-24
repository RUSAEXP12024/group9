function createPlaylist(token) {
  userId = "315u7hmofjrwgimbh4gwocfypszm";
  url = "https://api.spotify.com/v1/users/" + userId + "/playlists";
  var body = {
    "name": " Season Playlist",
    "description": "Spotify with line",
    "public": false
  };
  var params = {
    method : "post",
    headers : {'Authorization': 'Bearer ' + token,
    contentType : "application/json",},
    payload : JSON.stringify(body),
  };
   
   try { // get request
     response = JSON.parse(UrlFetchApp.fetch(url, params).getContentText());
  } catch (e) { // error メッセージ表示
      Logger.log('Fetch failed: ' + e.toString());
      Logger.log("Cannot create playlist");
      return false;
  }
  return response.id;
}

function addPlaylist(token, playlistId, music_list){
  url = "https://api.spotify.com/v1/playlists/"+ playlistId + "/tracks"
  var body = {
      "uris" : [music_list],
      "position": 0,
  };
  var params = {
    method : "post",
    headers : {'Authorization': 'Bearer ' + token,
    contentType : "application/json",},
    payload : JSON.stringify(body),
  };
  
  try { // get request
    UrlFetchApp.fetch(url, params);
  } catch (e) { // error メッセージ表示
    Logger.log('Fetch failed: ' + e.toString());
    Logger.log("Cannot add music to playlist");
  }
}