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