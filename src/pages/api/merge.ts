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
        content: `Return a JSON {result: single_word} that is a single word which is a conceptual combination of the two words: ${first}, ${second}`,
      },
    ],
  });

  const result = JSON.parse(chatResponse.choices[0].message.content);
  res.status(200).json(result);
}
