var SpaceRemover = require('./SpaceRemover.js');
SpaceRemover.GetFiles(function(res){
  SpaceRemover.CycleFiles(res);
},'');
