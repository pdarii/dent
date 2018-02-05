export const CHART_OPTIONS = {
    chart: {
      type: 'discreteBarChart',
      height: 450,
      margin : {
        top: 20,
        right: 20,
        bottom: 50,
        left: 55
      },
      x: function(d) { return d.label; },
      y: function(d) { return d.value; },
      showValues: true,
      showLegend: false,
      valueFormat: function(d) {
        return d;
      },
      duration: 500,
      xAxis: {
        axisLabel: '',
      },
      yAxis: {
        axisLabel: '',
        axisLabelDistance: -10
      }
    }
  };
