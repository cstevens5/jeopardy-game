// revise this game to use the jeopardy api that contains all questions
// ever asked on jeopardy

const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')

const categories = [
    {
        genre: 'WHO',
        questions: [
            {
                question: 'Who wrote Harry Potter?',
                answers: ['JK Rowling', 'JRR Tolkien'],
                correct: 'JK Rowling',
                level: 'easy'
            },
            {
                question: 'Who won the Wimbledon in 2023?',
                answers: ['Novak Djokovic', 'Carlos Alcaraz'],
                correct: 'Carlos Alcaraz',
                level: 'medium'
            },
            {
                question: 'Who looks exaclty like former US president \
                        Millard Filmore?',
                answers: ['Alec Baldwin', 'Donald Trump'],
                correct: 'Alec Baldwin',
                level: 'hard'
            }
        ]
    },
    {
        genre: 'WHERE',
        questions: [
            {
                question: 'Where was Barack Obama born?',
                answers: ['US', 'Kenya'],
                correct: 'Kenya',
                level: 'easy'
            },
            {
                question: 'Where was Giles Corey stoned to death?',
                answers: ['Salem, MA', 'New Orleans, LA'],
                correct: 'Salem, MA',
                level: 'medium'
            },
            {
                question: 'Where can marsupials be found?',
                answers: ['Australia', 'North Korea'],
                correct: 'Australia',
                level: 'hard'
            }
        ]
    },
    {
        genre: 'WHEN',
        questions: [
            {
                question: 'When did WW2 end?',
                answers: ['1944', '1945'],
                correct: '1945',
                level: 'easy'
            },
            {
                question: 'When did South Carolina secede from the Union?',
                answers: ['1862', '1860'],
                correct: '1860',
                level: 'medium'
            },
            {
                question: 'When was the C programming language created?',
                answers: ['1972', '1984'],
                correct: '1972',
                level: 'hard'
            }
        ]
    },
    {
        genre: 'WHAT',
        questions: [
            {
                question: 'What element has atomic number 1?',
                answers: ['Helium', 'Hydrogen'],
                correct: 'Hydrogen',
                level: 'easy'
            },
            {
                question: 'What was the northernmost battle of the Civil War?',
                answers: ['The battle of Shrute Farms', 'The battle of Bunker Hill'],
                correct: 'The battle of Shrute Farms',
                level: 'medium'
            },
            {
                question: 'What is the third longest river in the world?',
                answers: ['Yangtze', 'Thames'],
                correct: 'Yangtze',
                level: 'hard'
            }
        ]
    },
    {
        genre: 'HOW MANY',
        questions: [
            {
                question: 'How many stripes are on the US flag?',
                answers: ['15', '13'],
                correct: '13',
                level: 'easy'
            },
            {
                question: 'How many nations are a part of the United Kingdom?',
                answers: ['4', '3'],
                correct: '4',
                level: 'medium'
            },
            {
                question: 'How many United Nations recognized countries are there?',
                answers: ['195', '203'],
                correct: '195',
                level: 'hard'
            }
        ]
    }
]

function addCategory(category) {
    const column = document.createElement('div')
    column.classList.add('genre-column')

    const genreTitle = document.createElement('div')
    genreTitle.classList.add('genre-title')
    genreTitle.innerHTML = category.genre

    column.appendChild(genreTitle)
    game.append(column)

    category.questions.forEach(question => {
        const card = document.createElement('div')
        card.classList.add('card')
        column.append(card)

        if (question.level === 'easy') {
            card.innerHTML = 100
        } else if (question.level === 'medium') {
            card.innerHTML = 200
        } else {
            card.innerHTML = 300
        }

        card.setAttribute('data-question', question.question)
        card.setAttribute('data-answer-1', question.answers[0])
        card.setAttribute('data-answer-2', question.answers[1])
        card.setAttribute('data-correct', question.correct)
        card.setAttribute('data-value', card.innerHTML)

        card.addEventListener('click', flipCard)
    })
}

categories.forEach(category => addCategory(category))

function flipCard() {
    this.innerHTML = ""
    this.style.fontSize = "15px"
    this.style.lineHeight = "30px"

    const textDisplay = document.createElement('div')
    textDisplay.classList.add('card-text')
    textDisplay.innerHTML = this.getAttribute('data-question')
    const firstButton = document.createElement('button')
    const secondButton = document.createElement('button')

    firstButton.classList.add('first-button')
    secondButton.classList.add('second-button')

    firstButton.innerHTML = this.getAttribute('data-answer-1')
    secondButton.innerHTML = this.getAttribute('data-answer-2')
    firstButton.addEventListener('click', getResult)
    secondButton.addEventListener('click', getResult)
    this.append(textDisplay, firstButton, secondButton)

    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.removeEventListener('click', flipCard))

}

let score = 0

function getResult() {

    const allCards = Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card => card.addEventListener('click', flipCard))

    const cardOfButton = this.parentElement

    if (cardOfButton.getAttribute('data-correct') == this.innerHTML) {
        score += parseInt(cardOfButton.getAttribute('data-value'))
        scoreDisplay.innerHTML = score
        cardOfButton.classList.add('correct-answer')
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
        }, 100)
    } else {
        cardOfButton.classList.add('wrong-answer')
        setTimeout(() => {
            while (cardOfButton.firstChild) {
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML = 0
        }, 100)
    }

    cardOfButton.removeEventListener('click', flipCard)


}
