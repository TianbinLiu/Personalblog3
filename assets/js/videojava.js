        var l;
function getDateTime(){
        var now     = new Date(); 
        var year    = now.getFullYear();
        var month   = now.getMonth()+1; 
        var day     = now.getDate();
        var hour    = now.getHours();
        var minute  = now.getMinutes();
        var second  = now.getSeconds(); 
        l = hour;
        if(month.toString().length == 1) {
             month = '0'+month;
        }
        if(day.toString().length == 1) {
             day = '0'+day;
        }   
        if(hour.toString().length == 1) {
             hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
             minute = '0'+minute;
        }
        if(second.toString().length == 1) {
             second = '0'+second;
        }   
        var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
         return dateTime;
    }
    
    setInterval(function(){
        currentTime = getDateTime();
        document.getElementById("digital-clock").innerHTML = currentTime;
    }, 1000);
    
function checking(){
    var video = document.getElementById("background");
    if ((l>=0)&&(l<=5)){
        video.setAttribute("src","https://drive.google.com/uc?export=view&id=17hdDN7OMAjIOdvmcExqszG_cEx192fHU");
    }
    else if((l>=6)&&(l<=9)){
        video.setAttribute("src","https://drive.google.com/uc?export=view&id=1tPgpal5a4kTlvOkKJUoL3kSLKuNo8scz");
    }
    else if((l>=9)&&(l<=12)){
        video.setAttribute("src","https://drive.google.com/uc?export=view&id=1ErQhgcgSJRRRzB4O7UEOfJAvixrqfHcN");
    }
    else if((l>=13)&&(l<=17)){
        video.setAttribute("src","https://drive.google.com/uc?export=view&id=19veO0JJ-8YPf7148y2ZnCRKUBY97ap5S");
    }
    else if((l>=18)&&(l<=20)){
        video.setAttribute("src","https://drive.google.com/uc?export=view&id=1qvkR_as-ezuzwqX-2jriJRlJjcrr5zUz");
    }
    else if((l>=21)&&(l<=23)){
        video.setAttribute("src","https://drive.google.com/uc?export=view&id=1TCkL9j_l8PgB9dO8CKGB1iHeMaVAGeV1");
    }    
        
}        
function displayNextImage() {
              x = (x === images.length - 1) ? 0 : x + 1;
              document.getElementById("img").src = images[x];
          }

function displayNextImage2() {
              y = (y === images2.length - 1) ? 0 : y + 1;
              document.getElementById("img2").src = images2[y];
          }

function displayPreviousImage() {
              x = (x <= 0) ? images.length - 1 : x - 1;
              document.getElementById("img").src = images[x];
          }

function displayPreviousImage2() {
              y = (y <= 0) ? images2.length - 1 : y - 1;
              document.getElementById("img2").src = images2[y];
          }

function startTimer() {
              setInterval(displayNextImage, 3000);
              setInterval(displayNextImage2, 3000);
          }

var images = [], x = -1;
          images[0] = "images/NAM.jpg";
          images[1] = "images/NAM2.jpg";
          images[2] = "images/NAM3.jpg";
          images[3] = "images/NAM4.jpg";
          images[4] = "images/NAM5.jpg";

var images2 = [], x = -1;
          images2[0] = "images/NofM/NightofMuseum1.jpg";
          images2[1] = "images/NofM/NightofMuseum2.jpg";
          images2[2] = "images/NofM/NightofMuseum3.jpg";
          images2[3] = "images/NofM/NightofMuseum4.jpg";
