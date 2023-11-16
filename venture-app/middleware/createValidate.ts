import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object';



export function validate(schema: OptionalObjectSchema<ObjectShape>, handler: NextApiHandler) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (['POST'].includes(req.method as string)){
            try {
                // console.log('Before validate\n' + JSON.stringify(req.body))
                req.body = await schema.validate(req.body, { stripUnknown: true });
                // console.log('After validate\n' + JSON.stringify(req.body))
            } catch(error) {
                console.log("error: " + error)
                return res.status(400).json({});
            }
        }
        return handler(req, res);
    }
}