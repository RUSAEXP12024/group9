function getSheet(name) {
  const SPREADSHEET_ID = "your spread sheet id";
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(name);

  if (!sheet) {
    throw new Error('シートが見つかりません');
  }
  return sheet;
}

function getLastData(name) {
  return getSheet(name).getDataRange().getValues().length;
}

function find_Uri(index){
  start_row = 2;
  start_col = 1;
  last_row = getSheet('spotify').getLastRow();
  last_col = 4;
  
  var data = getSheet('spotify').getRange(start_row, start_col, last_row, last_col).getValues();

  for(let i = 0; i < data.length; i++){
    if(i + 1 == index - 1){
      return data[i][3];
    }
  }
  return false;
}

function user_input(){
  last_row = getLastData("input");
  start_row = last_row;
  start_col = 1;
  last_col = 3;
  data = getSheet('input').getRange(start_row, start_col, last_row, last_col).getValues();
  return data[0];
}
