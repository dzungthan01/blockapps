// import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { formatSeasonId } from '../util/transformData';

import LazyTable from './LazyTable';

const teamAbbreviations = {
  "Toronto Maple Leafs": "TOR",
  "San Jose Sharks": "SJS",
  "Buffalo Sabres": "BUF",
  "Detroit Red Wings": "DET",
  "New York Islanders": "NYI",
  "New York Rangers": "NYR",
  "Montréal Canadiens": "MTL",
  "Tampa Bay Lightning": "TBL",
  "New Jersey Devils": "NJD",
  "Winnipeg Jets": "WPG",
  "New York Americans": "NYA",
  "Philadelphia Flyers": "PHI",
  "Minnesota North Stars": "MNS",
  "Edmonton Oilers": "EDM",
  "Los Angeles Kings": "LAK",
  "Philadelphia Quakers": "PHQ",
  "Chicago Blackhawks": "CHI",
  "Washington Capitals": "WSH",
  "Ottawa Senators": "OTT",
  "Kansas City Scouts": "KCS",
  "Columbus Blue Jackets": "CBJ",
  "Colorado Rockies": "CLR",
  "Anaheim Ducks": "ANA",
  "Hartford Whalers": "HFD",
  "Montreal Maroons": "MMR",
  "Quebec Nordiques": "QUE",
  "Pittsburgh Pirates": "PIT",
  "Carolina Hurricanes" : "CAR",
  "Arizona Coyotes" : "ARI"
};

function LeagueSummary() {
  // const [teams, setTeams] = useState([]);

  const columns = [
    {
      field: 'teamName',
      headerName: 'Team Name',
      renderCell: (row) => <NavLink to={`/team/${teamAbbreviations[row.teamFullName] || row.teamId}`}>{row.teamFullName}</NavLink>
    },
    {
      field: 'gamesPlayed',
      headerName: 'Games Played',
      renderCell: (row) => <div>{row.gamesPlayed}</div>
    },
    {
      field: 'goalsAgainstPerGame',
      headerName: 'Goals Against Per Game',
      renderCell: (row) => <div>{row.goalsAgainstPerGame}</div>
    },
    {
      field: 'goalsForPerGame',
      headerName: 'Goals For Per Game',
      renderCell: (row) => <div>{row.goalsForPerGame}</div>
    },
    {
      field: 'shotsAgainstPerGame',
      headerName: 'Shots Against Per Game',
      renderCell: (row) => <div>{row.shotsAgainstPerGame}</div>
    },
    {
      field: 'shotsForPerGame',
      headerName: 'Shots For Per Game',
      renderCell: (row) => <div>{row.shotsForPerGame}</div>
    },
    {
      field: 'seasonId',
      headerName: 'Season',
      renderCell: (row) => <div>{formatSeasonId(row.seasonId)}</div>
    },
    {
      field: 'ties',
      headerName: 'Ties',
      renderCell: (row) => <div>{row.ties || "NA"}</div>
    },
    {
      field: 'wins',
      headerName: 'Wins',
      renderCell: (row) => <div>{row.wins}</div>
    },
  ];

  return (
    <div>
      <h2>Team Summary</h2>
      <LazyTable route={`http://localhost:8000/api/nhl/summary`} columns={columns} defaultPageSize = {5} rowsPerPageOptions = {[5, 10]}/>
    </div>
  );
}

export default LeagueSummary;
