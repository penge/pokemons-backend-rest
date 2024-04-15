import { MikroORM } from "@mikro-orm/postgresql";
import config from "./config";

export default (): Promise<MikroORM> => MikroORM.init(config);
