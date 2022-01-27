
var jokes = [{
    "jokecontent" : 'A child asked his father, "How were people born?" So his father  said, "Adam and Eve made babies, then their babies became adults and made babies, and so on.\n' +
                     '"The child then went to his mother, asked her the same question and she told him, "We were monkeys then we evolved to become like we are now.\n' +
                     '"The child ran back to his father and said, "You lied to me!" His father replied, "No, your mom was talking about her side of the family."',
    "nameJoke" :  "a1",
 },
 {
   "jokecontent" :'Teacher: "Kids,what does the chicken give you?" Student: "Meat!" Teacher: "Very good! Now what does the pig give you?" Student: "Bacon!"\n'+ 
                  'Teacher: "Great! And what does the fat cow give you?" Student: "Homework!"',
   "nameJoke" :  "a2",
 },
 {
   "jokecontent" :'The teacher asked Jimmy, "Why is your cat at school today Jimmy?"\n' + 
                  'Jimmy replied crying, "Because I heard my daddy tell my mommy, "I am going to eat that pussy once Jimmy leaves for school today!"',
   "nameJoke" :  "a3",
 },
 {
   "jokecontent" : 'A housewife, an accountant and a lawyer were asked "How much is 2+2?" The housewife replies: "Four!". The accountant says: "I think it\'s either 3 or 4. Let me run those figures through my spreadsheet one more time." The lawyer pulls the drapes, dims the lights and asks in a hushed voice, "How much do you want it to be?"',
   "nameJoke" :  "a4",
 }];

function chooseOneRandom() {
   //print random jokes/day (not duplicate)
    rsrandom = jokes[Math.floor(Math.random()*jokes.length)];   //random joke
    const index = jokes.indexOf(rsrandom);
    jokes.splice(index, 1);   //not duplicate
    if(checkcookie(rsrandom.nameJoke)){ //check joke user had read in cookie by nameJoke ==> random angain
      chooseOneRandom();
    }
    //return nameJoke + jokeContent
    resultfinal = rsrandom.nameJoke +"/" + rsrandom.jokecontent;  
    return resultfinal;
}

function getDateNow(){  //get present time (mm dd yyyy)
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  return today;
}

 function initJoke (today){ 
    //3.Check value Date(1:have see 1 joke , 2:have see 2 joke) (maximum 2 jokes/day) to init joke
    let valueDate = localStorage.getItem(today);
    var x = document.getElementById('jokecontent');
    if(valueDate===null || valueDate == "1"){         //null is user haven't see joke today ==> display first joke 
      var x2 = document.getElementById('namecontent');    //1 is user have see 1 joke ==> display one more joke (second joke)
      let NameJoke = chooseOneRandom().slice(0,2);              //get name joke from random 
      let ContentJoke = chooseOneRandom().slice(3);          //get content Joke from random
      x.innerText = ContentJoke;
      x2.innerText= NameJoke;
    }
    else{           //user had read maximum 2 joke/day ==> hide button, show "comback another day" 
      $("#funny").hide();
      $("#notfunny").hide();
      $("#jokecontent").hide();
      $("#jokecontent").fadeIn();
      x.innerText = "That's all the jokes for today! Come back another day!" 
    }
}

function checkcookie(randomjoke){   //function check joke user had read in cookie by nameJoke
  var cookiese = document.cookie.split(';').some((item) => item.trim().startsWith(randomjoke));
  if (cookiese) {
      return true;
  }
}
  
function setCookie(NameJoke,voteValue) {  //save nameJoke + voteValue to Cookie
  let date = new Date();
  let expDays = 30;
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  //save nameJoke + voteValue (1 is funny , 2 not funny) + date expires cookies
  document.cookie = NameJoke+ "=" + voteValue + "; " + expires;
  console.log(document.cookie);
}

function clickbutton (voteValue){ //function user click button funny or not funny
  var nameJoke = document.getElementById('namecontent').innerText;  //get nameJoke 
  var today = getDateNow();  
  let valueDate = localStorage.getItem(today);
  // if(nameJoke!==""){        //nameJoke!=="" is user haven't read any joke or read 1 joke
    console.log(nameJoke);
    console.log("vo day");
    if(valueDate===null){  
      $("#jokecontent").hide();
      $("#jokecontent").fadeIn(1000);
      localStorage.setItem(today, 1);         //set value 1 (have see 1 joke)
    }
    else if(valueDate == "1"){                //user have see 1 joke ==> display one more joke (second joke)
      var x2 = document.getElementById('namecontent');
      x2.innerText="";  
      $("#jokecontent").hide();
      $("#jokecontent").fadeIn(1000);
      localStorage.setItem(today, 2);         // set value 2 (have see maximum 2 joke/day)
      $("#funny").hide();
      $("#notfunny").hide();
    }
    setCookie(nameJoke,voteValue); 
    initJoke(today);

  // }

 } 

 function main(){
      //1.Get Date Now ==> check user has read 2 joke/day 
      var today = getDateNow();  
      //2.Initial Joke
     initJoke(today);
 }

 main();



//BUTTON DELETE COOKIE

function deletecookie(cid) {
  var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var cid = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = cid + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  console.log("delete");
 }




// NOTE FOR CODE

//  function showcookie(cid) {
//   var theCookies = document.cookie.split(';');
//     var aString = '';
//     for (var i = 1 ; i <= theCookies.length; i++) {
//         aString += theCookies[i-1] + "\n";
//     }
//    console.log(aString);

//  }

// function checkcookie1(){
//   var cookiese = document.cookie.split(';').some((item) => item.trim().startsWith('a2'));
//   if (cookiese) {
//     const output = document.getElementById('a-cookie-existence')
//     output.textContent = '> The cookie "a2" exists'
//   }
// }






