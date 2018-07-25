import React, { Component } from "react";
import "./transaction.css";
import axios from "axios";
import moment from "moment";

const API_URL = "http://localhost:3001/api";

const ITEMS_PER_PAGE = 8

class TransactionTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      page: 1
    };
  }

  componentWillMount() {
    axios
      .get(API_URL)
      .then(response => {
        const transactions = response.data;

        // We are flattening out response and adding a date and store to each item
        const items = transactions.reduce((acc, tx) => {
            return acc.concat(tx.items.map(item => ({
                _id: item._id,
                item: item.name,
                group: item.category,
                price: item.cost,
                date: tx.date,
                store: tx.store
            })))
        }, [])

        this.setState({
          items
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { page, items } = this.state
    return (        
      <div className="row">
        <div className="row">
          <h2>Recent Items</h2>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Items</th>
                <th>Group</th>
                <th>Price</th>
                <th>Date</th>
                <th>Store</th>
              </tr>
            </thead>
            <tbody>
              {items.slice((page - 1) * ITEMS_PER_PAGE, (page - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE).map(item => (
                <tr key={item._id}>
                  <td>{item.item}</td>
                  <td>{item.group}</td>
                  <td>{item.price}</td>
                  <td>{moment(item.date).format("L")}</td>
                  <td>{item.store}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TransactionTable;
