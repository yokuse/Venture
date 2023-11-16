import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';



export function validate(schema: OptionalObjectSchema<ObjectShape>, handler: NextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (['POST'].includes(req.method as string)){
            try {
                req.body = await schema.validate(req.body, { strict: true });
                // console.log(req.body);
            } catch(error) {
                console.log("error: " + error)
                return res.status(400).json({});
            }
        }
        return handler(req, res);
    }
}