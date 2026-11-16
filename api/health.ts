interface VercelResponseLike {
  status: (code: number) => VercelResponseLike;
  json: (data: unknown) => void;
}

export default function handler(_req: unknown, res: VercelResponseLike): void {
  res.status(200).json({status: 'ok'});
}
