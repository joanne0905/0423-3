let inputBox; // 輸入方框
let textContent = '👀✨'; //  預設文字內容
let slider; // 滑桿物件
let jumpButton; // 跳動按鈕
let isJumping = false; // 跳動狀態
let dropdown; // 下拉式選單
let iframe; // IFRAME 元素

function setup() {
  // 產生一個和視窗一樣大小的畫布，顏色為#fefae0
  createCanvas(windowWidth, windowHeight);
  background('#fefae0');

  // 產生一個可輸入方框，寬高為300，80，顯示在座標(10，10)
  inputBox = createInput(textContent);
  inputBox.position(10, 10); // 設定方框位置
  inputBox.size(290,50); // 設定方框大小
  inputBox.style('font-size', '20px'); // 設定方框文字大小
  inputBox.input(updateTextContent); // 當方框內容改變時，執行updateTextContent函式

  // 產生一個滑桿物件，顯示在座標(320,10)，寬為100
  slider = createSlider(12, 50, 20); // 設定滑桿範圍和初始值
  slider.position(350, 25); // 設定滑桿位置
  slider.size(100); // 設定滑桿寬度

  // 產生一個按鈕物件，顯示在座標(460, 10)，文字為"跳動"
  jumpButton = createButton('跳動');
  jumpButton.position(500, 20); // 設定按鈕位置
  jumpButton.style('font-size', '20px'); // 設定按鈕文字大小
  jumpButton.style('background-color', '#dad7cd'); // 設定按鈕背景顏色
  jumpButton.mousePressed(toggleJump); // 當按鈕被按下時，執行toggleJump函式

  // 產生一個下拉式選單，顯示在座標(800, 10)，寬為100
  dropdown = createSelect();
  dropdown.position(800, 10); // 設定下拉式選單位置
  dropdown.size(200); // 設定下拉式選單寬度
  //高度
  dropdown.style('height', '50px');
  //選單大小
  dropdown.style('font-size', '30px'); // 設定選單文字大小
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.changed(goToWebsite); // 當選擇改變時，執行goToWebsite函式

  // 產生一個 IFRAME 元素，顯示在視窗中間，寬高為視窗寬高度減20
  iframe = createElement('iframe');
  iframe.position(100, 100); // 設定 IFRAME 位置
  iframe.size(windowWidth - 200, windowHeight - 200); // 設定 IFRAME 寬高
  iframe.attribute('src', 'https://www.tku.edu.tw'); // 設定 IFRAME 預設顯示的網頁
}

function updateTextContent() {
  textContent = this.value(); // 更新文字內容
}

function toggleJump() {
  isJumping = !isJumping; // 切換跳動狀態
}

function goToWebsite() {
  let selectedOption = dropdown.value();
  if (selectedOption === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw'); // 顯示淡江大學的官方網站
  } else if (selectedOption === '教育科技學系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw'); // 顯示教育科技學系的官方網站
  }
}

function draw() {
  background('#fefae0'); // 清除畫布

  // 顯示滑桿左右的文字說明
  textSize(12);  
  fill(0); 
  textAlign(RIGHT, CENTER);
  text('12PX', 340, 25);
  textAlign(LEFT, CENTER);
  text('50PX', 460, 25);

  // 設定文字大小為滑桿的值
  textSize(slider.value()); // 設定文字大小
  

  // 在視窗中間重複顯示一整排文字，文字之間有空格
  let textWidthWithSpace = textWidth(textContent + ' ');
  let startX = 0;
  let y = 100;

  // 重複顯示文字直到填滿整個視窗
  for (let y = 100; y < windowHeight; y += textAscent() + textDescent() + 10) { // 這裡的textAscent() + textDescent()是文字的高度
    for (let x = startX; x < windowWidth; x += textWidthWithSpace) { // 這裡的textWidthWithSpace是文字的寬度
      let offsetY = isJumping ? sin(frameCount * 0.1 + x * 0.05 + y * 0.1) * 5 : 0; // 如果跳動狀態為true，則讓文字上下跳動5PX，每行字串跳動的距離都不同
      text(textContent, x, y + offsetY); // 顯示文字
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  iframe.size(windowWidth - 20, windowHeight - 20); // 調整 IFRAME 大小
}

