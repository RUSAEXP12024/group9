const clientId = "3e0e529632e343919fb8e1024a7bb223";
const clientSecret = "440afa50166c43fcbe83b6780089131f";
const authorization_code = "AQDJsvneB5sKRu8VXp1d3AsDN_Mj24OHnwCb9SX3jKR8GcDHhJrELfjCywrwUtY01RFQDcCg3EOq6dL_N2Ws1iEwH0d5QriZ_HTUzTtVHlwv-jHsAQeycNAhHhGPOnmSXKKvrZP0ak27D97hSxLpEfoCwYel1lW16g"
const refresh_token = "AQB0en8ZJ6W7fsddYtHBKHC-V8QfKDRFYKSx8FlN8WiAlp0_Xk-yxS4VFzFKUcbymeXVOr4fZ_pPuWDZ4HgwHMn8rnr9PY7pGUvnF8czVu40xAXdbVHEtvISi_fdap7JhwE"

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
