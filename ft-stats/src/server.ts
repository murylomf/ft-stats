import fastify from "fastify";
import { z } from "zod";
const { Telegraf } = require('telegraf')

const app = fastify();

app.post("/validate", async (request, reply) => {
    const requestSchema = z.object({
        message: z.string(),
        chatId: z.number().optional()
    });

    const bot = new Telegraf(process.env.BOT_TOKEN);

    const { message, chatId } = requestSchema.parse(request.body);
    await bot.telegram.sendMessage(process.env.CHAT_ID, message);

    if (chatId) {
        await bot.telegram.sendMessage(process.env.CHAT_ID, message);
    }
    reply.status(201).send();
});


app.listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
    console.log("runing")
})