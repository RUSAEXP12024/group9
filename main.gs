function main() {
  response = Spotify();

  if(response == false){
    Logger.log("Spotifyを実行してください");
    return;
  }

  token = response[0];
  temperature = response[1];
  device = response[2];
  playlist_uri = response[3]; //現在実行されているPlaylistのURI
  playlist = response[4];
  
  recordTemperature(temperature);
  input = user_input();
 
  switch(input[0]){
    case 1:
      Playmusic(token, device, playlist);
      getSheet("Spotify").clear();
      getcurrentPlaylist(token, playlist_uri);
      break;
    case 2:
      stopMusic(token, device);
      break;
    case 3:
      playNext(token, device); 
      break;
    case 4:
      playPrevious(token, device);
      break;
    case 5:
      playlistId = createPlaylist(token);
      Logger.log("New playlist id: " + playlistId);
      break;
    case 6:
      if(find_Uri(input[1]) == false)
        Logger.log("番号は範囲内で指定してください ");
      else
        addPlaylist(token, input[2], find_Uri(input[1]));
      break;
    case 7:
      getCurrentPlayingTrack(token);
      break;
    default:
      Logger.log("操作を間違いました。1~7の間の数字で入力してください");
      break;
  }
}

