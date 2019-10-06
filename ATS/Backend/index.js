const discover = require("./tasks/discover")
const attack = require("./tasks/attack")
const defend = require("./tasks/defend")

/* Config */
const TOKEN = "61f9c701-c266-4aa3-8293-ad6aa18bcd01"
const URL = "http://hackathon.internal.ats-digital.com:3333/api"
const MY_USER_ID = "5d4ae7e32148b811339222ff" // the user id won't change

const actions = {
    discover,
    attack,
    defend
}

function decisionMaker() {

    if (Math.random() < .2) { // shouldn't always defend, other people may block you forever
        /* Check if someone attacked you */
        return "defend"
    }

    if (Math.random() < .3) {
        /* Check if you should attack other people > than my score or < than my score by 30*/
        return "attack"
    }
    /* Discover nuggets if there is nothing to do */
    return "discover"
}

function executor(timeout = 3000) {
    const decision = decisionMaker()

    try {
        await actions[decision]()
    } catch (e) {
        /* if the action failed, redo the same one */
        if (e instanceof ThrottleError) {
            setTimeout(actions[decision], e.delay)
        }
    }
}

executor()

module.exports = {
    TOKEN,
    URL,
    MY_USER_ID
}