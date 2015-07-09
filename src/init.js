$(document).ready(function(){
  window.dancers = [];

  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $(".container").height() * Math.random(),
      $(".container").width() * Math.random(),
      Math.random() * 1000
    );
    $('.container').append(dancer.$node);
    window.dancers.push(dancer);
  });

  $(".lineUpButton").on("click", function(event){
    var lineUp = function(){
      console.log(window.dancers);
      window.dancers.forEach(function(dancer, index){
        dancer.setPosition($(window).height()/2, $(window).width()*index/window.dancers.length);
      });
    };
    lineUp();
  });  
  // $('.dancer', '.image-dancer', 'square').mousedown(function(){
  //   (this).mousemove(function(event){

  //   });
  // }); 
  $(".interactButton").on("click", function(event){
    var interact = function(){
      var min = Infinity;
      var firstDancer;
      var secondDancer;
      window.dancers.forEach(function(dancer){
        window.dancers.forEach(function(otherDancer){
          if(dancer !== otherDancer){
            var firstTop = dancer.$node.position().top;
            var firstLeft = dancer.$node.position().left;
            var secondTop = otherDancer.$node.position().top;
            var secondLeft = otherDancer.$node.position().left;
            
            var closest = distance(firstTop,firstLeft,secondTop,secondLeft);

            if(min > closest){
              min = closest;
              firstDancer = dancer;
              secondDancer = otherDancer;
            }
          }
        });
      });
      var tempDancerPosition = firstDancer.$node.position();
      firstDancer.$node.css({top:secondDancer.$node.position().top, left: secondDancer.$node.position().left});
      secondDancer.$node.css({top:tempDancerPosition.top, left: tempDancerPosition.left});
    };
    interact();
  }); 

  var distance = function(firstTop, firstLeft, secondTop, secondLeft){
    return Math.sqrt(Math.pow((secondTop - firstTop), 2) + Math.pow((secondLeft - firstLeft), 2));
  }
 
});

