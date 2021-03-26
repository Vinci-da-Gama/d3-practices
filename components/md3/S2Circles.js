import React, { useEffect, useRef } from "react";
// import PropTypes from "prop-types";
import * as d3 from "d3";

import { SimpleWhMargin } from "../../consts/SimpleWhMargin";
const { defWidth, defHeight, mTop, mBottom, mLeft, mRight } = SimpleWhMargin;

const S2Circles = () => {
  const md3S2CircleRef = useRef(null);

  useEffect(() => {
    /**
     * Below rm func must be placed at the beginning,
     * place it later, then del new created svg
     */
    d3.selectAll("#md3s2-multi-circles").remove();

    const svg = d3
      .select(md3S2CircleRef.current)
      .append("svg")
      .attr("width", defWidth)
      .attr("height", defHeight)
      .attr("id", "md3s2-multi-circles")
      .attr("transform", `translate(${mLeft}, ${mTop})`);

    const drawCircles = async () => {
      try {
        const resp = await d3.json("../../static/data/ages.json");

        if (resp) {
          const circles = svg.selectAll("circle").data(resp);

          circles
            .enter()
            .append("circle")
            .attr("cx", (d, i) => i * 50 + 50)
            .attr("cy", 50)
            .attr("r", (d) => 2 * d.age)
            .attr("fill", (d) => {
              if (d.name === "Tony") {
                return "blue";
              } else {
                return "red";
              }
            });
        } else {
          console.log("47 -- no tallest men return...");
        }
      } catch (error) {
        console.log("50 -- error: ", error.message);
      }
    };
    drawCircles();
    //   return () => {}
  }, []);

  return <div ref={md3S2CircleRef}></div>;
};

// S2Circles.propTypes = {};

export default S2Circles;
