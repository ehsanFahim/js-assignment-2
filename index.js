const noNumInput = document.getElementById("myInput");
const sameSeatContainers = document.querySelectorAll(".same-seat");
const dynamic = document.querySelector(".dyna");
const totalPriceElement = document.querySelector(".totalprice");
const applyButton = document.querySelector(".apply");
const grandPrice = document.querySelector(".grandtotal");
const couponInput = document.querySelector(".cupon");

let selectedButtonCount = 0; // Initialize a variable to count the selected buttons
let totalSum = 0; // Initialize a variable to store the total sum of seat values
let discount = 0; // Initialize discount percentage

// Decrement the value inside the "dyna" class "p" tag by 40
let value = 40;
dynamic.textContent = value;

// Function to apply discount and update total price
function applyDiscount() {
  const couponValue = couponInput.value.trim().toUpperCase(); // Get the value of the coupon input and convert to uppercase
  
  // Check the value of the coupon input
  switch (couponValue) {
    case "NEW15":
      discount = 15;
      break;
    case "COUPLE20":
      discount = 20;
      break;
    default:
      discount = 0; // No discount if coupon code is invalid or not provided
      break;
  }

  // Calculate discounted total price
  const discountedTotalPrice = totalSum * (1 - discount / 100);
  
  // Update the inner HTML of the element with class "grandtotal" with the discounted total price
  grandPrice.textContent = discountedTotalPrice;
  
  // Log the coupon value
  console.log(`Coupon applied! Discount: ${discount}%. New total price after discount: ${discountedTotalPrice}`);
}

// Event listener for the apply button click
applyButton.addEventListener("click", applyDiscount);

for (let i = 0; i < sameSeatContainers.length; i++) {
  const container = sameSeatContainers[i];
  const buttons = container.querySelectorAll("button");

  for (let j = 0; j < buttons.length; j++) {
    const button = buttons[j];

    // Add event listener to each button
    button.addEventListener("click", function () {
      // Check if the count of selected buttons is less than four
      if (selectedButtonCount < 4) {
        let items = document.querySelector(".box-row");
        // Log the value of the clicked button
        items.innerHTML += `<div class="items"><p>${this.value}</p><p>Economy</p><p>550</p></div>`;

        // Change the background color of the clicked button to green
        this.style.backgroundColor = "#1dd100";

        // Add the value of the clicked button to the total sum
        totalSum += 550;

        // Decrement the value inside the "dyna" class "p" tag by 40 only if it's greater than 0
        if (value > 0) {
          value -= 40;
          dynamic.textContent = value;
        }

        // Increment the selected button count
        selectedButtonCount++;

        // Update the inner HTML of the element with class "val" with the selected button count
        const valElement = document.querySelector(".val");
        if (valElement) {
          valElement.innerHTML = selectedButtonCount.toString();
        }

        // Log the total sum of seat values
        totalPriceElement.innerHTML = totalSum;
      } else {
        // If the count of selected buttons is already four, prevent further selections
        console.log("You can only select up to 4 buttons.");
      }
    });
  }
}

noNumInput.addEventListener("keypress", function(event) {
    if (event.key.match(/[^\d]/)) {
      event.preventDefault();
    }
  });