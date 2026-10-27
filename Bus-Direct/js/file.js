const nomInput = document.getElementById("nom");
const seatSelect = document.getElementById("seat-select");
const reserveForm = document.getElementById("reserve-form");
const reserveMsg = document.getElementById("reserve-msg");
const libreEl = document.querySelector(".libre");
const occupeEl = document.querySelector(".occupe");
const priceEl = document.querySelector(".totalprice");
const fillRateEl = document.getElementById("fill-rate");function render() {
  renderSeats();
  renderSelects(seatSelect);
  renderSelects(newselect);   // ← أضفنا هذا
  renderStats();
  save();
}
const revenueDetailEl = document.getElementById("revenue-detail");
const PRICE = 80;
 let seats = JSON.parse(localStorage.getItem("seats")) ||
  Array.from({ length: 20 }, (_, i) => ({ number: i + 1, passenger: null }));
const freeSeats = () => seats.filter(s => !s.passenger);
const save = () => localStorage.setItem("seats", JSON.stringify(seats));
const nameExists = name =>
  seats.some(s => s.passenger && s.passenger.toLowerCase() === name.toLowerCase());
function renderSeats() {
  const cabinGrid = document.getElementById("lblays");
  cabinGrid.innerHTML = "";                       
  seats.forEach(seat => {
    const seatCard = document.createElement("div");
    seatCard.className =
      "rounded-xl p-3 flex flex-col items-center justify-center gap-1 transition-all shadow-sm border " +
      (seat.passenger
        ? "bg-red-600 text-white border-red-700"
        : "bg-white border-gray-200 hover:border-black");
    seatCard.setAttribute("data-seat", seat.number);
    seatCard.innerHTML =`
      <i class="fa-solid fa-couch" aria-hidden="true"></i>
      <span class="text-xs font-bold">Siège ${seat.number}</span>
      <span class="badge text-[10px] font-semibold px-2 py-0.5 rounded-full ${
        seat.passenger ? "bg-white text-red-700" : "bg-gray-100 text-gray-700"
      }"></span>
    `;

    seatCard.querySelector(".badge").textContent =
      seat.passenger ?  seat.passenger : "Libre";

    cabinGrid.appendChild(seatCard);

    if (seat.number % 4 === 2) {                 
      cabinGrid.appendChild(document.createElement("div"));
    }
  });  
}
function renderSelects(seatSelect) {
  seatSelect.innerHTML = "";
  seatSelect.appendChild(new Option("Automatique (premier siège libre)", ""));
  freeSeats().forEach(s =>
    seatSelect.appendChild(new Option(`Siège ${s.number}`, s.number))
  );
}
function renderStats() {
  const free = freeSeats ().length;
  const occupied = seats.length - free;
  libreEl.textContent = free;
  occupeEl.textContent = occupied;
  priceEl.textContent = `${occupied * PRICE} DH`;
  fillRateEl.textContent = `${Math.round((occupied / seats.length) * 100)} % de remplissage`;
  revenueDetailEl.textContent = `${occupied} réservation(s) × ${PRICE} DH`;
}
function render() {
  renderSeats();
  renderSelects(seatSelect);
  renderSelects(newselect);   
  renderStats();
  save();
}
let msgTimer;
let timers={};
function notify(el, text, isError = false) {
 clearTimeout(timers[el.id]);
  el.textContent = text;
  el.className = "text-sm font-medium min-h-[1.25rem] " + (isError ? "text-red-600" : "text-green-600");
  msgTimer = setTimeout(() => { el.textContent = ""; }, 3000);
}
   
reserveForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = nomInput.value.trim();
  if (!name) return notify(reserveMsg, "Le nom du passager est obligatoire.", true);
  if (nameExists(name)) return notify(reserveMsg, "Ce passager a déjà une réservation.", true);

  const seat = seatSelect.value
    ? seats.find(s => s.number === Number(seatSelect.value))
    : freeSeats()[0];

  if (!seat) return notify(reserveMsg, "Le bus est complet.", true);

  seat.passenger = name;
  render();
  reserveForm.reset();
  notify(reserveMsg, `Réservation confirmée : siège ${seat.number}.`);
});
const tabReserve = document.getElementById("tab-reserve");
const tabEdit = document.getElementById("tab-edit");
const tabCancel = document.getElementById("tab-cancel");

const reserveContent = document.getElementById("reserve-content");
const editContent = document.getElementById("edit-content");
const cancelContent = document.getElementById("cancel-content");

tabReserve.addEventListener("click", () => {
  reserveContent.hidden = false;
  editContent.hidden = true;
  cancelContent.hidden = true;
});

tabEdit.addEventListener("click", () => {
  reserveContent.hidden = true;
  editContent.hidden = false;
  cancelContent.hidden = true;
  editContent.classList.remove("hidden");
});

tabCancel.addEventListener("click", () => {
  reserveContent.hidden = true;
  editContent.hidden = true;
  cancelContent.hidden = false;
  cancelContent.classList.remove("hidden");
});
document.addEventListener("DOMContentLoaded", () => {
  render();
});////////
////////partie modifer
const namecheck=document.getElementById("edit-name")
const newname=document.getElementById("new-name")
const confiermeedit=document.getElementById("btn-modifer")
const newselect=document.getElementById("newselect")
const modifieMsg=document.getElementById("Modifier-msg")

renderSelects(newselect);
const nameExists2 = (name,seat=null) =>seats.some(s=> s.passenger && s.number!==seat && s.passenger.toLowerCase()===name.toLowerCase());
  seats.some(s => s.passenger && s.passenger.toLowerCase() === name.toLowerCase());
  
///////twrak
confiermeedit.addEventListener("click",e=>{
  const oldName=namecheck.value.trim();
  // t9lab wach 3ndna dak smiya 
  const current = seats.find(s =>
    s.passenger && s.passenger.toLowerCase() === oldName.toLowerCase()
  );
  //ila mL9inahch 
    if (!current) return notify(modifieMsg, "Passager introuvable.", true);
    //ila l9inah nakdo smiya jdida wl nklo smiya L9dima ila bra
      const name = newname.value.trim() || current.passenger;
      
    if (nameExists2(name, current.number))
    return notify(modifieMsg, "Ce nom est déjà utilisé.", true);
   const target = newselect.value
    ? seats.find(s => s.number === Number(newselect.value))
    : current;
    current.passenger = null;
  target.passenger = name;
    render();
  namecheck.value = "";
  newname.value = "";
  notify(modifieMsg, `Réservation modifiée : siège ${target.number}.`);
});
  

////partie annuler
const SuprimeName=document.getElementById("cancel-name")
const btnSuprime=document.getElementById("btn-annuler")
const annulermsg=document.getElementById("annuler-msg")
btnSuprime.addEventListener("click",()=>{
  const Suprimeuser=SuprimeName.value.trim()
   const current = seats.find(s =>
    s.passenger && s.passenger.toLowerCase() === Suprimeuser.toLowerCase()
  );
  if(!current)return notify(annulermsg,"Passager introuvable.",true)
    const name=current.passenger;
  current.passenger=null;
  render();
  SuprimeName.value = "";
  notify(annulermsg, `Réservation de ${name} annulée : siège ${current.number} libre.`)
})

const passage=document.getElementById("passager")
const number=document.getElementById("number")
const statusi=document.getElementById("status")
const ouccepe=seats-freeSeats
const price=document.getElementById("price")
ouccepe.forEach(seat=>{
  passage.innerHTML+=`${seat.passenger}`;
  number.innerHTML+=`${seat.number}`;
  statusi.innerHTML+="confirme"
  price.innerHTML+="80DH"
  render();
  
})