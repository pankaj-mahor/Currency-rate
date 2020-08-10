const currencyOneElement = document.getElementById('currency-one');
const currencyOneInput = document.getElementById('amount-one');

const currencyTwoElement = document.getElementById('currency-two');
const currencyTwoInput = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//Fetch exchange and update Dom 
function calculate(){
    // console.log('RAA');
    const currencyOne = currencyOneElement.value;
    const currencyTwo = currencyTwoElement.value;
    // console.log(currencyOne , currencyTwo);
    fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOne}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[currencyTwo];
            rateEl.innerHTML = `${currencyOneInput.value} ${currencyOne} = ${(rate * currencyOneInput.value).toFixed(2)} ${currencyTwo}`;
            currencyTwoInput.value = (currencyOneInput.value * rate).toFixed(2);
        });

}

swap.addEventListener('click' , () =>{
    const temp = currencyOneElement.value;
    currencyOneElement.value = currencyTwoElement.value;
    currencyTwoElement.value = temp;
    calculate();
});

currencyOneElement.addEventListener('change', calculate);
currencyOneInput.addEventListener('input', calculate);
currencyTwoElement.addEventListener('change', calculate);
currencyTwoInput.addEventListener('input', calculate);
