const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")


for (let select of dropdowns){
    for(currCode in countryList){
        newOption = document.createElement("option")
        newOption.innerText=currCode;
        newOption.value= currCode
        if(select.name==="from" &&  currCode==="USD"){
            newOption.selected ="selected"
        }else if(select.name === "to" && currCode ==="PKR"){
            newOption.selected="selected"
        }
          select.append(newOption)  
    }
    select.addEventListener("change", (evt) =>{
         updateFlag(evt.target);
    });
};
const updateFlag =(element) =>{
    let currCode = element.value;
    let countryCode = countryList [currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src=newSrc;
};


btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal ===""|| amtVal < 1){
        amtVal=1;
        amount.value="1";
    }
const baseCurrency = fromCurr.value.toLowerCase();
    const targetCurrency = toCurr.value.toLowerCase();
    const URL = `${BASE_URL}/${baseCurrency}.json`;

    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[baseCurrency][targetCurrency];

        let total = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${total.toFixed(2)} ${toCurr.value}`;
    
    } 
    catch (error) {
        console.error("Failed to fetch exchange rate:", error);
        msg.innerText = "Failed to fetch exchange rate.";
    }
});


























































































// btn.addEventListener("click", async (evt) => {
//     evt.preventDefault();
//     let amount = document.querySelector('.amount input');
//     let amtVal = amount.value;

//     if (amtVal === "" || amtVal < 1) {
//         amtVal = 1;
//         amount.value = "1";
//     }

//     const baseCurrency = fromCurr.value.toLowerCase();
//     const targetCurrency = toCurr.value.toLowerCase();
//     const URL = `${BASE_URL}/${baseCurrency}.json`;

//     try {
//         let response = await fetch(URL);
//         let data = await response.json();
//         let rate = data[baseCurrency][targetCurrency];

//         if (!rate) throw new Error("Rate not found.");

//         let total = amtVal * rate;
//         msg.innerText = `${amtVal} ${fromCurr.value} = ${total.toFixed(2)} ${toCurr.value}`;

//     } catch (error) {
//         console.error("Failed to fetch exchange rate:", error);
//         msg.innerText = "Failed to fetch exchange rate.";
//     }
// });
  
