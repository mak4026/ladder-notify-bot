function doGet(e) {
  var htmlTemplate = HtmlService.createTemplateFromFile("index");
  htmlTemplate.games = GetUpcomingGamesAll(new Date(2020, 1, 15, 15));
  return htmlTemplate.evaluate();
}

function GetUpcomingGamesAll(current_time){
  Logger.log("Start Time: %s", current_time);
  const master_sheet = SpreadsheetApp.openById(master_sheet_id);
  const sheet_id = getCurrentSeasonMasterSheetId(master_sheet);
  const games = GetComingUpGames(current_time, sheet_id, Number.MAX_SAFE_INTEGER);
  Logger.log("Target Games: %s", games);
  return games;
}