import fastify from "fastify";
import { z } from "zod";
const { Telegraf } = require('telegraf')

const app = fastify();

app.post("/validate", async (request, reply) => {
    const requestSchema = z.object({
        message: z.string()
    });

    const bot = new Telegraf("7494356922:AAFMAyT1arQk9odOurniDtDFshymdNuxIiI");

    const { message } = requestSchema.parse(request.body);
    await bot.telegram.sendMessage("5001451301", message);

    reply.status(201).send();
});


app.listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() => {
    console.log("runing")
})