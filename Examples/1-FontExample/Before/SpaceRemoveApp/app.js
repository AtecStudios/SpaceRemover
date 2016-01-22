var colors = require('colors');
var walk    = require('walk');
var fs    = require('fs');
var files   = [];

// Walker options
var walker  = walk.walk('../', { followLinks: false,filters: ["SpaceRemoveApp"] });
console.log("SCANING!");
walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    files.push({Root: root, Name: stat.name});
    next();
});

walker.on('end', function() {
    console.log("Found Files! ["+files.length+"]".green);
    for(var i=0;i<files.length;i++)
    {
      console.log("-- Cycling ["+files[i].Name+"]");
      Rename(files[i].Root, files[i].Name, RemoveSpaces(files[i].Name));
    }
});


process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});


function RemoveSpaces(oldName)
{
  console.log(" --- Removing Spaces ["+oldName+"]");
  return oldName.replace(/\s+/g, '');
}

function Rename(path,oldName, newName)
{
  fs.rename(path+"/"+oldName, path+"/"+newName, function (err) {
  if (err) throw err;
  console.log("Rename Complete ["+newName+"]".green);
});
}
