let results = document.querySelector(".shortens-results");
let shortenButton = document.querySelector(".shorten-btn");
let resultHold = "";

const addListenersCopyButtons = () => {
  let copyButtons = document.querySelectorAll(".copy-btn");
  let shorterLinks = document.querySelectorAll(".shorten-right p");
  copyButtons.forEach((button, index) =>
    //funcion to copy the text in the clipboard
    button.addEventListener("click", async function clipboardCopy() {
      await navigator.clipboard.writeText(shorterLinks[index].textContent);
      button.textContent = "Copied!";
      button.classList.add("copied-btn");
    })
  );
};

const templateResult = (startLink, finalLink) => {
  return `<div class="shorten">
      <div class="shorten-left">
        <p>${startLink}</p>
      </div>
      <div class="shorten-right">
        <p>${finalLink}</p>
        <button class="copy-btn">Copy</button>
      </div>
    </div>`;
};

const linkGenerator = (link) => {
  fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
    .then((response) => response.json())
    .then((response) => {
      if (response.ok == true) {
        results.innerHTML += templateResult(
          link,
          response.result.full_short_link
        );
        shortenButton.classList.remove("disabled");
        shortenButton.disabled = false;
        shortenButton.textContent = "Shorten It!";
        //add new event listener
        addListenersCopyButtons();
      }else{
        shortenButton.classList.remove("disabled");
        shortenButton.disabled = false;
        shortenButton.textContent = "Shorten It!";
        alert(response.error);
      }
    });
};

const shortenLink = () => {
  const searchBox = document.querySelector(".shorten-search");
  const input = document.querySelector(".shorten-input");
  const inputLink = input.value;
  if (inputLink === "" || inputLink.replace(/\s/g, "") === "") {
    //if the inputs is empty or there are just spaces add some classes
    input.classList.add("shorten-bad-input");
    searchBox.classList.add("shorten-search-bad");
  } else {
    //remove bad classes if
    input.classList.remove("shorten-bad-input");
    searchBox.classList.remove("shorten-search-bad");
    // Edit styles of the shorten button
    shortenButton.disabled = true;
    shortenButton.textContent = "Loading...";
    shortenButton.classList.add("disabled");
    linkGenerator(inputLink);
    // Leaving the input empty
    document.querySelector(".shorten-input").value = "";
  }
};


//hamburguer scripts

const menuMobile = document.querySelector('.menu-mobile');

const openMenuMobile = () =>{
    menuMobile.classList.toggle('open');
}