

const key = "cxyhnll5ScFfHdAHD2pKJ0hAOREZIlaSFRx6MnajQy35qxKJVn";
const secret = "O4kyEkoJkbFd5OfhhPaYja1c8GHtSPyI9W1eCyBc";

//variable to store image form api call
var image;

//function that calls for access token 
async function getToken() {
  let parm = new URLSearchParams();

  //creating url parameters
  parm.append("grant_type", "client_credentials");
  parm.append("client_id", key);
  parm.append("client_secret", secret);

  const petToken = await fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    body: parm,
  });

  let obj = await petToken.json();

  console.log(obj);
  sendData(obj);
}

//function that calls api after search button is clicked
async function sendData(data) {
  console.log(data.access_token);

  $("#searchBtn").click(async () => {
    event.preventDefault();

    //removes existing cards for new search
    $("#cards").empty();

    //sets zip code and type to the values of the form
    let zipCode = $("#zip").val();
    let type = $("#animalType").val();

    console.log(zipCode + " " + type);

    //api call adding user input
    const resp = await fetch(
      `https://api.petfinder.com/v2/animals?type=${type}&location=${zipCode}`,
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
          Accept: "*/*",
        },
      }
    );

    const respData = await resp.json();
    renderCard(respData);

    if (respData == null) {
      console.log("retrieving data");
      return sendData(respData);
    } else {
      console.log("success");
      //console.log(respData)
      return respData;
    }
  });
}

//function that generates cards for each animal
function renderCard(info) {
  console.log(info);
  //variable to count how many cards are created
  let x = 0;  

  //loop that appends the html to addeach card
  for (let i in info.animals) {
    console.log(info.animals[i].name);

    //checks to see if there is an image to prevent erroring out 
    if (info.animals[i].photos.length != 0) {
     image = info.animals[i].photos[0].full;
    }
    else {
        image = "https://via.placeholder.com/250?text=Image+Coming+Soon"
    }

    $("#cards").append(
      `
            <div>
                <div class="col s3 m6">
                    <div class="card">
                        <div class="card-image">
                            <img id="img${i}" src="${image}" alt="pet">
                        </div>
                        <div class="card-content">
                            <p id="dist${i}">${info.animals[i].name}      ${info.animals[i].distance} Miles away</p>
                            <a id= "fav${i}" class="btn-floating right waves-effect waves-light red"><i class="material-icons" id ="btn${i}">add</i></a>
                        </div>
                        <div class="card-action">
                             <a id= "url${i}" href="${info.animals[i].url}">More info</a>
                        </div>
                    </div>
                </div>
            </div>
        `
    );
    x++;
  }

  saveData(x);
}

//function that is used to save data when button is clicked takes in count as a parameter which tells the function how many buttons were created
function saveData(count) {
  //loops through each button and adds an event listener to it   
  for (let i = 0; i < count; i++) {
    $("#fav" + i).click(() => {
      //changes plus button to check
      $("#btn"+i).text('check');
      console.log($("#btn"+i).text()); 
      //creates an object array with the cards info and logs it to the console on click  
      let fav =
        {
          image: $("#img" + i).attr("src"),
          name: $("#dist" + i).text(),
          url: $("#url" + i).attr("href"),
        };

        $.ajax("/api/animal", {
          type: "POST",
          data: JSON.stringify(fav),
          contentType: "application/json; charset=utf-8",
          dataType: "json",

      }).then(function(){
          console.log("New pet added");
          
      });;



    });
  }
}

getToken();
