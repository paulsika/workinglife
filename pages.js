/*

Working Life, Living Work:
Forms of Control in Johannesburg’s New Workplaces
*/

var startTime = performance.now()

/*
function title_old () {

    let title = document.createElement("p"); 
    title.id = "title"; 
    title.innerHTML = "&quot;Working Life, Living Work&quot; - by Riley Grant &amp; William Shoki" ; 
    return title ;     
}*/

/*
function title_old2() {


   let title = document.createElement("div")
    //let title = document.createElement("p")
    
    let line1 = document.createElement("h1")
    //let line1 = document.createTextNode()
    line1.id = "title_line_1"
    //line1.innerHTML = "&quot;Working Life, Living Work&quot; &#58;"
    line1.innerHTML = "Working Life, Living Work&#58;"

    let line2 = document.createElement("h2")
    line2.id = "title_line_2"
    line2.innerHTML = "Forms of Control in Johannesburg&apos;s New Workplaces"

    let line_break = document.createElement("br")

    title.appendChild(line1)
   // title.appendChild(line_break)

    title.appendChild(line2)

    return title ;     
} */

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
    
    let child1 = document.createElement("p") ; 
    child1.innerHTML = "main text area, page for each menu item will load here"; 
    let child2 = document.createElement("button"); 
    child2.innerHTML = "dummy button";

    area.appendChild(child1); area.appendChild(child2);
    return area ; 
}


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

    //let essay_references = document.createElement("div")
    //essay_references.className = "essay_references"
    //essay_references.innerHTML = ref_src
    essay_box.appendChild(essay_text)
    //essay_box.appendChild(essay_references)

    essay_area.appendChild(title)
    essay_area.appendChild(essay_box)

    page.appendChild(essay_area)

    return page ; 
}

function template_page_with_references_box(name, title_src, html_src, ref_src) {
    
    
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

    //let essay_references = document.createElement("div")
    //essay_references.className = "essay_references"
    //essay_references.innerHTML = ref_src
    essay_box.appendChild(essay_text)
    //essay_box.appendChild(essay_references)

    essay_area.appendChild(title)
    essay_area.appendChild(essay_box)

    page.appendChild(essay_area)

    return page ; 
}

function moles_page() { 

    return template_page("moles", "images/moles_to_serpents.png", "essay.html")
}

function neoliberal_page() { 
    return template_page("neoliberal", "images/neoliberal_reason_and_realism.png", "essay.html")
}

function intro_page() {
    return template_page("intro", "images/introduction_radial.png", "essay.html")
}


function blurred_page() {
    
//    return template_page("blurred", "images/blurred_lines.png", "essay.html")
    //return template_page("blurred", "images/blurred_lines.png", "blurred_lines_text.html")

    //return template_page("blurred", "images/blurred_lines.png", blurred_lines_text, blurred_lines_references)
    return template_page("blurred", "images/blurred_lines.png", blurred_lines_text)
}

function working_page() {    
    return template_page("working", "images/working_life_living_work.png", "essay.html")
}


function children_page() { 
   
    return template_page("children", "images/the_children_of_marx_and_zoom.png", "essay.html")
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
   // console.log("ELAPSED TIME", elapsed_time)
    
    let elapsed_second = seconds % 60
    //console.log("ELAPSED SECONDS: ", elapsed_second)
  //  let elapsed_minute = Math.floor(elapsed_time / 60 )
    let elapsed_minute = Math.floor((seconds  % 3600) / 60 )

    //let elapsed_hour = Math.floor(elapsed_time / 3600)
    let elapsed_hour = Math.floor((seconds % 86400) / 3600 )

    let displayed_time = elapsed_hour.toString().padStart(2,'0') + " : " 
                        +  elapsed_minute.toString().padStart(2,'0') + " : "
                         + elapsed_second.toString().padStart(2,'0') ;
    
    let clock = document.getElementById("clock") ; 
    clock.innerHTML = displayed_time ;
}



/*
function camera_old() {
    let camera = document.createElement("img"); 
    camera.id = "camera";   camera.src = "images/camera.png"; 
    return camera ; 
}

function camera() {

    let camera_div = document.createElement("div")
    camera_div.id = "camera"

    let camera_head = document.createElement("img")
    camera_head.id = "camera_head"
   // camera_head.src = "images/camera_head_new.png"
   camera_head.src = "images/camera_head_new_centered2.png"
   camera_head.style.transform = "translateY(-21px) translateX(18px)"

    let camera_base = document.createElement("img")
    camera_base.id = "camera_base"
    camera_base.src = "images/camera_base_new.png"

    camera_div.appendChild(camera_head)
    camera_div.appendChild(camera_base) 

    return camera_div 
}*/

function sliding_camera() {

    let sliding_camera = document.createElement("img")
    sliding_camera.id = "sliding_camera"
    sliding_camera.src = "images/camera_left_side_cut.png"
    
    return sliding_camera
}

/*
function annoying_camera() {

    let camera = document.createElement("img")
    camera.id = "annoying_camera"
    camera.src = "images/camera_left_side.png"
    return camera 
}
*/

function update_sliding_camera_position_old(p) {

    let camera = document.getElementById("sliding_camera");
   // let canvasHeight = document.getElementById("canvas").height ; 
    let upper_bound = 70.0 ;  let lower_bound = 5.0  ;
    var cameraY = ( p.mouseY * 90.0) / canvasHeight  ;//magic number

    if (cameraY >= upper_bound)  {  cameraY = upper_bound ; }
    if (cameraY <= lower_bound) {   cameraY = lower_bound ;  }

    camera.style.top = cameraY + "%"
} 


/*
function update_camera_position_old(p) {

    let camera = document.getElementById("camera");
   // let canvasHeight = document.getElementById("canvas").height ; 
    let upper_bound = 70.0 ;  let lower_bound = 5.0  ;
    var cameraY = ( p.mouseY * 90.0) / canvasHeight  ;//magic number

    if (cameraY >= upper_bound)  {  cameraY = upper_bound ; }
    if (cameraY <= lower_bound) {   cameraY = lower_bound ;  }

    camera.style.top = cameraY + "%"
} */

/*
function update_camera_position(p) {

    let camera = document.getElementById("camera");
   // let canvasHeight = document.getElementById("canvas").height ; 
    let upper_bound = 70.0 ;  let lower_bound = 5.0  ;
    var cameraY = ( p.mouseY * 90.0) / canvasHeight  ;//magic number

    if (cameraY >= upper_bound)  {  cameraY = upper_bound ; }
    if (cameraY <= lower_bound) {   cameraY = lower_bound ;  }

    //camera.style.top = cameraY + "%"

} */


function eyes() {

    let move_area = document.createElement("section")
    move_area.className = "move_area"

    let face = document.createElement("div")
    face.id = "face"
    face.className = "face"

    let left_eye = document.createElement("div")
    left_eye.id = "left_eye"
    left_eye.className = "eye"

    let right_eye = document.createElement("div")
    right_eye.id = "right_eye"
    right_eye.className = "eye"

    face.appendChild(left_eye)
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
