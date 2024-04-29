function startGame() {
    var countdownInput = document.getElementById("countdownInput").value;
    if (countdownInput !== "") {
        // Gọi hàm toNewSite để bắt đầu đếm ngược và chuyển trang khi hoàn thành
        toNewSite(countdownInput);
    } else {
        alert("Please enter the time");
    }
}

// JavaScript để điều khiển pop-up và đếm ngược
var modal = document.getElementById('myModal');

// Hàm hiển thị pop-up
function openModal() {
    modal.style.display = 'block';
}

// Hàm đóng pop-up
function closeModal() {
    modal.style.display = 'none';
}

// Hàm bắt đầu đếm ngược và chuyển trang khi hoàn thành
function toNewSite(countdownInput) {
    var countdown = 3;
    if (!isNaN(countdownInput) && countdownInput > 0) {
        var timer = countdown;
        var modalContent = modal.querySelector('.modal-content');

        // Xóa nội dung hiện tại trong pop-up
        modalContent.innerHTML = '';

        // Tạo một phần tử span để hiển thị đếm ngược
        var countdownDisplay = document.createElement('span');
        countdownDisplay.setAttribute('id', 'countdownDisplay');
        modalContent.appendChild(countdownDisplay);

        // Bắt đầu đếm ngược và cập nhật giao diện
        var countdownInterval = setInterval(function() {
            countdownDisplay.textContent = 'Countdown: ' + timer + ' s.';

            if (timer <= 0) {
                clearInterval(countdownInterval); // Dừng đếm ngược
                modalContent.innerHTML = '<h2>The test begins!</h2>'; // Hiển thị thông báo hết giờ
                setTimeout(function() {
                    closeModal(); // Đóng pop-up sau 1 giây
                    window.location.href = `main.html?timeChange=${countdownInput}`; // Chuyển đến trang chính với tham số thời gian
                }, 1000);
            }

            timer--;
        }, 1000); // Đếm ngược mỗi giây (1000ms)
    } else {
        alert('Please enter a positive integer');
    }
}

// Mở pop-up khi trang được tải
window.onload = function() {
    openModal();
};
