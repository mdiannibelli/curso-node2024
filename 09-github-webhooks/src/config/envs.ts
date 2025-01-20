import 'dotenv/config';
import { get } from 'env-var'


const envs = {
    PORT: get('PORT').required().asPortNumber(),
    DISCORD_WEBHOOK_URL: get('DISCORD_WEBHOOK_URL').required().asString()
}

export default envs;