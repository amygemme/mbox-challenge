var fs = require("fs");


fs.readFile("mbox_example", "utf8", function (error, data) {
  if (error) {
    return console.log(error);
  }
  ///============code to split the emails data by lines ===//
  var dataArr = data.split("\n");
  //  var dataArr2 = data.split("From ")
  var from_line = [];

  //=== this code will check for the start of a new email and store the index in an arra. 
  for (i = 0; i < dataArr.length; i++) {
    if (dataArr[i].match(/From /g)) {
      from_line.push(i)  // replace all of this code with .findIndex
      console.log("from lines")
      console.log(from_line);
    }
  }

  function isNull(element) {
    return element == '';
  }
  function isDash(element) {
    return element == "-- ";
  }

  //=== Code to split the array into seperate arrays with one email in each one==// 
  var email = [];
  var blank = [];
  var dash = [];
  for (i = 0; i < from_line.length; i++) {
    let newarray = dataArr.slice(from_line[i], from_line[i + 1])
    blank[i] = newarray.findIndex(isNull);
    // console.log("blank" + blank);  // array with values for the first blank line
    dash[i] = newarray.findIndex(isDash);
    //console.log("dash" + dash);
    email[i] = newarray;
  }

  // this line will create a new empty file
  fs.openSync("mbox_reverse.txt", 'w');

  // ==== code to split each email into 3 arrays the middle will be reversed and then they will be put back together
  var emailArr = [];
  var emailArr_header = []
  var emailArr_footer = []
  for (i = 0; i < email.length; i++) {
    let emailArr_header = email[i];
    let emailArr_message = emailArr_header.splice(blank[i] + 1);
    let emailArr_footer = emailArr_message.splice(dash[i] - blank[i] - 1)
    let email_reverse = emailArr_message.reverse();
    let new_email = emailArr_header.concat(email_reverse.concat(emailArr_footer));
    console.log(new_email);
    let text = new_email.join('\n');

    // try this code to write text..
    fs.appendFile('mbox_reverse.txt', text, function (err) {
      if (err) {
        // append failed
      } else {
        // done
      }
    })
  }

})
