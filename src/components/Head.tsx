import Head from "next/head";

type HeadProps = {
  title: string;
  description?: string;
  icon?: string;
};
const index = ({ description, icon, title }: HeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={icon} />
    </Head>
  );
};

export default index;
