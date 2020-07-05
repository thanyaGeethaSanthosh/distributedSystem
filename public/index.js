const getPlayerDetails = function () {
  const playerId = document.getElementById(`players`).value;
const fieldName = document.getElementById(`fields`).value;
const formatName = document.getElementById(`formats`).value;
sendXHR(JSON.stringify({}), `cricInfo/${playerId}/${fieldName}/${formatName}`, 'POST', function() {
  const id = this.response.split(":")[1];
document.getElementById(`requestId`).value=id;
  });
};

const getStatus = function(){
  const id = document.getElementById(`requestId`).value;
  sendXHR(JSON.stringify({}), `/status/${id}`, 'GET', function() {
    const res = JSON.parse(this.response);
    document.getElementById(`status`).innerText=` your request is ${res.status}`;
  });
};

const sendXHR = function(data, url, method, responseHandler) {
  const request = new XMLHttpRequest();
  request.open(method, url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(data);
  request.onload = responseHandler;
};

