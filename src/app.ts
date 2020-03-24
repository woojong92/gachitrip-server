// 앱의 설정파일
import {GraphQLServer} from "graphql-yoga";
import cors from "cors";
import helmet from "helmet";
//import logger from "morgan";
import  schema from "./schema";

// class App {
//     public app: GraphQLServer;
//     constructor() {
//         this.app = new GraphQLServer({
//             schema
//         });
//         this.middlewares();
//     }
//     private middlewares = () : void => {
//         this.app.express.use(cors());
//         this.app.express.use(logger("dev"));
//         this.app.express.use(helmet());
//     }
// }
const app = new GraphQLServer({
    schema
});

app.express.use(cors());
//app.express.use(logger("dev"));
app.express.use(helmet());

export default app;