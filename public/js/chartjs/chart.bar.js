/*!
* Chart.js
* http://chartjs.org/
* Version: {{ version }}
*
* Copyright 2014 Nick Downie
* Released under the MIT license
* https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
*/
(function(){"use strict";var t=this,s=t.Chart,e=s.helpers,a={scaleBeginAtZero:!0,scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,barShowStroke:!0,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'};s.Type.extend({name:"Bar",defaults:a,initialize:function(t){var a=this.options;this.ScaleClass=s.Scale.extend({offsetGridLines:!0,calculateBarX:function(t,s,e){var i=this.calculateBaseWidth(),l=this.calculateX(e)-i/2,o=this.calculateBarWidth(t);return l+o*s+s*a.barDatasetSpacing+o/2},calculateBaseWidth:function(){return this.calculateX(1)-this.calculateX(0)-2*a.barValueSpacing},calculateBarWidth:function(t){var s=this.calculateBaseWidth()-(t-1)*a.barDatasetSpacing;return s/t}}),this.datasets=[],this.options.showTooltips&&e.bindEvents(this,this.options.tooltipEvents,function(t){var s="mouseout"!==t.type?this.getBarsAtEvent(t):[];this.eachBars(function(t){t.restore(["fillColor","strokeColor"])}),e.each(s,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(s)}),this.BarClass=s.Rectangle.extend({strokeWidth:this.options.barStrokeWidth,showStroke:this.options.barShowStroke,ctx:this.chart.ctx}),e.each(t.datasets,function(s){var a={label:s.label||null,fillColor:s.fillColor,strokeColor:s.strokeColor,bars:[]};this.datasets.push(a),e.each(s.data,function(e,i){a.bars.push(new this.BarClass({value:e,label:t.labels[i],datasetLabel:s.label,strokeColor:s.strokeColor,fillColor:s.fillColor,highlightFill:s.highlightFill||s.fillColor,highlightStroke:s.highlightStroke||s.strokeColor}))},this)},this),this.buildScale(t.labels),this.BarClass.prototype.base=this.scale.endPoint,this.eachBars(function(t,s,a){e.extend(t,{width:this.scale.calculateBarWidth(this.datasets.length),x:this.scale.calculateBarX(this.datasets.length,a,s),y:this.scale.endPoint}),t.save()},this),this.render()},update:function(){this.scale.update(),e.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachBars(function(t){t.save()}),this.render()},eachBars:function(t){e.each(this.datasets,function(s,a){e.each(s.bars,t,this,a)},this)},getBarsAtEvent:function(t){for(var s,a=[],i=e.getRelativePosition(t),l=function(t){a.push(t.bars[s])},o=0;o<this.datasets.length;o++)for(s=0;s<this.datasets[o].bars.length;s++)if(this.datasets[o].bars[s].inRange(i.x,i.y))return e.each(this.datasets,l),a;return a},buildScale:function(t){var s=this,a=function(){var t=[];return s.eachBars(function(s){t.push(s.value)}),t},i={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var s=e.calculateScaleRange(a(),t,this.fontSize,this.beginAtZero,this.integersOnly);e.extend(this,s)},xLabels:t,font:e.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.barShowStroke?this.options.barStrokeWidth:0,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&e.extend(i,{calculateYRange:e.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new this.ScaleClass(i)},addData:function(t,s){e.each(t,function(t,e){this.datasets[e].bars.push(new this.BarClass({value:t,label:s,x:this.scale.calculateBarX(this.datasets.length,e,this.scale.valuesCount+1),y:this.scale.endPoint,width:this.scale.calculateBarWidth(this.datasets.length),base:this.scale.endPoint,strokeColor:this.datasets[e].strokeColor,fillColor:this.datasets[e].fillColor}))},this),this.scale.addXLabel(s),this.update()},removeData:function(){this.scale.removeXLabel(),e.each(this.datasets,function(t){t.bars.shift()},this),this.update()},reflow:function(){e.extend(this.BarClass.prototype,{y:this.scale.endPoint,base:this.scale.endPoint});var t=e.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var s=t||1;this.clear();this.chart.ctx;this.scale.draw(s),e.each(this.datasets,function(t,a){e.each(t.bars,function(t,e){t.hasValue()&&(t.base=this.scale.endPoint,t.transition({x:this.scale.calculateBarX(this.datasets.length,a,e),y:this.scale.calculateY(t.value),width:this.scale.calculateBarWidth(this.datasets.length)},s).draw())},this)},this)}})}).call(this);