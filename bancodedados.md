```
 <script>
      var cards = document.querySelector("section.cards");

function criaCards(){
    const cards = document.querySelector("section.cards");
    for (let index = 0; index < objCards.length; index++) {
        var singleCard = document.createElement("div");
        singleCard.classList.add("single-card","col","col-md-3", "bg-body", "d-flex", "flex-nowrap", "flex-column", "gap-1", "justify-content-center");

        var image = document.createElement("img");
        image.src = objCards[index]["imagem"];
        var h2 = document.createElement("h2");
        h2.innerHTML = objCards[index]["titulo"];
        var pe = document.createElement("p");
        pe.innerHTML = objCards[index]["desc"];;

        singleCard.appendChild(image);
        singleCard.appendChild(h2);
        singleCard.appendChild(pe);
        cards.appendChild(singleCard);
    }
}


  </script>
  ```