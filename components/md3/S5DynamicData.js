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
      .attr("id", "md3s5-dynamicData-chart");

    const gp = svg
      .append("g")
      .attr("transform", `translate(${mLeft}, ${mTop})`);

    // x label
    gp.append("text")
      .attr("class", "x axis-label") // you also need to write css, otherwise, it is useless
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 60)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("Month");
    // y label
    const yLabel = gp
      .append("text")
      .attr("class", "y axis-label") // you also need to write css, otherwise, it is useless
      .attr("x", -(HEIGHT / 2))
      .attr("y", -60)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)");

    let d3DyChartData = {
      yLabel,
    };
    let flagShowProfitFirst = true;

    // x scale base
    d3DyChartData.xScale = d3
      .scaleBand()
      .range([0, WIDTH])
      .paddingInner(0.3)
      .paddingOuter(0.2);
    // y scale base
    d3DyChartData.yScale = d3.scaleLinear().range([HEIGHT, 0]);

    d3DyChartData.xAxisGroup = gp
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${HEIGHT})`);
    d3DyChartData.yAxisGroup = gp.append("g").attr("class", "y axis");

    const fetchDataToDrawDyChart = async () => {
      try {
        const resp = await d3.csv("../../static/data/revenues.csv");
        if (resp) {
          // convert string revenue and profit to number.
          resp.forEach((d) => {
            d.revenue = Number(d.revenue);
            d.profit = Number(d.profit);
          });
          console.log("61 -- resp: ", resp);
          d3DyChartData = {
            ...d3DyChartData,
            data: resp,
          };
          constructD3Chart();

          d3.interval(() => {
            flagShowProfitFirst = !flagShowProfitFirst;
            constructD3Chart();
          }, 1000);
        } else {
          console.log("85 -- empty data, check internet connect...");
        }
      } catch (error) {
        console.log("88 -- error: ", error.message);
      }
    };
    fetchDataToDrawDyChart();

    const constructD3Chart = () => {
      const value = flagShowProfitFirst ? "profit" : "revenue";

      const xsb = d3DyChartData.xScale.domain(
        d3DyChartData.data.map((el) => el.month)
      );
      const y = d3DyChartData.yScale.domain([
        0,
        d3.max(d3DyChartData.data, (el) => el[value]),
      ]);

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
      const rects = gp
        .selectAll("rect")
        .data(d3DyChartData.data, (d) => d.month);

      // EXIT
      rects
        .exit()
        .attr("fill", "red")
        .transition()
        .duration(500)
        .attr("height", 0)
        .attr("y", y(0))
        .remove();

      // Merge Enter and Update
      // ENTER new elements
      rects
        .enter()
        .append("rect")
        .attr("fill", (d) => "grey")
        .attr("y", y(0))
        .attr("height", 0)
        // UPDATE old elements
        .merge(rects)
        .transition()
        .duration(500)
        .attr("x", (d) => xsb(d.month))
        .attr("y", (d) => y(d[value]))
        .attr("width", xsb.bandwidth)
        .attr("height", (d) => HEIGHT - y(d[value]));

      const text = flagShowProfitFirst ? "Profit ($)" : "Revenue ($)";
      d3DyChartData.yLabel.text(text);
    };

    // return () => {}
  }, []);

  return <div ref={md3s5DyanmicDataChartRef}></div>;
};

// S5DynamicData.propTypes = {}

export default S5DynamicData;
