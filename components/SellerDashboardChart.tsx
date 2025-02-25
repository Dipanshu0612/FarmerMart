"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export default function SellerDashboardChart({
  orders,
}: {
  orders: OrderType[];
  }) {
  const getMonthName = (date: string): string => {
    const month = new Date(date).getMonth();
    return new Date(0, month).toLocaleString("default", { month: "long" });
  };
  const groupedOrders = orders.reduce((acc, order) => {
    const month = getMonthName(order.ordered_at);
    if (!acc[month]) {
      acc[month] = { orders: 0, revenue: 0 };
    }
    acc[month].orders += 1;
    if (order.order_status !== "Cancelled") {
      acc[month].revenue += order.total_amount;
    }
    return acc;
  }, {} as Record<string, { orders: number; revenue: number }>);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const chartData = months.map((month) => ({
    month,
    orders: groupedOrders[month]?.orders || 0,
    revenue: groupedOrders[month]?.revenue || 0,
  }));

  const chartConfig = {
    orders: {
      label: "Orders",
      color: "#2563eb",
    },
    revenue: {
      label: "Revenue",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="orders" fill="var(--color-orders)" radius={4} />
        <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
