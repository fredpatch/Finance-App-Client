import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

const Row2 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];

  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  // Process operational expense data for the LineChart
  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);

  // Process product expense data for the ScatterChart
  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productData]);

  return (
    <>
      {/* Dashboard Box for Operational vs Non-Operational Expenses */}
      <DashboardBox gridArea={"d"}>
        <BoxHeader
          sidetext={"+4%"}
          title={"Operational vs Non-Operational Expesenses"}
          subtitle={""}
        />
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray={palette.grey[800]}
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId={"left"}
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[500]}
              activeDot={{ r: 7 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea={"e"}>
        <BoxHeader
          sidetext={"+5%"}
          title={"Campaigns and Targets"}
          subtitle={""}
        />
        <FlexBetween mt={".25rem"} gap={"1.5rem"} pr={"1rem"}>
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml={"-0.7rem"} flexBasis={"40%"} textAlign={"center"}>
            <Typography variant="h5">Target Sales</Typography>
            <Typography variant="h3" m={"0.3rem"} color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              Finance goals campaign desired
            </Typography>
          </Box>
          <Box flexBasis={"40%"}>
            <Typography variant="h5">Losses in Revenues</Typography>
            <Typography variant="h6">83</Typography>
            <Typography variant="h5" mt={".4rem"}>
              Profit Margins
            </Typography>
            <Typography variant="h6">Margins are up by 30%</Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea={"f"}>
        <BoxHeader
          sidetext={"-5%"}
          title={"Product Prices vs Expenses"}
          subtitle={""}
        />

        {/* ResponsiveContainer for the ScatterChart */}
        <ResponsiveContainer width="100%" height={"100%"}>
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -17,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />

            {/* Configure X, Y, and Z axes, Tooltip, and Scatter */}

            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />

            <ZAxis type="number" range={[20]} />

            <Tooltip formatter={(v) => `$${v}`} />

            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
