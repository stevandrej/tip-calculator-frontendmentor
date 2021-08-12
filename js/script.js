import * as elements from "./base.js";

let bill = null;
let people = null;
let tip = null;
let tipPerPerson = 0;
let totalPerPerson = 0;

const calculateTipPerPerson = () => {
    return parseFloat((bill * (tip / 100)) / people).toFixed(2);
};

const calculateTotalPerPerson = () => {
    return parseFloat(bill / people + (bill * (tip / 100)) / people).toFixed(2);
};

//CALCULATE RESULT AND RENDER VIEW
const renderResult = () => {
    if (
        bill != null &&
        tip != null &&
        people != null &&
        !isNaN(bill) &&
        !isNaN(tip) &&
        !isNaN(people)
    ) {
        tipPerPerson = calculateTipPerPerson();
        totalPerPerson = calculateTotalPerPerson();
        elements.tipPerPerson.innerHTML = `$${tipPerPerson.toString()}`;
        elements.totalPerPerson.innerHTML = `$${totalPerPerson.toString()}`;
        elements.btnReset.disabled = false;
    } else {
        elements.tipPerPerson.innerHTML = `$0`;
        elements.totalPerPerson.innerHTML = `$0`;
    }
};

//EVENTLISTENER INPUT BILL
elements.bill.addEventListener("keyup", (e) => {
    if (
        (e.key >= 0 && e.key <= 9) ||
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "." ||
        e.key === "NumpadDecimal"
    ) {
        bill = parseFloat(e.target.value);
        renderResult();
    } else {
        e.preventDefault();
        e.stopPropagation();
    }
});

//EVENTLISTENER INPUT PEOPLE
elements.people.addEventListener("keyup", (e) => {
    people = parseFloat(e.target.value);
    renderResult();
});

//EVENTLISTENER SELECT TIP
elements.tip.forEach((el) =>
    el.dataset.value === "custom"
        ? el.getElementsByTagName("input")[0].addEventListener("keyup", (e) => {
              tip = parseInt(e.target.value);
              elements.tip.forEach((el) => {
                  el.classList.remove("tip__value--active");
              });
              renderResult();
          })
        : el.addEventListener("click", (e) => {
              elements.tip.forEach((el) => {
                  el.classList.remove("tip__value--active");
              });
              e.target.classList.add("tip__value--active");
              elements.customTip.value = "";
              tip = parseInt(e.target.dataset.value);
              renderResult();
          })
);

//RESET BTN
const resetAll = () => {
    bill = null;
    people = null;
    tip = null;
    tipPerPerson = 0;
    totalPerPerson = 0;
    elements.bill.value = "";
    elements.tip.forEach((el) => {
        el.classList.remove("tip__value--active");
        if (el.dataset.value === "custom")
            el.getElementsByTagName("input")[0].value = "";
    });
    elements.people.value = "";
    elements.tipPerPerson.innerHTML = `$0`;
    elements.totalPerPerson.innerHTML = `$0`;
    elements.btnReset.disabled = true;
};

elements.btnReset.addEventListener("click", (event) => {
    resetAll();
    event.target.blur();
});
