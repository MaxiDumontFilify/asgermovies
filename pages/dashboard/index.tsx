import { Grid } from "@mui/material";
import Head from "next/head";
import sorov from "utils/sorov";
import List from "../../components/List";

export async function getServerSideProps() {
  const request = await fetch(
    `https://api.themoviedb.org/3${sorov.fetchTopRated.url}`
  ).then((res) => res.json());
  return {
    props: {
      results: request.results,
    },
  };
}

export default function dashboard(results: any) {
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#1a1a1a",
        color: "white",
        padding: "20px",
      }}
    >
      <Head>
        <title>AsgerMovies</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <List results={results} />
    </Grid>
  );
}
