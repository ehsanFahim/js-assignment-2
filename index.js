const noNumInput = document.getElementById("myInput");
const sameSeatContainers = document.querySelectorAll(".same-seat");
const dynamic = document.querySelector(".dyna");
const totalPriceElement = document.querySelector(".totalprice");
const applyButton = document.querySelector(".apply");
const grandPrice = document.querySelector(".grandtotal");
const couponInput = document.querySelector(".cupon");
const infobtn = document.querySelector(".info-btn");
const congratsElement = document.querySelector(".congrats");
const clearBtn = document.querySelector(".con-but");
const valueCheck = document.querySelector(".value-check");

let selectedButtonCount = 0;
let totalSum = 0;
let discount = 0;

function applyDiscount() {
  const couponValue = couponInput.value.trim().toLowerCase().replace(/\s/g, "");

  switch (couponValue) {
    case "new15":
      discount = 15;
      break;
    case "couple20":
      discount = 20;
      break;
    default:
      discount = 0;
      break;
  }

  const discountedTotalPrice = totalSum * (1 - discount / 100);

  grandPrice.textContent = discountedTotalPrice;

  console.log(
    `Coupon applied! Discount: ${discount}%. New total price after discount: ${discountedTotalPrice}`
  );
}

applyButton.addEventListener("click", applyDiscount);

for (let i = 0; i < sameSeatContainers.length; i++) {
  const container = sameSeatContainers[i];
  const buttons = container.querySelectorAll("button");

  for (let j = 0; j < buttons.length; j++) {
    const button = buttons[j];

    button.addEventListener("click", function handleClick() {
      if (selectedButtonCount < 4) {
        let items = document.querySelector(".box-row");
        items.innerHTML += `<div class="items"><p>${this.value}</p><p>Economy</p><p>550</p></div>`;

        this.style.backgroundColor = "#1dd100";

        totalSum += 550;

        let value = parseInt(dynamic.textContent);
        if (value > 0) {
          value -= 1;
          dynamic.textContent = value;
        }

        this.value = parseInt(this.value) - 1;

        selectedButtonCount++;

        const valElement = document.querySelector(".val");
        if (valElement) {
          valElement.innerHTML = selectedButtonCount.toString();
        }

        totalPriceElement.innerHTML = totalSum;
        infobtn.addEventListener("click", function () {
          if (
            parseInt(grandPrice.textContent) !== 0 &&
            grandPrice.textContent.trim() !== ""
          ) {
            congratsElement.style.visibility = "visible";
          }
        });

        clearBtn.addEventListener("click", function () {
          if (
            parseInt(grandPrice.textContent) !== 0 &&
            grandPrice.textContent.trim() !== ""
          ) {
            congratsElement.style.visibility = "collapse";
          }
        });

        button.removeEventListener("click", handleClick);
      } else {
        console.log("You can only select up to 4 buttons.");
      }
    });
  }
}

noNumInput.addEventListener("keypress", function (event) {
  if (event.key.match(/[^\d]/)) {
    event.preventDefault();
  }
});
