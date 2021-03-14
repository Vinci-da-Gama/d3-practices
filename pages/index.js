import { useState } from "react";
// import styled from "styled-components";

import {
  Layout,
  Rd3Basic,
  S2Wrapper,
  S3bars,
  S4Chart,
  S5Chart,
} from "../components";

/**
 * This is the Home component.
 */
const Home = () => {
  const [gender, setGender] = useState("Men");
  return (
    <Layout title={"React with d3"}>
      <div>
        <p>Basic svg:</p>
        <Rd3Basic />
      </div>
      <div>
        <p>S2 chart</p>
        <S2Wrapper />
      </div>
      <div>
        <p>S3 chart</p>
        <S3bars />
      </div>
      <div>
        <p>S4 chart</p>
        <select
          name="gender-selector"
          onChange={(e) => {
            e.preventDefault();
            setGender(e.target.value);
          }}
          value={gender}
        >
          <option label="Select Gender" value="" disabled />
          <option label="Men" value="Men" />
          <option label="Women" value="Women" />
        </select>
        <S4Chart gender={gender} />
      </div>
      <div>
        <p>S5 chart</p>
        <S5Chart />
      </div>
    </Layout>
  );
};

export default Home;
