import { useState } from 'react';
import { FormControlLabel, Radio } from '@mui/material';

import ButtonPopover from '../ButtonPopover';

import './StateOrRegionButton.css';

export default function StateOrRegionButton({ regions, states, setParentState, setParentRegion, sx, label, defaultRegion }) {
  const [openTreeView, setOpenTreeView] = useState(null);

  const [selectedRegion, setSelectedRegion] = useState(defaultRegion ?? 1);
  const [selectedState, setSelectedState] = useState(null);

  const handleToggleTreeView = (id) => {
    if (id === openTreeView)
      setOpenTreeView(null)
    else
      setOpenTreeView(id);
  }

  const handleStateSelect = (state) => {
    setSelectedRegion(null);
    setParentRegion(null);

    setSelectedState(state);
    setParentState(state);
  }

  const handleRegionSelect = (regionId) => {
    setSelectedRegion(regionId);
    setParentRegion(regionId);

    setSelectedState(null);
    setParentState(null);
  }

  return <ButtonPopover buttonLabel={label} sx={{ minWidth: '200px', ...sx }} >
    <div id="tree-view">
      {regions.map(r => {
        return <div key={r.id}>
          <span
            // classe active condicional, se a classe estiver presente a
            // seta (caret) é rotacionada no css
            className={'tree-view-toggler' + (openTreeView === r.id ? ' active' : '')}
            onClick={() => handleToggleTreeView(r.id)}></span>
          <FormControlLabel
            control={<Radio
              checked={selectedRegion === r.id || selectedState?.region_id === r.id}
              size='small'
              onClick={() => handleRegionSelect(r.id)}
              color={selectedState?.region_id === r.id ? 'default' : 'primary'}
            />}
            label={<span className='label'>{r.name}</span>}
          />
          {/* classe active condicional na div .nested é usada para
              realizar o display da div nested (padrão é display: none)*/}
          <div className={'nested' + (openTreeView === r.id ? ' active' : '')}>
            {states.filter(s => s.region_id === r.id).map(s => {
              return <div key={'s.' + s.id}>
                <span>
                  <FormControlLabel
                    control={<Radio
                      checked={selectedState?.id === s.id || selectedRegion === s.region_id}
                      size='small'
                      onClick={() => handleStateSelect(s)}
                    />}
                    label={<span className='label'>{s.name}</span>}
                  />
                </span>
              </div>;
            })}
          </div>
        </div>;
      })}
    </div>
  </ButtonPopover>
}