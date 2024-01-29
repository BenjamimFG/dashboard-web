import { useContext, useEffect, useState } from 'react';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';

import Header from '../../components/Header';
import { StateContext } from '../../AppRouter';
import apiService from '../../services/api.service';
import CardGrid from '../../components/CardGrid';

import './profile.css';
import StateOrRegionButton from '../../components/StateOrRegionButton';
import DetailedIndexChart from '../../components/DetailedIndexChart';

// const capacities_indexes = [3, 4, 5, 6, 7, 8, 9];
// const results_indexes = [11, 12, 13, 14, 15];

const test = [
  { label: 'Investimento Público em C&T', rank: '4', value: '0.568' },
  { label: 'Investimento Público em C&T', rank: '4', value: '0.568' },
  { label: 'Investimento Público em C&T', rank: '4', value: '0.568' },
  { label: 'Investimento Público em C&T', rank: '4', value: '0.568' },
  { label: 'Investimento Público em C&T', rank: '4', value: '0.568' },
  { label: 'Investimento Público em C&T', rank: '4', value: '0.568' },
  { label: 'Investimento Público em C&T', rank: '4', value: '0.568' },
  { label: 'Investimento Público em C&T', rank: '4', value: '0.568' },
  { label: 'Investimento Público em C&T', rank: '4', value: '0.568' },
  { label: 'Investimento Público em C&T', rank: '4', value: '0.568' },
  { label: 'Investimento Público em C&T', rank: '4', value: '0.568' },
  { label: 'Investimento Público em C&T', rank: '4', value: '0.568' },
  { label: 'Investimento Público em C&T', rank: '4', value: '0.568' },
]

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
      setData(res);
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
        <CardGrid color='#2f80ed' data={test} />
      </div>
      <div style={{ flex: '1 1 0' }}>
        <DetailedIndexChart data={data} title={selectedRegionStateName} />
      </div>
    </article>
  </>
}