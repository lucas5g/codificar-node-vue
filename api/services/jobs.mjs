import cron from 'node-cron'
import { BotController } from "../controllers/BotController.mjs";


cron.schedule('0 58 23 * * 1-5', () => {

    BotController.reportDaily()
})


cron.schedule('0 26 0-16 * * 1-5', () => {

    BotController.testBot()
})

// BotController.testBot()