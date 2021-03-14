import { useState, useEffect, useRef } from "react";
// import PropTypes from 'prop-types'
import * as d3 from "d3";

import { Rd3S5WhMargin } from "../../consts/Rd3S5WhMargin";
import { Urls } from "../../consts/Urls";
import S5Table from "./S5Table";

const { defWidth, defHeight, mTop, mBottom, mLeft, mRight } = Rd3S5WhMargin;
const WIDTH = defHeight - mLeft - mRight;
const HEIGHT = defHeight - mTop - mBottom;

const S5Chart = () => {
  const s5ChartArea = useRef(null);
  const [chartData, setChartData] = useState([]);

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

    const fetchChildrenForD3Chart = async () => {
      try {
        const resp = await d3.json(Urls.children);
        if (!resp) {
          console.log("51 -- no children data");
        } else {
          rd3Chart5Data = {
            ...rd3Chart5Data,
            data: resp.slice(),
          };
          setChartData(resp.slice());
          updateD3Chart();
        }
      } catch (error) {
        console.log(
          "62 -- rd3 chart5 children data error: ",
          error.message || error
        );
      }
    };
    fetchChildrenForD3Chart();

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
      rd3Chart5Data.xAxisGroup.transition().duration(500).call(xAxisCall);

      const yAxisCall = d3.axisLeft(y);
      rd3Chart5Data.yAxisGroup.transition().duration(500).call(yAxisCall);

      // DATA JOIN
      const circles = svg.selectAll("circle").data(rd3Chart5Data.data);

      // EXIT
      circles.exit().transition().duration(500).remove();

      // UPDATE
      circles
        .transition()
        .duration(500)
        .attr("cx", (d) => xbl(d.age))
        .attr("cy", (d) => y(d.height));

      // ENTER
      circles
        .enter()
        .append("circle")
        .transition()
        .duration(500)
        .attr("cx", (d) => xbl(d.age))
        .attr("cy", (d) => y(d.height))
        .attr("r", 5)
        .attr("fill", "grey");
    };

    // return () => {}
  }, []);

  return (
    <>
      <S5Table chartData={chartData} />
      <div ref={s5ChartArea} className="flex-center" />
    </>
  );
};

// S5Chart.propTypes = {}

export default S5Chart;
