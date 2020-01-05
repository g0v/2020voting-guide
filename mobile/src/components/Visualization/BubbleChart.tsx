import * as d3 from 'd3';
import { d3props } from './types'; 

class BubbleChart {
  containerEl: any;
  props: d3props;
  svg: any;
  html: any;

  constructor(containerEl: any, props: d3props, isMobile: boolean, history: any) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height, data } = props;
    
    // create svg and html element 
    this.svg = d3.select(containerEl).append('svg')
      .attr('width', width)
      .attr('height', height);
    
    this.html = d3.select(containerEl).append('div')
      .style('position', 'absolute')
      .style('left', 0)
      .style('right', 0)
      .style('margin-left', 'auto')
      .style('margin-right', 'auto');
                  
    this.updateDataBubbles(data, width, height, containerEl, isMobile, history);
  }

  updateDataBubbles = (data: Object, width: number, height: number, containerEl: any, isMobile: boolean, history: any) => {
    const padding = isMobile ? 0 : 40;
    const labelShift = (containerEl.offsetWidth - width)/2 + padding; // To set label in the center of bubble
    const addLabelColor = (party: string) => {
      switch (party) {
        case '中國國民黨': return '#000099';
        case '民主進步黨': return '#1B9431';
        case '台灣民眾黨': return '#0CB5B5';
        case '時代力量': return '#FBBE01';
        case '國會政黨聯盟': return '#E60012';
        case '新黨': return '#1C298B';
        case '台灣基進': return '#A73F24';
        case '綠黨': return '#73BE00';
        case '親民黨': return '#FF6310';
        case '台灣維新': return '#51448D';
        case '無黨團結聯盟': return '#C20F51';
        case '社會民主黨': return '#FF0088';
        case '台灣團結聯盟': return '#C69E6A';
        case '安定力量': return '#5E3190';
        case '一邊一國行動黨': return '#5BBDE0';
        case '喜樂島聯盟': return '#009E96';
        case '宗教聯盟': return '#EAD9A5';
        case '無黨籍': return '#212121';
        default: return '#AEAEAE';
      }
    }
    const addColor = (party: string) => {
      switch (party) {
        case '中國國民黨': return '#00009938';
        case '民主進步黨': return '#1B943138';
        case '台灣民眾黨': return '#0CB5B538';
        case '時代力量': return '#FBBE0138';
        case '國會政黨聯盟': return '#E6001238';
        case '新黨': return '#1C298B38';
        case '台灣基進': return '#A73F2438';
        case '綠黨': return '#73BE0038';
        case '親民黨': return '#FF631038';
        case '台灣維新': return '#51448D38';
        case '無黨團結聯盟': return '#C20F5138';
        case '社會民主黨': return '#FF008838';
        case '台灣團結聯盟': return '#C69E6A38';
        case '安定力量': return '#5E319038';
        case '一邊一國行動黨': return '#5BBDE038';
        case '喜樂島聯盟': return '#009E9638';
        case '宗教聯盟': return '#EAD9A538';
        case '無黨籍': return '#21212138';
        default: return '#AEAEAE38';
      }
    }

    // create data root 
    let root = d3.hierarchy(data, (d: any) => d.children)
      .sum((d: any) => d.value)
      .sort(function(a: any, b: any) { return b.value - a.value; }); // bigger bubble will in the center

    let pack = d3.pack().size([width, height]).padding(10);

    pack(root); // add x,y,r to each node

    let nodes = root.descendants().filter(d => !d.children); // filter out the outer bubble

    let bubbles = this.svg.selectAll('circle').data(nodes);
    let labels = this.html.selectAll('.bubble-label').data(nodes);

    // Update
    bubbles.transition()
      .duration(600)
      .attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')')
      .attr('r', (d: any) => d.r)
      .style('opacity', 1)
      .style('stroke', (d: any) => addColor(d.data.constituency))
      .style('stroke-width', isMobile ? '2px' : '5px')
      .style('fill', 'white')
      // .on('click', (d: any) => history.push(d.data.link));

    labels.transition()
      .duration(600)
      .style('height', (d: any) => 2 * d.r + 'px')
      .style('width', (d: any) => 2 * d.r + 'px')
      .style('left', (d: any) =>  d.x - d.r + labelShift + 'px') 
      .style('top', (d: any) =>  d.y - d.r + 'px')
      .style('opacity', 1)
      .text((d: any) => d.data.name)
      .style("color", (d: any) => addLabelColor(d.data.constituency));


    // Enter incoming elements
    bubbles.enter().append('circle')
    .attr('transform', (d: any) => 'translate(' + d.x + ',' + d.y + ')')
    .attr('r', 0)
    .style('stroke', (d: any) => addColor(d.data.constituency))
    .style('stroke-width', isMobile ? '2px' : '5px')

    labels.enter().append('div')
      .attr('class', 'bubble-label')
      .text((d: any) => d.data.name)
      .style('position', 'absolute')
      .style('height', (d: any) => 2 * d.r + 'px')
      .style('width', (d: any) => 2 * d.r + 'px')
      .style('left', (d: any) =>  d.x - d.r + labelShift + 'px')
      .style('top', (d: any) =>  d.y - d.r + 'px')
      .style('opacity', 1)
      .style("color", (d: any) => addLabelColor(d.data.constituency))
      .on('click', (d: any) => window.open(window.location.origin + d.data.link));


    // Exit exiting elements
    bubbles.exit()
      .transition()
      .duration(600)
      .attr('r', 0)
      .remove();

    labels.exit()
      .transition()
      .duration(600)
      .style('opacity', 0)
      .style('width', 0)
      .style('height', 0)
      .remove();
  }

  // setActiveDatapoint = (d, node) => {
  //   d3.select(node).style('fill', 'yellow');
  //   this.props.onDatapointClick(d);
  // }

      // let bubbles = this.svg.selectAll('.node') // Updating have to be the same svg
    //                   .data(nodes)
    //                   .enter()
    //                   .append('g').attr('class', 'node')
    //                   .attr("fill", d => color(d.x))
    //                   .attr('transform', function(d) { 
    //                     console.log({d});
    //                     return 'translate(' + d.x + ' ' + d.y + ')'; })
    //                   .append('g').attr('class', 'graph');
}

export default BubbleChart;