import React from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import createReactClass from 'create-react-class';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
    	{`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const BalanceChart = createReactClass({
	render () {
  	return (
      <ReactCSSTransitionGroup
      transitionName="pieContainer"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}>
      <div className="chartContainer">
        <PieChart width={200} height={200} onMouseEnter={this.onPieEnter}>
          <Pie
            data={data}
            dataKey="value"
            cx={100}
            cy={100}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={90}
            fill="#8884d8"
          >
            {
              data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
        </PieChart>
        <div>labels</div>
      </div>
      </ReactCSSTransitionGroup>
    );
  }
})

// const BalanceChart = ()=>{
//     return (
//       <div className="chartContainer">
//         <PieChart width={730} height={250}>
//           <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label>
//           </Pie>
//       </PieChart>
//       </div>
//     )
//   }

// })

export default BalanceChart;

// const { PieChart, Pie, Sector, Cell } = Recharts;
// const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
//                   {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//  	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x  = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy  + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
//     	{`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// const SimplePieChart = React.createClass({
// 	render () {
//   	return (
//     	<PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
//         <Pie
//           data={data}
//           cx={300}
//           cy={200}
//           labelLine={false}
//           label={renderCustomizedLabel}
//           outerRadius={80}
//           fill="#8884d8"
//         >
//         	{
//           	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
//           }
//         </Pie>
//       </PieChart>
//     );
//   }
// })
