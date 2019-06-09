var properties = PropertiesService.getScriptProperties();
var webhook_url = properties.getProperty("WEBHOOK_URL");
var username = properties.getProperty("USERNAME");
var post_channel = properties.getProperty("POST_CHANNEL");
var icon_image = properties.getProperty("ICON_IMAGE");
var sheet_id = properties.getProperty("SHEET_ID");

function PostSlackMessage(_text, _attachment){
  var jsonData =
  {
    "channel": post_channel,
    "username" : username,
    "icon_emoji": icon_image,
    "text" : _text,
    "attachments": _attachment,
    "link_names": true,
  };
  var payload = JSON.stringify(jsonData);

  var params =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };

  UrlFetchApp.fetch(webhook_url, params);
}

function PostGameSchedule() {
  const current_time = new Date();
  Logger.log(current_time);
  const games = GetComingUpGames(current_time);

  if(games.length == 0){
    Logger.log("Upcoming Game not found.");
    return null;
  }
  
  const attach_fields = games.map(function(game){
    return {
      "title": game.id + " " + game.game_date.toLocaleString('Asia/Tokyo'),
      "value": game.title,
      "short": false,
    };
  });
  const attachment = [{
    "fallback": "本日のお品書き",
    "pretext": "",
    "color": "good",
    "fields": attach_fields,
  }]
  Logger.log(attachment);
  PostSlackMessage("@channel 本日のお品書き", attachment);
}

function GetComingUpGames(current_time){
  const sheets = SpreadsheetApp.openById(sheet_id).getSheets();
  const challenge_sheets = sheets.filter(IsChallengeSheet);
  const target_rows = flatten(challenge_sheets.map(function(sheet){
    return GetTargetRows(sheet, current_time);
  }));
  Logger.log(target_rows);
  
  const target_games = target_rows.map(function(row){
    return {
      "id": row[0],
      "game_date": row[1],
      "title": row[11]
    };
  });
  return target_games;
}

function IsChallengeSheet(sheet){
  const sheet_name = sheet.getName();
  const regexp = /Challenges@R\d+/;
  return regexp.test(sheet_name);
}

function GetTargetRows(sheet, current_time){
  const arr = sheet.getDataRange().getValues();
  const date_idx = 1; // B列
  return arr.filter(function(row){
    const row_date = row[date_idx];
    const row_time = new Date(row_date);
    const diff_day = diffDay(current_time, row_time);
    return 0 <= diff_day && diff_day < 1;
  });
}