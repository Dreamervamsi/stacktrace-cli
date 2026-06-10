#!/usr/bin/env node
import { InferenceClient } from '@huggingface/inference';
import dotenv from 'dotenv';
import fs from 'fs';
import { markdownToTxt } from 'markdown-to-txt';
import path from 'path';
dotenv.config();
const TOKEN = process.env.HF_TOKEN;
const client = new InferenceClient(TOKEN);
process.on('uncaughtException', async (error) => {
    console.log("An unexpected error occurred. Analyzing with AI...");
    const prompt = `You are an expert error handler assistant. Review the following stack trace and provide whats the exact error and provide the exact fix and return your response in markdown.\n${error.stack}.`;
    try {
        const chatCompletion = await client.chatCompletion({
            model: 'meta-llama/Meta-Llama-3-8B-Instruct',
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            max_tokens: 512,
        });
        const suggestion = chatCompletion.choices[0]?.message?.content;
        console.log('--- AI Analysis ---');
        if (suggestion) {
            const content = markdownToTxt(suggestion);
            const outputPath = path.join(process.cwd(), 'error-handler.md');
            fs.writeFileSync(outputPath, content);
            console.log(`💡 Suggested Fix is written in error-handler.md file`);
            process.exit(1);
        }
        console.log("✅ No errors found");
        process.exit(1);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`⚠️  Could not fetch suggestion: ${message}`);
    }
});
//# sourceMappingURL=cli.js.map