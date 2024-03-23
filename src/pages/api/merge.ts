// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ResponseFormats } from "@mistralai/mistralai";
import MistralClient from "@mistralai/mistralai";

type Data = {
  result: string;
};

type RequestQuery = {
  first: string;
  second: string;
};

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;

const client = new MistralClient(MISTRAL_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { first, second } = req.query as RequestQuery;

  const chatResponse = await client.chat({
    model: "mistral-large-latest",
    responseFormat: { type: "json_object" as any },
    messages: [
      {
        role: "system",
        content: `Return a JSON {result: word} that is a SINGLE word (DO NOT simply concatenate the two words, NO HYPHENS allowed, stick to normal vocabulary) which is a CONCEPTUAL combination of the two words provided.
        Examples:
        tree + fire = ash
        cloud + water = rain
        soil + volcano = lava
        umbrella + dust = dustbin
        earth + dustbin = landfill
        wind + plant = dandelion
        plant + water = swamp
        
        Now:
        ${first} + ${second} = ?`,
      },
    ],
  });

  const result = JSON.parse(chatResponse.choices[0].message.content);
  res.status(200).json(result);
}
