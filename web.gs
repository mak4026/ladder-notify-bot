function doGet() {
  let t = HtmlService.createTemplateFromFile("index");
  return t.evaluate();
}

function GetUpcomingGamesAll(){
  const utc_time = new Date(2020, 1, 15, 15).getTime()
  const current_time = new Date();
  current_time.setTime(utc_time);
  const master_sheet = SpreadsheetApp.openById(master_sheet_id);
  const sheet_id = getCurrentSeasonMasterSheetId(master_sheet);
  const games = GetComingUpGames(current_time, sheet_id, Number.MAX_SAFE_INTEGER);
  return JSON.stringify(games);
}