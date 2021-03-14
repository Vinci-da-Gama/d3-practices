import { useCallback, useMemo, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

import { Rd3S5WhMargin } from "../../consts/Rd3S5WhMargin";
// import { Urls } from "../../consts/Urls";
import S5Table from "./S5Table";

const { defWidth, defHeight, mTop, mBottom, mLeft, mRight } = Rd3S5WhMargin;
const WIDTH = defHeight - mLeft - mRight;
const HEIGHT = defHeight - mTop - mBottom;

const S5Chart = ({
  chartData,
  setChartData,
  selectedName,
  setSelectedName,
}) => {
  const s5ChartArea = useRef(null);
  const memoChartData = useMemo(() => {
    return chartData;
  }, [chartData]);
  const memoActivedName = useMemo(() => {
    return selectedName;
  }, [selectedName]);
  const cbSetChartData = useCallback((data) => {
    setChartData(data);
  }, []);

  useEffect(() => {
    d3.selectAll("#s5-chart-with-table").remove();

    const svg = d3
      .select(s5ChartArea.current)
      .append("svg")
      .attr("width", defWidth)
      .attr("height", defHeight)
      .attr("id", "s5-chart-with-table")
      .append("g")
      .attr("transform", `translate(${mLeft}, ${mTop})`);

    svg
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 40)
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Age");
    svg
      .append("text")
      .attr("x", -(HEIGHT / 2))
      .attr("y", -40)
      .attr("transform", "rotate(-90)")
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Height in cm");

    let rd3Chart5Data = {};
    rd3Chart5Data.xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);
    rd3Chart5Data.yAxisGroup = svg.append("g");

    const updateD3Chart = () => {
      const xbl = d3
        .scaleLinear()
        .domain([0, d3.max(rd3Chart5Data.data, (el) => Number(el.age))])
        .range([0, WIDTH * 1.5]);

      const y = d3
        .scaleLinear()
        .domain([
          d3.min(rd3Chart5Data.data, (el) => Number(el.height)) * 0.95,
          d3.max(rd3Chart5Data.data, (el) => Number(el.height)),
        ])
        .range([HEIGHT, 0]);

      const xAxisCall = d3.axisBottom(xbl);
      rd3Chart5Data.xAxisGroup.transition(800).call(xAxisCall);

      const yAxisCall = d3.axisLeft(y);
      rd3Chart5Data.yAxisGroup.transition(800).call(yAxisCall);

      // DATA JOIN
      const circles = svg
        .selectAll("circle")
        .data(rd3Chart5Data.data, (d) => d.name);

      // EXIT
      circles
        .exit()
        .transition(800)
        .attr("cy", (d) => y(0))
        .remove();

      // UPDATE
      circles
        .transition(800)
        .attr("cx", (d) => xbl(d.age))
        .attr("cy", (d) => y(d.height));

      // ENTER
      circles
        .enter()
        .append("circle")
        .attr("cx", (d) => xbl(d.age))
        .attr("cy", (d) => y(0))
        .attr("r", 5)
        .attr("fill", "grey")
        .on("click", (d) => setSelectedName(d.target.__data__.name))
        .transition(800)
        .attr("cy", (d) => y(d.height));
    };

    if (chartData && chartData.length > 0) {
      rd3Chart5Data = {
        ...rd3Chart5Data,
        data: chartData.slice(),
      };
      updateD3Chart();
    }

    // return () => {}
  }, [chartData]);

  return (
    <>
      {chartData && chartData.length > 0 && (
        <S5Table
          chartData={memoChartData}
          setChartData={cbSetChartData}
          selectedName={memoActivedName}
        />
      )}
      <div ref={s5ChartArea} className="flex-center" />
    </>
  );
};

S5Chart.propTypes = {
  chartData: PropTypes.array.isRequired,
  setChartData: PropTypes.func.isRequired,
  selectedName: PropTypes.string.isRequired,
  setSelectedName: PropTypes.func.isRequired,
};

export default S5Chart;
