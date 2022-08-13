import type { NextPage } from "next";
import Head from "../components/Head";

import { APP_NAME } from "../constants/global";
import { trpc } from "../utils/trpc";
import { Button } from '@geist-ui/core';

const Home: NextPage = (props) => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <Head
        title={APP_NAME}
        description="Gestion des appliances"
        icon="/favicon.ico"
      />

      <main>
       
      </main>
    </>
  );
};

export default Home;
