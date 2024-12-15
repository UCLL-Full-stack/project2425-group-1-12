import jwt from 'jsonwebtoken';

const generateJwtToken = (email:string) => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'app' };
    try {
        return jwt.sign({ email }, `${process.env.JWT_SECRET}`, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error creating jwt token');
    }
};

export { generateJwtToken };