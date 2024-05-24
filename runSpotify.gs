const clientId = "your spotify clientId";
const clientSecret = "your spoticy clientSecret";
const authorization_code = "spotify Oauth code"
const refresh_token = "spotify refresh token (get refresh tokenの関数で求めたものを利用)"

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
