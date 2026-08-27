import { CalendarEvent } from "./CalendarEvent.js";
import { EventManager } from "./EventManager.js";
const API_KEY = 'AIzaSyDL-gWpZL_GlR4Qq0Y9QxP_a76fTKEiESk';
const FILE_ID = '1lDKlg7i1UZLUEgixq2b8lzKsRN8xRB57';
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwdKvBq_AF2gjPKBvPy12PLhePdEfEFMVP9z5N1Pk_0DnB92FXFN3h0szdnxHGaKXVD/exec';
var title = document.getElementById("title");

const clk = document.getElementById('showAll');
const loginBox = document.querySelector('.login');
const modal = document.getElementById('calendarModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');


closeModal.addEventListener("click", () => {
    modal.classList.remove('show');
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

function readFileOnDrive() {
    const contentDiv = document.getElementById('content');
    loginBox.classList.add('moved-up');
    title.innerText = "Đang tải dữ liệu ... ";
    fetch(WEB_APP_URL).then(respone => {
        if (!respone.ok) {
            throw new Error("Cannot read file");
        }
        return respone.json();
    }).then(data => {
        let arr = new EventManager(data);
        arr.getAllEvents().forEach(item => {
            let element = document.createElement("div");
            element.className = "item";

            let btn = document.createElement("button");

            let monthStr = "";
            if (item.date && item.date.includes("-")) {
                let parts = item.date.split("-");
                if (parts.length >= 2) {
                    monthStr = "Th " + parseInt(parts[1]);
                }
            }

            btn.innerHTML = `
        <span class="badge-month">${monthStr || 'T?'}</span>
        ${item.dayOfWeek} <br> Ngày: ${item.date}
    `;

            btn.addEventListener("click", () => {
                let eventTitle = item.title || item.name || item.content || item.description || "Không có sự kiện đặc biệt";

                modalBody.innerHTML = `
            <div style="font-size: 24px; color: #ff4d6d; margin-bottom: 8px;">${item.dayOfWeek}</div>
            <div style="font-size: 22px; font-weight: bold; margin-bottom: 12px;">Ngày: ${item.date}</div>
            <div style="background: #fff0f3; padding: 12px; border-radius: 10px; font-size: 19px;">${eventTitle}</div>
        `;

                modal.classList.add('show');
            });

            element.appendChild(btn);
            contentDiv.appendChild(element);

        });
    }).catch(error => {
        console.error("Chi tiết lỗi", error);
        contentDiv.innerText = "Đã xảy ra lỗi " + error.message;
    }).finally(() => {
        title.innerText = "";
        clk.classList.add('hidden');
    })
}



if (clk) {
    clk.addEventListener("click", readFileOnDrive);
} else {
    console.warn("Không tìm thấy phần tử có id là 'showAll' trong HTML!");
}

function createSnowflake() {
    const snow = document.createElement('div');
    snow.classList.add('snowflake');

    const size = Math.random() * 5 + 4;
    snow.style.width = `${size}px`;
    snow.style.height = `${size}px`;

    snow.style.left = `${Math.random() * window.innerWidth}px`;

    const duration = Math.random() * 5 + 5;
    snow.style.animationDuration = `${duration}s`;

    snow.style.opacity = Math.random() * 0.6 + 0.4;

    document.body.appendChild(snow);

    setTimeout(() => {
        snow.remove();
    }, duration * 1000);
}

setInterval(createSnowflake, 300);


const loveLetter = document.getElementById('loveLetterBtn');

function triggerShake() {
    loveLetter.classList.add('shaking');

    setTimeout(() => {
        loveLetter.classList.remove('shaking');
    }, 600);
}

setInterval(triggerShake, 3000);

loveLetter.addEventListener("click", () => {
    modalBody.innerHTML = `
        <div style="font-size: 26px; color: #ff4d6d; margin-bottom: 10px;">💌 Bức Thư Nhỏ</div>
        <div style="font-size: 20px; line-height: 1.6; color: #0b1536;">
            "Trời hôm nay có chút dịu dàng qua khung cửa, mong góc nhỏ bình yên ấy nhớ giữ ấm đôi bàn tay, uống một ngụm trà ấm và thả lỏng trọn vẹn. Mọi mệt mỏi ngoài kia cứ để gió cuốn đi, hôm nay xứng đáng được nâng niu và ôm trọn vào những yêu thương ngọt ngào nhất!" ❤️
        </div>
    `;
    modal.classList.add('show');
});