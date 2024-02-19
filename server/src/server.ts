import express from 'express';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();
const app = express();

app.use(express.json());

const PORT = process.env.PORT ?? 3000;

app.post('/user/create', async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await db.user.create({
      data: {
        email,
      },
    });

    console.log({ user });
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

app.get('/user', async (req, res, next) => {
  try {
    const users = await db.user.findMany();

    console.log({ users });
    res.json({ users });
  } catch (err) {
    next(err);
  }
});

app.get('/user/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await db.user.findFirst({ where: { id } });

    console.log({ user });
    res.json({ user });
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}.`);
});
