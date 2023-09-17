import bcrypt from 'bcryptjs';
import 'dotenv/config';

export default password => bcrypt.hash(password, parseInt(process.env.BCRYPT_ROUNDS));