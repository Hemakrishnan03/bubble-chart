import { Component, ViewChild } from '@angular/core';
import { ApiService } from './api/api.service';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ApiService]
})
export class AppComponent {
  xMax = 0;
  yMax = 0;
  dataList=[];
  @ViewChild(BubbleChartComponent)
  bubbleChart!: BubbleChartComponent;
  constructor(private api:ApiService){
    this.getChartData();
  }
  getChartData(){
    this.api.get('https://mocki.io/v1/18936d28-2f79-4840-b146-5622e8ad1e77').subscribe(
      result=> {
        console.log("result",result);
        this.dataList = result;
        this.xMax = Math.max(...result.map((o:any) => o.headcount));
        this.yMax = Math.max(...result.map((o:any) => o.salary));
        this.bubbleChart.setData(this.xMax,this.yMax,this.dataList);
      }
    )
  }
}
