import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from 'react-redux';
import _ from 'lodash';

const formatCurrency = require('format-currency')

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#c76aea', '#f66e85'];


class BalanceChart extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

	render () {
    const accounts = this.props.accounts;
    const assetClasses = _.groupBy(accounts, 'subtype');
    const classNames = Object.keys(assetClasses)
    const data = classNames.map(className => {
      const amount = assetClasses[className].reduce((accumulator, currentElement)=>{
        return accumulator + currentElement.balanceCurrent;
      }, 0);
      return {
        name: className,
        value: amount
      }
    })
    const totalAmount = data.reduce((accumulator, currentElement) => {
      return accumulator + currentElement.value
    }, 0);

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
            // label={renderCustomizedLabel}
            outerRadius={90}
            fill="#8884d8"
          >
            {
              data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
            }
          </Pie>
        </PieChart>
        <div className="balanceLabelContainer">
          {
            data.map((entry, index) => {
              const colorLable = {
                width: "20px",
                height: "5px",
                backgroundColor: COLORS[index % COLORS.length],
                display: "inline-block"
              }
              const percent = (entry.value / totalAmount * 100).toFixed(1)
              return (
                <div className="eachBalanceLabel" key={entry.name}>
                  <div style={colorLable} />
                  <span className="className">{entry.name}</span>
                  <span className="classAmount">{formatCurrency(entry.value).slice(0, -3)}</span>
                  <span className="classPerc">{percent}%</span>
                </div>
              )
            })
          }
        </div>
      </div>
      </ReactCSSTransitionGroup>
    );
  }
}

const mapState = state => {
  return {
    groups: state.banks,
    accounts: state.accounts
  }
}

export default connect(mapState)(BalanceChart);

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
