const fetch = require("node-fetch")
const answerQuestion = require("../answerQuestion")
const { URL, TOKEN } = require("../index")
const detectApiError = require("../errors/detectApiError")


const questions_cache = []
const numberOfIgnoredQuestions = 5

module.exports = function discover() {
    /* Discover nuggets*/
    fetch(`${URL}/nuggets/discover?token=${TOKEN}`)
        .then(res => res.json())
        .then(detectApiError)
        .then(result => {
            /* Choose a specific number of questions */
            /* Eliminate the first numberOfIgnoredQuestions questions */
            questions_cache.push(...questions.slice(numberOfIgnoredQuestions))

            questions_cache.forEach(question => {

            })


            console.log(question.hint)
            const id = question._id

            const trigger = answerQuestion(question)
            console.log(question.hint, trigger)
            console.log("ANSWERING")
            setTimeout(() => {
                fetch(`http://hackathon.internal.ats-digital.com:3333/api/nuggets/${id}/claim?token=${token}&trigger=${trigger}`)
                    .then((res) => res.json())
                    .then((res) => {
                        console.log(res)
                        if (res.success === false) {
                            console.log("answer to question", res.message)
                            return
                        }
                        if (res.success === true) {
                            console.log("YOU MADE IT !!!")
                            return
                        }
                        console.log("RETRYING")
                        setTimeout(() => {
                            discover()
                        }, 3000)

                    }).catch(console.log)
            }, 3000)

        })
}

