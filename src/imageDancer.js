var ImageDancer = function(top,left,timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);

  this.$node = $('<span class = "image-dancer"></span>');
  this.setPosition(top,left);
  this.onMouseMove();

};
ImageDancer.prototype = Object.create(Dancer.prototype);
ImageDancer.prototype.constructor = ImageDancer;
ImageDancer.prototype.step = function(){

  Dancer.prototype.step.call(this);

  // this.$node.toggle();
};