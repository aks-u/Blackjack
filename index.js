let cards = []
let aiCards = []
let sum = 0
let aiSum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let player = {
    name: "Player",
    credits: 0
    }
let currentBet = 0


let messageEl = document.getElementById("msg-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let aiCardsEl = document.getElementById("ai-cards-el")
let aiSumEl = document.getElementById("ai-sum")
let playerEl = document.getElementById("player-el")
let betEl = document.getElementById("bet-el")
playerEl.textContent = player.name + ": " + player.credits + "€"


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
}


function wallet(params) {
    player.credits += +document.getElementById("credit-input").value
    playerEl.textContent = player.name + ": " + player.credits + "€"
}


function getRandomCard(params) {
    let randomCard = Math.floor(Math.random() * 13) + 1
    if (randomCard > 10) {
        return 10
    } else if (randomCard == 1) {
        return 11
    } else {
        return randomCard
    }
}


function placeBet(betAmount) {
    if (player.credits >= betAmount) {
        player.credits += currentBet
        currentBet = betAmount;
        betEl.textContent = "Current Bet: " + currentBet
        player.credits -= currentBet;
        playerEl.textContent = player.name + ": " + player.credits + "€";
    } else {
        if (player.credits < betAmount) {
            alert("Not enough funds. Add more money to place this bet.");
        }
    }
}


function startGame(params) {
    if (player.credits + currentBet > 0 && currentBet > 0 && !isAlive) {
        isAlive = true
        hasBlackJack = false

        let aiFirstCard = getRandomCard()
        let aiSecondCard = getRandomCard()
        aiCards = [aiFirstCard, aiSecondCard]
        aiSum = aiFirstCard + aiSecondCard
        aiCardsEl.textContent = "Opponent cards: " + aiFirstCard + "🎴"
        
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        renderGame()
    }
    else {
        if (player.credits <= 0) {
            alert("Add Money First!")
        }
        else if (currentBet === 0) {
            alert("Place a bet.")
        }
        else if (isAlive) {
            alert("Finish the previous game before starting a new game.")
        }
    }
    
}


function renderGame(params) {
    sumEl.textContent = "Sum: " + sum
    aiSumEl.textContent = ""
    cardsEl.textContent = "Your cards: "

    for (let i = 0; i < cards.length; i++) {
        if (i == 0) {
            cardsEl.textContent += cards[i]
        } else {
            cardsEl.textContent += ", " + cards[i]
        }
    }

    if (sum <= 20) {
        message = "Do you want to draw a card?"
    } else if (sum === 21) {
        message = "Blackjack!"
        hasBlackJack = true
        endRound()
    } else {
        message = "You went over 21..."
        endRound()
    }
    messageEl.textContent = message
}


function endRound(params) {
    if (!isAlive) {
        alert("Deal cards first.")
        return
    }
    let aiMessage = "Dealer cards: " + aiCards[0] + ", " + aiCards[1]
    aiCardsEl.textContent = aiMessage
    aiSumEl.textContent = "Dealer sum: " + aiSum

    if (sum <= 21 && aiSum <= 16) {
        while (aiSum < sum) {
            let aiCard = getRandomCard()
            aiCards.push(aiCard)
            aiSum += aiCard
            aiMessage += ", " + aiCards[aiCards.length - 1]
            aiCardsEl.textContent = aiMessage
            aiSumEl.textContent = "Dealer sum: " + aiSum
        }
    }

    if (isAlive) {
        if (sum <= 21 && (sum > aiSum || aiSum > 21)) {
            message = "You won!"
            if (hasBlackJack) {
                player.credits += currentBet * 2.5
            }
            else {
                player.credits += currentBet * 2
            }
            isAlive = false
        } else if (sum == aiSum) {
            message = "It's a tie."
            player.credits += currentBet
            isAlive = false
        } else {
            message = "You lost..."
            isAlive = false
        }
    }
    messageEl.textContent = message
    currentBet = 0
    betEl.textContent = "Current Bet: " + currentBet
    playerEl.textContent = player.name + ": " + player.credits + "€"
}


function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = getRandomCard()
        cards.push(card)
        sum += card
        renderGame()
    }
    else if (!isAlive) {
        alert("Deal cards first.")
    }
}




    
