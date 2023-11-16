import {prisma} from '../../lib/prisma'
import {GetStaticProps} from 'next'
import React from 'react';
import { ProjectProps } from '../../components/Layout/ProjectCard';
import ProjectCard from '../../components/Layout/ProjectCard';
import { AsyncLocalStorage } from 'async_hooks';

export const getStaticProps: GetStaticProps = async () => {
    // 👇️ const now: Date
    const now: any = new Date();
    const projects = (await prisma.project.findMany()).filter((project: any) => new Date(project!.closingDate) >= now);
    return {
        props: { projects },
        revalidate: 10
    }
}

type Props = {
    projects: ProjectProps[]
}
const Invest: React.FC<Props> = (props) => {
    return (
        <div className="container my-14 mx-auto px-4">
            <div className="grid grid-cols-4 gap-14">
                {props.projects.map((project) => (
                    
                        <div key={project.id}>
                            <ProjectCard project={project}/>
                        </div>
                
                ))}
            </div>
        </div>
    )
}

export default Invest;