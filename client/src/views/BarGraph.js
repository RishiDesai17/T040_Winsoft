import React from 'react'
import {Bar} from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

function BarGraph(props) {
  const data = {
    labels: props.edges.map(edge => edge.location),
    datasets: [
      {
        label: 'Hops',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: props.edges.map(edge => edge.total_edges)
      }
    ]
  };
  return (
    <React.Fragment>
      <div style={{overflowX:'auto',margin:'20px 0px'}}>
        
        <Bar
          data={data}
          width={500}
          height={500}
          options={{
            plugins: {
              datalabels: {
                anchor: 'end',
                align: 'top',
                display: true,
                color: 'black'
              }
            },
            title: {
              display: true,
              text: 'Minimum number of hops to Enemy Camps'
            },
            animation: {
              duration:3000,
              easing:'easeInBounce'
            },
            scales: {
              xAxes: [{
                gridLines:{
                  display:false
                },
                ticks: {
                  display:true,
                  beginAtZero:true
                }
              }],
              yAxes: [{
                gridLines:{
                  display:false
                },
                ticks:{
                  display:false,
                  beginAtZero:true
                }
              }]
            },
            legend:{
              display:false
            }
          }}
        />
      </div>
    </React.Fragment>
  )
}

export default BarGraph
