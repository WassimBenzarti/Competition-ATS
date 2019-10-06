import { useState, useEffect } from "react"
import jsonFetcher from "../common/jsonFetcher/jsonFetcher"
import USERS_DATA from "./allUsers";

export default function useUsersApi() {

    const [users, setUsers] = useState()
    const [isLoading, setIsLoading] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        setTimeout(() => {
            jsonFetcher("http://hackathon.internal.ats-digital.com:3333/api/users/all")
                .then(setUsers)
                .catch(e => setError(e.message))
        }, 2000)
    }, [])

    return {
        users,
        isLoading,
        error
    }
}