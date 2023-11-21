'use client';
import React from 'react';

import { PieChart, Pie, Cell } from 'recharts';

import styles from '../dashboard.module.css';

const PerformancePieGraphWithNeedleMobile = ({ report }) => {
  const RADIAN = Math.PI / 180;
  const data = [
    { name: 'A', value: 3000, color: 'red' },
    { name: 'B', value: 3000, color: '#FF8042' },
    { name: 'C', value: 4500, color: '#FFBB28' },
    { name: 'D', value: 3000, color: '#00C49F' },
    { name: 'E', value: 1500, color: '#0088FE' },
  ];
  const cx = 150;
  const cy = 100;
  const iR = 50;
  const oR = 100;
  const value = report[report.length - 2]?.movingAverage;

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
      <circle key="circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path key="path" d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
    ];
  };
  return (
    <div className={styles.graph_container}>
      <h2 className={styles.graph_header}>Running Performance Meter</h2>
      <div className={styles.performance_value}>{report[report.length - 2]?.movingAverage}</div>
      <PieChart width={320} height={120}>
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
          {data?.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
        {needle(value, data, cx, cy, iR, oR, '#8884d8')}
      </PieChart>
      <div className={styles.performance_0_label}>0</div>
      <div className={styles.performance_1k_label}>1000</div>
      <div className={styles.performance_2k_label}>2000</div>
      <div className={styles.performance_3k5_label}>3500</div>
      <div className={styles.performance_4k5_label}>4500</div>
      <div className={styles.performance_5k_label}>5000</div>
    </div>
  );
};

export default PerformancePieGraphWithNeedleMobile;
