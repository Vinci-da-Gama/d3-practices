import { useEffect, useRef } from "react";
// import PropTypes from 'prop-types'
import * as d3 from "d3";

import { WhMarginBigger } from "../../consts/WhMarginBigger";
const { defWidth, defHeight, mLeft, mRight, mTop, mBottom } = WhMarginBigger;
const WIDTH = defWidth - mLeft - mRight;
const HEIGHT = defHeight - mTop - mBottom;

const S5Dots = () => {
  const md3s5DotsChartRef = useRef(null);
  useEffect(() => {
    d3.selectAll("#md3s5-circles-chart").remove();

    const svg = d3
      .select(md3s5DotsChartRef.current)
      .append("svg")
      .attr("width", defWidth)
      .attr("height", defHeight)
      .attr("id", "md3s5-circles-chart");

    const gp = svg
      .append("g")
      .attr("transform", `translate(${mLeft}, ${mTop})`);

    // x label
    gp.append("text")
      .attr("class", "x axis-label") // you also need to write css, otherwise, it is useless
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 50)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("GDP Per Capita ($)");
    // y label
    const yLabel = gp
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -170)
      .attr("font-size", "20px")
      .attr("text-anchor", "middle")
      .text("Life Expectancy (Years)");

    const timeLabel = gp
      .append("text")
      .attr("y", HEIGHT - 10)
      .attr("x", WIDTH - 40)
      .attr("font-size", "40px")
      .attr("opacity", "0.4")
      .attr("text-anchor", "middle")
      .text("1800");

    let d3DotsChartData = {
      yLabel, // also can add y label here
    };
    let time = 0;
    // let flagShowProfitFirst = true;

    // x scale base
    d3DotsChartData.xScale = d3.scaleLog().base(10).range([0, WIDTH]);
    // y scale base
    d3DotsChartData.yScale = d3.scaleLinear().range([HEIGHT, 0]);
    const area = d3
      .scaleLinear()
      .range([25 * Math.PI, 1500 * Math.PI])
      .domain([2000, 1400000000]);
    // schemePastel1 is color scheme, find it in d3 github
    const continentColor = d3.scaleOrdinal(d3.schemePastel1);

    d3DotsChartData.xAxisGroup = gp
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${HEIGHT})`);
    d3DotsChartData.yAxisGroup = gp.append("g").attr("class", "y axis");

    const fetchDataToDrawDotsChart = async () => {
      try {
        const resp = await d3.json("../../static/data/countries.json");
        if (resp) {
          // clean data
          const formattedData = resp.map((year) => {
            return year["countries"]
              .filter((country) => {
                const dataExists = country.income && country.life_exp;
                return dataExists;
              })
              .map((country) => {
                country.income = Number(country.income);
                country.life_exp = Number(country.life_exp);
                return country;
              });
          });

          d3DotsChartData = {
            ...d3DotsChartData,
            data: formattedData[0],
          };
          // first run of the visualization
          constructD3Chart();

          // run the code every 0.1 second
          d3.interval(() => {
            // at the end of our data, loop back
            time = time < 214 ? time + 1 : 0;
            d3DotsChartData = {
              ...d3DotsChartData,
              data: formattedData[time],
            };
            constructD3Chart();
          }, 600);
        } else {
          console.log("112 -- empty data, check internet connect...");
        }
      } catch (error) {
        console.log("115 -- error: ", error.message);
      }
    };
    fetchDataToDrawDotsChart();

    const constructD3Chart = () => {
      // const value = flagShowProfitFirst ? "profit" : "revenue";

      const xsl = d3DotsChartData.xScale.domain([142, 150000]);
      const y = d3DotsChartData.yScale.domain([0, 90]);

      const xAxisCall = d3
        .axisBottom(xsl)
        .tickValues([400, 4000, 40000])
        .tickFormat(d3.format("$"));
      d3DotsChartData.xAxisGroup.transition().duration(600).call(xAxisCall);

      const yAxisCall = d3.axisLeft(y);
      d3DotsChartData.yAxisGroup.transition().duration(600).call(yAxisCall);

      // DATA JOIN
      const circles = gp
        .selectAll("circle")
        .data(d3DotsChartData.data, (d) => d.country);

      // EXIT
      circles.exit().remove();

      // Merge Enter and Update
      // ENTER new elements
      circles
        .enter()
        .append("circle")
        .attr("fill", (d) => continentColor(d.continent))
        // UPDATE old elements
        .merge(circles)
        .transition()
        .duration(600)
        .attr("cy", (d) => y(d.life_exp))
        .attr("cx", (d) => xsl(d.income))
        .attr("r", (d) => Math.sqrt(area(d.population) / Math.PI));

      // update the time label
      timeLabel.text(String(time + 1800));
    };

    // return () => {}
  }, []);

  return <div ref={md3s5DotsChartRef}></div>;
};

// S5Dots.propTypes = {}

export default S5Dots;
