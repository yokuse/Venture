import React from "react";
import Router from "next/router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export type ProjectProps = {
  id: number;
  project_id: string;
  title: string;
  description: string;
  raise_amt: number;
  highlights: string;
  busi_model: string;
  image: string;
  closingDate: Date;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  user: {
    name: string;
    email: string;
  } | null;
  userId: string;
};

const ProjectCard: React.FC<{ project: ProjectProps }> = ({ project }) => {
  const projectOwner = project.user ? project.user.name : "No owner";
  const sanitizeHtml = require("sanitize-html");
  return (

        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={project.image}
              alt="test image placeholder"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {sanitizeHtml(project.title)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {sanitizeHtml(project.description)}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button 
                onClick={() => Router.push("/invest/[id]", `/invest/${project.id}`)} 
                size="small" 
                color="primary">
              LEARN MORE
            </Button>
          </CardActions>
       </Card>
   
  );
};

export default ProjectCard;
