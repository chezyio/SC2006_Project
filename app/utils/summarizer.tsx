interface inputPrompt {
    prompt: string;
}

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const summarizer = async (inputPrompt: inputPrompt) => {
    const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt:
            "Infer and deduce sentiments about the hawker centre from " +
            inputPrompt,
        temperature: 0,
        max_tokens: 1024,
    });
    return response.choices;
};
