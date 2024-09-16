

const form = document.querySelector("form");
const cardID = document.getElementById("cardID");
const content = document.getElementById("content");

const userProfile = document.getElementById('userProfile');

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

      /*
        <img src="./src/assets/images/download.jpeg" alt="Imagem de perfil do usuário">
        <div id="userData">
            <h3>FREDIANO CARDERARO</h3>
            <span>Cliente desde 09/05/1986</span>
       </div>
      */

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
