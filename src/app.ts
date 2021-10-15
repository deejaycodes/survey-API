import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { CommonRoutesConfig } from './common/common.routes.config';
import { SurveysRoutes } from './surveys/routes/surveys.routes.config';
import helmet from 'helmet'
import debug from 'debug';
import dotenv from 'dotenv';
import  * as rateLimit from 'express-rate-limit';
dotenv.config()

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');


const limiter = rateLimit.default({
	windowMs: 10 * 60 * 1000,
	max: 500,
});

//apply to all routes
app.use(limiter);

app.use(express.json());
app.use(cors());
app.use(helmet());

const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true })
    ),
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, make terse
  if (typeof global.it === 'function') {
      loggerOptions.level = 'http'; // for non-debug test runs, squelch entirely
  }
}

app.use(expressWinston.logger(loggerOptions));

routes.push(new SurveysRoutes(app));


const runningMessage = `Server running at http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});

export default server.listen(port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
    console.log(runningMessage);
});

