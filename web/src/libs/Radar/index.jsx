import * as d3 from 'd3';

import { INNER_RADIUS, RadarGrid } from './RadarGrid';

const MARGIN = 30;
const COLORS = [
  '#7c25d1',
  '#999999',
  '#2bc0cd'
];

/*
  A react component that builds a Radar Chart for several groups in the dataset
*/
export default function Radar({ width, height, data, axisConfig }) {
  if (data.length === 0 || axisConfig.length === 0) return <></>;

  const outerRadius = Math.min(width, height) / 2 - MARGIN;

  // The x scale provides an angle for each variable of the dataset
  const allVariableNames = axisConfig.map((axis) => axis.name);
  const xScale = d3
    .scaleBand()
    .domain(allVariableNames)
    .range([0, 2 * Math.PI]);

  // Compute the y scales: 1 scale per variable.
  // Provides the distance to the center.
  let yScales = {};
  axisConfig.forEach((axis) => {
    yScales[axis.name] = d3
      .scaleRadial()
      .domain([0, axis.max])
      .range([INNER_RADIUS, outerRadius]);
  });

  // Color Scale
  const allGroups = data.map((d) => d.name);
  const colorScale = d3.scaleOrdinal().domain(allGroups).range(COLORS);

  // Compute the main radar shapes, 1 per group
  const lineGenerator = d3.lineRadial();

  const allLines = data.map((series, i) => {
    const allCoordinates = axisConfig.map((axis) => {
      const yScale = yScales[axis.name];
      const angle = xScale(axis.name) ?? 0; // I don't understand the type of scalePoint. IMO x cannot be undefined since I'm passing it something of type Variable.
      const radius = yScale(series[axis.name]);
      const coordinate = [angle, radius];
      return coordinate;
    });

    // To close the path of each group, the path must finish where it started
    // so add the last data point at the end of the array
    allCoordinates.push(allCoordinates[0]);

    const d = lineGenerator(allCoordinates);

    if (!d) {
      return null;
    }

    return (
      <path
        key={i}
        d={d}
        stroke={colorScale(series.name)}
        strokeWidth={3}
        fill={colorScale(series.name)}
        fillOpacity={0.1}
      />
    );
  }).filter(d => d !== null);

  return (
    <svg width={width} height={height}>
      <g transform={'translate(' + width / 2 + ',' + (height - 20) / 2 + ')'}>
        <RadarGrid
          outerRadius={outerRadius}
          xScale={xScale}
          axisConfig={axisConfig}
        />
        {allLines}
      </g>
      <g>
        {data.map((d, i) => {
          return <g key={i}>
            <circle cx={100 + i * 150} cy={height - 10} r={7} fill={colorScale(d.name)}></circle>
            <text x={110 + i * 150} y={height - 5} fill='black' textAnchor='left' style={{ alignmentBaseline: 'middle' }}>{d.name}</text>
          </g>
        })}
      </g>
    </svg>
  );
};
