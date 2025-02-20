const images = [
    "img/01.jpg",
    "img/02.jpg",
    "img/03.jpg",
    "img/04.jpg",
    "img/05.jpg"
];

const slots = document.querySelectorAll(".slot");
const middleSlot = document.getElementById("middle-slot");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const resultCard = document.getElementById("result-card");
const cardImage = document.getElementById("cardImage");

let interval;
let isRunning = false;

// ตั้งค่าภาพเริ่มต้นในสล็อต
function updateSlots() {
    slots.forEach((slot, index) => {
        slot.style.backgroundImage = `url(${images[index]})`;
    });
}

// ฟังก์ชันสลับภาพในสล็อต
function shuffleSlots() {
    let lastImage = images.pop();
    images.unshift(lastImage);

    slots.forEach((slot, index) => {
        slot.style.backgroundImage = `url(${images[index]})`;
    });
}

// เริ่ม/หยุดการสุ่ม
startStopBtn.addEventListener("click", function () {
    if (!isRunning) {
        interval = setInterval(shuffleSlots, 150);
        this.textContent = "Stop";
        this.classList.add("stop");
        isRunning = true;
        resetBtn.style.display = "none"; // ซ่อนปุ่ม Reset ขณะสุ่ม
    } else {
        clearInterval(interval);
        this.textContent = "Start";
        this.classList.remove("stop");
        isRunning = false;
        showResult();
        resetBtn.style.display = "inline"; // แสดงปุ่ม Reset เมื่อหยุด
    }
});

// แสดงผลลัพธ์เมื่อหยุดสุ่ม
function showResult() {
    const middleIndex = Math.floor(images.length / 2);
    const selectedImage = images[middleIndex];

    cardImage.src = selectedImage;
    resultCard.classList.add("flipped");
}

// รีเซ็ตการสุ่ม
resetBtn.addEventListener("click", function () {
    resultCard.classList.remove("flipped"); 
    cardImage.src = "default.jpg";
    updateSlots();
});

// อัพเดตสล็อตเริ่มต้น
updateSlots();
