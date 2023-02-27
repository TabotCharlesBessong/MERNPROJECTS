import { Box, Typography, Stack } from "@pankod/refine-mui";
import React from "react";
import { TotalRevenueOptions, TotalRevenueSeries } from "./chart.config";
import ReactApexChart from "react-apexcharts";
import { ArrowCircleUpRounded } from "@mui/icons-material";

const TotalRevenue = () => {
	return (
		<Box
			p={4}
			flex={1}
			bgcolor="#FCFCFC"
			id="chart"
			display="flex"
			flexDirection="column"
			borderRadius="15px"
		>
			<Typography fontSize={18} fontWeight={600} color="#11142d">
				Total Revenue
			</Typography>
			<Stack my='20px' direction="row" gap={4} flexWrap="wrap">
				<Typography fontSize={28} fontWeight={700} color="#11142d">
					$236,535
				</Typography>
				<Stack direction='row' alignItems='center' gap={1} >
					<ArrowCircleUpRounded
						sx={{
							fontSize: 25,
							color: "#475be8",
						}}
					/>
          <Stack>
            <Typography fontSize={15} color='#475be8' >0.8%</Typography>
            <Typography fontSize={12} color='#808192' >Than Last Month</Typography>
          </Stack>
				</Stack>
			</Stack>

      <ReactApexChart
        series={TotalRevenueSeries}
        type='bar'
        height={310}
        options={TotalRevenueOptions}
      />
		</Box>
	);
};

export default TotalRevenue;
