var userid='';
var courseId ='';

function login(){

    let username='';
    let password='';

    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    fetch('http://localhost:3000/users').then(
        response =>{
            if(response.ok){
                return response.json();
            }}).then(userResponse=>{
                let flag= false;
                userDetails = userResponse;
                userDetails.find(user =>{
                    if(username == user.username && password == user.password ){
                        userid = user.id;
                        flag =true;
                    }
                });
                if(flag){
                   // console.log(userid);
                    sessionStorage.setItem("loggedUserId", userid);
                    window.open("./home.html");
                   // loadMainCourse();
                }
                else{
                    document.getElementById("error").innerHTML=`<div class="w-150 alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Invalid Username or Password</strong> 
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>`;
                }
            });
}
document.body.addEventListener("click",()=>buy());

//alert(document.cookie);

function buy(){
    let enrollButton=event.target;
    if(enrollButton.className.includes('buy')){
        let courseid=enrollButton.getAttribute("data-id");
        let progress=0;
        let data_header={};
        var data= {
            "userid": id,
            "courseid":courseid,
            "progress":progress
        };
        data_header={
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
        body:JSON.stringify(data)
        };

        fetch("http://localhost:3000/user_course",data_header)
            .then(response=>{
                if(!response.ok){
                    throw Error(response.status)
                }
                return response.json();
            })
            .then((data)=>{
                console.log(data);
            })
    }
}


function setup(){

    let start_buyButton=document.querySelector("#status");
    var cid=sessionStorage.getItem("courseId");
    start_buyButton.innerHTML="Buy Now";
    userid=sessionStorage.getItem('loggedUserId')
                
     fetch("http://localhost:3000/user_course")
    .then((response)=>(response.json()))
    .then((res_json)=>{
        return res_json.map((uc)=>{
            if(uc.userid==userid&&uc.courseid==cid){
                console.log(userid);
                start_buyButton.innerHTML="Start Learning";
            
        }
         });
        })
    .catch(()=>console.log("Error"));

    
    fetch(" http://localhost:3000/courses")
    .then((response)=>response.json())
    .then((res_json)=>{
      console.log(res_json);
      let courses=res_json;
       return courses.map((course)=>{
           if(course.id==cid){
               document.getElementById("courseName").innerHTML = course.name;
               document.getElementById("desc").innerHTML = course.desc;
               document.getElementById("category").innerHTML = course.category;
               document.getElementById("tutor").innerHTML = course.tutor;
               document.getElementById("duration").innerHTML = course.duration;
               document.getElementById("rating").innerHTML = course.rating;
               document.getElementById("price").innerHTML = course.price;
            }
           });
      }).catch(()=>{console.log("Error in response");});

}


function loadMainCourse(){
  // console.log(sessionStorage.getItem('loggedUserId'));
    let count = 0;
    fetch(" http://localhost:3000/courses")
    .then((response)=>response.json())
    .then((res_json)=>{
      console.log(res_json);
      let courses=res_json;
      // return users.forEach((user)=>{
      //   console.log( user.name.first);
      // }
       return courses.map((course)=>{
        //console.log( course.name);
          if(course.rating>=4.5&&(count++)<3){  
            showCourse(course.id,course.name,course.desc,course.category,course.tutor,course.price,course.rating);
          }
           });
      }).catch(()=>{console.log("Error in response");});

}



function loadCourse(){
fetch(" http://localhost:3000/courses")
.then((response)=>response.json())
 .then((res_json)=>{
      console.log(res_json);
      let courses=res_json;
      // return users.forEach((user)=>{
      //   console.log( user.name.first);
      // }
       return courses.map((course)=>{
        //console.log( course.name);
          showCourse(course.id,course.name,course.desc,course.category,course.tutor,course.price,course.rating);
           });

 }).catch(()=>{console.log("Error in response");});
}




function showCourse(id,s1,s2,s3,s4,p1,r1)
{

var cartRow2 = document.createElement('div');
cartRow2.classList="col-12 col-sm-12 col-md-4 ";

           
var nameItems = document.getElementById('names-all');

 
  var allnames = `
                    <div class="card border-dark mb-3" style="width: 20rem;">\
                    <center>\
                        <div class="card-img-top feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-collection"></i></div>\
                        <!-- <img class="card-img-top" src="apple.jfif" alt="Card image cap"> -->\
                        <div class="card-block">\
                        <center>\
                          <h4 class="card-title card-header h4 fw-bolder my_text">${s1}</h4>\
                          <span class="card-subtitle mb-2 text-muted">${s3}</span>\
                          <blockquote class="blockquote mb-0">\
                          <p class="card-text my_text ">${s2}</p>\
                          </blockquote>\

                         
                          <br>\
                          <span class="card-text shop-item-price">${s4}</span>\
                          <br>\
                          <span class="pricing">Price:${p1}</span>\
                          <br>\
                          <span class="card-text shop-item-price">Rating:${r1}</span>\
                          <br>\
                          <a class="text-decoration-none enrollNow" id=${id} href="#!">\
                         <h4 class="card-header">   Enroll\
                         <i class="bi bi-arrow-right"></i>\
                         </h4>\
                           
                        </a>\
                        </div>\
                      </div>\
                      <br>\
    `
cartRow2.innerHTML = allnames;  
nameItems.appendChild(cartRow2);
cartRow2.getElementsByClassName('enrollNow')[0].addEventListener('click', enrollCourse)
console.log(id);

}


    
function enrollCourse(event){

    courseId = event.target.parentNode.getAttribute('id');
    sessionStorage.setItem("courseId",courseId);
    window.open("/course_page.html");
}