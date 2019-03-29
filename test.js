var fs = require("fs");

fs.readFile("mbox.full", "utf8", function (error, data) {
  if (error) {
    return console.log(error);
  }
  ///code to split the email data by new line breaks and put it into an array ===//
  var dataArr = data.split("\n");
  //  console.log(dataArr)

  var from_line = [];
  // create array to store the index of a new From Line
  for (i = 0; i < dataArr.length; i++) {
    if (dataArr[i].match(/From /g)) {
      from_line.push(i)
    }
  };
 // console.log(dataArr);
  var email = [];
  var emailLength = [];
  var blank = [];
  var dash = [];
  // create an array of arrays, with each element containing one email
  // create an array storing the first index of a blank line
  // loop through to store the rest of the emails in the array 

  for (i = 0; i < from_line.length; i++) {
    let newarray = dataArr.slice(from_line[i], from_line[i + 1])
    blank[i] = newarray.findIndex(isNull);
    // console.log("blank" + blank);  // array with values for the first blank line
    dash[i] = newarray.findIndex(isDash);
    //console.log("dash" + dash);
    email[i] = newarray;
    emailLength[i]=newarray.length;
  }
  console.log("from lines");
  console.log(from_line);
  console.log("blank lines");
  console.log(blank);
  console.log("footer exist here");
  console.log(dash);
  console.log("email length");
  console.log(emailLength);
console.log(email[4]);
 // console.log("first email");
 // console.log(email[0]);

  function isNull(element) {
    return element == '';
  }
  function isDash(element) {
    return element == "-- ";
  }

  // console.log(email)
  // creates a blank file
  fs.openSync("mbox_reverse.txt", 'w');
  // ==================== REVERSE CODE
  for (i = 0; i < email.length; i++) {
    var header = email[i].slice(0, blank[i] + 1)
    if (dash[i] = -1) {
      var message = email[i].slice(blank[i] + 1, email[i].length)
      var reverse = message.reverse();
      var newemail = header.concat(reverse);
    }
    else {
      var message = email[i].slice((blank[i] + 1), dash[i]);
      var footer = email[i].slice(dash[i], email[i].length)
      var reverse = message.reverse();
      //console.log(header);
      //console.log(reverse);
      // console.log(footer);
      var newemail = header.concat(reverse.concat(footer));
    }



    //======================= END REVERSE CODE
    //let newemail = ["some text",  "more text",  "here is a new line \n with more text"]
    //  the first email 


    let text = newemail.join('\n');
    // write on the file we created
    fs.appendFile('mbox_reverse.txt', text, function (err) {
      if (err) {
        // append failed
      } else {
        // done
      }
    })
  }
});
