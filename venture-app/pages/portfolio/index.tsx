import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import useUser from "../../lib/useUser";
import { prisma } from "../../lib/prisma";
import ProjectTable from "../../components/Layout/ProjectTable";
import InvestmentTable from "../../components/Layout/InvestmentTable";
import { ProjectProps } from "../../components/Layout/ProjectCard";
import { withSessionSSR } from "../../lib/session";
import {User} from '../api/auth/user'
import { GetServerSidePropsContext, InferGetServerSidePropsType, NextApiRequest, NextApiResponse } from 'next'


export const getServerSideProps = withSessionSSR (async function (context: GetServerSidePropsContext ) {
  const { req } = context
  const user = req.session.user

  if (user === undefined) {
    
    return {
      props: {
        user: { isLoggedIn: false, email: ""} as User,
      },
    };
  } else {
    //prisma query here
    const myProjects: any = await prisma.project.findMany({
      where: {
        email: user?.email,
      },
    });
    const investedProjectId = await prisma.user.findUnique({
      where: {
        email: user?.email,
      },
      select: {
        investedProjects: true,
      },
    });
    const myInvestments = await prisma.project.findMany({
      where: {
        id: { in: investedProjectId?.investedProjects },
      },
    });
    return {
      props: { myProjects: myProjects, myInvestments: myInvestments, user: user},
    };
  }
});

type Props = {
  myProjects: ProjectProps[];
  myInvestments: ProjectProps[];
};

const Portfolio: any = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [value, setValue] = useState("1");

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const { user, mutateUser } = useUser();

  if (user?.isLoggedIn === true) {
    return (
      <div>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              className="m-6"
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Projects" value="1" />
              <Tab label="Investments" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <ProjectTable projects={props.myProjects} key={1} />
          </TabPanel>
          <TabPanel value="2">
            <InvestmentTable projects={props.myInvestments} key={1} />
          </TabPanel>
        </TabContext>
      </div>
    );
  } else {
    return (
      <div>
        <h1>My Projects</h1>
        <div>You need to be authenticated to view this page.</div>
      </div>
    );
  }
};

export default Portfolio;
