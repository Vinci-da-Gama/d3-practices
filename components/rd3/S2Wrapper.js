import { useState, useEffect, useRef } from "react";
// import PropTypes from 'prop-types'

import S2Chart from "./S2Chart";

const S2Wrapper = ({ props }) => {
  const s2CharArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new S2Chart(s2CharArea.current));
    } /* else {
      chart.update();
    } */
    //   return () => {}
  }, [chart]);

  return <div ref={s2CharArea} className="flex-center"></div>;
};

// S2Wrapper.propTypes = {}

export default S2Wrapper;
