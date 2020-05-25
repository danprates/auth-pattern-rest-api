const express = require('express');

const app = express();

const users = [{ email: 'test@email.com', password: '123456' }];

app.get('/login', ({ headers }, res) => {
  const [type, hash] = headers.authorization.split(' ');

  const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

  const user = users.find((user) => user.email === email);

  if (!user || user.password !== password) {
    return res.status(404).json({ error: 'Invalid credentials' });
  }

  return res.json(user);
});

app.listen(3000, () => {
  console.log('API is running on port: 3000');
});
