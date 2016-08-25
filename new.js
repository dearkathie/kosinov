var UPDATES_URL = 'https://api.telegram.org/bot152495481:AAHOp1v7pz-cV3L2C-xiivqNi0qbVOOVNtQ/getUpdates';
var getUrlWithOffset;
var offset = null;

function createMessage(id_param, id_data) {
  var nodeFrom = document.createElement("LI");
  nodeFrom.setAttribute("class", id_param);
  var fromnode = document.createTextNode(id_data);
  nodeFrom.appendChild(fromnode);
  document.getElementById("myList").appendChild(nodeFrom);
}

function createURL() {
  if (offset === null) {
    getUrlWithOffset = UPDATES_URL;
  } else {
    getUrlWithOffset = UPDATES_URL + "?offset=" + offset;
  }
}

setInterval(function() {

createURL();

fetch(getUrlWithOffset)
  .then(
    function(response) {
      response.json().then(function(data) {
        for (var i = 0; i < data.result.length; i++) {

             var newName = data.result[i].message.from.first_name + ' ' + data.result[i].message.from.last_name;
             var newText = data.result[i].message.text;
             var resultLength = data.result[data.result.length - 1]

             createMessage("from", "From:");
             createMessage("name", newName);
             createMessage("message", "Message:");
             createMessage("text", newText);
           }

           if (resultLength != undefined) {
             offset = resultLength.update_id + 1;
           }
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error', err);
  });

}, 3000);
