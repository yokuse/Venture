import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../../lib/session'
import logger from "../../../Logger";

export default withIronSessionApiRoute(deleteRoute, sessionOptions);

 async function deleteRoute(req: NextApiRequest, res: NextApiResponse) {
    const projectId = req.query.id
    //console.log("HERE" +projectId)
    const user = req.session.user

  
    if(req.method == 'DELETE'){
        const myProject = await prisma.project.findFirst({
            where: {
                project_id: projectId?.toString(),
            }
        });
        // console.log(myProject?.email)
        // console.log(user?.email)
        if(myProject?.email == user?.email){
            const project = await prisma.project.delete({
                where: {
                    id: Number(myProject?.id),
                }
            })
            logger.info('Project deleted successfully by: ' + user?.email)
            res.status(200).json(project)
        }else{
            logger.warn('User: ' +user?.email+' not authenticated to delete project')
            res.status(500).json({ error: 'user not authenticated to delete' })
        }
        
    }else{
        logger.error('Project could not be deleted by: ' + user?.email)
        console.log("Failure: Note could not be deleted!");
    }
}

