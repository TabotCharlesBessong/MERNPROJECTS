import { Box, Typography, Stack } from "@pankod/refine-mui";
import React from "react";
import { PieChartProps } from "interfaces/home";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ title, value, series, colors }: PieChartProps) => {
	return (
		<Box
			id="chart"
			flex={1}
			display="flex"
			bgcolor="#fcfcfc"
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
			py={2}
			pl={3.5}
			gap={2}
			borderRadius="15px"
			minHeight="110px"
			width="fit-content"
			maxWidth={400}
			alignSelf='center'
			mx='auto'
		>
			<Stack direction="column">
				<Typography fontSize={14} color="#808191">
					{title}
				</Typography>
				<Typography fontSize={24} color="#11142d" mt={1} fontWeight={700}>
					{value}
				</Typography>
			</Stack>
			<ReactApexChart
				options={{
					chart: {
						type: "donut",
					},
					colors,
					legend: { show: false },
					dataLabels: { enabled: false },
				}}
				series={series}
				type="donut"
				width="180px"
			/>
		</Box>
	);
};

export default PieChart;
