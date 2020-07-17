/**** GENERAL VALUES */

/*
var canvasWidth =  640 ; // 1100
var canvasHeight = 380 ; // 500 
*/

/*
var canvasWidth =  window.innerWidth ; 
var canvasHeight = window.innerHeight;
*/


var canvasWidth = window.outerWidth;
var canvasHeight = window.outerHeight;


const flock = [];

//canvas size matters, 
//number of boids matters 
//Daniel is using a 640x380 we are cover 
//non minified version of p5 
//disable friendly errors 
function setup_flock(p) {
    for (let i = 0; i < 200; i++) {
        flock.push(new Boid(p));
    }
    console.log("CANVAS HEIGHT WIDTH", canvasHeight, canvasHeight)
}

function draw_flock(p) {

    for (let boid of flock) {
        boid.edges();
        boid.flock(flock);
        boid.update();
        boid.show();
    }
}

function draw_lines_from_flock(p) {
    //  let vertices = island_bodies.map( a_body => a_body.position) ;
    //let boid_pairs = _.chunk(flock, 2)
    let boid_positions = flock.map(a_boid => a_boid.position)
    let position_pairs = _.chunk(boid_positions, 2)
    
    p.strokeWeight(0.5)

    for (let pair of position_pairs) {

        if (pair.length == 2) {
        p.line(pair[0].x, pair[0].y, pair[1].x, pair[1].y)
    }
}
}

function draw_triangles_from_flock(p) {
    //  let vertices = island_bodies.map( a_body => a_body.position) ;
    //let boid_pairs = _.chunk(flock, 2)
    let boid_positions = flock.map(a_boid => a_boid.position)
    let position_pairs = _.chunk(boid_positions, 3)
    
    p.strokeWeight(0.5)
    p.noFill()

    for (let pair of position_pairs) {

        if (pair.length == 3) {
        p.triangle(pair[0].x, pair[0].y, pair[1].x, pair[1].y, pair[2].x, pair[2].y)
        }
    }
}


function draw_quads_from_flock(p) {
    let boid_positions = flock.map(a_boid => a_boid.position)
    let position_pairs = _.chunk(boid_positions, 4)
    
    p.strokeWeight(1)
    p.noFill()
    
    for (let pair of position_pairs) {

        p.quad(pair[0].x, pair[0].y, pair[1].x, pair[1].y, pair[2].x, pair[2].y, pair[3].x, pair[3].y)
    }
}

function draw_beziers_from_flock(p) {
    let boid_positions = flock.map(a_boid => a_boid.position)
    let position_pairs = _.chunk(boid_positions, 4)
    
    p.strokeWeight(1)
    p.noFill()
    p.stroke(240)
    for (let pair of position_pairs) {

        p.bezier(pair[0].x, pair[0].y, pair[1].x, pair[1].y, pair[2].x, pair[2].y, pair[3].x, pair[3].y)
    }
}


/*
function is_near( x1, y1, x2, y2, dist) {

    let distance = p.dist(x1, y1, x2, y2)
    console.log("DISTANCE: ", distance)

    return  distance <= dist
}

function near_points(p) {

    console.log("NEAR POINTS")

    let boid_positions = flock.map(a_boid => a_boid.position)

    let points = boid_positions.filter(is_near(p.mouseX, p.mouseY,))

    console.log("POINTS: ", points)
}
*/

function mouse_clicked(p) {
    //draw_islands_from_matter(p)

    //update_click_count(p); 

   // near_points(p)
   update_sliding_camera_position_old(p)
}

function mouse_moved(p) {

    update_sliding_camera_position_old(p)

}

function draw_framerate(p) {
    let fps = p.frameRate();
p.fill(255);
p.stroke(0);
p.text("FPS: " + fps.toFixed(2), 10, p.height - 220);
}
//let background_color = "#BEBEBE"
//let background_color = "#7F7F7F"
let background_color = "#817F80"

function p5_setup(p) {

    let canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.id("canvas"); //using p5 own function   
    // p.background(220, 180, 200);
    p.background(background_color)
    update_sliding_camera_position_old(p)
    //  init_physics();  //should automatically add physics bodies to world.
    setup_flock(p)
}

function p5_draw(p) {
     p.clear();
    p.noStroke();
     //p.background(220, 180, 200);

    p.background(background_color)

   // update_clock(p);
    draw_framerate(p)
   // update_sliding_camera_position_old(p)

   draw_flock(p)
   draw_lines_from_flock(p) 
  // draw_triangles_from_flock(p)
   //lines and beziers together is interesting but too busy
//draw_beziers_from_flock(p) 
}

function load_init() {

    //must reset page first. 
    var main_title = document.getElementById("main_title")
    main_title.remove();
    init()
}

function pre_init() {

    let title = document.createElement("img")
    title.id = "main_title"
    title.src = "images/main_title.png"

    title.addEventListener("click", function () { load_init() })
    document.body.appendChild(title)
}


function init() {

    let page_elements = [
        p5_canvas_container(), 
        menu(), 
        main_text_area(),
        // clock(), 
         sliding_camera(),
          eyes()
        ];
    page_elements.forEach(element => document.body.appendChild(element));

    //eyes_follow_cursor()
    eyes_follow_cursor_jquery()

    let sketch = function (p) {

        p.disableFriendlyErrors = true; 
        
        p.setup = function () { p5_setup(p); }
       // p.draw = function () { p5_draw(p); }
       
        p.mouseClicked = function () {
            
            mouse_clicked(p); 
        
        //    update_sliding_camera_position_old(p) 
        }

        p.mouseMoved = function() {
            mouse_moved(p)
        }
    };

    new p5(sketch, document.getElementById('p5_canvas_container'));
    change_page(blurred_page());
}