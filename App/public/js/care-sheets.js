//----------------------------
//ALL CARE SHEET DATA
//----------------------------

$(document).ready(() => {
    console.log("care-sheets.js loaded");
})

//--------- MAIN PAGE --------

// GET DATA
function getCareSheets(){
    db.collection("care_sheets").get().then(snapshot => {
        snapshot.forEach(doc => {
            var url = doc.data().breed;
            url = url.replace(" ", "-");
            var html = `
            <li class="waves-effect waves-light btn">
                <a href="./care-sheet.html?${url}" style="color:white">${doc.data().breed}</a>
            </li>
            `;
            $("#" + doc.data().type).append(html);
        })
        $($(".collapsible").find("ul")).each(i => {
            //if element is empty add err message
            if (!$($(".collapsible").find("ul")[i]).children().length) {
                $($(".collapsible").find("ul")[i]).html("Sorry! No care sheets were found.");
            }
        })
        $("#preload").fadeOut(() => {
            $(".collapsible").fadeIn();
        });
    });
}

//--------- EACH SHEET -------

function getCareSheetData(id){
    id = id.replace("-", " ");

    //get data
    $("#title").html(id);
    db.collection("care_sheets").where("breed", "==", id).get().then(snapshot => {
        snapshot.forEach(snap => {

            //DATA
            var html = `
            <div class="">
                <div class="card light-green lighten-1 z-depth-1">
                    <a class="white-text">
                    <div class="card-content">
            `;

            // HI JOEL
            // json objects look like this:
            // key: value,
            // key2: value
            // ie ->
            // name: kevin
            // breed: crested gecko
            // this lil for statement cycles through each key in the object so the page can be generated easily
            // if you wanna style the data mybe a list here would be cool? idk
            // lemme kno if you need a hand with this bit

            for (let [key, value] of Object.entries(snap.data())) {
                var name = key.replace(key[0], key[0].toUpperCase());
                html += `<p><b>${name}:</b> ${value}</p>`;
            }

            html += `
                </div>
                </a>
                </div>
            </div>`;

            //append
            $("#data-container").append(html);

        })
        //preload hide
        $("#preload").fadeOut(() => {
            $("#data-container").fadeIn();
        });
    })
}
