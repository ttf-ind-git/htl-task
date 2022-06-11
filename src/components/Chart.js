import React from "react";
import { Row, Col } from "react-bootstrap";
import Filter from './Filter';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

ChartJS.register(ChartDataLabels);

const state_bar = {
  labels: [],
  datasets: [
    {
      label: "Bar Chart",
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(59, 162, 235, 0.2)",
      ],
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [],
    },
  ],
};

const state_pie = {
  labels: [],
  datasets: [
    {
      label: "Pie Chart",
      backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00", "#00A6B4", "#6800B4", "#880867"],
      hoverBackgroundColor: [
        "#501800",
        "#4B5000",
        "#175000",
        "#003350",
        "#35014F",
      ],
      data: [],
    },
  ],
};

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: {},
      data: [],
      labels: [],
    };
  }

  componentDidMount() {

    const getCars = async () => {
      const response = await fetch(
        "https://62a2e6845bd3609cee5ce6e4.mockapi.io/cars"
      );

      const data = await response.json();
      // console.log("data:",data)
      this.setState({ cars: data });

      // Group by date
      const group = this.group_by_name(data)


      this.setState({ labels: Object.keys(group) });
      this.setState({ data: Object.values(group) });

    };

    getCars();
  }

    group_by_name = (filteredCars) => {

        var group_by_car = filteredCars.reduce((p, c) => {
            var name = c.name;
            if (!p.hasOwnProperty(name)) {
              p[name] = 0;
            }
            p[name]++;
            return p;
        }, {});

        return group_by_car;

    }

   FilterHandle = (start_date, end_date) => {
         
    if(!start_date || !end_date){
      alert("Please select dates..");
      return false;
    }

    if(new Date(start_date) > new Date(end_date)){
      alert("End date must be greater than start date..");
      return false;
    }

    const filteredCars = this.state.cars.filter((item) => {
      return new Date(item.createdAt) >= new Date(start_date) && new Date(item.createdAt) <= new Date(end_date)
    });

    console.log(filteredCars.length)

    if(filteredCars.length <= 0){
        alert("No data found..");
        return false;
    }

    const group = this.group_by_name(filteredCars)

    this.setState({ labels: Object.keys(group) });
    this.setState({ data: Object.values(group) });

  }

  render() {

    state_pie.labels = this.state.labels;

    state_pie.datasets[0].data[0] = []
    state_pie.datasets[0].data[1] = []
    state_pie.datasets[0].data[2] = []
    state_pie.datasets[0].data[3] = []
    state_pie.datasets[0].data[4] = []
    
    this.state.data.map((item, index) => {
      state_pie.datasets[0].data[index] = item;
    });

    state_bar.labels = this.state.labels;

    this.state.data.map((item, index) => {
      state_bar.datasets[0].data[index] = item;
    });

    // state_pie.labels = this.state.labels
    // state_pie.datasets[0].data = this.state.data

    //  console.log(this.state.cars)
    // console.log(this.state.labels)

    // console.log('first')
    // console.log(state_pie);
    

    return (
      <div className="mt-50">
        <Row>
            <Filter FilterDate={this.FilterHandle} />
        </Row>
          
        <Row className="chart-row">
          <Col xs={4} className="pie-chart">
            <Pie
              data={state_pie}
              options={{
                title: {
                  display: true,
                  text: "",
                  fontSize: 30,
                },
                plugins: {
                    datalabels: {
                       display: true,
                       color: 'white'
                    }
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </Col>

          <Col xs={8} className="bar-chart">
            <Bar
              data={state_bar}
              options={{
                title: {
                  display: true,
                  text: "",
                  fontSize: 30,
                },
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
