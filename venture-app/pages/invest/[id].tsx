import { prisma } from "../../lib/prisma";
import React from "react";
import { GetServerSideProps } from "next";
import { ProjectProps } from "../../components/Layout/ProjectCard";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/Layout/CheckoutForm";
import useUser from "../../lib/useUser";
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const project_id = ctx.query.id;
  const proj_id_num: number | null = +project_id!;
  const project = await prisma.project.findUnique({
    where: {
      id: proj_id_num,
    },
  });
  return {
    props: { project, proj_id_num },
  };
};

const Project: React.FC<ProjectProps> = (props: any) => {
  const { user, mutateUser } = useUser();
  return (
    <div className="container mx-auto  px-4">
      <div className="mx-auto my-16 box-content min-h-fit w-5/6 p-8 shadow-lg shadow-indigo-500/50 ">
        <div>
          {
            <>
              <h2 className="pt-10 pb-4 px-4 text-3xl font-bold mr-4 sm:text-4xl">
                Title: {props.project.title}
              </h2>
              <div className="grid grid-cols-3 gap-16 py-0 px-10">
                <div className="col-span-2">
                  <h3 className=" font-bold text-lg mr-4 sm:text-xl">
                    Amount Raised: {props.project.raise_amt}
                  </h3>
                  <div className="text-lg font-bold">Description:</div>{" "}
                  <p>{props.project.description}</p>
                  <div className="text-lg font-bold ">Business Model:</div>{" "}
                  <p>{props.project.busi_model}</p>
                  <div className="text-lg font-bold">Highlights:</div>{" "}
                  <p>{props.project.highlights}</p>
                </div>
                <div>
                  <div>
                    <Image
                      className="pb-10"
                      height={1500}
                      width={1500}
                      src={props.project.image}
                      alt="GFG logo imported from public directory"
                    />
                    <br />
                    {user?.isLoggedIn === true && (
                      <CheckoutForm
                        id={props.proj_id_num}
                        userEmail={user.email}
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Project;
