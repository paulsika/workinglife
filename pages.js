/*

Working Life, Living Work:
Forms of Control in Johannesburg’s New Workplaces
*/

var startTime = performance.now()

function title_old () {

    let title = document.createElement("p"); 
    title.id = "title"; 
    title.innerHTML = "&quot;Working Life, Living Work&quot; - by Riley Grant &amp; William Shoki" ; 
    return title ;     
}


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
}

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

function template_page(name, title_src, text) {
    let page = document.createElement("div"); 
  //  page.id = "blurred_page";   
    page.id = name + "_page";
    /*
    let title = document.createElement("p");
    title.id = "blurred_page_title";   
    title.innerHTML = "Blurred Lines"; 
    title.className = "essay_title";
    */

   let title = document.createElement("img");
  // title.id = "blurred_page_title";   
    title.id = page.id + "_title"; 
 // title.src = "images/blurred_lines.png"; 
    title.src = title_src ; 
 
 title.className = "essay_title";
    
    
    page.appendChild(title); 

    let essay = document.createElement("textarea"); 
   //essay.id = "blurred_essay" ; 
     essay.id = name + "_essay"
   
    essay.className= "essay" ; 
   // essay.innerHTML = blurred_text ; 
    essay.innerHTML = text ; 

    //essay.cols = 60 ;
    //essay.rows = 20 ; 
    essay.readOnly = true; 

    page.appendChild(essay) ; 
    return page ; 
}

function template_page2(name, title_src, html_src) {
    let page = document.createElement("div"); 
  //  page.id = "blurred_page";   
    page.id = name + "_page";
    /*
    let title = document.createElement("p");
    title.id = "blurred_page_title";   
    title.innerHTML = "Blurred Lines"; 
    title.className = "essay_title";
    */
   let title = document.createElement("img");   
    title.id = page.id + "_title"; 
    title.src = title_src ; 
 title.className = "essay_title";

 page.appendChild(title); 

    let essay = document.createElement("div"); 
   //essay.id = "blurred_essay" ; 
     essay.id = name + "_essay"
    essay.className= "essay" ; 
   // essay.innerHTML = blurred_text ; 


    let object = document.createElement("object")
    object.type = "text/html"
    object.data =  html_src
    object.className = "essay_text"
    console.log("OBJECT: ", object)

    //essay.innerHTML = object ; 
    essay.appendChild(object)
    console.log("ESSAY DIV: ", essay)

//    essay.readOnly = true; 

    page.appendChild(essay) ; 
    return page ; 
}



function moles_page() { 
    let page = document.createElement("div"); 
    page.id = "moles_page"; 
    let title = document.createElement("p"); 
    title.id = "moles_page_title"; 
    title.innerHTML = "Moles and Serpents"; 
    page.appendChild(title); 
    return page; 
}

function neoliberal_page() { 
    let page = document.createElement("div"); 
    page.id = "neoliberal_page"; 
    let title = document.createElement("p"); 
    title.id = "neoliberal_page_title"; 
    title.innerHTML = "Neoliberal Reason and Realism"; 
    page.appendChild(title); 
    return page; 
}

function blurred_page() {
    
    let blurred_page = template_page2("blurred", "images/blurred_lines.png", "essay.html")
    return blurred_page
}



function working_page() { 
    let page = document.createElement("div"); 
    page.id = "working_page"; 
    let title = document.createElement("p"); 
    title.id = "working_page_title"; 
    title.innerHTML = "Working Life, Living Work"; 
    page.appendChild(title); 
    return page; 
}


function children_page() { 
    let page = document.createElement("div"); 
    page.id = "children_page"; 
    let title = document.createElement("p"); 
    title.id = "children_page_title"; 
    title.innerHTML = "Children of Marx and Zoom: Postscript on COVID-19"; 
    page.appendChild(title); 
    return page; 
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

    let intro_page = template_page("intro", "images/introduction_radial.png", blurred_text)
    let blurred_page = template_page2("blurred", "images/blurred_lines.png", "essay.html")
    let moles_page = template_page("moles", "images/moles_to_serpents.png", blurred_text)
    let neoliberal_page = template_page("neoliberal", "images/neoliberal_reason_and_realism.png", blurred_text)
    let working_page = template_page("working", "images/working_life_living_work.png", blurred_text)
    let children_page = template_page("children", "images/the_children_of_marx_and_zoom.png", blurred_text)

    let intro_button = menu_button("intro_button", "Introduction", intro_page)
    let moles_button = menu_button("moles_button", "Moles to Serpent", moles_page ); 
    let neoliberal_button = menu_button("neoliberal_button", "Neoliberal Reason and Realism", neoliberal_page );
    let blurred_button = menu_button("blurred_button", "Blurred Lines", blurred_page );
    let working_button = menu_button("working_button", "Working Life, Living Work", working_page );
    let children_button = menu_button("children_button", "Children of Marx and Zoom", children_page );

    //add buttons to menu 
    let all_buttons = [intro_button, moles_button, neoliberal_button, blurred_button, working_button, children_button] ;
    all_buttons.forEach(   button => menu.appendChild(button) ) ; 
    return menu ; 
}

function clock() {
    let clock = document.createElement("p"); 
    clock.id = "clock"; 


    console.log("START TIME: ", startTime)


    return clock  ;
}

function update_clock_old(p) {
    let real_hour = p.hour() ; let real_minute = p.minute() ; let real_second = p.second() ;
    
    let displayed_hour = real_hour ;
    let displayed_minute = real_minute ; 
    let displayed_second = real_second - click_count ; 

    let displayed_time = displayed_hour + " : " +  displayed_minute + " : " + displayed_second ;
    
    let clock = document.getElementById("clock") ; 
    clock.innerHTML = displayed_time ;
}

function update_clock(p) {
    
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




function camera() {
    let camera = document.createElement("img"); 
    camera.id = "camera";   camera.src = "images/camera.png"; 
    return camera ; 
}

//NOTE: work on smoother movement 
function update_camera_position_old(p) {

    let camera = document.getElementById("camera");
   // let canvasHeight = document.getElementById("canvas").height ; 
    let upper_bound = 70.0 ;  let lower_bound = 5.0  ;
    var cameraY = ( p.mouseY * 90.0) / canvasHeight  ;//magic number

    if (cameraY >= upper_bound)  {  cameraY = upper_bound ; }
    if (cameraY <= lower_bound) {   cameraY = lower_bound ;  }

    camera.style.top = cameraY + "%"
} 

function update_camera_position(p) {

    let camera = document.getElementById("camera");
   // let canvasHeight = document.getElementById("canvas").height ; 
    let upper_bound = 70.0 ;  let lower_bound = 5.0  ;
    var cameraY = ( p.mouseY * 90.0) / canvasHeight  ;//magic number

    if (cameraY >= upper_bound)  {  cameraY = upper_bound ; }
    if (cameraY <= lower_bound) {   cameraY = lower_bound ;  }

    //camera.style.top = cameraY + "%"

} 