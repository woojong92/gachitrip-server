// 앱의 설정파일
import {GraphQLServer} from "graphql-yoga";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import { authenticateJwt } from "./utils/middlewares";

const app = new GraphQLServer({
    schema,
    context: req => {
      return {
          req: req.request
      }
    }
});

app.express.use(cors());
app.express.use(logger("dev"));
app.express.use(helmet());
app.express.use(authenticateJwt);

export default app; 

