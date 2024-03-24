import MistralClient from "@mistralai/mistralai";
import fs from "fs";

type WordMerge = {
  result: string;
};

export const mergeWords = async (
  first: string,
  second: string
): Promise<WordMerge> => {
  const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

  const client = new MistralClient(MISTRAL_API_KEY);

  const chatResponse = await client.chat({
    model: "mistral-large-latest",
    responseFormat: { type: "json_object" as any },
    messages: [
      {
        role: "system",
        content: `Return a JSON {result: word} that is a SINGLE word with emoji (DO NOT simply concatenate the two words, NO HYPHENS allowed, stick to normal vocabulary) which is a CONCEPTUAL combination of the two words provided.
        Examples (follow these exactly if possible):
        tree + fire = ash
        cloud + water = rain
        soil + volcano = lava
        plant + water = swamp
        water + fire = steam,
        steam + fire = engine,
        engine + robot = transformer,
        
        Now:
        ${first} + ${second} = ?`,
      },
    ],
  });

  const result = JSON.parse(chatResponse.choices[0].message.content);
  return result;
};

type RecipeObj = { [result: string]: [string, string] };

const findMinimumRecipeSteps = (
  target: string,
  recipeObj: RecipeObj,
  index: any
): string[] | null => {
  const queue: [string, string[]][] = [[target, []]];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const [current, path] = queue.shift()!;
    if (index[current] && index[current][2] === 1) {
      return path.concat(current); // Return the path including the base ingredient
    }
    if (visited.has(current)) {
      continue;
    }
    visited.add(current);
    const ingredients = recipeObj[current];
    if (ingredients) {
      ingredients.forEach((ingredient) => {
        queue.push([ingredient, path.concat(current)]);
      });
    }
  }
  return null;
};

export const getFullRecipesWithMinimumSteps = (
  targets: string[],
  recipeObj: RecipeObj,
  index: any
): { [key: string]: string[] | null } => {
  const fullRecipes: { [key: string]: string[] | null } = {};

  targets.forEach((target) => {
    fullRecipes[target] = findMinimumRecipeSteps(target, recipeObj, index);
  });

  return fullRecipes;
};

export const parseRecipeData = async (): Promise<{
  index: any;
  targets: string[];
  recipeObj: { [result: string]: [string, string] };
}> => {
  // read data from file if exists, otherwise download it
  // from the internet
  let dataset;
  try {
    dataset = JSON.parse(await fs.promises.readFile("../../data.json", "utf8"));
  } catch (error) {
    const data = await fetch(
      "https://github.com/expitau/InfiniteCraftWiki/raw/main/web/data/data.json"
    ).then((response) => response.text());
    dataset = JSON.parse(data);
  }

  // find the items that require only 3 steps to make
  const index = dataset.index;
  // index looks like this
  // "index": {
  //     "B": ["🔥","Fire",1],
  //     "C": ["🌍","Earth",1],
  //     "D": ["🌬️","Wind",1],
  //     "E": ["🌫️","Dust",2],
  //     "F": ["🌋","Lava",2],
  //     "G": ["🌋","Volcano",2]
  // },
  // where each item has an index and a value, where the value is:
  //  an emoji, the word, and the number of steps required to get there
  // so we just need to find all the items that have a number of steps of 3
  const allTargets = Object.keys(index)
    .filter((key) => index[key][2] === 4)
    .map((key) => index[key][1]);
  console.log(`Found ${allTargets.length} targets: ${allTargets}`); // Debugging log
  // we only want the first 10 targets
  const targets = allTargets;

  const recipes = dataset.data;
  // recipes is a huge string with the following structure:
  // "D,C,E;B,C,F;B,B,G"
  // where D, C, E, F, G are strings that represent the items
  // and E is the result of combining D and C
  // and F is the result of combining B and C
  // and G is the result of combining B and B
  const recipeObj = recipes.split(";").reduce((acc: any, recipe: any) => {
    const [first, second, result] = recipe
      .split(",")
      .map((item: any) => index[item][1]);
    // Accumulate each recipe into the acc object with result as the key
    acc[result] = [first, second];
    return acc;
  }, {});

  console.log(
    `Found ${
      Object.keys(recipeObj).length
    } recipes and the first few look like this: ${JSON.stringify(
      recipeObj,
      null,
      2
    )}`
  ); // Debugging log
  return { index, targets, recipeObj };
};

export const getFullRecipesFromData = async (): Promise<{
  [key: string]: string[] | null;
}> => {
  const { index, targets, recipeObj } = await parseRecipeData();
  return getFullRecipesWithMinimumSteps(targets, recipeObj, index);
};

const _recipes = require('../recipes.json')

export const getOrGenerateRecipes = async (): Promise<{
  [key: string]: { steps: string[][]; ingredients: string[] };
}> => {
  let recipes;
  try {
    recipes = _recipes
  } catch (error) {
    console.log("Generating recipes data");
    recipes = await getFullRecipesFromData();
    await fs.promises.writeFile("recipes.json", JSON.stringify(recipes));
  }
  return recipes;
};

export const searchEmoji = async (word: string): Promise<string> => {
  // Define the type for the association
  type Association = [string, string, string];

  // get emoji from index
  let dataset;
  try {
    dataset = JSON.parse(await fs.promises.readFile("../../data.json", "utf8"));
  } catch (error) {
    const data = await fetch(
      "https://github.com/expitau/InfiniteCraftWiki/raw/main/web/data/data.json"
    ).then((response) => response.text());
    dataset = JSON.parse(data);
  }
  const index = dataset.index;
  dataset = null;
  const found = (Object.values(index) as Association[]).find(
    (association) => association[1] === word
  );
  return found ? found[0] : "";
};
