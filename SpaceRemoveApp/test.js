

var vows = require('vows'),
    assert = require('assert');
var SpaceRemover = require('./SpaceRemover.js');
// Create a Test Suite

var TestDir = 'TestFiles/';
var FilesFound = 0;
var ToCreate = 10;
var fs = require('fs');

for(var i=0;i<ToCreate;i++)
{
  fs.writeFile(".././"+TestDir + "Test File "+i+".txt","Hey there!", function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");

  });

}
SpaceRemover.GetFiles(function(files){
  vows.describe('Get Files').addBatch({
    'when getting files': {
        file: function(){
          return files;
        },

        'there are files created': function (file) {
            assert.notEqual (file, []);
        }
    },
    'when renaming files': {
        newFileName: function(){
          var newFileName;
          SpaceRemover.CycleFiles(files);
          SpaceRemover.GetFiles(function(files){newFileName = files[0].Name;return newFileName}, TestDir);

        },

        'there are files created': function (newFileName) {
            assert.notEqual (newFileName, "TestFile3.txt");
        }
    }
  }).run(); // Run it

}, TestDir);
