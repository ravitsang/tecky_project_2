import * as bcryptjs from 'bcryptjs';


const SALT_ROUNDS = 10;

// hashing the password
// input password + salt -> hashing -> hashed password 
export async function hashPassword(plainPassword:string) {
    const hash = await bcryptjs.hash(plainPassword,SALT_ROUNDS);
    return hash;
};

// compare the input password with hashed password
export async function checkPassword(plainPassword:string,hashPassword:string){
    const match = await bcryptjs.compare(plainPassword,hashPassword);
    return match;
}