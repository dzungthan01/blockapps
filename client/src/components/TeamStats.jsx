import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatSeasonId } from '../util/transformData';
import LazyTable from './LazyTable';

function TeamStats() {
  const { teamAbbr } = useParams();
  const [seasons, setSeasons] = useState([]);
  const [season, setSeason] = useState('20232024');
  const [gameType, setGameType] = useState('2');
  const [route, setRoute] = useState(`http://localhost:8000/api/nhl/stats/${teamAbbr}/${season}/${gameType}`);
  // const [loadTable, setLoadTable] = useState(false);

  const columns = [
    {
      field: 'name',
      headerName: 'Full Name',
      renderCell: (row) => <div>{`${row.firstName.default} ${row.lastName.default}`}</div>
    },
    {
      field: 'headshot',
      headerName: 'Headshot',
      renderCell: (row) => (
        <div>
          <img src={row.headshot} alt={`${row.firstName.default} ${row.lastName.default}`} style={{ width: '50px', height: 'auto' }} />
        </div>
      )
    },   
    {
      field: 'positionCode',
      headerName: 'Position',
      renderCell: (row) => <div>{row.positionCode}</div>
    }, 
    {
      field: 'gamesPlayed',
      headerName: 'Games Played',
      renderCell: (row) => <div>{row.gamesPlayed}</div>
    },
    {
      field: 'goals',
      headerName: 'Goals',
      renderCell: (row) => <div>{row.goals}</div>
    },
    {
      field: 'assists',
      headerName: 'Assists',
      renderCell: (row) => <div>{row.assists}</div>
    },
    {
      field: 'points',
      headerName: 'Points',
      renderCell: (row) => <div>{row.points}</div>
    },
  ];

  useEffect(() => {
    // Simulating fetching from a URL that returns your season data
    fetch(`http://localhost:8000/api/nhl/stats/${teamAbbr}`)
      .then(response => response.json())
      .then(data => {
        setSeasons(data);
      })
      .catch(error => console.error('Failed to fetch seasons:', error));
  }, [teamAbbr]);

  useEffect(() => {
    setRoute(`http://localhost:8000/api/nhl/stats/${teamAbbr}/${season}/${gameType}`);
  }, [teamAbbr, season, gameType]);

  const handleSeasonChange = (e) => {
    console.log(e.target.value);
    setSeason(e.target.value);
  };

  const handleGameTypeChange = (e) => {
    console.log(e.target.value);
    setGameType(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Submitted");
    if (season && gameType) {
      console.log("Submitting with season and game type:", season, gameType);
      setRoute(`http://localhost:8000/api/nhl/stats/${teamAbbr}/${season}/${gameType}`);
    } else {
        console.error("Both season and game type must be selected."); // More informative error handling
        alert('Please select both season and game type before submitting.');
    }
  };

  console.log("Current season:", season, "Current game type:", gameType);


  return (
    <div>
      <Link to="/">Back to Summary</Link>
      <h1>{teamAbbr} Team Statistics</h1>
      <div>
        <label htmlFor="season">Select Season:</label>
        <select id="season" value={season} onChange={handleSeasonChange}>
          <option value="">Select Season</option>
          {seasons.map((season, index) => (
            <option key={index} value={season.season}>
              {formatSeasonId(season.season)}
            </option>
          ))}
        </select>
        <label htmlFor="game-type">Game Type:</label>
        <select id="game-type" value={gameType} onChange={handleGameTypeChange}>
          <option value="">Select Game Type</option>
          <option value="2">Regular Season</option>
          <option value="3">Playoffs</option>
        </select>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <LazyTable route={route} columns={columns} defaultPageSize = {5} rowsPerPageOptions = {[5, 10]}/>
      </div>

    </div>
  );
}

export default TeamStats;
