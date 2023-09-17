import bcrypt from 'bcryptjs';

export default (password, hash) => bcrypt.compare(password, hash);