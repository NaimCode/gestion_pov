import type { NextPage } from "next";
import Head from "../components/Head";

import { APP_NAME } from "../constants/global";

const Home: NextPage = (props) => {

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
