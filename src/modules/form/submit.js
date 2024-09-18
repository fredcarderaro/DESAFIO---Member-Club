

const form = document.querySelector("form");
const cardID = document.getElementById("cardID");
const content = document.getElementById("content");



form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    const id = cardID.value.trim();

    const card = await fetchCard(id);

    if (!await card)
      throw new Error(`Não foi possível localizar o cartão ${id}`);
    else {
      console.log(card);

      await loadProfile(card[0]);
      await loadHistory(card[0].appointmentHistory);
      await loadCard(card[0].id, card[0].appointmentHistory.length);
      await loadGoal(card[0].appointmentHistory.length);

      content.classList.remove("hiddenElement");
    }

  } catch (error) {
    console.log(error);
    alert("Erro ao buscar Cartão.");
  }


}

async function loadGoal(cuts) {
  const performed = document.getElementById("performed");
  const performedBar = document.getElementById("performedBar");

  console.log(performed);

  performed.innerHTML = `
    <div>
      <h1 class="title-md">${(10 - cuts)}</h1>
      <p class="text-md">
       &nbsp; cortes restantes
      </p>
    </div>
    <div id="progress">
      <div id="completeBar">
        <div id="performedBar" style="width: ${cuts * 10}%"></div>
      </div>
      <p class="text-xs">${cuts} de 10</p>
    </div>
  `;
}

async function loadCard(id, checks) {
  const idNumber = document.getElementById("idNumber");
  const cardChecks = document.getElementById("cardChecks");

  idNumber.innerHTML = "";
  cardChecks.innerHTML = "";

  idNumber.innerHTML = `
    <h2>ID: ${id}</h2>
  `;

  for (let cont = 0; cont < 10; cont++) {
    const checkArea = document.createElement("div");
    checkArea.classList.add("checkArea");

    if (cont < checks) {
      checkArea.innerHTML = `
        <img class="pinCheck" src="/src/assets/PinCheck.png" alt="Imagem de check">
      `;
    } else if (cont === 9 && checks < 10) {
      checkArea.innerHTML = `
        <img class="pinGift" src="/src/assets/PinGiftGray.svg" alt="Imagem de check">
      `;
    }


    cardChecks.appendChild(checkArea);

  }

  return;
}


async function loadHistory(cuts) {
  const userHistory = document.getElementById("userHistory");

  const historyHeader = document.createElement("header");
  historyHeader.innerHTML = `
        <h3>
          HISTÓRICO
        </h3>
        <p class="text-xs">
          ${cuts.length} cortes
        </p>
  `;

  const historyList = document.createElement("ul");
  historyList.setAttribute("id", "historyList");

  cuts.forEach((cut) => {

    const element = document.createElement("li");

    element.innerHTML = `
        <div class="title">
          <h3>
            ${cut.date}
          </h3>
          <p class="text-xs">${cut.time}</p>
        </div>
        <div class="checkHistory">
          <img src="./src/assets/PinUncheck.svg" alt="" class="checkIcon">
        </div>
    `;
    historyList.appendChild(element);
  });

  userHistory.appendChild(historyHeader);
  userHistory.appendChild(historyList);

  return;
}

async function loadProfile(user) {
  const userProfile = document.getElementById('userProfile');

  userProfile.innerHTML = "";
  userHistory.innerHTML = "";

  const imgProfile = document.createElement("img");
  imgProfile.setAttribute("src", `./src/assets/images/${user.id}.svg`);
  imgProfile.setAttribute("alt", "Imagem de Perfil");

  const userData = document.createElement("div");
  userData.setAttribute("id", "userData");
  userData.innerHTML = `
        <h1 class="title-sm">${user.name}</h1>
        <p class="text-xs">Cliente desde ${user.clientSince}</p>
      `;

  userProfile.appendChild(imgProfile);
  userProfile.appendChild(userData);

  return;
}


async function fetchCard(id) {
  const response = await fetch('http://virtualbox-4201de28:3333/clients');
  const cardsList = await response.json();


  const cardReturn = cardsList.filter((card) => card.id === id);

  if (cardReturn < 1)
    return false;

  cardID.value = "";

  return cardReturn;
}   
