async function getInfo() {
  let db = await $.get("/db");

  renderCard(db);
}

function renderCard(info) {
  console.log(info);
  //variable to count how many cards are created
  let x = 0;

  //loop that appends the html to addeach card
  for (let i in info.animals) {
    console.log(info.animals[i].name);

    $("#favCards").append(
      `
        <div>
        <div class="col s6 m6">
            <div class="card">
                <div class="card-image">
                    <img id="img${i}" src="${info.animals[i].image}" alt="pet">
                </div>
                <div class="card-content">
                    <p id="dist${i}">${info.animals[i].name}      ${info.animals[i].distance} Miles away</p>
                    <a id= "fav${i}" class="btn-floating right waves-effect waves-light red"><i class="material-icons">add</i></a>
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
      $("#cards").append(" <h1> test </h1>");
      //creates an object array with the cards info and logs it to the console on click
      let fav = [
        {
          distance: $("#dist" + i).text(),
          image: $("#img" + i).attr("src"),
          url: $("#url" + i).attr("href"),
        },
      ];

      console.log(fav);
    });
  }
}

getInfo();
