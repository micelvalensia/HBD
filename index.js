
particlesJS("particles-js", {
    particles: {
        number: {
        value: 80,
        density: {
            enable: true,
            value_area: 800
        }
        },
        shape: {
        type: "circle"
        },
        opacity: {
        value: 0.5,
        random: true
        },
        size: {
        value: 5,
        random: true
        },
        line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
        }
    },
    interactivity: {
        events: {
        onhover: {
            enable: true,
            mode: "repulse"
        }
        }
    }
    });


const main = document.querySelector(".main");
const game = document.getElementById("game");
const card = document.querySelector(".card");

card.addEventListener("click", () => {
    document.getElementById("audio").play();
    card.classList.toggle("active");
})

const start1 = {
    gif: "https://feeldreams.github.io/bwa.gif",
    desc: "Selamat ulang tahun yang ke 17 🎂🎂",
    tombol: "Lanjut 👉"
}

const start2 = {
    gif: "https://feeldreams.github.io/bwa2.gif",
    desc: "Semoga panjang umur sehat selalu dan selalu dimurahkan rezeki ❤❤",
    tombol: "Lanjut 👉"
}

const start3 = {
    gif: "https://feeldreams.github.io/bunga2.gif",
    desc: "Aku ada kartu ucapan nih buat kamu, penasaran? Lanjut 👉",
    tombol: "Lanjut 👉"
}

function update({gif, desc, tombol}){
    const gifElement = document.getElementById("gifted");
    const deskripsi = document.getElementById("deskripsi");
    const myBtn = document.getElementById("hilang");
    const merah = document.querySelector(".merah");
    const biru = document.querySelector(".biru");
    const hijau = document.querySelector(".hijau");

    gifElement.setAttribute("src", `${gif}`);
    deskripsi.innerHTML = desc;
    myBtn.innerHTML = tombol;

    merah.classList.remove("muncul");
    biru.classList.remove("muncul");
    hijau.classList.remove("muncul");

    setTimeout(() => {
        merah.classList.add("muncul");
        biru.classList.add("muncul");
        hijau.classList.add("muncul");
    },1)

    new TypeIt('#deskripsi', {
        strings: `${desc}`,
        speed: 50,  
        waitUntilVisible: true,  
        loop: false,  
    })
}

function start() {
    update(start1);
    let hasClick = 0;
    const btn = document.getElementById("hilang");

    btn.addEventListener("click", () => {
        hasClick++;
        
        if(hasClick === 1){
            update(start2)
        }else if(hasClick === 2){
            update(start3)
        }else{
            Swal.fire({
                title: 'Happy Birthday Sayangggg! 🎉',
                html: `<div id="typed-text" style="font-size: 24px; color: #4caf50; text-align: center;"></div>`,
                imageUrl: 'https://feeldreams.github.io/bunga2.gif',
                imageWidth: 100,  
                imageHeight: 100,
                confirmButtonText: "Lanjut ke kartu",
            }).then((result) => {
                if(result.isConfirmed){
                    main.style.display = "none"
                    game.style.display = "flex"
                }
            })
        }
    })
}

document.addEventListener("DOMContentLoaded", start);


const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const giliran = document.getElementById("giliran")

let currentPlayer = 'Kamu'; 

let gameBoard = ['', '', '', '', '', '', '', '', '']; 


function handleClick(event) {
const cellIndex = event.target.getAttribute('data-cell');

if (gameBoard[cellIndex] !== '') return;

gameBoard[cellIndex] = currentPlayer;
event.target.classList.add(currentPlayer);

if (checkWinner(currentPlayer)) {
setTimeout(() => giliran.innerHTML = currentPlayer + " " +'Yang Menang 🎉🎉' , 10);
if(currentPlayer === "Kamu"){
    Swal.fire({
                title: 'Anjayy Kamu Menangg! 🎉',
                html: `<div id="typed-text" style="font-size: 24px; color: #4caf50; text-align: center;"></div>`,
                imageUrl: 'https://feeldreams.github.io/bwa2.gif',
                imageWidth: 100,  
                imageHeight: 100,
                confirmButtonText: "Lanjut ke kartu",
            }).then((result) => {
                if(result.isConfirmed){
                    game.style.display = "none";
                    card.style.display = "block";
                }
            })
}else{
    return;
}
}

currentPlayer = currentPlayer === 'Kamu' ? 'Aku' : 'Kamu';
if(currentPlayer === 'Kamu'){
giliran.innerHTML = 'Giliran : Kamu';
}else{
giliran.innerHTML = 'Giliran : Aku';
}
}

function checkWinner(player) {
const winPatterns = [
[0, 1, 2], 
[3, 4, 5], 
[6, 7, 8], 
[0, 3, 6], 
[1, 4, 7], 
[2, 5, 8], 
[0, 4, 8], 
[2, 4, 6], 
];

return winPatterns.some(pattern => 
pattern.every(index => gameBoard[index] === player)
);
}

function resetGame() {
gameBoard = ['', '', '', '', '', '', '', '', ''];
cells.forEach(cell => {
cell.classList.remove('Kamu', 'Aku');
});
currentPlayer = 'Kamu'; 
giliran.innerHTML = 'Giliran :' + " " +currentPlayer;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
