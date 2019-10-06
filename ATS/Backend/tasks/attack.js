const fetch = require("node-fetch")
const { URL, TOKEN, MY_USER_ID } = require("../index")
const detectApiError = require("./../errors/detectApiError")


async function attack() {
    const users = await fetch(`${URL}/users/all`).then(r => r.json())

    const noAdmins = users.filter(user => {
        // filter admin and guest users
        return user.role !== "admin" && user.username != "guest"
    }).filter(user => {
        // filter the users that I already attacked
        return !user.attackedBy.find(user => user._id === MY_USER_ID)
    })

    if (noAdmins.length === 0) {
        // throw an exception since we want finish this task
        throw new NoUsersToAttack()
    }

    // Choose the most advanced candidate
    const id = noAdmins
        .sort((user1, user2) => user2.nuggetCount - user1.nuggetCount)[0]._id

    fetch(`${URL}/users/${id}/attack?token=${TOKEN}`)
        .then(res => res.json())
        .then(detectApiError)
        .then((res) => {
            /* The request was successful since the promise didn't raise an error */
            console.log("Attacked with success")
        })
}