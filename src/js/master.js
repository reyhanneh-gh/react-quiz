// ------------------------stars--------------------------
let starContainer = document.getElementById('stars')

for (let i = 0; i < 500; i++) {
    let star = document.createElement('div')
    star.style.width = '1px'
    star.style.height = '1px'
    star.style.borderRadius = '50%'
    star.style.opacity = '.5'
    star.style.backgroundColor = 'white'
    star.style.position = 'absolute'
    star.style.top = Math.random() * 100 + 'vh'
    star.style.left = Math.random() * 100 + '%'
    starContainer.appendChild(star)
}
// ------------------------Start test-----------------------
let firstPage = document.getElementById("firstPage")
let quizPage = document.getElementById("quizPage")
let startBtn = document.querySelector("#firstPage>button")
startBtn.addEventListener('click', () => {
    firstPage.style.display = "none"
    quizPage.style.display = "flex"
})
// ------------------------fetch api------------------------
let quiz = document.getElementById("quiz")
fetch("src/js/questions.json")
    .then(response => response.json())
    .then(data => {
        let i = 0
        data.forEach(val => {
            console.log(val);
        })

        let Qnum = document.getElementById("Qnum")
        let Qflag = 1
        let score = document.getElementById('score')
        let Sflag = 0

        let quizHtml = function () {
            quiz.innerHTML = `
                <h2 id="question" class="w-full h-fit py-5 text-white font-extrabold myFont flex gap-x-1">
                    <i class="bi bi-caret-left-fill text-[#3edfff]"></i>
                    ${data[i].question}</h2>
            <p id="a1"
                class="w-full h-fit cursor-pointer hover:scale-[.99] duration-200 border border-[#0088a363] text-white px-2.5 py-2.5 rounded-[5px]">${data[i].options[0]}
            </p>
            <p id="a2"
                class="w-full h-fit cursor-pointer hover:scale-[.99] duration-200 border border-[#0088a363] text-white px-2.5 py-2.5 rounded-[5px]">${data[i].options[1]}
            </p>
            <p id="a3"
                class="w-full h-fit cursor-pointer hover:scale-[.99] duration-200 border border-[#0088a363] text-white px-2.5 py-2.5 rounded-[5px]">${data[i].options[2]}
            </p>
            <p id="a4"
                class="w-full h-fit cursor-pointer hover:scale-[.99] duration-200 border border-[#0088a363] text-white px-2.5 py-2.5 rounded-[5px]">${data[i].options[3]}
            </p>`
            // ------------------------last Q btn------------------------
            let btn = document.getElementById('btn')
            let Qnum = document.getElementById("Qnum")
            if (i == (data.length - 1)) {
                btn.innerText = "پایان تست"
                i = 0
                Qflag = 0
                Sflag = 0
            } else {
                btn.innerText = "سوال بعد"
            }
            // ------------------------bg after click------------------------
            let clickAnswer = document.querySelectorAll("#quiz>p")
            clickAnswer.forEach(val => {
                val.addEventListener('click', () => {
                    clickAnswer.forEach(p => {
                        p.style.backgroundColor = ''
                        p.setAttribute("data-click", "off")
                    })
                    val.style.backgroundColor = '#3edfff5c'
                    val.setAttribute("data-click", "on")
                })
            })
        }
        quizHtml()

        let btn = document.getElementById('btn')
        let Qprogress = document.getElementById("Qprogress")
        let boxWidth = document.querySelector("main>section").clientWidth

        btn.addEventListener('click', () => {
            // ------------------------check answer------------------------
            let clickAnswer = document.querySelectorAll("#quiz>p")
            for (let j = 0; j < 4; j++) {
                if (data[i].options[j] == data[i].answer) {
                    clickAnswer[j].style.backgroundColor = '#49ff0245'
                    // -----------------score in first Q-------------------
                    if (i == 0) {
                        score.innerText = "0"
                    }
                    // -----------------------score------------------------
                    if (clickAnswer[j].getAttribute("data-click") == "on") {
                        Sflag++
                        score.innerText = Sflag
                    }
                } else {
                    if (clickAnswer[j].getAttribute("data-click") == "on") {
                        clickAnswer[j].style.backgroundColor = '#ff000045'
                    }
                }
            }
            // ---------------------------next Q---------------------------
            setTimeout(() => {
                if (Qflag < data.length) {
                    Qflag++
                    Qnum.innerText = Qflag
                    let QprogressWidth = (boxWidth / 100) * Qflag
                    Qprogress.style.width = QprogressWidth + "px"
                }
                i++
                quizHtml()
            }, 1000);
        })
    })