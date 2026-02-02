// Ensures pet status is retained even after a page refresh
let pet = JSON.parse(localStorage.getItem("pet")) || {
  hunger: 100,
  energy: 100,
  mood: "Happy"
};

// UI elements
const petDiv = document.getElementById("pet");
const moodText = document.getElementById("mood");
const hungerText = document.getElementById("hunger");
const energyText = document.getElementById("energy");

// Update UI based on pet status
function updateUI() {
  // Mood logic
  if (pet.hunger < 20) {
    pet.mood = "Hungry";
    petDiv.className = "hungry";
  } else if (pet.energy < 20) {
    pet.mood = "Tired";
    petDiv.className = "tired";
  } else {
    pet.mood = "Happy";
    petDiv.className = "happy";
  }
  moodText.textContent = pet.mood;
  hungerText.textContent = pet.hunger > 50 ? "Full" : "Hungry";
  energyText.textContent = pet.energy > 50 ? "Energetic" : "Tired";
  localStorage.setItem("pet", JSON.stringify(pet));
}

// Button actions
document.getElementById("feedBtn").addEventListener("click", () => {
  pet.hunger = Math.min(100, pet.hunger + 20);
  updateUI();
});
document.getElementById("playBtn").addEventListener("click", () => {
  pet.energy = Math.max(0, pet.energy - 20);
  pet.hunger = Math.max(0, pet.hunger - 10);
  updateUI();
});
document.getElementById("sleepBtn").addEventListener("click", () => {
  pet.energy = Math.min(100, pet.energy + 30);
  updateUI();
});

// Dynamic changes
setInterval(() => {
  pet.hunger = Math.max(0, pet.hunger - 5);
  pet.energy = Math.max(0, pet.energy - 5);
  updateUI();
}, 5000);

updateUI();