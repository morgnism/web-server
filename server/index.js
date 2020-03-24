const express = require("express");
const app = express();

app.use(express.static('public'));

app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/images', express.static(__dirname + '/public/images'));

app.listen(3000, function() {
  console.log("Server started at http://localhost:%s", 3000);
});
