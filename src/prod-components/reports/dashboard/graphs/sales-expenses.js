'use client';
import React from 'react';

import { ComposedChart, Bar, Line, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import styles from '../dashboard.module.css';

const SalesExpensesBarGraph = ({ data, title }) => {
  return (
    <div className={styles.graph_container}>
      <h2 className={styles.graph_header}>{title}</h2>
      <ComposedChart
        width={1080}
        height={320}
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

        <Bar dataKey="profit" stackId="a" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        <Bar dataKey="expenses" stackId="a" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        <Line type="monotone" dataKey="movingAverage" stroke="#FF8042" strokeWidth="2" />
        <Line type="monotone" dataKey="sales" stroke="#000000" strokeWidth="2" />
      </ComposedChart>
    </div>
  );
};

export default SalesExpensesBarGraph;
