import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const page = async () => {
    const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: [
            " Summarise the following, When I crave for glutinous rice, I think of my FAVOURITE GLUTINOUS RICE & ECONOMICAL BEE HOON STALL — Zhu Jiao Shu Shi, stall 01-284 at Tekka Food Centre. Once youve tasted the food, you know it must be cooked by someone with years of experience. True enough, the cook is an elderly lady, with a middle-aged man, who probably her son, serving customers. This plateful of glutinous rice n fried bee hoon topped with cabbages n a fried egg is only $3. They should be charging more for such a generous helping of delicious food. Please support them",
            "One of the best peanut porridge.. glutinous rice and noodles are good as well. Been patronising this stall whenever I am in this area.",
        ],
        temperature: 0,
        max_tokens: 1024,
    });
    return (
        <div>
            {response.choices.map((choice) => {
                return (
                    <div>
                        <p>{choice.text}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default page;
