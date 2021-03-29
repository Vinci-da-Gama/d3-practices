import { useRef, useEffect } from "react";
// import PropTypes from 'prop-types';
import * as d3 from "d3";
import * as topojson from "topojson-client";

import { WhOnlyWAndH } from "../../consts/WhOnlyWAndH";
const {
  defWidth,
  defHeight /* , mLeft, mRight, mTop, mBottom */,
} = WhOnlyWAndH;
/* const WIDTH = defWidth - mLeft - mRight;
const HEIGHT = defHeight - mTop - mBottom; */

const S8ChoroplethMap = () => {
  const md3s8MapRef = useRef(null);
  useEffect(() => {
    d3.selectAll("#md3s8-map-chart").remove();

    const svg = d3
      .select(md3s8MapRef.current)
      .append("svg")
      .attr("width", defWidth)
      .attr("height", defHeight)
      .attr("id", "md3s8-map-chart");

    const path = d3.geoPath();

    const x = d3.scaleLinear().domain([1, 10]).rangeRound([600, 860]);

    const color = d3
      .scaleThreshold()
      .domain(d3.range(2, 10))
      .range(d3.schemeBlues[9]);

    const g = svg
      .append("g")
      .attr("class", "key")
      .attr("transform", "translate(0,40)");

    g.selectAll("rect")
      .data(
        color.range().map(function (d) {
          d = color.invertExtent(d);
          if (d[0] == null) d[0] = x.domain()[0];
          if (d[1] == null) d[1] = x.domain()[1];
          return d;
        })
      )
      .enter()
      .append("rect")
      .attr("height", 8)
      .attr("x", function (d) {
        return x(d[0]);
      })
      .attr("width", function (d) {
        return x(d[1]) - x(d[0]);
      })
      .attr("fill", function (d) {
        return color(d[0]);
      });

    g.append("text")
      .attr("class", "caption")
      .attr("x", x.range()[0])
      .attr("y", -6)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text("Unemployment rate");

    g.call(
      d3
        .axisBottom(x)
        .tickSize(13)
        .tickFormat(function (x, i) {
          return i ? x : x + "%";
        })
        .tickValues(color.domain())
    )
      .select(".domain")
      .remove();

    const unemployment = new Map();
    const promises = [
      d3.json("https://d3js.org/us-10m.v1.json"),
      d3.tsv("../../static/data/map.tsv", function (d) {
        unemployment.set(d.id, +d.rate);
      }),
    ];

    Promise.all(promises)
      .then((data) => {
        ready(data[0]);
      })
      .catch(function (error) {
        console.log("96 -- error", error);
      });

    const ready = (us) => {
      console.log("100 -- us: ", us);
      svg
        .append("g")
        .attr("class", "counties")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
        .enter()
        .append("path")
        .attr("fill", (d) => {
          return color((d.rate = unemployment.get(d.id)));
        })
        .attr("d", path)
        .append("title")
        .text((d) => {
          return d.rate + "%";
        });

      svg
        .append("path")
        .datum(
          topojson.mesh(us, us.objects.states, (a, b) => {
            return a !== b;
          })
        )
        .attr("class", "states")
        .attr("d", path);
    };
    // return () => {}
  }, []);

  return <div ref={md3s8MapRef}></div>;
};

// S8ChoroplethMap.propTypes = {}

export default S8ChoroplethMap;
