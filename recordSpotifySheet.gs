function recordPlay_info(info){
  last_row = getLastData("play_info");
  Logger.log([info[0], info[1], info[2], info[3],info[4], info[5]]);
  getSheet('play_info').getRange(last_row + 1, 1, 1, 6).setValues([[info[0], info[1], info[2], info[3],info[4], info[5]]]);
}

function recordCurrentPlaylist(music){
  lastSheetData = getLastData("Spotify");
  getSheet('Spotify').getRange(1, 1, 1, 4).setValues([["曲名","Play Time","url","track_uri"]]);

  for(let i = 0; i < music_track.length; i++){ //曲情報をspread sheetに記入
    minutes = music_track[i].track.duration_ms / 1000;
    minute = Math.floor(minutes / 60);
    second = Math.floor(minutes % 60);
    if(second < 10)
      play_time = minute + ": 0" + second;
    else
      play_time = minute + ": " + second;
    getSheet('Spotify').getRange(i + 2, 1, 1, 4).setValues([[music_track[i].track.name, play_time, music_track[i].track.href, music_track[i].track.uri]]);
  }
}