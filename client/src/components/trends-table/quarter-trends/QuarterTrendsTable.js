// import React, { Component } from "react";
// import "./trends.css";
// import axios from "axios";

// const API_URL = "http://localhost:3001/api/total";
// class QuarterTrendsTable extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       items: [],
//       page: 1
//     };
//   }

//   componentWillMount() {
//     axios
//       .get(API_URL)
//       .then(response => {
//         const transactions = response.data;

//         // We are flattening out response and adding a date and store to each item
//         const items = transactions.reduce((acc, tx) => {
//             return acc.concat(tx.items.map(item => ({
//                 _id: item._id,
//                 item: item.name,
//                 quantity: item.quantity,
//                 group: item.category,
//                 price: item.cost,
//                 date: tx.date,
//                 store: tx.store
//             })))
//         }, [])

//         this.setState({
//             items
//           });
//         })
//         .catch(err => {
//           console.log(err);
//         });
//   }

//   render() {
//     return (
//       <div>
//           <ul className="btn-container">
//             <li className="btn">
//               <a href="/trends">Overview</a>
//             </li>
//             <li className="btn">
//               <a href="/trends/daily">Date</a>
//             </li>
//             <li className="btn">
//               <a href="/trends/monthly">Store</a>
//             </li>
//             {/* <li className="btn">
//               <a href="#!">Total</a>
//             </li> */}
//           </ul>
//           <div>
//             <h3> Transactions by Total Spent </h3>
//           </div>
//           <table>
//             <thead>
//               <tr>
//                 <th> Items </th>
//                 <th> Quantity </th>
//                 <th> Price </th>
//                 <th> Total Spent </th>
//               </tr>
//             </thead>
//             <tbody>
//                 <tr key={items._id}>
//                   <td>{item.item}</td>
//                   <td>{item.quantity}</td>
//                   <td>{item.price}</td>
//                   <td>{item.price*item.quantity}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//     );
//   }
// }

// export default QuarterTrendsTable;
