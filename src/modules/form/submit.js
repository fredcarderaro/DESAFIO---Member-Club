

const form = document.querySelector("form");
const cardID = document.getElementById("cardID");
const content = document.getElementById("content");

const userProfile = document.getElementById('userProfile');
const userHistory = document.getElementById("userHistory");

form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    const id = cardID.value.trim();

    const card = await fetchCard(id);

    if (!await card)
      throw new Error(`Não foi possível localizar o cartão ${id}`);
    else {
      console.log(card);

      userProfile.innerHTML = "";
      userHistory.innerHTML = "";

      const imgProfile = document.createElement("img");
      imgProfile.setAttribute("src", "./src/assets/images/profileImage.svg");
      imgProfile.setAttribute("alt", "Imagem de Perfil");

      const userData = document.createElement("div");
      userData.setAttribute("id", "userData");
      userData.innerHTML = `
        <h3>${card[0].name}</h3>
        <span>Cliente desde ${card[0].clientSince}</span>
      `;

      userProfile.appendChild(imgProfile);
      userProfile.appendChild(userData);

      const historyHeader = document.createElement("header");
      historyHeader.innerHTML = `
            <h3>
              HISTÓRICO
            </h3>
            <span>
              ${card[0].appointmentHistory.length} cortes
            </span>
      `;

      const historyList = document.createElement("ul");
      historyList.setAttribute("id", "historyList");

      const cutsHistory = card[0].appointmentHistory;

      cutsHistory.forEach((cut) => {

        const element = document.createElement("li");

        element.innerHTML = `
            <div class="title">
              <h3>
                ${cut.date}
              </h3>
              <p>${cut.time}</p>
            </div>
            <div class="checkHistory">
              <img src="./src/assets/PinUncheck.svg" alt="" class="checkIcon">
            </div>
        `;
        historyList.appendChild(element);
      });


      userHistory.appendChild(historyHeader)
      userHistory.appendChild(historyList)

      content.classList.remove("hiddenElement");


    }

  } catch (error) {
    console.log(error);
    alert("Erro ao buscar Cartão.");
  }


}


async function fetchCard(id) {
  const response = await fetch('http://virtualbox-4201de28:3333/clients');
  const cardsList = await response.json();


  const cardReturn = cardsList.filter((card) => card.id === id);

  if (cardReturn < 1)
    return false;

  return cardReturn;
}   
