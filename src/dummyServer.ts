import express from 'express';

// GAEがサーバーをリスンしていないとそもそもアプリとして認識してくれないので、ダミーのレスポンスを返すようにしておく
export const createDummyServer = () => {
  const PORT = Number(parseInt(`${process.env.PORT}`)) || 8080;
  const app = express();
  app.get('/', (_req, res) => {
    res.send('🤖Bot is running!!🤖');
  });

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};
