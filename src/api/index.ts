import { handler } from '../main';
import { Request, Response } from 'express';

export default async function (req: Request, res: Response) {
  return handler(req, res);
}
