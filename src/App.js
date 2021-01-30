import React, { useState } from 'react';
import './App.css';
import Utils from './utils/Utils';

// Utils.createMatrix(2, 3) --> [[99,90,43],[63,81,8]]

function App() {
  const [state, setState] = useState({
    rowsNumber: 0,
    columnsNumber: 0,
    biggestPair: 0,
    smallestUnpair: 0,
    pairMean: 0,
    unpairMean: 0,
    matrix: []
  });

  const createMatrix = () => {
    let newMatrix = Utils.createMatrix(state.rowsNumber, state.columnsNumber);
    let newBiggestPair = 0;
    let newSmallestUnpair = 100;
    let newPairMean = 0;
    let newUnpairMean = 0;

    let pairCount = 0;
    let unpairCount = 0;

    for (let i = 0; i < state.rowsNumber; i++) {
      for (let j = 0; j < state.columnsNumber; j++) {
        const actValue = newMatrix[i][j];
        if (actValue % 2 === 0) {
          if (actValue > newBiggestPair) {
            newBiggestPair = actValue;
          }
          pairCount += 1;
          newPairMean += actValue;
        }
        else {
          if (actValue < newSmallestUnpair) {
            newSmallestUnpair = actValue;
          }
          unpairCount += 1;
          newUnpairMean += actValue;
        }
      }
    }

    newPairMean /= pairCount ? pairCount : 1;
    newUnpairMean /= unpairCount ? unpairCount : 1;

    setState({
      ...state,
      matrix: newMatrix,
      biggestPair: newBiggestPair,
      smallestUnpair: newSmallestUnpair,
      pairMean: newPairMean,
      unpairMean: newUnpairMean,
    })
  }

  return (
    <div className="App">

      <h1>Prueba SpiceWise</h1>

      <div style={{ marginBottom: '10px' }}>
        <label>Número de filas</label>
        <input onChange={event => setState({ ...state, 'rowsNumber': event.target.value })} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Número de columnas</label>
        <input onChange={event => setState({ ...state, 'columnsNumber': event.target.value })} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <button onClick={createMatrix}>GO</button>
      </div>

      <div style={{ marginBottom: '10px' }}>
        {state.matrix.length !== 0 && <div>

          <div style={{ marginBottom: '10px' }}>
            {state.matrix.map(row => <div>
              {row.map(value => <span>{` ${value} `}</span>)}
            </div>)}
          </div>

          <div style={{ marginBottom: '10px' }}>
            {state.matrix.map(row => <div>
              {row.map(value =>
                <span
                  style={{ height: '50px', width: '50px', display: 'inline' }}
                  className={value % 2 === 0 ? 'green' : 'orange'}>
                  {` ${value} `}
                </span>
              )}
            </div>)}
          </div>

        </div>}
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>{'Número par más grande: '}</label>
        <span>{state.biggestPair}</span>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>{'Número impar más pequeño: '}</label>
        <span>{state.smallestUnpair}</span>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>{'Promedio de los número pares: '}</label>
        <span>{state.pairMean}</span>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>{'Promedio de los número impares: '}</label>
        <span>{state.unpairMean}</span>
      </div>

    </div>
  );
}

export default App;