import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlParams = new URLSearchParams(search);
  const paramAdventureDetails = urlParams.get("adventure");

  // Place holder for functionality to work in the Stubs
  return paramAdventureDetails;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const result = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    const data = await result.json();
    return data;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  let adventure_name = document.getElementById("adventure-name");
  adventure_name.innerHTML = `${adventure.name}`;

  let adventure_sub = document.getElementById("adventure-subtitle");
  adventure_sub.innerHTML = `${adventure.subtitle}`;

  let photo_gallery = document.getElementById("photo-gallery");
  let images = adventure["images"];
  images.forEach((image) => {
    let card = document.createElement("div");

    card.innerHTML = `<img src='${image}' alt="..." class="activity-card-image"/>`;
    photo_gallery.append(card);
  });
  let adventure_content = document.getElementById("adventure-content");
  adventure_content.innerText = `${adventure.content}`;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let image_gallery = document.getElementById("photo-gallery")
  
  image_gallery.innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">    
  </div>
  <div class="carousel-inner">    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
  
  //console.log(images)
  let carousel_inner = document.getElementsByClassName("carousel-inner")[0]
  let active = false
  images.forEach(image => {
    let item = document.createElement("div")
    if (active === false) {
      item.setAttribute("class", "carousel-item active")
      active = true
    }
    else item.setAttribute("class", "carousel-item")
    
    item.innerHTML = `<img src='${image}' alt="..." class="activity-card-image"/>`
    
    carousel_inner.append(item)
  })

  let carousel_indicators = document.getElementsByClassName("carousel-indicators")[0]
  let active_btn_added = false;
  for (let i = 0; i < images.length; i++)
  {
    let btn = document.createElement("div")
    if (active_btn_added === false)
    {
      btn.innerHTML=`<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i}"></button>`
      active_btn_added = true;
      }
    else
    {
      btn.innerHTML=`<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i}"></button>`
    }
    carousel_indicators.append(btn);
  }

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalCost = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML = totalCost;
}

//Implementation of reservation form submission
async function postData(url,data){
  const getReponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if(getReponse.ok){
    alert("Success!");
    location.reload();
  }
  else{
    alert("Failed!")
  }
}
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const data = {};
  const getFormelement = document.getElementById('myForm');

  getFormelement.addEventListener('submit',(event)=>{
     event.preventDefault();
     data.name = getFormelement.elements["name"].value;
     data.date = getFormelement.elements["date"].value;
     data.person = getFormelement.elements["person"].value;
     data.adventure = adventure.id;
    let url=`${config.backendEndpoint}/reservations/new`
    postData(url,data);     
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
