
   // Client ID and API key from the Developer Console
      var CLIENT_ID = '949060238788-q42si91ha39350kcjc11gip4oc310s0k.apps.googleusercontent.com';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://script.googleapis.com/$discovery/rest?version=v1","https://sheets.googleapis.com/$discovery/rest?version=v4"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets';

      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          discoveryDocs: DISCOVERY_DOCS,
          clientId: CLIENT_ID,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          callScriptFunction(); listMajors();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message);
        pre.appendChild(textContent);
      }

      /**
       * Load the API and make an API call.  Display the results on the screen.
       */
       var user_email;
      function callScriptFunction() {
        var scriptId = "1UJVkKy8dR8s-Po3lLdiBAcCGd1aqXMMmiT_1m5H7HkY2nPiyC9N9tcnN";

        // Call the Execution API run method
        //   'scriptId' is the URL parameter that states what script to run
        //   'resource' describes the run request body (with the function name
        //              to execute)
        gapi.client.script.scripts.run({
          'scriptId': scriptId,
          'resource': {
            'function':'getemail'
          }
        }).then(function(resp) {
          var result = resp.result;
          if (result.error && result.error.status) {
            // The API encountered a problem before the script
            // started executing.
            appendPre('Error calling API:');
            appendPre(JSON.stringify(result, null, 2));
          } else if (result.error) {
            // The API executed, but the script returned an error.

            // Extract the first (and only) set of error details.
            // The values of this object are the script's 'errorMessage' and
            // 'errorType', and an array of stack trace elements.
            var error = result.error.details[0];
            appendPre('Script error message: ' + error.errorMessage);

            if (error.scriptStackTraceElements) {
              // There may not be a stacktrace if the script didn't start
              // executing.
              appendPre('Script error stacktrace:');
              for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
                var trace = error.scriptStackTraceElements[i];
                appendPre('\t' + trace.function + ':' + trace.lineNumber);
              }
            }
          } else {
            // The structure of the result will depend upon what the Apps
            // Script function returns. Here, the function returns an Apps
            // Script Object with String keys and values, and so the result
            // is treated as a JavaScript object (folderSet).

            var folderSet = result.response.result;
            user_email =folderSet;
            if (Object.keys(folderSet).length == 0) {
                appendPre('No folders returned!');
            } else {
              appendPre('User - ' + folderSet);
              appendPre('\n');
              appendPre('\n');
              
            }
          }
        });
      }

      var roww;
      function listMajors() {
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: '1KJE9_ED-ZRCUMTRHYW-25hQjhz-sWqdgRciJY9XzPv0',
          range: 'A:D',
        }).then(function(response) { var c=0;
          var range = response.result;
          if (range.values.length > 0) {
            //appendPre('namea, phone, message');
            for (i = 0; i < range.values.length; i++) { 
              var row = range.values[i]; c++;
              // Searches for a particular record with the person logged in as and displays that row in the spreadhsheet. 
              if(row[1]===user_email)
              {
                 appendPre(row[0] + ' ' + row[1] + ' ' + row[2] + ' ' + row[3] + ' ' + i); roww= i+1;
                 var node = document.createElement("a");
                 node.setAttribute("class","btn btn-success btn-lg");
                 node.setAttribute("id",roww);
                 node.setAttribute("style","float:right;");
                 node.setAttribute("onclick","getrowid(this.id)");
                 node.setAttribute("href","#portfolioModal2");
                 node.setAttribute("data-toggle","modal");
                 var textnode = document.createTextNode("Update");
                 node.appendChild(textnode);
                 document.getElementById("content").appendChild(node);
                 appendPre('\n');
                  appendPre('\n');

              }
            }
          } else {
            appendPre('No data found.');
          }
        }, function(response) { 
          appendPre('Error: ' + response.result.error.message);
        });
      }



      function updateData(h,row_no) { 
        var row_id = 'C' + row_no;
        var range_id = row_id + ':' + row_id;
        var nvalue = '"' + h + '"'; 
        console.log(range_id);
        console.log(nvalue);
        gapi.client.sheets.spreadsheets.values.update({
            spreadsheetId: '1KJE9_ED-ZRCUMTRHYW-25hQjhz-sWqdgRciJY9XzPv0',
            range:range_id,
            valueInputOption: 'USER_ENTERED',
             values:[[h]]
           
        }).then(function(response) {
            console.log(response);
        });
        refreshPage();
        return false;
      }


      function appendNewData(n,pn,msg) { 
        console.log(n);
        var final = '{values : [["' + ' "' + ',"' + n + '"' + ',"' + pn + '"' + ',"' + msg + '"]] }' ;  

        var requestJson =final; // this method doesnt maps the data to a particular header or coloumn of the spreadsheets
        gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: '1KJE9_ED-ZRCUMTRHYW-25hQjhz-sWqdgRciJY9XzPv0',
            range: 'B:D',
            resource: requestJson,
            valueInputOption: 'USER_ENTERED'
        }).then(function(response) {
            console.log(response);
        });

        return false;
      }

      function getAddFormData()
      {
        var n = document.getElementById('email_add').value;
        var pn = document.getElementById('phoneno').value;
        var msg = document.getElementById('mess').value;
        appendNewData(n,pn,msg);
        return false;

      }

      var current_row;

      function getrowid(id)
      {
        current_row = id;
      }

      function getUpdateFormData()
      {
        var h = document.getElementById('newphoneno').value;
        updateData(h,current_row);
        return false;

      }

      function refreshPage()
      {
        window.location.href = "/easesheets";
      }

      function get_row()
      {
        // Loop and create number of buttons in lis majors and allocate the id/name of button dynamically. And, fire this function when the button is clicked and get the id of the button. Send the same row id to Update function.
      }

