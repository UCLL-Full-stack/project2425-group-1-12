import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';

const generateJwtToken = (email:string, role:Role) => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'app' };
    try {
        return jwt.sign({ email, role }, `${process.env.JWT_SECRET}`, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error creating jwt token');
    }
};

const extractRoleFromToken = (token: string): Role => {
    try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as { role: Role };
        return decoded.role;
    } catch (error) {
        console.error('Error verifying token:', error);
        throw new Error('Invalid or expired token');
    }
};

export { generateJwtToken, extractRoleFromToken };
