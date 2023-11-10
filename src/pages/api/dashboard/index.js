import dbConnect from '@/lib/dbConnect';
import Expenses from '@/model/expenses';
import Orders from '@/model/order';
import { resolve } from 'styled-jsx/css';

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method !== 'GET') return res.status(401).json({ message: 'INTRUDER ALERT!' });

  const mergeData = (salesData, expensesData) => {
    let sum = 0;
    // Merge the data based on the date or any other common key

    // Example: Assuming both salesData and expensesData are arrays of objects
    const mergedData = salesData.map((sale, index) => {
      const matchingExpense = expensesData.find((expense) => expense.date === sale.date);
      let profit = sale.sales - (matchingExpense ? matchingExpense.expenses : 0); // Calculate the total
      if (sale.date !== null) sum += profit;

      return {
        name: sale.date,
        sales: sale.sales,
        expenses: matchingExpense ? matchingExpense.expenses : 0, // Handle missing expenses data
        profit: profit,
        movingAverage: Math.round(sum / index),
      };
    });

    return mergedData.filter((sale) => sale.name !== null);
  };

  const pipelineSales = Orders.aggregate([
    {
      $group: {
        _id: {
          year: { $year: { date: '$paymentDate' } },
          month: { $month: { date: '$paymentDate' } },
          day: { $dayOfMonth: { date: '$paymentDate' } },
        },
        totalSales: { $sum: '$total' },
      },
    },
    {
      $project: {
        _id: 0,
        date: {
          $dateToString: {
            format: '%m-%d-%Y',
            date: {
              $dateFromParts: {
                year: '$_id.year',
                month: '$_id.month',
                day: '$_id.day',
              },
            },
          },
        },
        sales: '$totalSales',
      },
    },
    {
      $sort: { date: 1 },
    },
  ]);

  const pipelineExpenses = Expenses.aggregate([
    {
      $group: {
        _id: {
          year: { $year: { date: '$expenseDate' } },
          month: { $month: { date: '$expenseDate' } },
          day: { $dayOfMonth: { date: '$expenseDate' } },
        },
        totalExpenses: { $sum: '$total' },
      },
    },
    {
      $project: {
        _id: 0,
        date: {
          $dateToString: {
            format: '%m-%d-%Y',
            date: {
              $dateFromParts: {
                year: '$_id.year',
                month: '$_id.month',
                day: '$_id.day',
              },
            },
          },
        },
        expenses: '$totalExpenses',
      },
    },
    {
      $sort: { date: 1 },
    },
  ]);

  Promise.all([pipelineSales, pipelineExpenses])
    .then(([salesData, expensesData]) => {
      // Merge the sales and expenses data
      const mergedData = mergeData(salesData, expensesData);

      // Respond with the merged data
      return res.status(200).json({ success: true, data: mergedData });
    })
    .catch((error) => {
      // Handle any errors that may occur during the queries
      return res.status(500).json({ success: false, error });
    });
}

export const config = {
  api: {
    externalResolver: true,
  },
};
