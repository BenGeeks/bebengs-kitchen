'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import styles from '../dashboard.module.css';

const ProfitRunningAverageLineGraph = ({ data }) => {
  return (
    <div className={styles.graph_container}>
      <h2 className={styles.graph_header}>Profit and Running Average</h2>
      <LineChart
        width={1080}
        height={230}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="movingAverage" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default ProfitRunningAverageLineGraph;
