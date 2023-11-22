'use client';
import React from 'react';

import { ComposedChart, Bar, Line, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import styles from '../dashboard.module.css';

const SalesExpensesBarGraphMobile = ({ data }) => {
  return (
    <div className={styles.graph_container}>
      <h2 className={styles.graph_header}>Sales and Expense</h2>
      <ComposedChart
        width={320}
        height={300}
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
        <Bar dataKey="sales" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        <Bar dataKey="expenses" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        <Line type="monotone" dataKey="profit" stroke="#0950e9" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="movingAverage" stroke="#e25130" strokeWidth="2" />
      </ComposedChart>
    </div>
  );
};

export default SalesExpensesBarGraphMobile;
