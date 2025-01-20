import 'dotenv/config';
import { get } from 'env-var'


const envs = {
    PORT: get('PORT').required().asPortNumber()
}

export default envs;