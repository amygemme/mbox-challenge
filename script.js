var fs = require("fs");

fs.readFile("mbox.full", "utf8", function(error, data) {
    if (error) {
        return console.log(error);
      }
     // console.log(data);
      // Then split it by commas (to make it more readable)
   var dataArr = data.split("\n"); 
    console.log(dataArr[65]);
   //  var dataArr2 = data.split(", ")
    // console.log(dataArr2);
//     for (i=0;i<dataArr.length;i++){
//       var paragraph = dataArr[i];
//        var regex = /:/g;
//        var found = paragraph.match(regex);

//  console.log(found); 

//     }
//     //   if (dataArr[i].search(":"))
    //   {
    //   console.log(dataArr[i]);
    //   }
    // }
     });


    