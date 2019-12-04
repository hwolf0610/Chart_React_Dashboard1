import React from 'react';
import { CardContent} from '@material-ui/core';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
const theme = createMuiTheme();

export default class ProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataList: [],
      offset: 0,
    }
  }

  componentDidMount = () => {
    axios.post('http://localhost:3003/todos/jobshow')
      .then((res) => {
        let { dataList } = this.state
        if (res.data.length > 0)
          // if(res.data.name==localStorage.getItem("name"))
              dataList = res.data   
              console.log("datalist:", dataList)      
        this.setState({ dataList })
        // this.update_pager() 
      }).catch((error) => {
        console.log(error)
      });
  }
  handleClick(offset) {
    this.setState({ offset });
    console.log("offset:", offset)
  }
  render() {
    return (
      <div>
        <CardContent style={{ fontSize:'15px', height:'600px', backgroundColor: 'white', border: '1px solid #e7e9eb' }}>
          Personal Quanlity
           <Table
            // className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >

            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <span>No</span>
                </TableCell>
                <TableCell padding="checkbox">
                  <span>Date</span>
                </TableCell>
                <TableCell padding="checkbox">
                  <span>Name</span>
                </TableCell>
                <TableCell padding="checkbox">
                  <span>Client</span>
                </TableCell>
                <TableCell padding="checkbox">
                  <span>Price</span>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {
                //  this.updatetable
                this.state.dataList.map((item, index) => {
                  let start = this.state.offset * 20 - 1
                  let end = this.state.offset * 20 + 20
                  while (start < index && index < end) {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={index}
                      >
                        <TableCell padding="checkbox">
                          <span>{index + 1}</span>
                        </TableCell>
                        <TableCell padding="checkbox">
                          <span>{item.month + "/" + item.day + "/" + item.year}</span>
                        </TableCell>
                        <TableCell padding="checkbox">
                          <span>{item.name}</span>
                        </TableCell>
                        <TableCell padding="checkbox">
                          <span>{item.clientname}</span>
                        </TableCell>
                        <TableCell padding="checkbox">
                          <span>{item.price}</span>
                        </TableCell>
                      </TableRow>
                    )
                  }

                })

              }

            </TableBody>
          </Table>

          <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Pagination
            limit={1}
            offset={this.state.offset}
            total={100}
            onClick={(e, offset) => this.handleClick(offset)}
          />
        </MuiThemeProvider>

        </CardContent>
      </div>
    );
  }
}

// const useStyles = makeStyles(theme => ({
//   root: {
//     height: '100%'
//   },
//   chartContainer: {
//     position: 'relative',
//     height: '300px'
//   },
//   stats: {
//     marginTop: theme.spacing(2),
//     display: 'flex',
//     justifyContent: 'center'
//   },
//   device: {
//     textAlign: 'center',
//     padding: theme.spacing(1)
//   },
//   deviceIcon: {
//     color: theme.palette.icon
//   }
// }));

// const UsersByDevice = props => {
//   const { className, ...rest } = props;

//   const classes = useStyles();
//   const theme = useTheme();

//   const data = {
//     datasets: [
//       {
//         data: [63, 15, 22],
//         backgroundColor: [
//           theme.palette.primary.main,
//           theme.palette.error.main,
//           theme.palette.warning.main
//         ],
//         borderWidth: 8,
//         borderColor: theme.palette.white,
//         hoverBorderColor: theme.palette.white
//       }
//     ],
//     labels: ['Desktop', 'Tablet', 'Mobile']
//   };

//   const options = {
//     legend: {
//       display: false
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: false,
//     cutoutPercentage: 80,
//     layout: { padding: 0 },
//     tooltips: {
//       enabled: true,
//       mode: 'index',
//       intersect: false,
//       borderWidth: 1,
//       borderColor: theme.palette.divider,
//       backgroundColor: theme.palette.white,
//       titleFontColor: theme.palette.text.primary,
//       bodyFontColor: theme.palette.text.secondary,
//       footerFontColor: theme.palette.text.secondary
//     }
//   };

//   const devices = [
//     {
//       title: 'Desktop',
//       value: '63',
//       icon: <LaptopMacIcon />,
//       color: theme.palette.primary.main
//     },
//     {
//       title: 'Tablet',
//       value: '15',
//       icon: <TabletMacIcon />,
//       color: theme.palette.error.main
//     },
//     {
//       title: 'Mobile',
//       value: '23',
//       icon: <PhoneIphoneIcon />,
//       color: theme.palette.warning.main
//     }
//   ];

//   return (
//     <Card
//       {...rest}
//       className={clsx(classes.root, className)}
//     >
//       <CardHeader
//         action={
//           <IconButton size="small">
//             <RefreshIcon />
//           </IconButton>
//         }
//         title="Users By Device"
//       />
//       <Divider />
//       <CardContent>
//         <div className={classes.chartContainer}>
//           <Doughnut
//             data={data}
//             options={options}
//           />
//         </div>
//         <div className={classes.stats}>
//           {devices.map(device => (
//             <div
//               className={classes.device}
//               key={device.title}
//             >
//               <span className={classes.deviceIcon}>{device.icon}</span>
//               <Typography variant="body1">{device.title}</Typography>
//               <Typography
//                 style={{ color: device.color }}
//                 variant="h2"
//               >
//                 {device.value}%
//               </Typography>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// UsersByDevice.propTypes = {
//   className: PropTypes.string
// };

// export default UsersByDevice;
