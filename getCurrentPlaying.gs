function getCurrentPlayingTrack(token){// 現在再生中のトラックの情報を取得
  data = currentPlaying(token)

  if(data == false) //再生している曲がないと終了
    return

  //曲情報を取得
  const track = data.item;
  const trackId = track.id;
  const trackName = track.name;
  const artistName = track.artists[0].name;

  // // 曲調を取得
  const audioFeatures = getAudioFeatures(trackId, token);
  const danceability = audioFeatures.danceability;
  const energy = audioFeatures.energy;
  const valence = audioFeatures.valence;
  
  recordPlay_info([trackId, trackName, artistName, danceability, energy, valence]);
}

function currentPlaying(token){
  url = 'https://api.spotify.com/v1/me/player/currently-playing';
  params = {
     method : "GET",
    headers : {'Authorization': 'Bearer ' + token}
  };

  try { // get request
    result = UrlFetchApp.fetch(url, params);
  } catch (e) { // error メッセージ表示
    Logger.log('Fetch failed: ' + e.toString());
    Logger.log("Cannot get current playing track");
    return;
  }

  if(Object.keys(result.getContentText()).length === 0 && result.constructor === Object){
    Logger.log("not playing music. please try again");
    return false;
  }
  data = JSON.parse(result.getContentText());
  return data;
}

// 曲調を取得
function getAudioFeatures(trackId, token) {
   url = `https://api.spotify.com/v1/audio-features/${trackId}`;
  params = {
     method : "GET",
    headers : {'Authorization': 'Bearer ' + token}
  };

  try { // get request
    result = JSON.parse(UrlFetchApp.fetch(url, params).getContentText());  
    Logger.log(result)
  } catch (e) { // error メッセージ表示
    Logger.log('Fetch failed: ' + e.toString());
    Logger.log("Cannot get audio features");
    return;
  }
  return result;
}
