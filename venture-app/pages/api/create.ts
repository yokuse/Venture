import { prisma } from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import logger from "../../Logger";
import { validate } from '../../middleware/createValidate';
import { createSchema } from '../../schemas/createSchema';
import { storage } from "../../lib/firebase/firebase";
import { getDownloadURL, listAll, ref, uploadBytes, uploadString } from "firebase/storage";
import { v4 } from "uuid";
import { fstat } from 'fs';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    const{title,description, highlights,
        busi_model, closingDate,createdAt, updatedAt, email, fileName, file} = req.body

    let imageURL = ""
// get firebase image string
    if (file !== "") {
        const imageRef = ref(storage, `images/${fileName + v4()}`);
        try {
            const imgURL = await uploadString(imageRef, file, 'data_url').then((snapshot) => {
                return listAll(imageRef).then(() => {
                    return getDownloadURL(imageRef).then((url) => {
                        imageURL = url
                        return imageURL
                    })
                })
              });
            try{
                const projectData = {title: title,
                description: description, 
                highlights: highlights, 
                busi_model: busi_model, 
                image: imgURL,
                closingDate: closingDate,
                createdAt: createdAt,
                updatedAt: updatedAt,
                email: email, 
            }
            console.log(projectData)
                await prisma.project.create({
                    data: projectData
                })
                logger.info('Project created successfully by :' + req.body.email) 
                res.status(200).json({message: "Project Created"})
            } catch(error){
                logger.error('Project creation failed by :' + req.body.email) 
                console.log("Failure: "+ error);
            }
        } catch (error) {
            res.json(500)
        }
    }
}

export default validate(createSchema, handler);
