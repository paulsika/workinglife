var canvasWidth =  window.innerWidth ; 
var canvasHeight = window.innerHeight;

var p4 = null ; 
/*
var canvasWidth = window.outerWidth;
var canvasHeight = window.outerHeight;
*/

const flock = [];
//canvas size matters, //number of boids matters //Daniel is using a 640x380  
//non minified version of p5 , //disable friendly errors 
let flock_count = 100 // was 200 then 150
function setup_flock(p) {
    for (let i = 0; i < flock_count; i++) {
        flock.push(new Boid(p));
    }
    //console.log("CANVAS HEIGHT WIDTH", canvasHeight, canvasHeight)
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
    //let vertices = island_bodies.map( a_body => a_body.position) ;
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
    
    p.strokeWeight(0.5)
    p.noFill()
    
    for (let pair of position_pairs) {

        p.quad(pair[0].x, pair[0].y, pair[1].x, pair[1].y, pair[2].x, pair[2].y, pair[3].x, pair[3].y)
    }
}

function draw_beziers_from_flock(p) {
    let boid_positions = flock.map(a_boid => a_boid.position)
    let position_pairs = _.chunk(boid_positions, 4)
    
    p.strokeWeight(0.4)
    p.noFill()
    p.stroke(240)
    for (let pair of position_pairs) {

        p.bezier(pair[0].x, pair[0].y, pair[1].x, pair[1].y, pair[2].x, pair[2].y, pair[3].x, pair[3].y)
    }
}

function draw_framerate(p) {
    let fps = p.frameRate();
p.fill(255);
p.stroke(0);
p.text("FPS: " + fps.toFixed(2), 10, p.height - 220);
}

function draw_blurred_lines(p) {
    p.clear();
    draw_flock(p)
    draw_lines_from_flock(p)
}

//let grid_label = "Soft Body"
//let grid_origin = { "x": 0, "y": 0 }
//let grid_columns = 20;
//let grid_rows = 12;
let grid_width_step = 100;
let grid_height_step = 100;

var horizontal_lines_points = [] ; 
var vertical_lines_points = [] ;


function gen_grid_points() {
    //vertical lines 
    var xs = _.range(-5, canvasWidth, grid_width_step)
    for( x of xs) {

        vertical_lines_points.push( [ {"x": x, "y": canvasHeight }, {"x": x, "y": 0}  ] )
    }

    var ys = _.range(-5, canvasHeight, grid_height_step)
    for (y of ys) {
        horizontal_lines_points.push( [ {"x":0, "y":y }, {"x":canvasWidth, "y":y} ])
    }
}

function draw_grid_lines(p, lines) {

    p.stroke("white")
    p.strokeWeight(1)
    for( line of lines) {
        let pt1 = line[0]
        let pt2 = line[1]
        p.line(pt1.x, pt1.y, pt2.x, pt2.y)
    }
}




//var line_y = canvasHeight / 2 ; 

function random_y() { return _.random( canvasHeight/3 , canvasHeight * 3/4) }

var line_y = random_y()
let initial_line_x = -20
var line_x = initial_line_x ; 
let line_weight = 5; 

var last_line_y = line_y ; 
var last_line_x = line_x 

function set_last_line_coords() {
    last_line_x = line_x ; 
    last_line_y = line_y ; 
}

var opposite_line_y = random_y()
var last_opposite_line_y = opposite_line_y

function line_reached_end_canvas() {
    return line_x >= canvasWidth
}

function draw_stock_lines(p) {

    p.strokeWeight(line_weight)

    //main line 
    p.stroke("white")
    p.line(last_line_x, last_line_y, line_x, line_y)  

    // close, twin line 
     p.stroke("white")
     p.line(last_line_x, last_line_y + 50, line_x, line_y + 50)   

     // opposite line 
     p.stroke("red")
     p.line(last_line_x, last_opposite_line_y, line_x, opposite_line_y)
   
     //line has reached canvas end , reset 
     if (line_reached_end_canvas()) {

        // p.clear();
         line_x = 0 ; 
         line_y = random_y()

        set_last_line_coords()
        opposite_line_y = random_y()
        last_opposite_line_y = opposite_line_y ;
     }
     else {
        set_last_line_coords()
        last_opposite_line_y = opposite_line_y
        line_x += 4 ;
     }
}


function change_line_y_on_mousemove(p) {
    line_y += p.movedY ; 
    opposite_line_y -= p.movedY ;
}


function draw_neoliberal_graphics(p) {

    if( line_reached_end_canvas()) {
        p.clear()
    }


    draw_grid_lines(p, vertical_lines_points)
    draw_grid_lines(p, horizontal_lines_points)
    draw_stock_lines(p)
}

function mouse_clicked(p) {
    
    update_sliding_camera_position_old(p) // think of mobile 
 }
 
 function mouse_moved(p) {
     update_sliding_camera_position_old(p)
     change_line_y_on_mousemove(p)
 }


let background_color = "#817F80"

function p5_setup(p) {

    let canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.id("canvas"); //using p5 own function   
    
    //p.background(background_color)

    update_sliding_camera_position_old(p)
    setup_flock(p)
    gen_grid_points(p)
   
}

function p5_draw(p) {
    //p.clear();

  
    p.noStroke();
   update_clock(p);
 
    //checking current_page id    
    switch (current_page()) {
        //case "intro_page":
        case "blurred_page":  draw_blurred_lines(p); break;
        case "neoliberal_page": draw_neoliberal_graphics(p); break; 

        default:  {  // clear screen 
            //nothing should be drawn 
            p.clear(); // CHECK IF NEEDED when switching between pages with neoliberal 
          }     
    }


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
         clock(), 
         sliding_camera(),
          eyes()
        ];
    page_elements.forEach(element => document.body.appendChild(element));

    //eyes_follow_cursor()
    eyes_follow_cursor_jquery()

    let sketch = function (p) {

        p.disableFriendlyErrors = true; 
        
        p.setup = function () { p5_setup(p); }
        p.draw = function () { p5_draw(p); }
       
        p.mouseClicked = function () { mouse_clicked(p); }
        p.mouseMoved = function() { mouse_moved(p) }

    };

 p4 =    new p5(sketch, document.getElementById('p5_canvas_container'));
    
    //change_page(blurred_page());
    //change_page(moles_page())
    change_page(intro_page())
    //change_page(working_page())
   // change_page(children_page())
  // change_page(neoliberal_page())
}