
import React from 'react'
import {useList} from '@pankod/refine-core'
import {PieChart,PropertyReferal,TotalRevenue,TopAgent,PropertyCard} from '../components'
import {Typography,Box,Stack} from '@pankod/refine-mui'

const Home = () => {
  return (
		<Box>
			<Typography fontSize={25} fontWeight={700}>
				Dashbaord
			</Typography>
			<Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
				<PieChart
					title="Properties for sale"
					value={684}
					series={[75, 25]}
					colors={["#475be8", "#e4ebef"]}
				/>
				<PieChart
					title="Properties for rent"
					value={674}
					series={[60, 40]}
					colors={["#475be8", "#e4ebef"]}
				/>
				<PieChart
					title="Total Customers"
					value={22378}
					series={[82, 18]}
					colors={["#475be8", "#e4ebef"]}
				/>
				<PieChart
					title="Total Cities"
					value={14}
					series={[75, 25]}
					colors={["#475be8", "#e4ebef"]}
				/>
			</Box>
			<Stack
				mt="25px"
				width="100%"
				direction={{
					xs: "column",
					lg: "row",
				}}
				gap={4}
        ml={1}
			>
				<TotalRevenue />
				<PropertyReferal />
			</Stack>
		</Box>
	);
}
export default Home
