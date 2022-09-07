import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, res: Response) => {
  const query = `
  SELECT *
  FROM heroes
  `;

  MySQL.runQuery(query, (error: Object, heroes: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        error,
      });
    } else {
      res.status(200).json({
        ok: true,
        heroes,
      });
    }
  });
});

router.get('/heroes/:id', (req: Request, res: Response) => {
  const id = req.params.id;

  const escapedId = MySQL.instance.cnn.escape(id);

  const query = `
  SELECT *
  FROM heroes
  WHERE id = ${escapedId}
  `;

  MySQL.runQuery(query, (error: Object, hero: Object[]) => {
    if (error) {
      res.status(400).json({
        ok: false,
        error,
      });
    } else {
      res.status(200).json({
        ok: true,
        hero: hero[0],
      });
    }
  });
});

export default router;
