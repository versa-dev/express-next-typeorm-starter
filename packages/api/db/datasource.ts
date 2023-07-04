import { DataSource } from "typeorm";
import { ORMConfig } from "./connectDB";

const dataSource = new DataSource(ORMConfig);

export default dataSource;
