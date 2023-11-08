'use client';
import React from 'react';

import { PieChart, Pie, Cell } from 'recharts';

import styles from '../dashboard.module.css';

const PerformancePieGraphWithNeedle = ({ report }) => {
  const RADIAN = Math.PI / 180;
  const data = [
    { name: 'A', value: 2000, color: '#FF8042' },
    { name: 'B', value: 1500, color: '#FFBB28' },
    { name: 'C', value: 1000, color: '#00C49F' },
    { name: 'D', value: 500, color: '#0088FE' },
  ];
  const cx = 250;
  const cy = 200;
  const iR = 80;
  const oR = 150;
  const value = report[report.length - 2].movingAverage;

  const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
    ];
  };
  return (
    <div className={styles.graph_container}>
      <h2 className={styles.graph_header}>Profit and Running Average</h2>
      <PieChart width={500} height={230}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {needle(value, data, cx, cy, iR, oR, '#d0d000')}
      </PieChart>
    </div>
  );
};

export default PerformancePieGraphWithNeedle;
