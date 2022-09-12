import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
// @ts-ignore
import * as d3 from "d3";


const margin = { top: 40, right: 150, bottom: 60, left: 100 },
  width = 700 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

@Component({
  selector: 'bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit {
  xMax: number = 0;
  yMax: number = 0;
  dataset: any = [];
  svg: any;
  colors: string[] = [];
  constructor() {

  }


  ngOnInit(): void {

  }

  public setData(x: number, y: number, data: any) {
    this.xMax = x;
    this.yMax = y;
    this.dataset = data;
    this.createChart();
  }

  createChart() {
    this.svg = d3
      .select("#viz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // Add X axis
    const x = d3
      .scaleLinear()
      .domain([0, this.xMax + 10])
      .range([0, width]);
    this.svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x).ticks(10))
      .append("text")
      .attr("fill", "black")//set the fill here
      .attr("transform", "translate(120, 40)")
      .text("Head Count");

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([0, this.yMax + 10])
      .range([height, 0]);
    this.svg.append("g").call(d3.axisLeft(y).ticks(10))
      .append('g')
      .attr('transform', "translate(-50, " + height / 2 + ")")
      .append('text')
      .attr("fill", "black")//set the fill here
      .attr('transform', 'rotate(-90)')
      .text("Salary");

    // Add bubbles
    let element = this.svg
      .append("g")
      .selectAll("bubble")
      .data(this.dataset)

    let ele = element.enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d: any) => "translate(" + x(d.headcount) + "," + y(d.salary) + ")")

    let color: [] = this.getColors(this.dataset.length)
    console.log(color);
    ele.append("circle")
      .attr("r", (d: any) => d.compratio / 4)
      .style("fill", (d: any) => "hsl(" + color.pop() + ", 95%, 50%)")


    ele.append("text")
      .style("text-anchor", "middle")
      .style('font-size', '8px')
      .style('color', 'black')
      .text((d: any) => d.title);
  }


  getColors(lngth: number) {
    let arr: any = [];
    do {
      let ran = this.generateColor();
      arr = arr.indexOf(ran) > -1 ? arr : arr.concat(ran);
    } while (arr.length < lngth)

    return arr;
  }

  generateColor(): number {
    return Math.floor(Math.random() * 360);
  }



}
