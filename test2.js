var fs = require("fs");


fs.readFile("mbox.full", "utf8", function (error, data) {
  if (error) {
    return console.log(error);
  }
  ///============code to split the emails data by lines ===//
  var dataArr = data.split("\n");
  //  var dataArr2 = data.split("From ")
 // console.log("first line of the file " + dataArr[0]);
  var from_line = [];

  //=== this code will check for the start of a new email and store the index in an arra. 
  // **mbox structure always has the first line starting with "From "**  ref: lib of congress site////
  for (i = 0; i < dataArr.length; i++) {
    if (dataArr[i].match(/From /g)) {
      from_line.push(i)  // replace all of this code with .findIndex
      console.log("from lines")
      console.log(from_line);
    }
  }

  //console.log("test data")
  //console.log(from_line);
  //console.log(dataArr.length);
  //console.log("test data")

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
  //console.log("data for email array")
  //console.log(email.length); // number of emails we have
  //console.log(email[0]);  // each entry is another array with the data seperated by lines
 
 
 // this line will create a new empty file
  fs.openSync("mbox_reverse.txt", 'w');

 // ==== code to split each email into 3 arrays the middle will be reversed and then they will be put back together
 var emailArr=[];
 var emailArr_header=[]
 var emailArr_footer = []
 for (i=0;i<email.length;i++){
   emailArr_header = email[i].slice();
   //console.log(emailArr_header.length);
   emailArr_message = emailArr_header.slice(blan);
  // console.log(emailArr_message)
  if(dash[i]!=-1){
    emailArr_footer = emailArr_message.splice(dash[i]-blank[i]-1)
    //console.log(emailArr_message);
    //console.log(emailArr_header);
   // console.log(emailArr_footer);
    let email_reverse = emailArr_message.reverse();
    let new_email = emailArr_header.concat(email_reverse.concat(emailArr_footer));
    console.log(new_email);
    let text = new_email.join('\n');

//  code to write text..
    fs.appendFile('mbox_reverse.txt', text, function (err) {
  if (err) {
    // append failed
  } else {
    // done
  }
})
    }  
else{
    let email_reverse = emailArr_message.reverse();
    let new_email = emailArr_header.concat(email_reverse);
    console.log(new_email);
    let text = new_email.join('\n');

//  code to write text..
    fs.appendFile('mbox_reverse.txt', text, function (err) {
  if (err) {
    // append failed
  } else {
    // done
  }
})


} 
}
})


