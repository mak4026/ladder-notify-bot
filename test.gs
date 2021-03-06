function TestPostSlackMessage(){
  PostSlackMessage("hoge", null, true);
}

function TestIdCompare(){
  Logger.log(idCompare("[1-02]","[1-12]"));
}

function TestPostGameSchedule(){
  const current_time = new Date(2020, 1, 15, 15);
  PostGameSchedule(current_time, true);
}

function TestSplitGamesByDate(){
  const current_time = new Date(2019, 5, 13, 15);
  const master_sheet = SpreadsheetApp.openById(master_sheet_id);
  const sheet_id = getCurrentSeasonMasterSheetId(master_sheet);
  const games = GetComingUpGames(current_time, sheet_id);
  const splited_games = splitGamesByDate(games);
  Logger.log(splited_games);
}

function TestCreateAttachments(){
  const current_time = new Date(2019, 5, 13, 15);
  const master_sheet = SpreadsheetApp.openById(master_sheet_id);
  const sheet_id = getCurrentSeasonMasterSheetId(master_sheet);
  const games = GetComingUpGames(current_time, sheet_id);
  const attachments = createAttachments(games);
  Logger.log(attachments);
}

function TestGetCurrentSeasonMasterSheetId(){
  const master_sheet = SpreadsheetApp.openById('1J0Grshv4pjuPFuJSS51PF2AAvc4iwws50X0HExm8mjU');
  const res = getCurrentSeasonMasterSheetId(master_sheet);
  Logger.log(res);
}