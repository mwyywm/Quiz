import Layout from "../../components/Layout";
import { GetServerSideProps } from "next";

export interface Props {
  params: string;
}

const Quiz = ({ params }: Props) => {
  return (
    <Layout>
      <h1>params: {params}</h1>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      params: context.params?.index,
    },
  };
};

export default Quiz;
