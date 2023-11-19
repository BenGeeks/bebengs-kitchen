'use client';
import React from 'react';

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import styles from '../dashboard.module.css';

const SalesExpensesBarGraph = ({ data }) => {
  return (
    <div className={styles.graph_container}>
      <h2 className={styles.graph_header}>Sales and Expense</h2>
      <BarChart
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
        <Bar dataKey="sales" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        <Bar dataKey="expenses" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
      </BarChart>
    </div>
  );
};

export default SalesExpensesBarGraph;
