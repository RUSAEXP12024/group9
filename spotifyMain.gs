const clientId = "your client id";
const clientSecret = "your client secret";
const authorization_code = "your authorization code"
const refresh_token = "your refresh token "

function Spotify() {
  //refresh_token = getRefreshToken() /* 最初に実行するときはauthorization_codeをrefresh_tokenと交換　*/ 
  access_token = getAccessToken(refresh_token);
  device = getDevice(access_token);
  if(device == false){
    console.log("Cannot find Available Device");
    return false;
  }

  temperature = SensorData();
  playlist = getPlaylist(temperature);
  playlist_url = playlist.split(":"); // playlist_urlを:で区別
  return [access_token, temperature, device, playlist_url[2], playlist];
}
