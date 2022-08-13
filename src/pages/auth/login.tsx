/* eslint-disable react/no-unescaped-entities */

import "react-toastify/dist/ReactToastify.css";
import {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import React, { ReactNode, useEffect } from "react";
import Auth from "../../components/AuthWrapper";
import Head from "../../components/Head";
import { signIn } from "next-auth/react";
//icon FcGoogle
import { FcGoogle } from "react-icons/fc";
//icon GrFacebookOption
import { GrFacebookOption } from "react-icons/gr";
//icon AiOutlineGithub
import { AiOutlineGithub } from "react-icons/ai";
import Divider from "../../components/Divider";

import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { Note } from "@geist-ui/core";
import Link from "next/link";

//export getServerSideProps typescript

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  //get params from context
  const { query } = context;
  if (session) {
    return {
      redirect: {
        destination: "/workspace",
        permanent: true,
      },
    };
  }

  return {
    props: {
      query,
    },
  };
};
const Login: NextPage = ({
  query,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head title="Connexion" />
      <Auth>
        <div className="flex flex-col justify-between items-start w-full gap-10 py-2">
          <h1 className="text-left w-full">Authentification</h1>
          <span className="text-sm opacity-70">
            Choisir l'une des méthodes d'authentification suivantes
          </span>
        </div>
        <LoginButton
          icon={<GrFacebookOption />}
          provider="facebook"
          title="Facebook"
          style="bg-blue-500 border-blue-500 text-white"
        />
        <LoginButton
          icon={<FcGoogle />}
          provider="google"
          title="Google"
          style=""
        />
        <Divider>ou</Divider>
        <LoginButton
          icon={<AiOutlineGithub />}
          provider="github"
          title="Github"
          style="bg-[#30425C] border-[#30425C] text-white"
        />
        {query.error && (
          <div className="w-full mt-10 text-sm text-red-500 bg-red-100 border-red-500 p-5 rounded-md">
            l'email est déjà associé à une autre méthode d'authentification,
            veuillez choisir la bonne méthode dont vous vous authentifiez{" "}
            <Link href={"/error?type=OAuthAccountNotLinked"}>
              <span className="text-blue-400 italic hover:underline cursor-pointer">
                en savoir plus
              </span>
            </Link>
          </div>
        )}
      </Auth>
    </>
  );
};

export default Login;

//Component
type LoginButtonProps = {
  icon: ReactNode;
  children?: ReactNode;
  title: string;
  style: string;
  provider: "google" | "facebook" | "github";
};
const LoginButton = ({
  icon,
  children,
  title,
  style,
  provider,
}: LoginButtonProps) => {
  const handleLogin = async () => {
    signIn(provider).then((e) => console.log(e));
  };
  return (
    <button
      onClick={handleLogin}
      className={`${style} translate-all duration-500 hover:scale-105 flex flex-row gap-2 justify-center items-center py-3  w-full rounded-md border-2`}
    >
      <div className="text-xl">{icon}</div>
      <span>{title}</span>
    </button>
  );
};
