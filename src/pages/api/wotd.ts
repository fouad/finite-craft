// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getOrGenerateRecipes, searchEmoji } from "../../serverUtils";

type Recipe = {
  steps: string[][];
  ingredients: string[];
  target: string;
};

type RequestQuery = {
  day: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Recipe>
) {
  const { day } = req.query as RequestQuery;
  // subtract day from March 23rd 2024 to get recipe index
  const dayIndex = Math.ceil(
    Math.abs(new Date("2024-03-24").getTime() - new Date(day).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const recipes = await getOrGenerateRecipes();
  const recipeKeys = Object.keys(recipes);
  const recipeIndex = dayIndex % recipeKeys.length;
  const recipe = recipes[recipeKeys[recipeIndex]];

  const target = recipeKeys[recipeIndex];
  res
    .status(200)
    .json({ steps: recipe.steps, ingredients: recipe.ingredients, target });
}
