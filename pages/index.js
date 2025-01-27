import Head from "next/head";
import HomePage from "./HomePage/HomePage";
import { Layout } from "./Layout/Layout";
export default function Home() {
  return (
    <div>
      <Head>
        <title>Diasspora</title>
        <meta name="description" content="Bringing The Market Directly To You" />
        <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/diasspora-94216.appspot.com/o/Diasspora%20Finals%2FDiasspora%20Icon%20With%20No%20Text-29.png?alt=media&token=f857f5f7-17b4-48f4-8b45-0c39ca9fa893" />
      </Head>
      <Layout>
        <HomePage/>
      </Layout>
    </div>
  );
}
