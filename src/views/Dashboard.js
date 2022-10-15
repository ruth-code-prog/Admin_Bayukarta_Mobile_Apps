/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import FIREBASE from '../config/FIREBASE'
import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";

function Dashboard() {
  return (
    <>
      <div className="content">
        <Row>
         
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
              <h3>Laporan Pasien Bayukarta Mobile</h3>
              <a href="https://datastudio.google.com/reporting/79c1277f-8ad9-483d-9121-9a298066134b" target="_blank" rel="noreferrer">
               <Button color="success">Klik di sini</Button>
              </a>
                <CardTitle tag="h5">Welcome to "Bayukarta Web Server Online"</CardTitle>
                <CardTitle tag="h5">(Backend Web Server)</CardTitle>
                <p className="card-category">24 Hours performance (pantau perilaku pengguna)</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboard24HoursPerformanceChart.data}
                  options={dashboard24HoursPerformanceChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
