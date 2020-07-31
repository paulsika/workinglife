/*

Working Life, Living Work:
Forms of Control in Johannesburg’s New Workplaces
*/

var startTime = performance.now()

function title() {
    let title = document.createElement("img")
    title.id = "main_title"
    title.src = "images/main_title.png"
    return title 
}

function p5_canvas_container() {

    let container = document.createElement("div"); 
    container.id = "p5_canvas_container"; 
    return container 
}

function main_text_area() {

    let area = document.createElement("div") ; 
    area.id = "main_text_area"; 
    /*
    let child1 = document.createElement("p") ; 
    child1.innerHTML = "main text area, page for each menu item will load here"; 
    let child2 = document.createElement("button"); 
    child2.innerHTML = "dummy button";
    area.appendChild(child1); area.appendChild(child2);*/
   
    return area ; 
}

var current_page_id = "" 
function un_highlight_current_menu_button() {

    let elements = document.getElementsByName("current_menu_button") ; 
    if (elements[0]) { elements[0].name = " "; }
}

function highlight_current_menu_button(page) {
    var id = ""
    switch( page.id ) {
        case "intro_page": id = "intro_button"; break; 
        case "moles_page": id = "moles_button"; break; 
        case "neoliberal_page": id = "neoliberal_button";break; 
        case "blurred_page": id = "blurred_button" ; break;     
        case "working_page": id = "working_button";break; 
        case "children_page": id = "children_button" ;break; 
    }
    document.getElementById(id).name = "current_menu_button"; 
}

function current_page() {
    return current_page_id ;
}

function is_current_page(page_id) {
    return (current_page_id == page_id )
}

function is_page(page, page_id) {

    return (page.id == page_id)
    /*
    switch( page.id ) {
        case "intro_page": visible = true; break; 
        case "moles_page": visible = false;  break; 
        case "neoliberal_page": visible = false; break; 
        case "blurred_page": visible = true ; break;     
        case "working_page": visible = false ;break; 
        case "children_page": visible = false ;break; 
    }*/
}

function change_canvas_visibility(page) {

    var visible = false 

    switch( page.id ) {
        case "intro_page": visible = true; break; 
        case "moles_page": visible = false;  break; 
        case "neoliberal_page": visible = false; break; 
        case "blurred_page": visible = true ; break;     
        case "working_page": visible = false ;break; 
        case "children_page": visible = false ;break; 
    }


//  CANVAS VISIBLE OR NOT ACCORDING TO PAGE TO load_init. 
// CHOOSE WHAT TO DRAW IN DRAW METHOD MIGHT BE THE BEST WAY 
// draw_flock 
// draw_... 
}

function change_page(  page  ) {

    let main_text_area = document.getElementById("main_text_area"); 
    un_highlight_current_menu_button() ;
    //remove all children   
    while (main_text_area.firstChild) {
        main_text_area.firstChild.remove() ; 
    }
    //add new page 
    main_text_area.appendChild(page);
    highlight_current_menu_button(page);


    current_page_id = page.id ;

    change_canvas_visibility(page) // might be good to put it a few lines above


    if( is_current_page("moles_page")) {
        let video = document.getElementById("moles_video")
        video.play()
    }

    if (is_current_page("working_page")) {
        let video = document.getElementById("working_video")
        video.play()
    }

    //media="screen and (min-width: 601px)"
    
    if (is_current_page("children_page") && 
        window.matchMedia("screen and (min-width: 601px)").matches  ) {
        access_camera()
    }

    if (is_current_page("neoliberal_page")) {

        line_x = initial_line_x ; //this number can be set to negative 
        
        last_line_x = line_x ; 
        //opposite_line_y = random_y()

        //set_last_line_coords()
      
        if (p4 != null) {
        p4.clear();
        }


    }
}

/*** THE PAGES  */


function template_page(name, title_src, html_src) {
    
    let page = document.createElement("div"); 
    page.id = name + "_page";
    page.className = "essay_page"
  
    let essay_area = document.createElement("div")
    essay_area.className = "essay_area"

   let title = document.createElement("img");   
    title.id = page.id + "_title"; 
    title.src = title_src ; 
    title.className = "essay_title";

    let essay_box = document.createElement("div"); 
     essay_box.id = name + "_essay"
    essay_box.className= "essay_box" ; 

    let essay_text = document.createElement("div")
    essay_text.innerHTML = html_src  
    essay_text.className = "essay_text"

    essay_box.appendChild(essay_text)

    essay_area.appendChild(title)
    essay_area.appendChild(essay_box)

    page.appendChild(essay_area)

    return page ; 
}

function moles_page() { 

    let page =  template_page("moles", "images/moles_to_serpents.png", moles_text)

    let video = document.createElement("video")
    video.id = "moles_video"
   // src="movie.mp4" type="video/mp4"
    video.src = "moles_video.mp4"
    video.type = "video/mp4"
    video.width = canvasWidth
    video.autoplay = true 
    video.loop = true 
   page.appendChild(video)
    return page; 
}

function neoliberal_page() { 

let page = template_page("neoliberal", "images/neoliberal_reason_and_realism.png", neoliberalism_text)

let gradient = document.createElement("img")
gradient.id = "neoliberal_gradient"
gradient.src = "gradient.jpg"
page.appendChild(gradient)

return page ; 

}

function intro_page() {
  
  let page =   template_page("intro", "images/introduction_radial.png", introduction_text)
  let bg_image = document.createElement("img")
  bg_image.id = "introduction_background_image" ;
  bg_image.src = "images/introduction_background.jpg"
  page.appendChild(bg_image)
  return page ;
}


function blurred_page() {
    
//    return template_page("blurred", "images/blurred_lines.png", "essay.html")
    //return template_page("blurred", "images/blurred_lines.png", "blurred_lines_text.html")

    //return template_page("blurred", "images/blurred_lines.png", blurred_lines_text, blurred_lines_references)
    return template_page("blurred", "images/blurred_lines.png", blurred_lines_text)
}

function working_page() {    
    let page =  template_page("working", "images/working_life_living_work.png", working_text)

    let video = document.createElement("video")
    video.id = "working_video" 
    video.src = "blurred_scroll_03.mp4"
    video.type = "video/mp4"
    video.autoplay = true
    video.loop = true 
    page.appendChild(video)
    return page ;
}


function access_camera() {


    let connection_loading =  document.getElementById("connection_loading")
    let video = document.getElementById("webcam_video")

    var handle_success = function(stream) {
      
        console.log("WEB CAM SUCCESS")
        video.srcObject = stream ; 
        video.onloadedmetadata = function(e) {
            video.play();
          };
        connection_loading.style.visibility = "hidden" ;

    };


    var handle_error = function(error) {
        
        console.log("WEB CAM FAILURE", error)
        connection_loading.style.zIndex = -4
        video.style.display = false 
    }

    navigator.mediaDevices.getUserMedia({audio: true, video: true})
    .then(handle_success)
    .catch(handle_error)


}

function children_page() { 
   
    let page =  template_page("children", "images/the_children_of_marx_and_zoom.png", children_text)

    let connection_loading = document.createElement("img")
    connection_loading.src = "images/connection_loading.gif"
    connection_loading.id = "connection_loading"

    let video = document.createElement("video")
    video.id = "webcam_video" 
    console.log(video)

    page.appendChild(video)
    page.appendChild(connection_loading)

    return page 
}


function menu_button(id, inner_html, page) {

    let button = document.createElement("button"); 
    button.id = id;  button.innerHTML = inner_html; 
    button.type = "button";
    button.className = "menu_button"; 
    button.addEventListener("click", function(){change_page(page)});
    return button ; 
}

function menu() {

    let menu = document.createElement("div");    menu.id = "menu"; 

    let intro_button = menu_button("intro_button", "Introduction", intro_page())
    let moles_button = menu_button("moles_button", "Moles to Serpent", moles_page() ); 
    let neoliberal_button = menu_button("neoliberal_button", "Neoliberal Reason and Realism", neoliberal_page() );
    let blurred_button = menu_button("blurred_button", "Blurred Lines", blurred_page() );
    let working_button = menu_button("working_button", "Working Life, Living Work", working_page() );
    let children_button = menu_button("children_button", "Children of Marx and Zoom", children_page() );

    //add buttons to menu 
    let all_buttons = [intro_button, moles_button, neoliberal_button, blurred_button, working_button, children_button] ;
    all_buttons.forEach(   button => menu.appendChild(button) ) ; 
    return menu ; 
}

function clock() {
    let clock = document.createElement("p"); 
    clock.id = "clock"; 
    return clock  ;
}
/*
function update_clock_old(p) {
    let real_hour = p.hour() ; let real_minute = p.minute() ; let real_second = p.second() ;
    
    let displayed_hour = real_hour ;
    let displayed_minute = real_minute ; 
    let displayed_second = real_second - click_count ; 

    let displayed_time = displayed_hour + " : " +  displayed_minute + " : " + displayed_second ;
    
    let clock = document.getElementById("clock") ; 
    clock.innerHTML = displayed_time ;
}*/

function update_clock_distorted(p) {
    
    let elapsed_time = Math.floor( (performance.now() - startTime) / 1000 ) 
   // console.log("ELAPSED TIME", elapsed_time)
    
    let elapsed_second = elapsed_time % 60
    //console.log("ELAPSED SECONDS: ", elapsed_second)
    let elapsed_minute = Math.floor(elapsed_time / 60 )
    let elapsed_hour = Math.floor(elapsed_time / 3600)

    let displayed_time = elapsed_hour.toString().padStart(2,'0') + " : " 
                        +  elapsed_minute.toString().padStart(2,'0') + " : "
                         + elapsed_second.toString().padStart(2,'0') ;
    
    let clock = document.getElementById("clock") ; 
    clock.innerHTML = displayed_time ;
}

function update_clock(p) {
    
    let seconds = Math.floor( (performance.now() - startTime) / 1000 ) 
    
    let elapsed_second = seconds % 60
    let elapsed_minute = Math.floor((seconds  % 3600) / 60 )
    let elapsed_hour = Math.floor((seconds % 86400) / 3600 )

    let displayed_time = elapsed_hour.toString().padStart(2,'0') + " : " 
                        +  elapsed_minute.toString().padStart(2,'0') + " : "
                         + elapsed_second.toString().padStart(2,'0') ;
    
    let clock = document.getElementById("clock") ; 
    clock.innerHTML = displayed_time ;
}

function sliding_camera() {

    let sliding_camera = document.createElement("img")
    sliding_camera.id = "sliding_camera"
    sliding_camera.src = "images/camera_left_side_cut2.png"
    
    return sliding_camera
}

function update_sliding_camera_position_old2(p) {

    let camera = document.getElementById("sliding_camera");
   // let canvasHeight = document.getElementById("canvas").height ; 
    let upper_bound = 70.0 ;  let lower_bound = 5.0  ;
    var cameraY = ( p.mouseY * 90.0) / canvasHeight  ;//magic number
  // var cameraY = ( p.mouseY * 140.0) / canvasHeight  ;//magic number

    if (cameraY >= upper_bound)  {  cameraY = upper_bound ; }
    if (cameraY <= lower_bound) {   cameraY = lower_bound ;  }

    camera.style.top = cameraY + "%"
} 


function update_sliding_camera_position_old(p) {

    let camera = document.getElementById("sliding_camera");
   // let canvasHeight = document.getElementById("canvas").height ; 
    let upper_bound = 100.0 ;  let lower_bound = -20   ; // was 70.0 and 5.0
    var cameraY = ( p.mouseY * 100.0) / canvasHeight  ;//magic number

    if (cameraY >= upper_bound)  {  cameraY = upper_bound ; }
    if (cameraY <= lower_bound) {   cameraY = lower_bound ;  }

    camera.style.top = cameraY + "%"
} 

function eyes() {

    let move_area = document.createElement("section")
    move_area.className = "move_area"

    let face = document.createElement("div")
    face.id = "face"
    face.className = "face"

    let left_eye = document.createElement("div")
    left_eye.id = "left_eye"
    left_eye.className = "eye"

    /*
    let left_eye_frame = document.createElement("div")
    left_eye_frame.id = "left_eye_frame"
    left_eye_frame.className = "eye_frame"

*/

    let right_eye = document.createElement("div")
    right_eye.id = "right_eye"
    right_eye.className = "eye"

    let space = document.createElement("div")
    space.id = "space_between_eyes"
    space.className = "eye"

    face.appendChild(left_eye)
    face.appendChild(space)
    face.appendChild(right_eye)
   // move_area.appendChild(face)

    return face
}

function eyes_follow_cursor_jquery() {

    $("body").mousemove(function(event) {
        var eye = $(".eye");
        var x = (eye.offset().left) + (eye.width() / 2);
        var y = (eye.offset().top) + (eye.height() / 2);
        var rad = Math.atan2(event.pageX - x, event.pageY - y);
        var rot = (rad * (180 / Math.PI) * -1) + 180;
        eye.css({
          '-webkit-transform': 'rotate(' + rot + 'deg)',
          '-moz-transform': 'rotate(' + rot + 'deg)',
          '-ms-transform': 'rotate(' + rot + 'deg)',
          'transform': 'rotate(' + rot + 'deg)'
        });
      });
} 