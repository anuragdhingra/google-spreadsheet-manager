EASE SHEETS 
===
<i class="fa fa-file-text"></i> **Ease Sheets** is a serverless WebApp to simplify the entire process of insertion, updation or deletion of data in **Google SpreadSheets**, directly through a single page web-app(SPA).
This application is being developed for inhouse use of Monstar Lab Inc.
Note that the current version of the app is just for demo purposes and to checkout the entire code visit [GitHub](https://github.com/risingone/spreadsheet-test_app). 

## Languages Used
- Javascript
- AJAX
- jQuery
- HTML & CSS
> Angular JS/(React + Redux) may be used to develop the original application. 
## API Used 
- [Google Spreadsheet API v4](https://developers.google.com/sheets/)
 
Google spreadsheet API is used for reading,appending and updating data to a spreadsheet from an external web-app using the following methods - 
    
**GET method** : To read and search for all the data corresponding to the user logged-in. 

```javascript=149
 gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1KJE9_ED-ZRCUMTRHYW-25hQjhz-sWqdgRciJY9XzPv0',
          range: 'A:D',
        })
```


**APPEND method** : To append new data into the spreadsheet. 

```javascript=149
 gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: '1KJE9_ED-ZRCUMTRHYW-25hQjhz-sWqdgRciJY9XzPv0',
            range: 'B:D',
            resource: requestJson,
            valueInputOption: 'USER_ENTERED'
        })
```
**UPDATE method** : To update the data in the spreadsheet, here users are restricted to update any data other than the one corresponding to their logged-in email address. 

```javascript=180
gapi.client.sheets.spreadsheets.values.update({
            spreadsheetId: '1KJE9_ED-ZRCUMTRHYW-25hQjhz-sWqdgRciJY9XzPv0',
            range:range_id,
            valueInputOption: 'USER_ENTERED',
             values:[[h]]
        })
```
    
    
        

- [Google App Script Execution API](https://developers.google.com/apps-script/guides/rest/api)

Google App Script Execution API is used to deploy any Google Appscript side funtion i.e Server side functions on the client side/application side, ***getemail()*** in our case using the following **RUN** method : 

```javascript=180
 gapi.client.script.scripts.run({
          'scriptId': scriptId,
          'resource': {
            'function':'getemail'
          }
        })
```

Getting Started
===
To get started with the app, clone the repo and request edit access to the following spreadsheet - [test_app2](https://docs.google.com/spreadsheets/d/1KJE9_ED-ZRCUMTRHYW-25hQjhz-sWqdgRciJY9XzPv0/edit#gid=0) and jump to the step of **Running the app on local server** or if want to create your own spreadsheet and do the following:

## Spreadsheet id 
#### Changing spreadsheet id for your app:
>For example, if this is the url of the spreadsheet -
>https://docs.google.com/spreadsheets/d/==1KJE9_ED-ZRCUMTRHYW-25hQjhz-sWqdgRciJY9XzPv0==/edit#gid=0
>the highlighted portion is your **spreadsheet id**.
```javascript=150
 spreadsheetId: 'Your Spreadsheet id',// spreadsheet-api.js
```


## Script id 
#### Getting script id for your app:
Once spreadsheet is created open the spreadsheet, go in **Tools** > **Script editor**. 

Now, copy-paste the following code into the script editor.

```javascript
function getemail() {
var eemail = Session.getActiveUser().getEmail();
return eemail; }

function getid()
{ var scriptID = ScriptApp.getScriptId();
  Logger.log(scriptID);
}
```
After this save the code and **run** the ***getid()*** method.Now go to **View** > **Logs** , copy the long aplha-numeric generated in the logs, that is your **script id**.
#### Changing script id for your app:
```javascript=91
 var scriptId = "Your script id";// spreadsheet-api.js
```

#### Publishing your app :
After this go to : **File** > **Manage Versions** > **Save new version** > **OK**
For publishing the app go to: **Publish**> **Deploy as API executable** > **Select the latest version** > **Deploy** 

>Make sure the both the API mentioned above in the **"API used"** section are enabled. You can check it [here](https://console.developers.google.com).

## Client id

Simple go to the [Developer Console](https://console.developers.google.com/), select your project and copy the corresponding **client id** and change it here:

```javascript=3
 var CLIENT_ID = 'Your Client id'; //spreadsheet-api.js
```

All set for now as you just need to run your app in a local environment.

## Running the app on a local server :
Next, to run the application you need to create a local server. For this, you can use the inbuilt Simple HTTP Server in python and run the following command in your terminal.
```python=
python -m SimpleHTTPServer 8000 
```
>Python version 2._ should be installed to use the following command.

Once the local server is fired,run the application on [localhost](http://localhost:8000/),according to the port used(http://localhost:8000 in this case).

![](https://i.imgur.com/A7W4sCL.png)

 
Once everything starts working fine you'll see something like this in the screenshot above.
Start with signing in with your @monstar-lab.com id and once signed in insert/update a particular record only corresponding to your id.

![](https://i.imgur.com/aop8Aaa.png)


Once you're successfully logged in you'll see the current user and the corresponding record to that user.
You can also see the newly added/updated record after refreshing the page. 








