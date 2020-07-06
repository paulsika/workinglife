/**** GENERAL VALUES */

/*
var canvasWidth = 1100 ; 
var canvasHeight = 500 ; 
*/

/*
var canvasWidth =  window.innerWidth ; 
var canvasHeight = window.innerHeight;
*/

var canvasWidth = window.outerWidth ; 
var canvasHeight = window.outerHeight ;


let grid_label = "Soft Body"
let grid_origin = {"x":0, "y":0}
let grid_columns = 20 ; 
let grid_rows = 12 ;
let grid_width_step = 40;  
let grid_height_step = 40; 

/**** PHYSICS */
Matter.use( "matter-attractors") ;
var engine = Matter.Engine.create();     
engine.world.gravity.y = 0 ; 
 
function within_island(island_center, a_body) {

  var island_width_step = grid_width_step * 3 //to the left and the right of X  MINUS and PLUS 
  var island_height_step = grid_height_step * 3  // above and below the Y 

  let lowest_x = island_center.x - island_width_step ; 
  let highest_x = island_center.x + island_width_step ; 

  let lowest_y = island_center.y - island_height_step ; 
  let highest_y = island_center.y + island_height_step ;

  let x = a_body.position.x ;  let y = a_body.position.y ; 

  return (x >= lowest_x && x <= highest_x && y >= lowest_y && y <= highest_y ) ;
}

function draw_islands_from_matter (p) {

  let x = Math.round(p.mouseX) ; let y = Math.round(p.mouseY) ;
  let island_center = {"x":x, "y":y}

  //WHAT IF TWO POLYGONS DRAWN ? //ILLUMINATE THE CIRCLES THAT ARE PART OF THE ISLAND.
  let bodies = composites_by_label(grid_label)[0].bodies; 
  let island_bodies = bodies.filter( a_body => within_island(island_center,a_body))

//NOTE: work on the vertices_shuffled undefined. hint: when no points around mouse.
  console.log("ISLAND BODIES/VERTICES count", island_bodies.length)
  let vertices = island_bodies.map( a_body => a_body.position) ;
  let vertices_shuffled = _.shuffle(vertices) ; //important , otherwise flat forms => lines 
  
  let island_max_vertices = 4 ; 
 
   p.beginShape();
   for( i = 0; i < island_max_vertices; i++) {
       p.curveVertex(vertices_shuffled[i].x, vertices_shuffled[i].y) ;
   }
   p.endShape(p.CLOSE); 
   
   let ellipses = _.take(vertices_shuffled, 5) 
   ellipses.forEach(ellipse =>  {
        p.fill("white")
        p.ellipse(ellipse.x, ellipse.y, 10)
   });
}

function add_grid_to_matter() {
    // add bodies
var group = Matter.Body.nextGroup(true),
particleOptions = { friction: 0.00001, collisionFilter: { group: group }, render: { visible: false }},
constraintOptions = { stiffness: 0.50 },
grid = Matter.Composites.softBody(grid_origin.x, grid_origin.y, grid_columns, grid_rows, grid_width_step, grid_height_step, false, 8, particleOptions, constraintOptions);

    for (var i = 0; i < grid_columns; i++) {
         grid.bodies[i].isStatic = true;
    } 
    
    (_.first(grid.bodies)).isStatic = true ;
    (_.last(grid.bodies)).isStatic = true ;

    (_.nth(grid.bodies, 4)).isStatic = true ;
    (_.nth(grid.bodies, 29)).isStatic = true ; 
    (_.nth(grid.bodies, 19)).isStatic = true ; 
    (_.nth(grid.bodies, 100)).isStatic = true ; 
    (_.nth(grid.bodies, 150)).isStatic = true ; 
    (_.nth(grid.bodies, 175)).isStatic = true ; 
    (_.nth(grid.bodies, 200)).isStatic = true ; 

    Matter.World.add(engine.world, grid)
}

function create_ball(x, y, radius) {

    return Matter.Bodies.circle(x, y, radius, 
                          {
                              isStatic: true ,
                              isSensor:true,
                             // render: { visible: false, fillStyle:  '#4ECDC4'}  ,
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
}

function add_balls_to_matter() {

    var ball1 = create_ball(0,0,20) ;
    var ball2 = create_ball(canvasWidth, 0, 15) ;
    var ball3 = create_ball(0, canvasHeight, 34);
    var ball4 = create_ball(canvasWidth, canvasHeight, 9);
    var ball5 = create_ball(canvasWidth/2, canvasHeight/2, 6);

    let all_balls = [
                       // ball1,
                       // ball2, 
                        ball3, 
                        ball4, 
                       // ball5, 
                    ]

    all_balls.forEach(ball => Matter.World.add(engine.world,ball))
}


function init_physics() {

    add_balls_to_matter();
    add_grid_to_matter();
    Matter.Engine.run(engine);
    //Body.applyForce(ball, {x: ball.position.x, y: ball.position.y}, {x:0.005, y:0});
    }

function bodies_by_label(label) {
    let bodies_found = engine.world.bodies.filter( a_body => a_body.label ==label ) ;
    return bodies_found ;
}

function composites_by_label(label) {
    let composites = engine.world.composites.filter(composite => composite.label == label);
    return composites ;
}

function draw_grid_points(p) {
    composites_by_label(grid_label).forEach ( soft_body => {
    soft_body.bodies.map( a_body => {
        p.fill("white");
        p.ellipse(a_body.position.x, a_body.position.y, 6);
    }) 
   }) 
}

function draw_vertical_lines_from_matter(p) {

    composites_by_label(grid_label).forEach (soft_body => {
        var horizontal_chunks = _.chunk(soft_body.bodies.map(a_body => a_body.position), grid_columns)
        var vertical_points = []
       
        for(i = 0; i < grid_columns; i++) {
            for(j = 0; j < grid_rows; j++)
            vertical_points.push( horizontal_chunks[j][i]) 
        }
        
        let chunked_vertical_points = _.chunk(vertical_points, grid_rows)
        var vertical_point_groups = []
        chunked_vertical_points.forEach(chunk => {
        for(i = 0; i < (grid_rows -1) ; i++) {

            vertical_point_groups.push ( {"pt1": chunk[i], "pt2":chunk[i+1]  })
        }

        vertical_point_groups.forEach( point_group => {
            let pt1 = point_group.pt1 
            let pt2 = point_group.pt2 
            p.line(pt1.x, pt1.y, pt2.x, pt2.y)
        })

    })
    })
}

function draw_horizontal_lines_from_matter(p) {

    composites_by_label(grid_label).forEach (soft_body => {

        let chunked_points = _.chunk(soft_body.bodies.map( a_body => a_body.position), grid_columns )

        chunked_points.forEach( points => {
        var point_groups = [] ; //line coordinates, 2 points each 

        for(i = 0; i < (points.length -1)  ; i++) {
            point_groups.push(  {"pt1" : points[i], "pt2":points[i+1]}     )
        }

        point_groups.forEach( point_group => {
            let pt1 = point_group.pt1 
            let pt2 = point_group.pt2 
            p.line(pt1.x, pt1.y, pt2.x, pt2.y)
        })
    })
    })
}

function draw_grid(p) {
    draw_grid_points(p)
    draw_vertical_lines_from_matter(p)
    draw_horizontal_lines_from_matter(p)
}

var click_count = 0 ; 
function update_click_count (p)  { 
        click_count += 1 ; 
        console.log("new_click_count: ", click_count);
}

function mouse_clicked(p) {
    draw_islands_from_matter(p)
    update_click_count(p); 
}


let background_color = "#BEBEBE"

function p5_setup (p){

    let canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.id("canvas"); //using p5 own function   
   // p.background(220, 180, 200);
    p.background(background_color) 
   
   init_physics();  //should automatically add physics bodies to world.
}

function p5_draw(p) { 
    p.clear();
    //p.background(220, 180, 200);
    
    p.background(background_color)

  update_clock(p);
  update_camera_position(p);
 
 // draw_grid(p);
 // draw_islands_from_matter(p);
}

function load_init() {


    //must reset page first. 


console.log("INSIDE LOAD_INIT")

    var main_title =  document.getElementById("main_title")
    console.log("MAIN TITLE: ", main_title)
    
    main_title.remove() ;
    
    init()
    
}

function pre_init() {

   // let div = document.createElement("div")
   // div.id = "main_div"

    let title = document.createElement("img")
    title.id = "main_title"
    title.src = "images/main_title.png"

    title.addEventListener("click" , function() { load_init() } )


    document.body.appendChild(title)


}


function init() {

    let page_elements = [ menu(),  p5_canvas_container(), main_text_area(),  clock(), camera(),] ; 
    page_elements.forEach( element => document.body.appendChild(element)) ; 

    let sketch = function(p) {
        p.setup = function() { p5_setup(p); }
        p.draw =  function() { p5_draw(p); }
        p.mouseClicked = function() { mouse_clicked(p);}
       // p.mouseMoved = function() {draw_islands_from_matter(p);}
      };

    new p5(sketch, document.getElementById('p5_canvas_container'));

    change_page( blurred_page() );
}