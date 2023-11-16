"use client";
import TitleBar from "@/components/TitleBar/TitleBar";
import Layout from "@/layout";
import formatCurrency from "@/utils/FormatCurrency";
import React from "react";
import "./page.scss";
import { AiOutlineCloudDownload } from "react-icons/ai";
import DateSelect from "@/components/DateSelect/DateSelect";
import BarChart from "@/components/BarChart/BarChart";
import GrowthBarChart from "@/components/GrowthChart/GrowthChart";
import Data from "@/data/Data.json";

export default function DashboardHome() {
  const recentChart = Data.adminPage.recentCustomers;
  return (
    <Layout active="dashboard">
      <TitleBar />

      <div className="admin_analytics">
        <div>
          total balance
          <span>
            <h4>{formatCurrency(12426000)}</h4>
            <p>
              +36% <i className="bx bx-up-arrow-alt" />
            </p>
          </span>
        </div>

        <div>
          total sales
          <span>
            <h4>{formatCurrency(12426000)}</h4>
            <p>
              +36% <i className="bx bx-up-arrow-alt" />
            </p>
          </span>
        </div>

        <div>
          number of products
          <span>
            <h4>500</h4>
          </span>
        </div>

        <div>
          total profit
          <span>
            <h4>{formatCurrency(12426000)}</h4>
          </span>
        </div>
      </div>

      <div className="analytics_charts">
        <div className="sales_orders_chart">
          <div className="sales_summary">
            <div className="sales_summary_title">
              <h5>Sales Summary</h5>
              <button>
                <p>Download report</p>{" "}
                <AiOutlineCloudDownload className="download" />
              </button>
            </div>

            <div className="sales_summary_calender">
              <div className="date_picker">
                <p>Showing for:</p>
                <DateSelect />
              </div>
              <div className="chart_key">
                <span>
                  <div className="art_key" /> Art
                </span>
                <span>
                  <div className="fashion_key" /> Fashion
                </span>
              </div>
            </div>

            <div className="sales_summary_chart">
              <BarChart />
            </div>
          </div>

          <div className="recent_order">
            <h2>Recent Orders</h2>
            <table>
              <thead>
                <tr className="header_row">
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Order ID</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Total Order</th>
                  <th>Total Amount</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td className="orderID">#BM9708</td>
                  <td className="product_order">
                    <img src="/Admin/product-pic.png" alt="product" />
                    <p>Bean Bag Chair</p>
                  </td>
                  <td className="Price">456</td>
                  <td className="TotalOrder">456</td>
                  <td className="TotalAmount">{formatCurrency(2906625)}</td>
                  <td>
                    <i className="bx bx-dots-horizontal-rounded" />
                  </td>
                </tr>

                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td className="orderID">#BM9708</td>
                  <td className="product_order">
                    <img src="/Admin/product-pic.png" alt="product" />
                    <p>Bean Bag Chair</p>
                  </td>
                  <td className="Price">456</td>
                  <td className="TotalOrder">456</td>
                  <td className="TotalAmount">{formatCurrency(2906625)}</td>
                  <td>
                    <i className="bx bx-dots-horizontal-rounded" />
                  </td>
                </tr>

                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td className="orderID">#BM9708</td>
                  <td className="product_order">
                    <img src="/Admin/product-pic.png" alt="product" />
                    <p>Bean Bag Chair</p>
                  </td>
                  <td className="Price">456</td>
                  <td className="TotalOrder">456</td>
                  <td className="TotalAmount">{formatCurrency(2906625)}</td>
                  <td>
                    <i className="bx bx-dots-horizontal-rounded" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="customers_chart">
          <div className="total_customer">
            <div className="total_customer_top">
              <div className="total_detail">
                <img
                  src="/Admin/dashboard-detail-icon.png"
                  alt="dashboard-detail-icon"
                />
              </div>

              <div className="customer_count">
                <p>Total Customer</p>
                <h3>10k</h3>
                <small>Last update yesterday</small>
              </div>

              <div className="percentage_growth">
                <p className="growth">
                  <span>
                    <i className="bx bx-up-arrow-alt" />
                    53%
                  </span>{" "}
                  Growth
                </p>
                <span className="growth_tag">This week</span>
              </div>
            </div>

            <div className="total_customer_bottom">
              <GrowthBarChart />
            </div>
          </div>

          <div className="recent_customers">
            <h2>Recent Customers</h2>
            <p>Lorem ipsum dolor sit ametis.</p>

            <div className="recent_customers_chart">
              {recentChart.map((data) => (
                <div className="customers_chart_data" key={data.id}>
                  <div className="img_email_name">
                    <img src={data.image} alt={data.name} />

                    <div>
                      <h4>{data.name}</h4>
                      <p>{data.email}</p>
                    </div>
                  </div>

                  <div className="price_location">
                    <h4>{data.price}</h4>
                    <p>{data.location}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="see_all_customer">
              <p>See All customers</p> <i className="bx bx-chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
