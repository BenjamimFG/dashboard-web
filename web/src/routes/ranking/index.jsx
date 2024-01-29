import React, { useContext, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';

import { StateContext } from '../../AppRouter';
import apiService from '../../services/api.service';
import ButtonPopover from '../../components/ButtonPopover';

import topography from '../../assets/br_states.json';
import './ranking.css'
import Header from '../../components/Header';

const colorScale = d3.scaleThreshold(
  [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
  [
    '#65a0ff', '#5b94f0', '#5389e3', '#4a7fd6', '#3d6ec1',
    '#2f5dad', '#2854a1', '#1d4791', '#1b438c', '#09124f'
  ]
);

export default function Ranking() {
  const context = useContext(StateContext);

  const [selectedIndexName, setSelectedIndexName] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [data, setData] = useState({});

  const updateSelectedRegions = (checked, regionId) => {
    const i = selectedRegions.indexOf(regionId);

    const newState = [...selectedRegions];

    if (checked && i === -1) {
      newState.push(regionId);
    }
    else if (!checked && i !== -1) {
      newState.splice(i, 1);
    }
    setSelectedRegions(newState);
  }


  useEffect(() => {
    apiService.getIndexById(selectedIndex, selectedRegions)
      .then(res => {
        const newData = {};
        for (const d of res.data) {
          newData[d.state_id] = {
            'rank': d.rank,
            'value': Number.parseFloat(d.value)
          }
        }
        setData(newData);
        setSelectedIndexName(res.index_name);
      });
  }, [selectedIndex, selectedRegions]);

  useEffect(() => {
    if (Object.keys(data).length === 0) return;

    const svg = d3.select('#brasil-svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const projection = d3.geoMercator()
      .fitExtent([[20, 20], [width - 20, height - 20]], topography)

    svg.append('g')
      .selectAll('path')
      .data(topography.features)
      .join('path')
      .attr('d', d3.geoPath(projection))
      .attr('fill', (d) => {
        d.total = data[d.properties.SIGLA]?.value;

        return d.total === undefined ? '#c8c6c4' : colorScale(d.total);
      })
      .attr('stroke', '#fff')
  }, [data]);

  useEffect(() => {
    if (Object.keys(data).length === 0) return;

    document.querySelector('#bar-chart-svg').innerHTML = '';

    const svg = d3.select('#bar-chart-svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const g = svg.append('g').attr('transform', 'translate(50, 0)');

    const states = Object.keys(data);
    const yLabels = {}

    for (const s of states) {
      yLabels[s] = `${s} ${String(data[s].rank).padStart(2, '0')}º`;
    }

    const x = d3.scaleLinear()
      .domain([0, 1])
      .range([0, width - 100]);
    var y = d3.scaleBand()
      .range([0, height])
      .domain(Object.values(yLabels))
      .padding(.1);

    const yaxis = d3.axisLeft(y);
    const g_yaxis = g.append("g").attr("class", "y axis");

    g_yaxis.transition().call(yaxis);

    g.selectAll("myRect")
      .data(states)
      .enter()
      .append("rect")
      .attr("y", (s) => y(yLabels[s]))
      .attr("width", (s) => x(data[s]?.value))
      .attr("height", y.bandwidth())
      .attr('fill', (s) => colorScale(data[s].value));

    g.selectAll('text.bar')
      .data(states)
      .enter()
      .append('text')
      .attr("x", (s) => x(data[s]?.value) + 5)
      .attr("y", (s) => y(yLabels[s]) + ((y.bandwidth()) / 2) + 5)
      .text((s) => data[s].value);
  }, [data])

  return <>
    <Header icon={<LeaderboardOutlinedIcon />} title='Ranking'>
      <ButtonPopover
        id='index-button'
        buttonLabel='Selecione um indicador'
      >
        <FormControl>
          <RadioGroup
            aria-labelledby="radio-buttons-group"
            name="radio-buttons-group"
            value={selectedIndex}
            onChange={(e) => {
              setSelectedIndex(Number.parseInt(e.target.value));
            }}
          >
            {context.indexes.map(i => {
              return (
                <FormControlLabel key={i.id}
                  value={i.id}
                  control={<Radio size='small' />}
                  label={<span className='label'>{i.name}</span>}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </ButtonPopover>
      <ButtonPopover
        id='region-button'
        buttonLabel='Tipo de Regionalização'
      >
        <FormControl>
          <FormGroup>
            {context.regions.map(r => {
              return (
                <FormControlLabel
                  key={r.id}
                  control={
                    <Checkbox
                      size='small'
                      checked={Boolean(selectedRegions.indexOf(r.id) !== -1)}
                      onChange={(e) => updateSelectedRegions(e.target.checked, r.id)}
                      name={r.name}
                    />
                  }
                  label={<span className='label'>{r.name}</span>}
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </ButtonPopover>
    </Header>
    <article>
      <div className='index-name-wrapper'><h1>{selectedIndexName}</h1></div>
      <svg id='brasil-svg' width='600' height='600'></svg>
      <span className='bar-wrapper'>
        <svg id='bar-chart-svg' width='500' height='600'></svg>
      </span>
    </article>
  </>
}