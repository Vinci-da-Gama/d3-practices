import * as d3 from "d3";

import { Urls } from "../../consts/Urls";
// const data = [20, 12, 16, 25, 20];
// const url = "https://udemy-react-d3.firebaseio.com/ages.json";

export default class S2Chart {
  constructor(elem) {
    console.log("7 -- ref passed current element: ", elem);
    const svg = d3
      .select(elem)
      .append("svg")
      .attr("width", 500)
      .attr("height", 200);

    /* const rects = svg.selectAll("rect").data(data);
    rects
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 100)
      .attr("y", 50)
      .attr("width", 50)
      .attr("height", (d) => d * 10)
      .attr("fill", "grey"); */

    d3.json(Urls.ages)
      .then((rz) => {
        const rects = svg.selectAll("rect").data(rz);
        rects
          .enter()
          .append("rect")
          .attr("x", (d, i) => i * 100)
          .attr("y", 50)
          .attr("width", 50)
          .attr("height", (d) => d.age * 10)
          .attr("fill", (d) => (d.age > 10 ? "red" : "green"));
      })
      .catch((error) => {
        console.log("38 -- error: ", error.message || error);
      });
  }
}
