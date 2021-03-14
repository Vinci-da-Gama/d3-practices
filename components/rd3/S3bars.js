import { useEffect, useRef } from "react";
// import PropTypes from 'prop-types';
import * as d3 from "d3";

import { Urls } from "../../consts/Urls";
import { WhMargin } from "../../consts/WhMargin";
const { defWidth, defHeight, mTop, mBottom, mLeft, mRight } = WhMargin;
const WIDTH = defWidth - mLeft - mRight;
const HEIGHT = defHeight - mTop - mBottom;

const S3bars = () => {
  const s3CharArea = useRef(null);

  useEffect(() => {
    const svg = d3
      .select(s3CharArea.current)
      .append("svg")
      .attr("width", defWidth)
      .attr("height", defHeight)
      .append("g")
      .attr("transform", `translate(${mLeft}, ${mTop})`);

    const fetchTallestMen = async () => {
      try {
        const resp = await d3.json(Urls.tm);
        if (resp) {
          const y = d3
            .scaleLinear()
            .domain([
              d3.min(resp, (el) => el.height) * 0.95,
              d3.max(resp, (el) => el.height),
            ])
            .range([HEIGHT, 0]);
          const xsb = d3
            .scaleBand()
            .domain(resp.map((el) => el.name))
            .range([0, WIDTH])
            .padding(0.4);
          /* .paddingInner(0.3)
            .paddingOuter(0.3); */

          const xAxisCall = d3.axisBottom(xsb);
          svg
            .append("g")
            .attr("transform", `translate(0, ${HEIGHT})`)
            .call(xAxisCall);

          const yAxisCall = d3.axisLeft(y);
          svg.append("g").call(yAxisCall);

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

          const rects = svg.selectAll("rect").data(resp);

          rects
            .enter()
            .append("rect")
            .attr("x", (d) => xsb(d.name))
            .attr("y", (d) => y(d.height))
            .attr("width", xsb.bandwidth)
            .attr("height", (d) => HEIGHT - y(d.height))
            .attr("fill", (d) => "grey");
        } else {
          console.log("76 -- no tallest men return...");
        }
      } catch (error) {
        console.log("79 -- error: ", error.message);
      }
    };
    fetchTallestMen();
    //   return () => {}
  }, []);

  return <div ref={s3CharArea}></div>;
};

// S3bars.propTypes = {}

export default S3bars;
