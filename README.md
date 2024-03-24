# Finite Craft
_Wikiracer + Wordle for LLMs — combine words together to reach the word of the day_

## Play it here! 
http://finitecraft.com

## Inspiration
We were inspired by 3 games of the modern age: Wikiracer, Wordle, and Minecraft. The result is Finite Craft, a game where you are given an item to craft towards, and a starting word, and you can combine the items given to get there in 3 steps or more.

## How it works
The game uses Mistral behind the scenes to enable open ended crafting of any two words. We also used this functionality to build out the sets of combinations that form recipes.

## Getting Started
First, get yourself a Mistral API key from [here](https://www.mistral.ai/). Then, create a `.env.local` file in the root of the project and add the following:

```
MISTRAL_API_KEY=your_api_key_here
```

Then, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the game.