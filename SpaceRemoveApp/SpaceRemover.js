var colors = require('colors');
var walk    = require('walk');
var fs    = require('fs');
var files   = [];

exports.GetFiles = function (callback, testPath)
{
  files   = [];
  var walker  = walk.walk('../' + testPath, { followLinks: false,filters: ["SpaceRemoveApp"] });
  console.log("SCANING!");
  walker.on('file', function(root, stat, next) {
      // Add this file to the list of files
      files.push({Root: root, Name: stat.name});
      next();
  });

  walker.on('end', function() {
      console.log("Found Files! ["+files.length+"]".green);
      if(callback)
      {
        callback(files);
      }
  });


  process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });
  return files;

};
// Walker options

exports.CycleFiles = function(files)
{
  for(var i=0;i<files.length;i++)
  {
    console.log("-- Cycling ["+files[i].Name+"]");
    this.Rename(files[i].Root, files[i].Name, this.Parser(files[i].Name));
  }
};

exports.Parser = function(oldName)
{
  console.log(" --- Removing Spaces ["+oldName+"]");
  return oldName.replace(/\s+/g, '');
};

exports.Rename = function(path,oldName,newName)
{
  fs.rename(path+"/"+oldName, path+"/"+newName, function (err) {
  if (err) throw err;
  console.log("Rename Complete ["+newName+"]".green);
  });
}
