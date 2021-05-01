import React, { useEffect, useState } from 'react'
import { CChart } from '@coreui/react-chartjs';
import { useSelector } from 'react-redux';
import './Chart.css'

function Charttest({selectedCountry,casesType}) {
    const [confirmCase,setconfirmCase]=useState([])
    const [label,setlabel]=useState([])
    const [recovered,setrecovered]=useState([]) 
    const [deaths,setdeaths]=useState([])

  const barGraph = useSelector((state) => state.data);
    useEffect(()=>{
        let bar=barGraph.filter(res=>res.Country_Region===selectedCountry)
        setconfirmCase(bar.map(res=>res.Confirmed))
        setlabel(bar.map(res=>res.Province_State))
        setrecovered(bar.map(res=>res.Recovered))
        setdeaths(bar.map(res=>res.Deaths))

        

    
    },[selectedCountry])
    
    return (
        <div className='chart'>
            <div className='chart_div' >
             <CChart className='chart_div' 
        type="bar"
        datasets={[
          {
            label: `Cases`,
            backgroundColor:casesType==='cases'?'rgb(204, 16, 52)':'rgba(204, 16, 52,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            tooltipLabelColor: 'rgba(179,181,198,1)',
            data:confirmCase
          },
          {
            label: `Recovered`,
            backgroundColor: casesType==='recovered'?'rgb(125, 215, 29)':'rgba(125, 215, 29,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            tooltipLabelColor: 'rgba(179,181,198,1)',
            data: recovered
          },
          {
            label: `Deaths`,
            backgroundColor:casesType==='deaths'? 'rgb(251, 68, 67)':'rgba(251, 68, 67,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            tooltipLabelColor: 'rgba(179,181,198,1)',
            data: deaths
          },
        
        ]}
        options={{
        //   aspectRatio: 2.3,
          tooltips: {
            enabled: true
          }
        }}
        labels={ label}
      />
      </div>
      
        </div>
    )
}

export default Charttest
