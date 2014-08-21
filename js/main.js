(function(){

  'use strict';

  var myDataRef = new Firebase('https://mitch-sta-chat.firebaseio.com');

  $(document).ready(initialize);




  function initialize(){
    $('#messageInput').keypress(EnterInput);
    $('#enterButton').click(EnterInputOnClick);
    myDataRef.on('child_added', pullData);
    $('#nameInput').focus();
    $('#clearButton').click(clearChat);
  }



  function EnterInput(e){
    if (e.keyCode === 13) {
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      myDataRef.push({name: name, text: text});
      $('#messageInput').val('');
      $('#messageInput').focus();
    }
  }
  function EnterInputOnClick(){
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      myDataRef.push({name: name, text: text});
      $('#messageInput').val('');
      $('#messageInput').focus();
  }

  function pullData(snapshot){
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);

  }

  function displayChatMessage(name, text) {
    var $div = $('<div/>').addClass('messages');

    $div.text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  };

  function clearChat(){
    $('#messagesDiv').empty();
    myDataRef.set(null);
  }

})();
