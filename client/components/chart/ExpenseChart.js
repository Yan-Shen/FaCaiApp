import React, {PropTypes, Component} from 'react';
import {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {connect} from 'react-redux';
import _ from 'lodash';
import {getCurrentVendorThunk} from '../../store';
import { setTimeout } from 'timers';

const formatCurrency = require('format-currency')
let opts = { format: '%s%v', symbol: '$' }
const transactionCategoryToExclude = ['16001000', '21001000', '21006000', '21007000']

class LineBarAreaComposedChart extends Component {
  constructor(props) {
    super(props)
    this.state = {show: false}
    this.handleClick = this.handleClick.bind(this)

  }

  // componentDidMount () {
  //   this.setState({show: false})
  // }
  handleClick(ele) {
    this.props.getCurrentVendor(ele.target.innerHTML);
    this.setState({show: true})
  }

	render () {
    let className = 'vendorTransactionsContainer'
      if (this.state.show) {
        className += ' vendorActive'
      }

    console.log('top is----------', top)
    const expenseTransactions = this.props.transactions
      .filter(transaction => {
       return (transaction.amount > 0) &&
       (transactionCategoryToExclude.indexOf(transaction.categoryId ) === -1)
      });
    const venderGroups = _.groupBy(expenseTransactions, 'name');
    const venderNames = Object.keys(venderGroups)
    const unfilteredData = venderNames.map((venderName) => {
      const amount = venderGroups[venderName].reduce((accumulator, currentElement)=>{
        return accumulator + currentElement.amount;
      }, 0);
      const name = venderName;
      // const name = venderName.slice(0, venderName.indexOf(' '));
      return {
        name: name,
        amount: amount,
      }
    })
   const data = _.sortBy(unfilteredData, [function(o) { return -(o.amount); }]).slice(0, 6)
                .map((entry, index) => {
                  return {
                    name: entry.name.toLowerCase(),
                    amount: entry.amount,
                    rank: index + 1,
                  }
                });
    const totalExpense = unfilteredData.reduce((accumulator, currentElement) => {
      return accumulator + currentElement.amount
    }, 0);

    const axisLable = {
      fontSize: '0.8em'
    }
  	return (
      <div className="flex-container-row expenseChartContainer">
        <div className='barChartContainer'>
          <ComposedChart width={280} height={220} data={data}
              margin={{top: 20, right: 20, bottom: 20, left: 10}}>
            <XAxis dataKey="rank" style={axisLable} />
            <YAxis style={axisLable} />
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
                  <button className="className" onClick={ele => this.handleClick(ele)}>{entry.name}</button>
                  <span className="classAmount">{formatCurrency(entry.amount).slice(0, -3)}</span>
                  <span className="classPerc greyBox">{percent}%</span>
                </div>
              )
            })
          }
       </div>

       {/* { this.props.venderTransactions[0] && this.state.show && */}
       <div className={className}>
        <div className="flex-container-row">
            <span  className="vendorName">{this.props.currentVendor}</span>
            <div className="removeVendor" onClick={()=>this.setState({show: false})}>
              <i className="material-icons">clear</i>
            </div>
          </div>
          {
            this.props.venderTransactions.map(transaction => {
            return (
            <div key={transaction.id} className="flex-container-row flex-container-spaceBtw fullWidth vendorTransactions" >
              <span> {transaction.date}</span>
              <span>{formatCurrency(transaction.amount)}</span>
            </div>)
          })
        }
          </div>
        {/* } */}
    </div>
    );
  }
}

const mapState = (state) => {
  const name = state.currentVendor
  console.log('name is----------', name)
  return {
    transactions: state.transactions,
    currentVendor: name,
    venderTransactions: state.transactions.filter(transaction => transaction.name.toLowerCase() === name)
  }
}

const mapDispatch = dispatch => {
  return {
    getCurrentVendor(vendorName){
      dispatch(getCurrentVendorThunk(vendorName))
    }
  }
}
export default connect(mapState, mapDispatch)(LineBarAreaComposedChart);
