// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { mergeWords } from "../../serverUtils";

type Data = {
  result: string;
};

type RequestQuery = {
  first: string;
  second: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { first, second } = req.query as RequestQuery;

  const result = await mergeWords(first, second);
  res.status(200).json(result);
}
