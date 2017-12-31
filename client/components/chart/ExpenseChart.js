import React, {PropTypes} from 'react';
import {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import createReactClass from 'create-react-class';

const data = [{name: 'Amazon', uv: 590, pv: 800, amt: 1400},
              {name: 'GEICO', uv: 868, pv: 967, amt: 1506},
              {name: 'WalMart', uv: 1397, pv: 1098, amt: 989},
              {name: 'Fresh', uv: 1480, pv: 1200, amt: 1228},
              {name: 'Apple', uv: 1520, pv: 1108, amt: 1100},
              {name: 'Outback', uv: 1400, pv: 680, amt: 1700}];

const LineBarAreaComposedChart = createReactClass({
	render () {
  	return (
    	<ComposedChart width={500} height={250} data={data}
            margin={{top: 20, right: 20, bottom: 20, left: 20}}>
          <XAxis dataKey="name" className="xAxis"/>
          <YAxis />
          <Tooltip/>
          {/* <Legend/> */}
          <CartesianGrid stroke='#f5f5f5'/>
          {/* <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8'/> */}
          <Bar dataKey='pv' barSize={20} fill='#413ea0'/>
          {/* <Line type='monotone' dataKey='uv' stroke='#ff7300'/> */}
       </ComposedChart>
    );
  }
})

export default LineBarAreaComposedChart
