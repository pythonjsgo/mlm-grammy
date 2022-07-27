
import { Context } from 'grammy'

interface IContext extends Context {
    userData: object
}

interface ISpamStatistics {
    messagesSent: number,
    errors: number
}