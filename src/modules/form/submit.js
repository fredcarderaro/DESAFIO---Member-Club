

const form = document.querySelector("form");
const cardID = document.getElementById("cardID");

form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    const id = cardID.value.trim();

    const card = await fetchCard(id);

    if (!await card)
      throw new Error(`Não foi possível localizar o cartão ${id}`);
    else
      console.log(card);

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
