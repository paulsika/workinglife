
  Matter.use( "matter-attractors") ;

  var Engine = Matter.Engine; 
  var Render = Matter.Render;
  var World = Matter.World;
  var Bodies = Matter.Bodies; 
  var Mouse = Matter.Mouse; 
  var MouseConstraint = Matter.MouseConstraint ;
  var Events = Matter.Events; 
  var Body = Matter.Body; 

  //Create an engine 
var engine = Engine.create(); 
engine.world.gravity.y = 0 ; 

var renderer_width = 800 ; 
var renderer_height = 600 ; 

//create a renderer 
var renderer = Render.create(
  {
      element: document.body, 
      engine: engine,
      options: {
          width: renderer_width, 
          height: renderer_height,
          wireframes: false, 
      }
  }
);

// add mouse control
var mouse = Mouse.create(renderer.canvas) ; 
var mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
              stiffness: 0.98,
              render: {
                  visible: false
              }
          }
      });

var width_step = 40; 
var height_step = 40; 

//create grid , coordinates 
var circles = [] ; 
var circle_radius = 1 ; 
var original_positions = [] ;
console.log("ORIGINAL POSITIONS: ", original_positions );

for (width = 15; width <= renderer_width; width += width_step) {
  for (height = 10; height <= renderer_height; height += height_step) {

      original_positions.push( {x: width, y: height}) ;
      circles.push( Bodies.circle(width, height, circle_radius, 
      {isStatic: false,
          
          label: "grid circle",
          render: {
              fillStyle: "white",
          }
      } ) ) ;
  }
}

console.log("ORIGINAL POSITIONS: ", original_positions );
var ball = Bodies.circle(renderer_width/2, renderer_height/2, 20, 
                          {
                              isStatic: true ,
                              isSensor:true,
                              render: { visible: false,
                                        fillStyle:  '#4ECDC4'}  ,
                             
                             
                                        plugin: {
    attractors: [
      function(bodyA, bodyB) {
        return {
          x: (bodyA.position.x - bodyB.position.x) * 1e-6,
          y: (bodyA.position.y - bodyB.position.y) * 1e-6,
        };
      }
    ]
  } 
});


function within_island(body) {

    //var island_center ; //it is a position  , mouse position
    var island_width_step = width_step * 3 //to the left and the right of X  MINUS and PLUS 
    var island_height_step = height_step * 3  // above and below the Y 


  let island_center = mouse.position ;

  let lowest_x = island_center.x - island_width_step ; 
  let highest_x = island_center.x + island_width_step ; 

  let lowest_y = island_center.y - island_height_step ; 
  let highest_y = island_center.y + island_height_step ;

  let x = body.position.x ; 
  let y = body.position.y ; 
 
  return (x >= lowest_x && x <= highest_x && y >= lowest_y && y <= highest_y ) ;
}

function shuffle( array ) {
  let start = array.length - 1; 
  for( i = start; i > 0; i-- )
  {
       const j = Math.floor(Math.random() * i)
       const temp = array[i]
       array[i] = array[j]
       array[j] = temp
  }
return array ;
}

function get_body_position(body) {
  return body.position
}


function move_bodies_to_original_positions() {

  console.log("circles count : ", circles.length);
  console.log("original positions count:" , original_positions.length);

  for(i = 0; i < engine.world.bodies.length; i++ ) {

      if( engine.world.bodies[i].label == "grid circle") {
          console.log("grid circle found");
          Body.translate(engine.world.bodies[i], 
          /*
          {x: original_positions[i].x  ,
           y: original_positions[i].y ,
          } */
          {
              x: renderer_width/2, 
              y: renderer_height/2,
          }            
          ) ;
      }
  }
}

function mouseMoveFn (event) {

  //move_bodies_to_original_positions();

  let x = Math.round(mouse.position.x) ; 
  let y = Math.round(mouse.position.y) ;

  //SMOOTHER POLYGON
  //CURVES instead ? or chamfer ?

  ///A SPRITE COULD MAY BE USED FOR THE ISLAND

  //LINES OF GRID 

  //WHAT IF TWO POLYGONS DRAWN ?

  //ILLUMINATE THE CIRCLES THAT ARE PART OF THE ISLAND.

  //MAKING THE CIRLCES MOVE PHYSICS WOULD BE INTERESTING FOR THE TYPES OF POLYGON CREATED

  let max_island_sides = 10 ;
  var current_island_bodies = []; 

  let island_bodies = engine.world.bodies.filter(within_island);
  var vertices = island_bodies.map( get_body_position) ;
  let vertices_shuffled = shuffle(vertices) ;

  //count of shapes forming the trail. 
  let trail_bodies_count = 1 ;
  World.remove(engine.world, current_island_bodies.slice(0, current_island_bodies.length - trail_bodies_count)) ;

  let polygon = Bodies.fromVertices(x,y, Matter.Vertices.create(vertices.slice(0,max_island_sides)), 
      {
          isStatic: false,
          isSensor: true,  
          render: {
              //fillStyle: '#4ECDC4',
              fillStyle: "white",   strokeStyle: '#556270',  opacity: 0.5, 
          },
      }, 
      false 
      ) ; 
         
  //polygon creation may fail. offset by mousemove and speed of display
  if (polygon) {
      current_island_bodies.push(polygon)
      World.add(engine.world, polygon);
// Body.applyForce(polygon, {x:polygon.position.x, y:polygon.position.y},   {x:0.02, y:0.001});
  }

}

function mouseDownFn(event) {
  console.log("MOUSE DOWN EVENT");
//   move_bodies_to_original_positions();    
}

Events.on(mouseConstraint, "mousedown", mouseDownFn );
Events.on(mouseConstraint, "mousemove", mouseMoveFn) ; 
// keep the mouse in sync with rendering
renderer.mouse = mouse;

//add all of the bodies to the world 
World.add(engine.world, circles );
World.add(engine.world, ball);
//run the engine 
Engine.run(engine);
//run the renderer
Render.run(renderer);

//Body.applyForce(ball, {x: ball.position.x, y: ball.position.y}, {x:0.005, y:0});
