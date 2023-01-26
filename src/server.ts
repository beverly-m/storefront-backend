import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.routes';

const app: express.Application = express();
const address = '0.0.0.0:3000';

// app.use(cors)
app.use(bodyParser.json());
app.use(routes);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});

export default app;
