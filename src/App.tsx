import { useEffect, useRef, useState } from 'react';
import { Sub, SubsResponseFromApi } from './types';

import './App.css';
import axios from 'axios';

import List from './components/List';
import Form from './components/Form';



interface AppState {
  subs: Array<Sub>,
  newSubsNumber: number
}


function App() {

  // restingir el typo que permite asiganar <string | number>
  const [subs, setSubs] = useState<AppState['subs']>([]);
  const [newSubsNumber, setNewSubsNumber] = useState<AppState['newSubsNumber']>(0);
  // Set Valor inicial
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSubs = (): Promise<SubsResponseFromApi> => {
      return axios
        .get('https://samuel.com')
        .then(response => response.data);
    }

    const mapFromApiTosubs = (apiResponse: SubsResponseFromApi):
      Array<Sub> => {
      return apiResponse.map(subFromApi => {
        const {
          months: subMonthos,
          profileUrl: avatar,
          nick,
          description
        } = subFromApi;
        return {
          nick,
          description,
          avatar,
          subMonthos
        }
      })
    }

    fetchSubs()
      .then(mapFromApiTosubs)
      .then(setSubs)

  }, []);

  const handleNewSub = (newSub: Sub): void => {
    setSubs(subs => [...subs, newSub]);
    setNewSubsNumber(n => n + 1);
  }

  return (
    <div className="App" ref={divRef}>
      <h1>midu subs</h1>
      <List subs={subs} />
      New subs: {newSubsNumber}
      <Form onNewSub={handleNewSub} />
    </div>
  );
}

export default App;
