// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getOrGenerateRecipes } from "../../serverUtils";

type RecipeList = {
  [key: string]: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecipeList>
) {
  // if we already precomputed recipes file, we can just read it from recipes.json
  // otherwise we need to recompute it
  const recipes = await getOrGenerateRecipes();
  res.status(200).json(recipes);
}
