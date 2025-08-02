"use client";
import React from "react";
import { useRealtimeData } from "@/hooks/useRealTimeData";
import InvoiceTable from "@/components/App/Tables/invoice-table";
import CustomerTable from "@/components/App/Tables/customer-table";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useTeamContext } from "@/Contexts/UserContext";

const DashboardPage = () => {
  const { teamId } = useTeamContext(); // Replace with auth or context
  const invoices = useRealtimeData("invoices", teamId);
  const customers = useRealtimeData("customers", teamId);
  console.log(invoices);
  console.log(customers);

  // --- Chart Data Transform ---
  const statusData = Object.entries(
    invoices.reduce((acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {})
  ).map(([status, count]) => ({ name: status, value: count }));

  const revenueByMonth = invoices.reduce((acc, invoice) => {
    const month = new Date(invoice.created_at).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    acc[month] = (acc[month] || 0) + invoice.amount;
    return acc;
  }, {});

  const revenueChart = Object.entries(revenueByMonth).map(
    ([month, total]) => ({
      name: month,
      total,
    }),
    {}
  );

  const customerGrowth = customers.reduce((acc, customer) => {
    const date = new Date(customer.created_at).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const customerChart = Object.entries(customerGrowth).map(([date, count]) => ({
    date,
    count,
  }));

  // Chart Colors
  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4">
      {/* Row 1: Charts */}
      <div className="grid grid-cols-3 gap-4 w-full ">
        {/* Pie Chart: Invoice Status */}
        <div className="bg-white shadow h-[250px] rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Invoice Status</h2>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
              >
                {statusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: Revenue by Month */}
        <div className="bg-white shadow h-[250px] rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={revenueChart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart: Customer Growth */}
        <div className="bg-white shadow h-[250px] rounded p-4">
          <h2 className="text-lg font-semibold mb-2">Customer Growth</h2>
          <ResponsiveContainer width="100%" height="90%">
            <LineChart data={customerChart}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Tables */}
      <div className="grid grid-cols-2 gap-4 w-full h-full">
        <div className="bg-white shadow rounded p-4 overflow-auto">
          <h2 className="text-lg font-semibold mb-2">Invoices</h2>
          <InvoiceTable data={invoices} />
        </div>
        <div className="bg-white shadow rounded p-4 overflow-auto">
          <h2 className="text-lg font-semibold mb-2">Customers</h2>
          <CustomerTable data={customers} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
