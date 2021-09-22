/*************************************************************************
         (C) Copyright AudioLabs 2017

This source code is protected by copyright law and international treaties. This source code is made available to You subject to the terms and conditions of the Software License for the webMUSHRA.js Software. Said terms and conditions have been made available to You prior to Your download of this source code. By downloading this source code You agree to be bound by the above mentionend terms and conditions, which can also be found here: https://www.audiolabs-erlangen.de/resources/webMUSHRA. Any unauthorised use of this source code may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible under law.

**************************************************************************/


function DataSender(config, searchParams) {
  this.params = new URLSearchParams(searchParams);
  this.target = config.remoteService;
  this.models = config.meaning.models;
  this.dir = config.meaning.webmushra_dir;
  this.testname = config.testId
}

DataSender.prototype.send = async function(_session) {
  // Add the ids provided by prolific in query params to the JSON we're sending
  payload = {}
  payload["session"] = _session;
  ["PROLIFIC_PID", "STUDY_ID"].forEach(param => {
    payload[param] = this.params.get(param);
  })
  payload["SESSION_ID"] = this.params.get("SESSION_ID")

  // Add the path to the config 
  payload["config"] = `s3://${location.hostname}/configs/default.yaml`

  var payloadJSON = JSON.stringify(payload);

  var httpReq = new XMLHttpRequest();
  try {
    httpReq.open("POST", config.remoteService, false);  // synchron
    httpReq.setRequestHeader("Content-type", "application/json");
    httpReq.send(payloadJSON);
  }
  catch (e) {
    console.log(httpReq.responseText);
    return true;
  }
  // if(httpReq.responseText != "" || httpReq.status != 200){
  if(httpReq.responseText != "") {
    console.log(httpReq.responseText);
  }
  if(httpReq.status != 200){
    return true;
  }else{
    return false;
  }
};
