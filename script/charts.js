document.addEventListener("DOMContentLoaded", function () {
  initTimeBarChart();
  initLineChart();
  initProgressBar();
});

function initTimeBarChart() {
  let chartDom = document.getElementById("timeBarChart");
  if (!chartDom) return;

  // Time data points
  const hours = ["12 AM", "4 AM", "8 AM", "12 PM", "4 PM", "8 PM", "9 PM"];

  // Initialize ECharts instance
  let myChart = echarts.init(chartDom);

  // Chart options
  let option = {
    grid: {
      left: "3%",
      right: "4%",
      bottom: "8%",
      top: "8%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: hours,
      axisLabel: {
        color: "#fff",
        fontSize: 10,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.3)",
        },
      },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      interval: 40,
      axisLabel: {
        formatter: "{value}%",
        color: "#fff",
        fontSize: 10,
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.3)",
        },
      },
    },
    series: [
      {
        type: "bar",
        data: [75, 82, 93, 90, 85, 80, 10],
        itemStyle: {
          color: function (params) {
            var colorList = ["#FAD754", "#AAC7B8"];
            return colorList[params.dataIndex % colorList.length];
          },
          borderRadius: [3, 3, 0, 0],
        },
        barWidth: "10%",
      },
    ],
    animation: true,
    backgroundColor: "transparent",
  };

  // Set the options to the chart
  myChart.setOption(option);

  window.addEventListener("resize", function () {
    myChart.resize();
  });
}

function initLineChart() {
  var chartDom = document.getElementById("lineChart");
  if (!chartDom) return;

  var myChart = echarts.init(chartDom);

  var option = {
    grid: {
      left: "3%",
      right: "4%",
      bottom: "8%",
      top: "8%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["Jan", "Feb", "Mar"],
      axisLabel: {
        color: "#fff",
        fontSize: 10,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.3)",
        },
      },
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#fff",
        fontSize: 10,
      },
      splitLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255, 255, 255, 0.3)",
        },
      },
    },
    series: [
      {
        data: [30, 60, 78],
        type: "line",
        smooth: true,
        lineStyle: {
          width: 3,
          color: "#9575cd",
        },
        symbol: "none",
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(149, 117, 205, 0.5)",
              },
              {
                offset: 1,
                color: "rgba(149, 117, 205, 0.1)",
              },
            ],
          },
        },
      },
      {
        data: [20, 40, 65],
        type: "line",
        smooth: true,
        lineStyle: {
          width: 3,
          color: "#42a5f5",
        },
        symbol: "none",
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(66, 165, 245, 0.5)",
              },
              {
                offset: 1,
                color: "rgba(66, 165, 245, 0.1)",
              },
            ],
          },
        },
      },
    ],
    animation: true,
    backgroundColor: "transparent",
  };

  myChart.setOption(option);

  window.addEventListener("resize", function () {
    myChart.resize();
  });
}

function initProgressBar() {
  var chartDom = document.getElementById("progressBar");
  if (!chartDom) return;

  var myChart = echarts.init(chartDom);

  var option = {
    series: [
      {
        type: "gauge",
        radius: "80%",
        center: ["30%", "55%"], // Move circle to the left side
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "#ffd54f" }, // Yellow (low priority)
                { offset: 0.5, color: "#ff9800" }, // Orange (medium priority)
                { offset: 1, color: "#f44336" }, // Red (high priority)
              ],
            },
          },
        },
        axisLine: {
          lineStyle: {
            width: 8,
            color: [[1, "rgba(255, 255, 255, 0.1)"]],
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        data: [
          {
            value: 95, // This will determine how much of the circle is filled
            detail: {
              valueAnimation: true,
            },
          },
        ],
        detail: {
          show: false,
        },
        animationDuration: 1500,
      },
    ],
    grid: {
      top: 40,
      left: 0,
      right: 0,
      bottom: 0,
    },
    backgroundColor: "transparent",
  };

  myChart.setOption(option);

  // Add priority indicators to the right of the chart
  setTimeout(function () {
    var container = chartDom.parentNode;
    var priorities = document.createElement("div");
    priorities.style.position = "absolute";
    priorities.style.top = "55%";
    priorities.style.left = "50%";
    priorities.style.left = "52%";
    priorities.style.transform = "translateY(-50%)";
    priorities.style.color = "#fff";
    priorities.style.fontSize = "10px";

    priorities.innerHTML =
      '<div style="margin-bottom: 10px;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:#ffd54f;margin-right:10px;vertical-align:middle;"></span><span style="color:#aaa;">low priority</span></div>' +
      '<div style="margin-bottom: 10px;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:#ff9800;margin-right:10px;vertical-align:middle;"></span><span style="color:#aaa;">Medium Priority</span></div>' +
      '<div><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:#f44336;margin-right:10px;vertical-align:middle;"></span><span style="color:#aaa;">High Priority</span></div>';

    container.appendChild(priorities);
  }, 100);

  window.addEventListener("resize", function () {
    myChart.resize();
  });
}
