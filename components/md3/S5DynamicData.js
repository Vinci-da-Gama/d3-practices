import { useEffect, useRef } from "react";
// import PropTypes from 'prop-types'
import * as d3 from "d3";

import { Md3WhMargin } from "../../consts/Md3WhMargin";
const { defWidth, defHeight, mLeft, mRight, mTop, mBottom } = Md3WhMargin;
const WIDTH = defWidth - mLeft - mRight;
const HEIGHT = defHeight - mTop - mBottom;

const S5DynamicData = () => {
  const md3s5DyanmicDataChartRef = useRef(null);
  useEffect(() => {
    d3.selectAll("#md3s5-dynamicData-chart").remove();

    const svg = d3
      .select(md3s5DyanmicDataChartRef.current)
      .append("svg")
      .attr("width", defWidth)
      .attr("height", defHeight)
      .attr("id", "md3s5-dynamicData-chart")
      .append("g")
      .attr("transform", `translate(${mLeft}, ${mTop})`);

    // x label
    svg
      .append("text")
      .attr("class", "x axis-label") // you also need to write css, otherwise, it is useless
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 60)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("Month");
    // y label
    svg
      .append("text")
      .attr("class", "y axis-label") // you also need to write css, otherwise, it is useless
      .attr("x", -(HEIGHT / 2))
      .attr("y", -60)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)");
      // .text("Height (m)");

    let d3DyChartData = {};
    let flagShowRevenueFirst = true;
    d3DyChartData.xAxisGroup = svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${HEIGHT})`);
    d3DyChartData.yAxisGroup = svg.append("g").attr("class", "y axis");

    const fetchDataToDrawBuildingsChart = async () => {
      try {
        const resp = await d3.csv("../../static/data/revenues.csv");
        if (resp) {
          // convert string revenue and profit to number.
          resp.forEach(d => {
            d.revenue = Number(d.revenue)
            d.profit = Number(d.profit)
          })
          console.log('61 -- resp: ', resp)
          d3DyChartData = {
            ...d3DyChartData,
            data: resp.map((el) => ({
              ...el,
              height: Number(el.height),
            })),
          };
          constructD3Chart();
        } else {
          console.log("71 -- empty data, check internet connect...");
        }
      } catch (error) {
        console.log("74 -- error: ", error.message);
      }
    };
    fetchDataToDrawBuildingsChart();

    const constructD3Chart = () => {
      const xsb = d3
        .scaleBand()
        .domain(d3DyChartData.data.map((el) => el.name))
        .range([0, WIDTH])
        .paddingInner(0.3)
        .paddingOuter(0.2);
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(d3DyChartData.data, (el) => el.height)])
        .range([HEIGHT, 0]);

      const xAxisCall = d3.axisBottom(xsb);
      d3DyChartData.xAxisGroup
        .transition()
        .duration(500)
        .call(xAxisCall)
        .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-40)"); // rotate textes

      const yAxisCall = d3
        .axisLeft(y)
        .ticks(3)
        .tickFormat((d) => d + "m");
      d3DyChartData.yAxisGroup.transition().duration(500).call(yAxisCall);

      // DATA JOIN
      const rects = svg.selectAll("rect").data(d3DyChartData.data);

      // EXIT
      rects
        .exit()
        .transition()
        .duration(500)
        .attr("fill", "red")
        .attr("height", 0)
        .attr("y", HEIGHT)
        .remove();

      // UPDATE
      rects
        .transition()
        .duration(500)
        .attr("x", (d) => xsb(d.name))
        .attr("y", (d) => y(d.height))
        .attr("width", xsb.bandwidth)
        .attr("height", (d) => HEIGHT - y(d.height));

      // ENTER
      rects
        .enter()
        .append("rect")
        .attr("x", (d) => xsb(d.name))
        .attr("width", xsb.bandwidth)
        .attr("fill", (d) => "grey")
        .attr("y", HEIGHT)
        .transition()
        .duration(500)
        .attr("height", (d) => HEIGHT - y(d.height))
        .attr("y", (d) => y(d.height));
    };

    // return () => {}
  }, []);

  return <div ref={md3s5DyanmicDataChartRef}></div>;
};

// S5DynamicData.propTypes = {}

export default S5DynamicData;
