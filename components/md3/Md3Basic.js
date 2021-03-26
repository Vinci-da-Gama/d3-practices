import { useState, useEffect } from "react";
// import PropTypes from 'prop-types'
import { csv, tsv, json } from "d3";

const Md3Basic = () => {
  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const resp = await csv("../../static/data/ages.csv");
        if (!resp) {
          console.log("11 -- no data in db");
        } else {
          console.log(
            "14 -- received csv data and save to sessionStorage...",
            resp
          );
          sessionStorage.setItem("csvData", JSON.stringify(resp));
        }
      } catch (error) {
        console.log("17 -- error: ", error.message || error);
      }
    };
    fetchCSVData();
    const fetchTSVData = async () => {
      try {
        const resp = await tsv("../../static/data/ages.tsv");
        if (!resp) {
          console.log("28 -- no data in db");
        } else {
          console.log(
            "31 -- received tsv data and save to sessionStorage...",
            resp
          );
          sessionStorage.setItem("tsvData", JSON.stringify(resp));
        }
      } catch (error) {
        console.log("37 -- error: ", error.message || error);
      }
    };
    fetchTSVData();
    const fetchJsonData = async () => {
      try {
        const resp = await json("../../static/data/ages.json");
        if (!resp) {
          console.log("45 -- no data in db");
        } else {
          console.log(
            "48 -- received json data and save to sessionStorage...",
            resp
          );
          sessionStorage.setItem("jsonData", JSON.stringify(resp));
        }
      } catch (error) {
        console.log("54 -- error: ", error.message || error);
      }
    };
    fetchJsonData();
    // return () => {}
  }, []);

  return (
    <svg width="190" height="160">
      <path
        d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
        stroke="black"
        fill="transparent"
      />
    </svg>
  );
};

/* Md3Basic.propTypes = {
  } */

export default Md3Basic;
