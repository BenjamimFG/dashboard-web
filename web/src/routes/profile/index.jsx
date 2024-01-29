import { useContext, useEffect, useState } from 'react';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';

import Header from '../../components/Header';
import { StateContext } from '../../AppRouter';
import apiService from '../../services/api.service';
import CardGrid from '../../components/CardGrid';

import './profile.css';
import StateOrRegionButton from '../../components/StateOrRegionButton';
import DetailedIndexChart from '../../components/DetailedIndexChart';

const capacities_indexes = [3, 4, 5, 6, 7, 8, 9];
const results_indexes = [11, 12, 13, 14, 15];

export default function Profile() {
  const context = useContext(StateContext);

  const [selectedRegion, setSelectedRegion] = useState(1);
  const [selectedState, setSelectedState] = useState(null);
  const [data, setData] = useState([]);
  const [selectedRegionStateName, setSelectedRegionStateName] = useState('');

  useEffect(() => {
    let apiPromise;

    if (selectedRegion) {
      apiPromise = apiService.getIndexesByRegion(selectedRegion);
      setSelectedRegionStateName(context.regions.find(r => r.id === selectedRegion)?.name);
    }
    else if (selectedState) {
      apiPromise = apiService.getIndexesByState(selectedState.id);
      setSelectedRegionStateName(context.states.find(s => s.id === selectedState.id)?.name);
    }
    else { return; }

    apiPromise.then(res => {
      const newData = [...res];
      setData(newData);
    });
  }, [selectedRegion, selectedState, context]);


  return <>
    <Header icon={<QueryStatsOutlinedIcon />} title='Perfil'>
      <StateOrRegionButton
        regions={context.regions}
        states={context.states}
        setParentRegion={setSelectedRegion}
        setParentState={setSelectedState}
      />
    </Header>
    <article style={{ padding: '1rem', display: 'flex', flexDirection: 'row', gap: '1em' }}>
      <div style={{ flex: '1 1 0' }}>
        <CardGrid
          title='Capacidades'
          color='#2f80ed'
          style={{ marginBottom: '1em' }}
          data={
            data
              .filter(d => capacities_indexes.indexOf(d.index_data_id) !== -1)
              .map(d => { return { label: d.name, rank: d.rank.toString(), value: d.value } })
          }
        />
        <CardGrid
          title='Resultados'
          color='#3bc3df'
          data={
            data
              .filter(d => results_indexes.indexOf(d.index_data_id) !== -1)
              .map(d => { return { label: d.name, rank: d.rank.toString(), value: d.value } })}
        />
      </div>
      <div style={{ flex: '1 1 0' }}>
        <DetailedIndexChart data={data} title={selectedRegionStateName} indexStats={context.indexStats} />
      </div>
    </article>
  </>
}