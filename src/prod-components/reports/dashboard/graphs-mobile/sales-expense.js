'use client';
import React from 'react';

import { ComposedChart, Bar, Line, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import styles from '../dashboard.module.css';

const SalesExpensesBarGraphMobile = ({ data, title }) => {
  return (
    <div className={styles.graph_container}>
      <h2 className={styles.graph_header}>{title}</h2>
      <ComposedChart
        width={320}
        height={180}
        data={data}
        margin={{
          top: 5,
          right: 20,
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
        <Line type="monotone" dataKey="ma" stroke="#FF8042" strokeWidth="2" />
      </ComposedChart>
    </div>
  );
};

export default SalesExpensesBarGraphMobile;
