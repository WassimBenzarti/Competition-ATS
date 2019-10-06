const fetch = require("node-fetch")

token = "61f9c701-c266-4aa3-8293-ad6aa18bcd01"


function nthPrime(inp) {
    var count = 0;
    for (var i = 2; i <= 100000; i++) {
        if (isPrime(i)) count = count + 1;
        if (count == inp) return i;
    }
}
function isPrime(i) {
    for (var j = 2; j < i; j++) {
        //instead of `j < i` it can be reduced using other conditions
        if (i % j == 0) {
            return false
        }
    }
    return true
}



function answerQuestion(question) {
    switch (question.type) {
        case "PRIME":
            const match = question.hint.match(/[0-9]+/g)
            return nthPrime(parseFloat(match[0]))
            break;
        case "MAX":
            const [first, second] = question.hint.match(/[0-9]+/g)
            return Math.max(parseFloat(first), parseFloat(second))
            break;
        case "CALCULUS":
            const [cal1, cal2] = question.hint.match(/[0-9]+/g)
            const operation = question.hint.match(/(plus|minus|times)/)[0];
            switch (operation) {
                case "plus":
                    return parseFloat(cal1) + parseFloat(cal2)
                    break;
                case "minus":
                    return parseFloat(cal1) - parseFloat(cal2)
                    break;
                case "times":
                    return parseFloat(cal1) * parseFloat(cal2)
                    break;
            }
            break;
    }
}



function discover() {
    console.log("DISCOVERING")
    fetch(`http://hackathon.internal.ats-digital.com:3333/api/nuggets/discover?token=${token}`)
        .then(res => res.json())
        .then(questions => {
            console.log("success of discover: ", questions.success)
            if (questions.success === false) {
                return console.log("You can't right now ! questions: ", questions.message)
            }

            questions = questions.filter(question => question.type === "MAX" || question.type === "CALCULUS")
            /* Get the first item only */
            questions = [questions[Math.round(Math.random() * questions.length)]]
            questions.map((question, index) => {
                const id = question._id
                const trigger = answerQuestion(question)
                console.log(question.hint, trigger)

                setTimeout(() => {
                    fetch(`http://hackathon.internal.ats-digital.com:3333/api/nuggets/${id}/claim?token=${token}&trigger=${trigger}`)
                        .then((res) => res.json())
                        .then((res) => {
                            console.log(res)
                            if (res.success === false) {
                                console.log("answer to question", res.message)
                            }
                            if (res.success === true) {
                                console.log("YOU MADE IT !!!")
                            }

                            console.log("REDOING")

                            setTimeout(discover, 3100)

                        }).catch(console.log)
                }, 3100)
            })
        })
}
discover()



