import { useState } from "react";
import styled from "styled-components";

import { DeviceMinWidth, Text, InitValues } from "../constants";
import { Layout, ExchangeRateForm, Quote } from "../components";

const GridContainer = styled.div`
  grid-template-rows: 1fr;
  margin: 0 5%;
  @media ${DeviceMinWidth.mobileS} {
    display: block;
  }
  @media ${DeviceMinWidth.tabletL} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 4em;
  }
`;

/**
 * This is the Home component.
 */
const Home = () => {
  /**
   * set local state quote object here.
   */
  const [quote, setQuote] = useState(InitValues.initQuote);

  return (
    <Layout title={Text.pageTitle}>
      <GridContainer>
        <ExchangeRateForm
          sessionTitle={Text.sessionTitle}
          setQuote={setQuote}
        />
        <Quote
          sessionTitle={Text.sessionTitle}
          quote={quote}
          setQuote={setQuote}
        />
      </GridContainer>
    </Layout>
  );
};

export default Home;
