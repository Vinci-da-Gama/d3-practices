import { useRef, useEffect } from "react";
// import PropTypes from 'prop-types';
import * as d3 from "d3";

import { StudyText } from "./S8ForceChart.styledcompo";

import { WhMarginBigger } from "../../consts/WhMarginBigger";
const { defWidth, defHeight, mLeft, mRight, mTop, mBottom } = WhMarginBigger;
const WIDTH = defWidth - mLeft - mRight;
const HEIGHT = defHeight - mTop - mBottom;

const S8ForceChart = () => {
  const md3s8ForceChartRef = useRef(null);
  useEffect(() => {
    d3.selectAll("#md3s8-force-chart").remove();

    const svg = d3
      .select(md3s8ForceChartRef.current)
      .append("svg")
      .attr("width", defWidth)
      .attr("height", defHeight)
      .attr("id", "md3s8-force-chart");

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Add "forces" to the simulation here
    const simulation = d3
      .forceSimulation()
      .force("center", d3.forceCenter(WIDTH / 2, HEIGHT / 2))
      .force("charge", d3.forceManyBody().strength(-50))
      .force("collide", d3.forceCollide(10).strength(0.9))
      .force(
        "link",
        d3.forceLink().id(function (d) {
          return d.id;
        })
      );

    d3.json("../../static/data/force.json", function (error, graph) {
      if (error) throw error;

      console.log("40 -- graph: ", graph);

      // Add lines for every link in the dataset
      const link = svg
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter()
        .append("line")
        .attr("stroke-width", function (d) {
          return Math.sqrt(d.value);
        });

      // Add circles for every node in the dataset
      const node = svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("fill", function (d) {
          return color(d.group);
        });
      /* .call(
          d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        ); */

      // Basic tooltips
      node.append("title").text(function (d) {
        return d.id;
      });

      // Attach nodes to the simulation, add listener on the "tick" event
      simulation.nodes(graph.nodes).on("tick", ticked);

      // Associate the lines with the "link" force
      simulation.force("link").links(graph.links);

      // Dynamically update the position of the nodes/links as time passes
      function ticked() {
        link
          .attr("x1", function (d) {
            return d.source.x;
          })
          .attr("y1", function (d) {
            return d.source.y;
          })
          .attr("x2", function (d) {
            return d.target.x;
          })
          .attr("y2", function (d) {
            return d.target.y;
          });

        node
          .attr("cx", function (d) {
            return d.x;
          })
          .attr("cy", function (d) {
            return d.y;
          });
      }
    });

    // Change the value of alpha, so things move around when we drag a node
    /* const dragstarted = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0.7).restart();
      d.fx = d.x;
      d.fy = d.y;
    }; */

    // Fix the position of the node that we are looking at
    /* const dragged = (d) => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }; */

    // Let the node do what it wants again once we've looked at it
    /* const dragended = (d) => {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }; */
    //   return () => {}
  }, []);

  return (
    <>
      <StudyText>Need More study on it...</StudyText>
      <div ref={md3s8ForceChartRef}></div>;
    </>
  );
};

// S8ForceChart.propTypes = {}

export default S8ForceChart;
