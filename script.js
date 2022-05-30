const wordEl = document.querySelector('#word');
const textEl = document.querySelector('#text');
const scoreEl = document.querySelector('#score');
const timeEl = document.querySelector('#time');

const levelbtnEl = document.querySelector('#level-btn');
const settingsEl = document.querySelector('#settings');
const levelfrmEl = document.querySelector('#level-frm');
const levelEl = document.querySelector('#level');

const gameoverEl = document.querySelector('#gameover-container');

let words = [
    'กะเทย', 'อินเทอร์เน็ต','กะเพรา',
    'กะทันหัน', 'แกงกะหรี่', 'ประแป้ง',
     'ปลากะพง', 'ไอศกรีม', 'ลิดรอน',
      'บุคลากร', 'อนุญาต', 'ซีรีส์',
      'มุขตลก', 'สังเกตุ', 'เฟสบุค',
      'อีเมล์', 'คอมเม้นท์', 'ปรากฎ',
      'กฏหมาย', 'ออฟฟิซ', 'นะค่ะ',
      'หลงไหล', 'ทะยอย', 'ศรีษะ',
      'คุ้กกี้', 'ใต้ฝุ่น', 'สเน่ห์',
      'ฉนั้น', 'โควต้า', 'ก๋วยจั๊บ',
      'งึมงำ', 'ขึ้นฉ่าย', 'มงกุฎ',
      'ประจันหน้า', 'ฝักใฝ่', 'รังสรรค์'
    ];

let rndWord;
let score = 0;
let time;
const saveMode = localStorage.getItem('mode') !== null ?localStorage.getItem('mode') :'normal';;
let level = 'normal';

const timeInterval = setInterval(ft_countDown, 1000);

function ft_diplayWord(words){
    rndWord = words[Math.floor(Math.random() * words.length)];
    wordEl.innerHTML = `${rndWord}`;
    timeEl.innerText = time;
}

textEl.addEventListener('input', (e) => {
    let inputText = e.target.value;
    if (inputText !== rndWord){
        
    }
    else{
        if (saveMode === 'easy') time += 5;
        else if (saveMode === 'normal') time += 3;
        else time += 2;
        if (words.length > 0){
            words = words.filter(words => words != inputText)
            ft_diplayWord(words);
            ft_updateScore();
            e.target.value = "";
        }
        else{
            clearInterval(timeInterval);
            ft_gameClear();
        }
    }
});

function ft_updateScore(){
    score += 10;
    scoreEl.innerText = score;
}

function ft_countDown(){
    time--;
    timeEl.innerText = time;
    if (time === 0){
        clearInterval(timeInterval);
        ft_gameOver();
    }
}

function ft_gameOver(){
    gameoverEl.innerHTML = `
    <h2>Game Over</h2>
    <p>คะแนนของคุณ = ${score} คะแนน</p>
    <button onclick="location.reload()">เล่นอีกครั้ง</button>
    `;
    gameoverEl.style.display = 'flex';
}

function ft_gameClear(){
    gameoverEl.innerHTML = `
    <h2>Game Clear!</h2>
    <p>คะแนนของคุณ = ${score} คะแนน</p>
    <button onclick="location.reload()">เล่นอีกครั้ง</button>
    `;
    gameoverEl.style.display = 'flex';
}

levelbtnEl.addEventListener('click',() => {
    settingsEl.classList.toggle('hide');
});

levelEl.addEventListener('change',(e) =>{
    level = e.target.value;
    localStorage.setItem('mode', level);
});

function ft_startGame(){
    levelEl.value = saveMode;
    if (saveMode === 'easy') time = 15;
    else if (saveMode === 'normal') time = 10;
    else time = 5;
    ft_diplayWord(words);
}

ft_startGame();
textEl.focus();