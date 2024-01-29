import React, { useContext, useEffect, useState } from 'react';
import CompareOutlined from '@mui/icons-material/CompareOutlined';

import Header from '../../components/Header';
import StateOrRegionButton from '../../components/StateOrRegionButton';
import { StateContext } from '../../AppRouter';
import DetailedIndexChart from '../../components/DetailedIndexChart';
import apiService from '../../services/api.service';
import TableCapacitiesResults from '../../components/TableCapacitiesResults';

export default function Compare() {
  const context = useContext(StateContext);

  // TODO: abstrair para N regiões
  const [selectedRegion1, setSelectedRegion1] = useState(1);
  const [selectedState1, setSelectedState1] = useState(null);
  const [selectedRegion2, setSelectedRegion2] = useState(2);
  const [selectedState2, setSelectedState2] = useState(null);
  const [selectedRegionName1, setSelectedRegionName1] = useState('');
  const [selectedRegionName2, setSelectedRegionName2] = useState('');
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);


  useEffect(() => {
    let apiPromise;

    if (selectedRegion1) {
      apiPromise = apiService.getIndexesByRegion(selectedRegion1);
      setSelectedRegionName1(context.regions.find(r => r.id === selectedRegion1)?.name);
    }
    else if (selectedState1) {
      apiPromise = apiService.getIndexesByState(selectedState1.id);
      setSelectedRegionName1(context.states.find(s => s.id === selectedState1.id)?.name);
    }
    else { return; }

    apiPromise.then(res => {
      const newData = [...res];
      setData1(newData);
    });
  }, [selectedRegion1, selectedState1, context]);

  useEffect(() => {
    let apiPromise;

    if (selectedRegion2) {
      apiPromise = apiService.getIndexesByRegion(selectedRegion2);
      setSelectedRegionName2(context.regions.find(r => r.id === selectedRegion2)?.name);
    }
    else if (selectedState2) {
      apiPromise = apiService.getIndexesByState(selectedState2.id);
      setSelectedRegionName2(context.states.find(s => s.id === selectedState2.id)?.name);
    }
    else { return; }

    apiPromise.then(res => {
      const newData = [...res];
      setData2(newData);
    });
  }, [selectedRegion2, selectedState2, context]);

  return <>
    <Header icon={<CompareOutlined />} title='Compare'>
      <StateOrRegionButton
        label='Selecione a primeira região'
        regions={context.regions}
        states={context.states}
        setParentRegion={setSelectedRegion1}
        setParentState={setSelectedState1}
      />

      <StateOrRegionButton
        label='Selecione a segunda região'
        defaultRegion={selectedRegion2}
        regions={context.regions}
        states={context.states}
        setParentRegion={setSelectedRegion2}
        setParentState={setSelectedState2}
      />
    </Header>
    <article style={{ padding: '1rem', display: 'flex', flexDirection: 'row', gap: '1em' }}>
      <div style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column' }}>
        <TableCapacitiesResults
          data={[data1, data2]}
          labels={[selectedRegionName1, selectedRegionName2]}
          indexes={context.indexes}
        />
      </div>
      <div style={{ flex: '1 1 0' }}>
        {Boolean(selectedRegionName1) ?
          <DetailedIndexChart
            data={[data1, data2]}
            title={[selectedRegionName1, selectedRegionName2]}
            indexStats={context.indexStats}
            compare />
          : <></>
        }
      </div>
    </article>
  </>
}