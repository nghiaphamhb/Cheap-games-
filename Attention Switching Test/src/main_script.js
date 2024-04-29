const urlParams = new URLSearchParams(window.location.search);
const get = urlParams.get('timeChange');

var hiddenBar = document.getElementById("hiddenBar");
var turn = document.getElementById("turn")
var correct_streak = document.getElementById("correct_streak")
var bigLetterElement = document.getElementById('bigLetter');

// Định nghĩa thời gian bắt đầu và thời gian kết thúc đếm ngược (ví dụ: 10 giây)
var startTime = parseInt(get);
var currentTime = startTime;

let letter
let color
let correct = 0
let choosed = 0
let streak = 0
let maxStreak = 0


//Hàm lấy từ random
function getRandomLetter() {
    const letters = ['RED', 'YELLOW', 'GREEN'];
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
}

//Hàm lấy màu random
function getRandomColor() {
    const colors = ['#FF0000', '#FFFF00', '#33FF57']; // Mã màu sắc ngẫu nhiên
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

//Hàm ô từ random
function changeBigLetterRandomly() {
    letter = getRandomLetter();
    color = getRandomColor();

    bigLetterElement.textContent = letter;
    bigLetterElement.style.color = color;
}

// Hàm lưu giá trị max của streak
function saveMaxStreak(){
    if (streak > maxStreak) maxStreak = streak
}

//Hàm kiểm tra màu có khớp hay không
function checkColor(colorIn) {
    if(color == colorIn){
        correct += 1
        streak += 1
    } else {
        streak = 0
    }
    saveMaxStreak()
}

//Hàm update kết quả sau mỗi lần chọn màu
function updateAnswer(){
    if (currentTime > 0){
        turn.textContent = "Number of questions answered: " + choosed
        correct_streak.textContent = "Streak of correct answers: " + streak
    } else {  // Hiển thị thông báo khi đếm ngược kết thúc
        showHiddenBar()  //Hiện thanh ẩn
        bigLetterElement.textContent = "The test is over"
        bigLetterElement.style.color = "initial"; // trả lại màu mặc định
        turn.textContent = "Total time used: " + startTime + " seconds"
        countdownDisplay.textContent = "Number of questions answered: " + choosed
        correct_streak.textContent = "The number of questions answered correctly: " + correct
        hiddenBar.textContent = "The maximum streak of correct answers : " + maxStreak
    }   
}

//Hàm chọn màu
function chooseColor(colorIn) {
    if (currentTime > 0) {
        choosed += 1
        checkColor(colorIn)
        updateAnswer()
        changeBigLetterRandomly()
    } 
}



// Định nghĩa hàm để thực hiện đếm ngược
function countdown() {
    // Lấy thẻ <p> có id là "countdownDisplay"
    var countdownDisplay = document.getElementById("countdownDisplay");
    // Cập nhật nội dung của thẻ <p> ban đầu
    countdownDisplay.textContent = "The test takes place in " + currentTime + " seconds";
    // Tạo một interval để giảm thời gian đếm ngược mỗi giây
    var countdownInterval = setInterval(function() {
        currentTime--;
        // Cập nhật nội dung của thẻ <p> sau mỗi giây
        countdownDisplay.textContent = "The test takes place in " + currentTime + " seconds";
        // Kiểm tra nếu thời gian đếm ngược đã đạt 0
        if (currentTime <= 0) {
            clearInterval(countdownInterval); // Dừng interval khi đếm ngược kết thúc
            updateAnswer() 
        }
    }, 1000); // Đặt interval để cập nhật mỗi giây (1000 miliseconds)
}

// Hàm để hiện thanh ẩn
function showHiddenBar() {
    hiddenBar.style.display = "block"; // Hiện phần tử bằng cách đặt thuộc tính display thành "block"
}

//Hàm quay lại trang hướng dẫn 
function goBack() {
    window.location.href = 'index.html';
}

// sự kiện ấn phím
document.addEventListener('keydown', function(event) {
    if (event.key === 'a') { 
        chooseColor('#FF0000'); // Chọn màu đỏ
    } else if (event.key === 's') { 
        chooseColor('#008000'); // Chọn màu xanh lá cây
    } else if (event.key === 'd') { 
        chooseColor('#FFFF00'); // Chọn màu vàng
    } else if (event.key === 'w') { 
        goBack()
    }
});

// sự kiến nhấp chuột

//hàm chạy chương trình 
function program(){
    // Gọi hàm countdown khi trang được tải
    countdown();
    changeBigLetterRandomly();

}

program();















