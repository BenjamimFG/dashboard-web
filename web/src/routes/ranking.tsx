import React, { useEffect } from 'react';
import * as d3 from 'd3';

export default function Ranking() {
  useEffect(() => {
    const svg = d3.select('svg');
    const width = +svg.attr("width");
    const height = +svg.attr("height");


    // Data and color scale
    let data = new Map()
    const colorScale = d3.scaleThreshold([100000, 1000000, 10000000, 30000000, 100000000, 500000000], d3.schemeBlues[7]);

    Promise.all([
      d3.json("https://raw.githubusercontent.com/giuliano-oliveira/geodata-br-states/main/geojson/br_states.json"),
      d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv")
        .then((csv: any[]) => {
          csv.forEach(row => {
            data.set(row.code, +row.pop)
          });
        })
    ])
      .then(loadData => {
        let topo: any = loadData[0];

        const projection = d3.geoMercator()
          .fitExtent([[20, 20], [width - 20, height - 20]], topo)

        console.log(data)

        // Draw the map
        svg.append("g")
          .selectAll("path")
          .data(topo.features)
          .join("path")
          .attr("d", d3.geoPath(projection) as any)
          // set the color of each country
          .attr("fill", function (d: any) {
            console.log(d.id)
            d.total = data.get(d.id) || 0;
            return colorScale(d.total);
          })
      })
  }, []);

  return <>
    <div>Ranking</div>
    <svg id="my_dataviz" width="900" height="600"></svg>
  </>
}