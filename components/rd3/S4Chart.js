import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

import { Urls } from "../../consts/Urls";
import { WhMargin } from "../../consts/WhMargin";
const { defWidth, defHeight, mTop, mBottom, mLeft, mRight } = WhMargin;
const WIDTH = defWidth - mLeft - mRight;
const HEIGHT = defHeight - mTop - mBottom;

const S4Chart = ({ gender }) => {
  const s4CharArea = useRef(null);

  useEffect(() => {
    /**
     * Below remove func must be placed at the beginning,
     * place it later, then del new created svg
     */
    if (gender) {
      d3.selectAll("#s4-chart-menwomen").remove();
    }

    const svg = d3
      .select(s4CharArea.current)
      .append("svg")
      .attr("width", defWidth)
      .attr("height", defHeight)
      .attr("id", "s4-chart-menwomen")
      .append("g")
      .attr("transform", `translate(${mLeft}, ${mTop})`);

    svg
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 50)
      .attr("text-anchor", "middle")
      .text("The world's tallest men");
    svg
      .append("text")
      .attr("x", -(HEIGHT / 2))
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .text("Height in cm")
      .attr("transform", "rotate(-90)");

    let d3Data = {};
    d3Data.xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`);
    d3Data.yAxisGroup = svg.append("g");

    const fetchTallestMen = async () => {
      try {
        const resp = await Promise.allSettled([
          d3.json(Urls.tm),
          d3.json(Urls.tw),
        ]);
        // let firstTimeWomenData = true;
        const [men, women] = resp;
        /**
         * for 1s setup men as data, and then present on the screen
         */
        d3Data = {
          ...d3Data,
          data: men.value,
        };
        updateD3Chart();

        if (resp) {
          /* d3.interval(() => {
            console.log("74 -- women: ", women);
            d3Data = {
              ...d3Data,
              data: firstTimeWomenData ? women.value : men.value,
            };
            updateD3Chart();
            firstTimeWomenData = !firstTimeWomenData;
          }, 1000); */
          // delete d3Data.data;
          d3Data = {
            ...d3Data,
            data: gender === "Women" ? women.value : men.value,
          };
          updateD3Chart();
        } else {
          console.log("89 -- no tallest men return...");
        }
      } catch (error) {
        console.log("92 -- error: ", error.message);
      }
    };
    fetchTallestMen();

    const updateD3Chart = () => {
      const y = d3
        .scaleLinear()
        .domain([
          d3.min(d3Data.data, (el) => el.height) * 0.95,
          d3.max(d3Data.data, (el) => el.height),
        ])
        .range([HEIGHT, 0]);
      const xsb = d3
        .scaleBand()
        .domain(d3Data.data.map((el) => el.name))
        .range([0, WIDTH])
        .padding(0.4);
      /* .paddingInner(0.3)
      .paddingOuter(0.3); */

      const xAxisCall = d3.axisBottom(xsb);
      d3Data.xAxisGroup.transition().duration(500).call(xAxisCall);

      const yAxisCall = d3.axisLeft(y);
      d3Data.yAxisGroup.transition().duration(500).call(yAxisCall);

      // DATA JOIN
      const rects = svg.selectAll("rect").data(d3Data.data);

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
    //   return () => {}
  }, [gender]);

  return <div ref={s4CharArea} className="flex-center"></div>;
};

S4Chart.propTypes = {
  gender: PropTypes.string.isRequired,
};

export default S4Chart;
