import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import {BaseChartDirective} from 'ng2-charts/ng2-charts';

import {INgxMyDpOptions} from 'ngx-mydatepicker';                        
import {IMyDpOptions,IMyDateModel, IMyDate, IMyOptions, IMyInputFieldChanged} from 'mydatepicker';
import * as moment from 'moment-timezone';

@Component({
  templateUrl: 'analytics.component.html'
})

export class AnalyticsComponent implements OnInit {

  constructor(private dataService: DataService){
  }
  
  avgLight:string ;
  avgTemp:string;
  avgHumi:string;
  avgCO2:string;
  

  avgLightDayArr = [];
  maxLightDayArr = [];
  minLightDayArr = [];

  avgCO2DayArr = [];
  maxCO2DayArr = [];
  minCO2DayArr = [];
  
  avgHumiDayArr= [];
  maxHumiDayArr= [];
  minHumiDayArr= [];

  avgTempDayArr= [];
  maxTempDayArr= [];
  minTempDayArr= [];
  

  pieLightArr = [];
  pieTempArr = [];
  pieHumiArr = [];
  pieCO2Arr = [];

  pieLightDevice = [];
  pieTempDevice = [];
  pieHumiDevice = [];
  pieCO2Device = [];
  
  timeHumiArr = [];
  timeCO2Arr = [];
  timeLightArr = [];

  num=7;
  currentDate =  new Date();
  displayDate = new Date();
  displyToday;
  displayArea;

  startDate;
  endDate;
  today;
  counterArr=[];
  now = Date.now();

  currentLocation= "IIT1-6-59";
  currentSession = "All Sessions";

  public brandPrimary = '#20a8d8';
  public brandSuccess = '#4dbd74';
  public brandInfo = '#63c2de';
  public brandWarning = '#f8cb00';
  public brandDanger = '#f86c6b';

  faceArr = [];
  tempArr = [];
  tempDevice = '2102CB';
  tempDate = '2017-09-12';
  timeFaceArr = [];
  timeTempArr = [];
  showTempTime = [];
  showFaceTime = [];
  rawTimeTemp;
  rawTimeFace;
  dateSelected ;
  displaydata;
  newArr=[];
  startSessionFace;
  endSessionFace;
  startSessionTemp;
  endSessionTemp;
  

  tempDataArr=[];
  faceDataArr=[];
  ngOnInit() {
   this.setCurrent();
  }
//device id
  GetDeviceID(room:string){
    this.currentLocation = room;
    if(room == "IIT1-6-59"){
      this.tempDevice = '2102CB';
    } else if (room == "IIT1-6-60"){
      this.tempDevice = '210043';
    } else if (room == "IIT1-6-61"){
      this.tempDevice = '21034E';
    } else if (room == "IIT3-7-50/2"){
      this.tempDevice = '210285';
    } else if (room == "IIT3-7-46"){
      this.tempDevice = '2100AB';
    } else if (room == "IIT3-8-32"){
      this.tempDevice = '1CB001';
    } else if (room == "IoTLab"){
      this.tempDevice = '1CB00D';
    } else if (room == "BigData"){
      this.tempDevice = '1CB049';
    }
    else if (room == 'All Locations'){
      this.tempDevice = '2102CB" or Device_ID = "210088" or Device_ID = "20FD79" or Device_ID = "2101E9" or Device_ID = "2102AC" or Device_ID = "1CB0C2" or Device_ID = "1CB021" or Device_ID = "1CB0D4 ';  
    }
    this.retrieveTemp();
    
  }
  GetTime(session:string){
    this.currentSession = session;
    if (session == "Morning 8-10"){
      this.startSessionFace='08';
      this.endSessionFace='11';
      this.startSessionTemp='07';
      this.endSessionTemp='12';
    } else if (session == "Morning 10-12"){
      this.startSessionFace='10';
      this.endSessionFace='13';
      this.startSessionTemp='09';
      this.endSessionTemp='14';
    } else if (session == "Afternoon 12-14"){
      this.startSessionFace='12';
      this.endSessionFace='15';
      this.startSessionTemp='11';
      this.endSessionTemp='16';
    } else if (session == "Afternoon 14-16"){
      this.startSessionFace='14';
      this.endSessionFace='17';
      this.startSessionTemp='13';
      this.endSessionTemp='18';
    } else if (session == "Afternoon 16-18"){
      this.startSessionFace='16';
      this.endSessionFace='19';
      this.startSessionTemp='15';
      this.endSessionTemp='20';
    } 
    this.retrieveTempSession();
    this.retrieveFaceSession();
  }
  // GetRoom(device:string){
    
  //   if(device == "2102CB" || device =="20FE30"){
  //     this.tempLabels.push('IIT1-6-59');
  //     this.pieCO2Device.push('IIT1-6-59') ;
  //     this.pieLightDevice.push('IIT1-6-59') ;
  //   } else if (device== "210043" || device =="210088" ){
  //     this.tempLabels.push( 'IIT1-6-60');
  //     this.pieCO2Device.push('IIT1-6-60') ;
  //     this.pieLightDevice.push('IIT1-6-60') ;
  //   } else if (device == "21034E" || device =="20FD79"){
  //     this.tempLabels.push('IIT1-6-61');
  //     this.pieCO2Device.push('IIT1-6-61') ;
  //     this.pieLightDevice.push('IIT1-6-61') ;
  //   } else if (device == "210285" || device =="2102AC"){
  //     this.tempLabels.push('IIT3-7-50/2');
  //     this.pieCO2Device.push('IIT3-7-50/2') ;
  //     this.pieLightDevice.push('IIT3-7-50/2') ;
  //   } else if (device == "2100AB"|| device =="2101E9"){
  //     this.tempLabels.push('IIT3-7-46');
  //     this.pieCO2Device.push('IIT3-7-46') ;
  //     this.pieLightDevice.push('IIT3-7-46') ;
  //   } else if (device == "1CB001" || device =="1CB0C2"){
  //     this.tempLabels.push('IIT3-8-32');
  //     this.pieCO2Device.push('IIT3-8-32') ;
  //     this.pieLightDevice.push('IIT3-8-32') ;
  //   } else if (device == "1CB00D" || device =="1CB0D4"){
  //     this.tempLabels.push('IoTLab') ;
  //     this.pieCO2Device.push('IoTLab') ;
  //     this.pieLightDevice.push('IoTLab') ;
  //   } else if (device == "1CB049"|| device =="1CB021"){
  //     this.tempLabels.push('BigData');
  //     this.pieCO2Device.push('BigData') ;
  //     this.pieLightDevice.push('BigData') ;
  //   }
    
  // }

//call face data
//date picker format  
  private myDatePickerOptions: INgxMyDpOptions  = {
        dateFormat: 'yyyy-mm-dd',    
  };
  
//event listener for change in datepicker
  onDateChanged(event: IMyDateModel){

    this.dateSelected = event.formatted;
    //console.log("Selected Date: " + this.dateSelected);
    this.retrieveFace();
    this.retrieveTemp();

  }
  setCurrent(){
    var currentDate =  new Date();
    var time = moment.tz(currentDate, "Asia/singapore");
    var Singapore = time.clone().tz("Asia/Singapore");
    var formattedTime = Singapore.format("YYYY-MM-DD");
    this.dateSelected = formattedTime;
    this.retrieveFace();
    this.retrieveTemp();

  }
  retrieveFace(){
      //this.dateSelected;
      this.tempDataArr=[];
      this.faceDataArr=[];
      // this.faceArr=[];
      // this.timeFaceArr=[];
      this.dataService.getFaceData(this.dateSelected).map(response => {
      for(var item of response){
      //this.faceArr.push(parseFloat(item.percentage));
      // console.log(item.percentage);
      // console.log("facearr:" + this.faceArr);
      var rawTimeFace = item.time;
      //this.showFaceTime.push(rawTimeFace);
      var time = moment.tz(rawTimeFace, "Asia/singapore");
      //this.timeFaceArr.push(time);
      console.log("timearrface:"+rawTimeFace)

       this.faceDataArr.push({
        x:rawTimeFace,
        y:parseFloat(item.percentage)
      })
    }
    }).subscribe(()=>{
      this.refresh();
    });
  }
  retrieveFaceSession(){
        
        this.tempDataArr=[];
        this.faceDataArr=[];
        // this.tempArr=[];
        // this.faceArr=[];
        // this.timeTempArr=[];
        // this.timeFaceArr=[];
        this.dataService.getFaceSession(this.dateSelected,this.startSessionFace,this.endSessionFace).map(response => {
        for(var item of response){
       // this.tempArr.push(parseFloat(item.Temperature));
       // console.log("temparr:"+this.tempArr)
        var rawTimeFace = item.time;
        this.displaydata =  this.rawTimeFace ;
        //this.showTempTime.push(rawTimeTemp);
        var time = moment.tz(rawTimeFace, "Asia/singapore");
        //this.timeTempArr.push(time);
        this.faceDataArr.push({
        x:rawTimeFace ,
        y:parseFloat(item.percentage)
      })
        
        }
      }).subscribe(()=>{
        this.refresh();
      });
  }
  retrieveTemp(){
        this.tempDataArr=[];
        this.faceDataArr=[];
        //this.dateSelected;
        // this.tempArr=[];
        // this.faceArr=[];
        // this.timeTempArr=[];
        // this.timeFaceArr=[];
        this.dataService.getTempHumiData(this.tempDevice,this.dateSelected).map(response => {
        for(var item of response){
        //this.tempArr.push(parseFloat(item.Temperature));
        //console.log("temparr:"+this.tempArr)
        var rawTimeTemp = item.Date;
        this.displaydata =  this.rawTimeTemp ;
        //this.showTempTime.push(rawTimeTemp);
        var time = moment.tz(rawTimeTemp, "Asia/singapore");
        //this.timeTempArr.push(time);
        //console.log("timearrtemp:"+this.rawTimeTemp)
        this.tempDataArr.push({
        x:rawTimeTemp ,
        y:parseFloat(item.Temperature)
      })
        }
      }).subscribe(()=>{
        this.refresh();
      });
  }
  retrieveTempSession(){
        
        this.tempDataArr=[];
        this.faceDataArr=[];
        // this.tempArr=[];
        // this.faceArr=[];
        // this.timeTempArr=[];
        // this.timeFaceArr=[];
        this.dataService.getTempSession(this.tempDevice,this.dateSelected,this.startSessionTemp,this.endSessionTemp).map(response => {
        for(var item of response){
       // this.tempArr.push(parseFloat(item.Temperature));
       // console.log("temparr:"+this.tempArr)
        var rawTimeTemp = item.Date;
        this.displaydata =  this.rawTimeTemp ;
        //this.showTempTime.push(rawTimeTemp);
        var time = moment.tz(rawTimeTemp, "Asia/singapore");
        //this.timeTempArr.push(time);
        this.tempDataArr.push({
        x:rawTimeTemp ,
        y:parseFloat(item.Temperature)
      })
        
        }
      }).subscribe(()=>{
        this.refresh();
      });
  }
  
  refresh(){
       this.faceData = [
            {
            label: 'Temperature (℃)',
            data: this.tempDataArr,
            yAxisID: 'left-y-axis',
          },
            {
            label: 'Happiness (%)',
            data: this.faceDataArr,
            yAxisID: 'right-y-axis',
          },
        ]
        setTimeout(() => {
        //this.faceLabels=this.timeTempArr;
        //this.faceLabels=this.timeFaceArr;
      });
  }

 

 
//call humidity data  
  // humiCall(){
  //   this.pieHumiArr = [];
  //   this.pieHumiDevice = [];
  //   this.retrievePieHumi();
  // }
  // retrievePieHumi(){
  //     this.dataService.getHumiPie(this.startDate,this.endDate).map(response => {
  //       for(var item of response){
  //       this.pieHumiArr.push(item.average);
  //       //this.GetRoom(item.device);
  //       }
  //     }).subscribe(()=>{
  //     });
  // } 
  

//call CO2 data  
  // CO2Call(){
  //   this.pieCO2Arr = [];
  //   this.pieCO2Device = [];
  //   this.retrievePieCO2();
  // }
  // retrievePieCO2(){
  //     this.dataService.getCO2Pie(this.startDate,this.endDate).map(response => {
  //       for(var item of response){
  //       this.pieCO2Arr.push(item.average);
  //       //this.GetRoom(item.device);        
  //      }
  //     }).subscribe(()=>{
  //     });
  // }


// dropdown buttons
  public status: { isopen } = { isopen: false };
  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
  

// convert Hex to RGBA
  public convertHex(hex: string, opacity: number) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
    return rgba;
  }

// events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

// colours
  public lineChart1Colours: Array<any> = [
    { // grey
      backgroundColor: this.brandPrimary,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Colours: Array<any> = [
    { // grey
      backgroundColor: this.brandInfo,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: this.brandWarning,
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart4Colours: Array<any> = [
    {
      backgroundColor: this.brandDanger,
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];

// mainChart

 
  // public mainChartData1: Array<any> =[{
  //     label: "Values",
  //     data: []

  // }];
  public avgHumiData: Array<number>=[];
  mainChartData2 =[];
  mainChartData3= [];
  //mainChartData4 = [];
  public test =['1','2','3','4','5'];
  public test2 =['10','20','30','40','50'];
  
  
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: this.convertHex(this.brandInfo, 10),
      borderColor: this.brandInfo,
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: this.brandSuccess,
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = 'line';

//light 
  private LightData = [
    {
      label: "",
      data: []
    },
    {
      label: "",
      data: []
    },
    {
      label: "",
      data: []
    },
  ];
  public LightLabels: Array<any> = [];
//temp
  public TempData: Array<any> = [
    {
      label: "",
      data: []
    },
    {
      label: "",
      data: []
    },
    {
      label: "",
      data: []
    },
  ];
  public TempLabels: Array<any> = [];
//humi
  private HumiData: Array<any> = [
    {
      label: "",
      data: []
    },
    {
      label: "",
      data: []
    },
    {
      label: "",
      data: []
    },
  ];
  public HumiLabels: Array<any> = [];
//CO2
  private CO2Data = [
    {
      label: "",
      data: []
    },
    {
      label: "",
      data: []
    },
    {
      label: "",
      data: []
    },
  ];
  public CO2Labels: Array<any> = [];

//transparent options for card
  public options ={
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          //fontSize: 1,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        // ticks: {
        //   //display: false,
        //   min: 40 - 5,
        //   max: 84 + 5,
        // }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 2,
        hitRadius: 5,
        hoverRadius: 2,
      },
    },
    legend: {
      display: false
    }
  };
//objects used by the chart to display data
  
 
//colors
  public lightColour = [
    {
      backgroundColor: 'rgba(250, 204, 0, 0.30)',  
      borderColor: this.brandWarning,
      fill: true,
      radius: 2,
      borderWidth: 2
    },
    {
      backgroundColor: 'rgb(187,75,57)',  
      borderColor: 'rgb(187,75,57)',
      fill: false,
      radius: 2,
      borderWidth: 2
    },
    {
      backgroundColor: 'rgb(77,189,116)',  
      borderColor: 'rgb(77,189,116)',
      fill: false,
      radius: 2,
      borderWidth: 2
    },
  ]; 
  public humiColour = [
    {
      backgroundColor: 'rgba(32, 168, 217, 0.40)',  
      borderColor: this.brandPrimary,
      fill: true,
      radius: 2,
      borderWidth: 2
    },
    {
      backgroundColor: 'rgb(187,75,57)',  
      borderColor: 'rgb(187,75,57)',
      fill: false,
      radius: 2,
      borderWidth: 2
    },
    {
      backgroundColor: 'rgb(77,189,116)',  
      borderColor: 'rgb(77,189,116)',
      fill: false,
      radius: 2,
      borderWidth: 2
    },
  ];
  public tempColour = [
    {
      backgroundColor: 'rgba(99, 193, 222, 0.18)',  
      borderColor: this.brandInfo,
      fill: true,
      radius: 2,
      borderWidth: 2
    },
    {
      backgroundColor: 'rgb(187,75,57)',  
      borderColor: 'rgb(187,75,57)',
      fill: false,
      radius: 2,
      borderWidth: 2
    },
    {
      backgroundColor: 'rgb(77,189,116)',  
      borderColor: 'rgb(77,189,116)',
      fill: false,
      radius: 2,
      borderWidth: 2
    },
  ];
  public co2Colour = [
    {
      backgroundColor: 'rgba(248, 109, 109, 0.30)',  
      borderColor: this.brandDanger,
      fill: true,
      radius: 2,
      borderWidth: 2
    },
    {
      backgroundColor: 'rgb(187,75,57)',  
      borderColor: 'rgb(187,75,57)',
      fill: false,
      radius: 2,
      borderWidth: 2
    },
    {
      backgroundColor: 'rgb(77,189,116)',  
      borderColor: 'rgb(77,189,116)',
      fill: false,
      radius: 2,
      borderWidth: 2
    },
];
//face
private faceData = [
    {
      label: 'temperature:',
      data: [],
      yAxisID: 'left-y-axis',
      //xAxisID: "bottom-x-axis"
      //labels:[],

    },
    {
      label: 'happiness:',
      data: [],
      yAxisID: 'right-y-axis',
     // xAxisID: "top-x-axis"
      //labels:[],
    },
];
public faceLabels: Array<any> = [];
public faceColour = [
      {
        backgroundColor: 'rgba(32, 168, 217, 0.40)',  
        borderColor: this.brandPrimary,
        fill: true,
        radius: 2,
        borderWidth: 2
      },
      {
        backgroundColor: 'rgb(187,75,57)',  
        borderColor: 'rgb(187,75,57)',
        fill: false,
        radius: 2,
        borderWidth: 2
      },
      {
        backgroundColor: 'rgb(77,189,116)',  
        borderColor: 'rgb(77,189,116)',
        fill: false,
        radius: 2,
        borderWidth: 2
      },
    ];
private optionsLineChart = {
      animation: false,
      responsive: true,
      maintainAspectRatio:true,
      scales: {
        // xAxes: [{
        //     display: true,
        //     type: "time",
        // time: {
        //         unit: "hour",
        //         tooltipFormat: 'YYYY-MM-DD hh:mm A'
        //     },
        //     scaleLabel: {
        //         display: true,
        //         labelString: 'Time'
        //     }
        // },],
        xAxes: [{
                position: "bottom",
                type: "time", // gives us a date axis
                //id: "bottom-x-axis",
                // time: {
                // unit: "hour",
                // tooltipFormat: 'YYYY-MM-DD hh:mm A'
                // },
                // scaleLabel: {
                // display: true,
                // labelString: 'Time'
                // }
            // }, {
            //     position: "top",
            //     type: "time",
            //     id: "top-x-axis",
            //     // time: {
            //     // unit: "hour",
            //     // tooltipFormat: 'YYYY-MM-DD hh:mm A'
            //     // },
            //     // scaleLabel: {
            //     // display: true,
            //     // labelString: 'Time'
            //     // }
            // }],
        }],
        yAxes: [{
          // ticks: {
          // display: true,
          // labelString: 'Temperature (℃)'
          // },
          id: 'left-y-axis',
          type: 'linear',
          position: 'left',
        },
        {
          id: 'right-y-axis',
          type: 'linear',
          position: 'right'
        }]
      }
      
};

};
  
  
  // private optionsLineChart = {
  //       animation: false,
  //       responsive: true,
  //       maintainAspectRatio:true,
  //       scales: {
  //         xAxes: [{
  //             display: true,
  //             type: "time",
  //             time: {
  //                 unit: "hour",
  //                 tooltipFormat: 'YYYY-MM-DD hh:mm A'
  //             },
  //             scaleLabel: {
  //                 display: false,
  //                 labelString: 'Time'
  //             }
  //         },],
  //         yAxes: [{
  //           ticks: {
  //             beginAtZero: false
  //           },
            

  //         }]
  //       }
  //   };



