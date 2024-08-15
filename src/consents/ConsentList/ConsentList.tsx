import Container from "@mui/material/Container";
import DataTable from "../../components/DataTable/ConsentsDataTable";
import { useFetchConsentsData } from "../../hooks/use-fetch-consents";

const ConsentList = () => {
  const { data } = useFetchConsentsData();

  return (
    <>
      {data?.length ? (
        <Container sx={{ paddingTop: 4 }}>
          <DataTable rows={data} />
        </Container>
      ) : (
        <h1>No data</h1>
      )}
    </>
  );
};

export { ConsentList };
