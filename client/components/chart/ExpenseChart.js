import React, {PropTypes, Component} from 'react';
import {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {connect} from 'react-redux';
import _ from 'lodash';
// const data = [{name: 'Amazon', uv: 590, pv: 800, amt: 1400},
//               {name: 'GEICO', uv: 868, pv: 967, amt: 1506},
//               {name: 'WalMart', uv: 1397, pv: 1098, amt: 989},
//               {name: 'Fresh', uv: 1480, pv: 1200, amt: 1228},
//               {name: 'Apple', uv: 1520, pv: 1108, amt: 1100},
//               {name: 'Outback', uv: 1400, pv: 680, amt: 1700}];
const formatCurrency = require('format-currency')

class LineBarAreaComposedChart extends Component {
	render () {
    const expenseTransactions = this.props.transactions.filter(transaction => transaction.amount > 0);
    const venderGroups = _.groupBy(expenseTransactions, 'name');
    const venderNames = Object.keys(venderGroups)
    const unfilteredData = venderNames.map((venderName) => {
      const amount = venderGroups[venderName].reduce((accumulator, currentElement)=>{
        return accumulator + currentElement.amount;
      }, 0);
      const name = venderName.slice(0, venderName.indexOf(' '));
      return {
        name: name,
        amount: amount,
      }
    })
   const data = _.sortBy(unfilteredData, [function(o) { return -(o.amount); }]).slice(0, 6)
                .map((entry, index) => {
                  return {
                    name: entry.name,
                    amount: entry.amount,
                    rank: index + 1,
                  }
                });
    const totalExpense = unfilteredData.reduce((accumulator, currentElement) => {
      return accumulator + currentElement.amount
    }, 0);

  	return (
      <div className="flex-container-row expenseChartContainer">
        <div className='barChartContainer'>
          <ComposedChart width={300} height={220} data={data}
              margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <XAxis dataKey="rank" className="xAxis" />
            <YAxis className="yAxis"/>
            <Tooltip/>
            {/* <Legend/> */}
            <CartesianGrid stroke='#f5f5f5'/>
            {/* <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8'/> */}
            <Bar dataKey='amount' barSize={10} fill='#413ea0'/>
            {/* <Line type='monotone' dataKey='uv' stroke='#ff7300'/> */}
          </ComposedChart>
       </div>

       <div className="vendorLabelContainer">
          {
            data.map((entry) => {
              const percent = (entry.amount / totalExpense * 100).toFixed(1)
              return (
                <div className="eachVendoerLabel" key={entry.name}>
                  <span className="className">{entry.name}</span>
                  <span className="classAmount">{formatCurrency(entry.amount).slice(0, -3)}</span>
                  <span className="classPerc">{percent}%</span>
                </div>
              )
            })
          }
       </div>

    </div>
    );
  }
}

const mapState = state => {
  return {
    transactions: state.transactions
  }
}

export default connect(mapState)(LineBarAreaComposedChart);
