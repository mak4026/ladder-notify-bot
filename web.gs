function doGet() {
  let t = HtmlService.createTemplateFromFile("index");
  const current_time = new Date(2020, 1, 15, 15);
  t.games = GetUpcomingGamesAll(current_time);
  return t.evaluate();
}

function GetUpcomingGamesAll(current_time){
  Logger.log("Start Time: %s", current_time);
  const master_sheet = SpreadsheetApp.openById(master_sheet_id);
  const sheet_id = getCurrentSeasonMasterSheetId(master_sheet);
  const games = GetComingUpGames(current_time, sheet_id, Number.MAX_SAFE_INTEGER);
  Logger.log("Target Games: %s", games);
  return games;
}