'use client';
import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

import styles from '../dashboard.module.css';

const TotalSalesExpensesPieGraphMobile = ({ total }) => {
  console.log(total);
  const COLORS = ['#00C49F', '#FF8042'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) + 10;
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${total[index].name} - ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className={styles.graph_container}>
      {total && <h2 className={styles.graph_header}>Total Sales: ₱ {(total[0].value + total[1].value).toLocaleString('en')}</h2>}
      <PieChart width={320} height={150}>
        <Pie data={total} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={70} fill="#8884d8" dataKey="value">
          {total?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default TotalSalesExpensesPieGraphMobile;
