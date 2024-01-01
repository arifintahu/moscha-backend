import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { getDatabaseConfig } from './database.config';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const datasource = new DataSource(getDatabaseConfig());
datasource.initialize();
export default datasource;
