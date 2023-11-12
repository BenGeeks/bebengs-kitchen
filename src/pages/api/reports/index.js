import dbConnect from '@/lib/dbConnect';
import Order from '@/model/order';
import Expenses from '@/model/expenses';
import moment from 'moment';

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  if (method !== 'POST') return res.status(401).json({ message: 'INTRUDER ALERT!' });

  const summarizeSales = (sales) => {
    return new Promise((resolve) => {
      let tempArray = [];
      let summary = {};
      let cash = 0;
      let gCash = 0;
      let collectibles = [];
      sales?.forEach((order) => {
        if (order.isPaid) {
          if (order.isGcash) gCash = gCash + order.total;
          if (!order.isGcash) cash = cash + order.total;
          order.orderDetails.items.forEach((item) => {
            if (summary[item._id]) {
              summary[item._id] = {
                ...item,
                qty: summary[item._id].qty + item.qty,
                subTotal: (summary[item._id].qty + item.qty) * item.price,
              };
            } else {
              summary[item._id] = item;
            }
          });
        }

        if (order.isDelivered && !order.isPaid) {
          collectibles.push({ name: order.orderDetails.customer.name, amount: order.total });
        }
      });
      const keys = Object.keys(summary);
      keys.forEach((key) => {
        tempArray.push(summary[key]);
      });

      let salesSummary = { cash: cash, gcash: gCash, total: cash + gCash };
      let salesData = tempArray.sort((a, b) => b.subTotal - a.subTotal);
      resolve({ salesSummary, salesData });
    });
  };

  const summarizeExpenses = (expenses) => {
    return new Promise((resolve) => {
      let cash = 0;
      let gcash = 0;
      let total = 0;
      expenses?.forEach((expense) => {
        if (expense.isGcash) {
          gcash = gcash + expense.total;
        } else {
          cash = cash + expense.total;
        }
        total = total + expense.total;
      });
      let expensesSummary = { cash, gcash, total };
      let expensesData = expenses;
      resolve({ expensesSummary, expensesData });
    });
  };

  const salesListRequest = Order.find({
    $or: [
      { downPaymentDate: { $gte: moment(body.dateFrom), $lt: moment(body.dateTo) } },
      { paymentDate: { $gte: moment(body.dateFrom), $lt: moment(body.dateTo) } },
    ],
  });

  const expenseListRequest = Expenses.find({ expenseDate: { $gte: moment(body.dateFrom), $lt: moment(body.dateTo) } });

  Promise.all([salesListRequest, expenseListRequest])
    .then(async ([salesList, expenseList]) => {
      let { salesSummary, salesData } = await summarizeSales(salesList);
      let { expensesSummary, expensesData } = await summarizeExpenses(expenseList);
      let finalReportData = [
        { source: 'Sales', cash: salesSummary?.cash, gcash: salesSummary?.gcash, total: salesSummary?.total },
        { source: 'Expenses', cash: expensesSummary?.cash, gcash: expensesSummary?.gcash, total: expensesSummary?.total },
        {
          source: 'Total',
          cash: salesSummary?.cash - expensesSummary?.cash,
          gcash: salesSummary?.gcash - expensesSummary?.gcash,
          total: salesSummary?.total - expensesSummary?.total,
        },
      ];
      return res.status(200).json({ success: true, data: { salesSummary, salesData, expensesSummary, expensesData, finalReportData } });
    })
    .catch((error) => {
      return res.status(500).json({ success: false, error });
    });
}

export const config = {
  api: {
    externalResolver: true,
  },
};
