//Code for the Google Appscript 


var SHEET_NAME = "test_app2";

var SCRIPT_PROP = PropertiesService.getScriptProperties(); 


//function doGet(e){
 // return handleResponse(e);
//}

function doPost(e){

  return handleResponse(e);
}

function handleResponse(e) {
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);

  try {
   
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
    var sheet = doc.getSheetByName(SHEET_NAME);

    var headRow = e.parameter.header_row || 1;
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow()+1;
    var row = [];
    
    for (i in headers){
      if (headers[i] == "Timestamp"){ 
        row.push(new Date());
      } else { 
        row.push(e.parameter[headers[i]]);
      }
    }
    
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    
    return ContentService
          .createTextOutput(JSON.stringify({"result":"success", "email": e.parameter[headers[i]]}))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(e){
    
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": e}))
          .setMimeType(ContentService.MimeType.JSON);
  } finally { 
    lock.releaseLock();
  }
}

function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty("key", doc.getId());
}

function edit_number(e) {
  var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
  var sheet = doc.getSheetByName(SHEET_NAME);
  var data =  sheet.getDataRange().getValues();
  var eemail = Session.getActiveUser().getEmail();
  Logger.log(eemail);
  
  
  
  for(n=1; n<data.length ;++n)
    { if(data[n][1]== eemail )
     { Logger.log(data[n]);
      var dataCell = sheet.getRange("B:B").getCell(n+1,1);
      dataCell.setValue(e.parameter["phoneno"]);
    }
  }
  
 
}
function getemail() {
var eemail = Session.getActiveUser().getEmail();
return eemail; }

function getid()
{ var scriptID = ScriptApp.getScriptId();
  Logger.log(scriptID);
}



