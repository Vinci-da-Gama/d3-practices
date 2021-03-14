import { useState, useEffect } from "react";
import { json } from "d3";

import {
  Layout,
  Rd3Basic,
  S2Wrapper,
  S3bars,
  S4Chart,
  S5Chart,
} from "../components";
import { Urls } from "../consts/Urls";

/**
 * This is the Home component.
 */
const Home = ({ s5CharChildren }) => {
  const [gender, setGender] = useState("Men");
  const [chartData, setChartData] = useState([]);
  const [selectedName, setSelectedName] = useState("");

  useEffect(() => {
    setChartData(s5CharChildren);
    // return () => {}
  }, []);

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
        {s5CharChildren && s5CharChildren.length > 0 && (
          <S5Chart
            chartData={chartData}
            setChartData={setChartData}
            selectedName={selectedName}
            setSelectedName={setSelectedName}
          />
        )}
      </div>
    </Layout>
  );
};

Home.getInitialProps = async (ctx) => {
  const s5CharChildren = await json(Urls.children);
  return { s5CharChildren };
};

export default Home;
