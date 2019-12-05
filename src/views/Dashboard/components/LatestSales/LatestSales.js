import React from 'react';
import axios from "axios";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import palette from 'theme/palette';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
 




export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    var today = new Date(),
      date = today.getMonth() + 1;
    var today1 = new Date(),
      year = today1.getFullYear();

    this.state = {
      currentmonth: date,
      currentyear: year,
      data: {
        labels: [],
        datasets: [
          {
            label: 'Quanlity',
            backgroundColor: palette.primary.main,
            data: []
          },
          {
            label: 'plan',
            backgroundColor: palette.neutral,
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        legend: { display: false },
        cornerRadius: 5,
        tooltips: {
          enabled: true,
          mode: 'index',
          intersect: false,
          borderWidth: 1,
          borderColor: palette.divider,
          backgroundColor: palette.white,
          titleFontColor: palette.text.primary,
          bodyFontColor: palette.text.secondary,
          footerFontColor: palette.text.secondary
        },
        layout: { padding: 0 },
        scales: {
          xAxes: [
            {
              barThickness: 15,
              maxBarThickness: 15,
              barPercentage: 0.5,
              categoryPercentage: 0.5,
              ticks: {
                fontColor: palette.text.secondary
              },
              gridLines: {
                display: false,
                drawBorder: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontColor: palette.text.secondary,
                beginAtZero: true,
                min: 0
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: palette.divider,
                drawBorder: false,
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
                zeroLineColor: palette.divider
              }
            }
          ]
        }
      },
      datalist: [],
      showmonth: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',],
      showyear: ['2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022'],
       
    }
  }
  componentDidMount = () => {

    axios.post('http://localhost:3003/todos/getchart')
      .then((res) => {

        let { dataone, dataBar, dataList, currentmonth, currentyear } = this.state

        if (res.data.length > 0) {
          dataList = res.data
          this.setState({ dataList })
          this.update_data_bar()
          console.log("datalist:",dataList)
        }
        console.log("array list : ", dataList)
      }).catch((error) => {
        console.log(error)
      });
  }
  updateYearState = (e) => { this.setState({ currentyear: e.target.value }) }
  updateMonthState = (e) => { this.setState({ currentmonth: e.target.value }) }
  update_data_bar = () => {
    let { currentmonth, currentyear, dataList, data } = this.state
    let gainObject = {}
    let barData1 = []
    let barData2 = []
    let labels = []
    let top=0
    dataList.map(item => {
      if (item.month == currentmonth && item.year == currentyear) {
        if (gainObject[item.name]) {
          gainObject[item.name] += item.price * 1.0
        } else {
          gainObject[item.name] = item.price * 1.0


        }
      } else {
      }
    })
    console.log("gainObject ;", gainObject)
    console.log("getObject values: ", gainObject["admin"]);
    let keys = Object.keys(gainObject);
    for (var index = 0; index < keys.length; index++) {
      labels.push(keys[index])
      barData1.push(gainObject[keys[index]])
      barData2.push(3000)
    }
    
    
    data.labels = labels
    data.datasets[0].data = barData1
    data.datasets[1].data = barData2
    // this.setState({ data, currentmonth })
    this.setState({ data })

  }
  render() {
    return (
      <div>
        <CardHeader
          action={
            <Button
              size="small"
              variant="text"
            >
              Last 1 months
               {/* <ArrowDropDownIcon /> */}
            </Button>
          }
          title="Quanlity Chart"
        />

        <FormControl style={{ margin: '10px', minWidth: 120, }}>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.currentyear}
          onChange={this.updateYearState}
          >
            {

              this.state.showyear.map((item, index) => {
                return (
                  <MenuItem value={item}>{item}</MenuItem>
                )
              })}
          </Select>
        </FormControl>
        <FormControl style={{ margin: '10px', minWidth: 120, }}>
          <InputLabel id="demo-simple-select-helper-label">Month</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={this.state.currentmonth}
            onChange={this.updateMonthState}
          >
            {

              this.state.showmonth.map((item, index) => {
                return (
                  <MenuItem value={item}>{item}</MenuItem>
                )
              })}

          </Select>
          <FormHelperText>please select month</FormHelperText>
        </FormControl>
        <Button onClick={this.update_data_bar} style={{ backgroundColor: 'green', color:'white',border: '1px solid #e7e9eb' }}>Change</Button>
        <Divider />
        <CardContent style={{ backgroundColor: 'white', border: '1px solid #e7e9eb' }}>
          <div style={{ height: "400px" }}>
            <Bar
              data={this.state.data}
              options={this.state.options}
            />
          </div>
        </CardContent>
        <Divider />
      </div>
    );
  }
}

// const useStyles = makeStyles(() => ({
//   root: {},
//   chartContainer: {
//     height: 400,
//     position: 'relative'
//   },
//   actions: {
//     justifyContent: 'flex-end'
//   }
// }));

// const LatestSales = props => {
//   const { className, ...rest } = props;

//   const classes = useStyles();

//   return (
//     <Card
//       {...rest}
//       className={clsx(classes.root, className)}
//     >
//       <CardHeader
//         action={
//           <Button
//             size="small"
//             variant="text"
//           >
//             Last 7 days <ArrowDropDownIcon />
//           </Button>
//         }
//         title="Latest Sales"
//       />
//       <Divider />
//       <CardContent>
//         <div className={classes.chartContainer}>
//           <Bar
//             data={data}
//             options={options}
//           />
//         </div>
//       </CardContent>
//       <Divider />
//       {/* <CardActions className={classes.actions}>
//         <Button
//           color="primary"
//           size="small"
//           variant="text"
//         >
//           Overview <ArrowRightIcon />
//         </Button>
//       </CardActions> */}
//     </Card>
//   );
// };

// LatestSales.propTypes = {
//   className: PropTypes.string
// };

// export default LatestSales;
