const properties = PropertiesService.getScriptProperties();
const webhook_url = properties.getProperty("WEBHOOK_URL");
const username = properties.getProperty("USERNAME");
const post_channel = properties.getProperty("POST_CHANNEL");
const icon_image = properties.getProperty("ICON_IMAGE");
const sheet_id = properties.getProperty("SHEET_ID");

function PostSlackMessage(_text, _attachment, _debug){
  var jsonData =
  {
    "username" : username,
    "icon_emoji": icon_image,
    "text" : _text,
    "attachments": _attachment,
    "link_names": true,
  };
  
  if(!_debug){
    Logger.log("production post");
    jsonData["channel"] = post_channel;
  }
  
  var payload = JSON.stringify(jsonData);

  var params =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };

  UrlFetchApp.fetch(webhook_url, params);
}

function PostGameScheduleTrigger(){
  const current_time = new Date();
  PostGameSchedule(current_time);
}

function PostGameSchedule(current_time, _debug) {
  Logger.log("Start Time: %s", current_time);
  const games = GetComingUpGames(current_time);
  Logger.log("Target Games: %s", games);

  if(games.length === 0){
    Logger.log("Upcoming Game not found.");
    return null;
  }
  
  const attachment = createAttachments(games);
  Logger.log(attachment);
  PostSlackMessage(
    "@channel 本日のお品書きはこちら！\n" +
    "*" + games.length + "本* の試合が予定されているぞ！", attachment, _debug);
}

function GetComingUpGames(current_time){
  const sheets = SpreadsheetApp.openById(sheet_id).getSheets();
  const challenge_sheets = sheets.filter(IsChallengeSheet);
  const target_rows = flatten(challenge_sheets.map(function(sheet){
    return GetTargetRows(sheet, current_time);
  }));
  Logger.log("target rows: %s", target_rows);
  
  const target_games = target_rows.map(function(row){
    return {
      "id": row[0],
      "tier": getTierFromGameId(row[0]),
      "game_date": row[3],
      "title": row[9]
    };
  }).sort(function(a, b){
    const date = a["game_date"].getTime() - b["game_date"].getTime();
    if(date !== 0){
      return date;
    }
    return idCompare(a["id"], b["id"]);
  });
  return target_games;
}

function IsChallengeSheet(sheet){
  const sheet_name = sheet.getName();
  const regexp = /^対戦表.*/;
  return regexp.test(sheet_name);
}

function GetTargetRows(sheet, current_time){
  const arr = sheet.getDataRange().getValues();
  const date_idx = 3; // D列
  return arr.filter(function(row){
    const row_date = row[date_idx];
    const row_time = new Date(row_date);
    const diff_day = diffDay(current_time, row_time);
    return 0 <= diff_day && diff_day < 1;
  });
}