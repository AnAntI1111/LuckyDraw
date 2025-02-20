const images = [
    "img/01.jpg",
    "img/02.jpg",
    "img/03.jpg",
    "img/04.jpg",
    "img/05.jpg"
];

const slots = document.querySelectorAll(".slot");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const popup = document.getElementById("result-popup");
const popupImage = document.getElementById("popupImage");
const closePopup = document.getElementById("closePopup");

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
        this.classList.remove("start"); // เอาสีเขียวออก
        this.classList.add("stop"); // ใส่สีแดง
        isRunning = true;
        resetBtn.style.display = "none"; // ซ่อนปุ่ม Reset ระหว่างเล่น
    } else {
        clearInterval(interval);
        this.textContent = "Start";
        this.classList.remove("stop"); // เอาสีแดงออก
        this.classList.add("start"); // ใส่สีเขียว
        isRunning = false;
        showResult();
        resetBtn.style.display = "inline"; // แสดงปุ่ม Reset เมื่อหยุด
    }
});

resetBtn.addEventListener("click", function () {
    updateSlots(); // รีเซ็ตภาพกลับเป็นค่าเริ่มต้น
    popup.style.display = "none"; // ซ่อน popup
    startStopBtn.textContent = "Start"; // เปลี่ยนปุ่มกลับเป็น Start
    startStopBtn.classList.remove("stop"); // เอาสีแดงออก
    startStopBtn.classList.add("start"); // ใส่สีเขียว
    isRunning = false;
    this.style.display = "none"; // ซ่อนตัวเองหลังรีเซ็ต
});


// แสดงผลลัพธ์เมื่อหยุดสุ่ม
// ซ่อน popup ตั้งแต่โหลดเว็บ
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("result-popup").style.display = "none";
});

// แสดง popup เมื่อกดปุ่มหยุด
function showResult() {
    const middleIndex = Math.floor(images.length / 2);
    const selectedImage = images[middleIndex];

    document.getElementById("popupImage").src = selectedImage;
    document.getElementById("result-popup").style.display = "block"; // แสดง popup
}

// ปิด popup เมื่อกดปุ่ม X
document.getElementById("closePopup").addEventListener("click", function () {
    document.getElementById("result-popup").style.display = "none";
});

// อัปเดตภาพเริ่มต้น
updateSlots();
