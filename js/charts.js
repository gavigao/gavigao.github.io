(function () {
  "use strict";

  let resultChartInstance = null;
  let goalChartInstance = null;

  function buildSeasonList(matches) {
    return [...new Set(matches.map((item) => item.season))].sort((a, b) => Number(a) - Number(b));
  }

  function countResultBySeason(matches, seasons) {
    return seasons.map((season) => {
      const rows = matches.filter((item) => item.season === season);
      const wins = rows.filter((item) => String(item.result).toUpperCase() === "W").length;
      const draws = rows.filter((item) => String(item.result).toUpperCase() === "D").length;
      const losses = rows.filter((item) => String(item.result).toUpperCase() === "L").length;
      return { wins, draws, losses };
    });
  }

  function countGoalsBySeason(matches, seasons) {
    return seasons.map((season) => matches
      .filter((item) => item.season === season)
      .reduce((total, item) => total + Number(item.score_us || 0), 0));
  }

  // 暴露给 main.js 调用的图表初始化函数。
  window.initMatchCharts = function (matches) {
    if (typeof Chart === "undefined") {
      console.error("Chart.js 未加载，无法渲染图表。");
      return;
    }

    const resultCanvas = document.getElementById("resultChart");
    const goalsCanvas = document.getElementById("goalsChart");

    if (!resultCanvas || !goalsCanvas || !Array.isArray(matches) || !matches.length) {
      return;
    }

    const allSeasons = buildSeasonList(matches);
    const recentSeasons = allSeasons.slice(-5);

    const resultStats = countResultBySeason(matches, recentSeasons);
    const goalsStats = countGoalsBySeason(matches, allSeasons);

    if (resultChartInstance) {
      resultChartInstance.destroy();
    }

    if (goalChartInstance) {
      goalChartInstance.destroy();
    }

    resultChartInstance = new Chart(resultCanvas, {
      type: "bar",
      data: {
        labels: recentSeasons,
        datasets: [
          {
            label: "胜",
            data: resultStats.map((item) => item.wins),
            backgroundColor: "#1f8b4c"
          },
          {
            label: "平",
            data: resultStats.map((item) => item.draws),
            backgroundColor: "#d9a441"
          },
          {
            label: "负",
            data: resultStats.map((item) => item.losses),
            backgroundColor: "#c0392b"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top"
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true,
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });

    goalChartInstance = new Chart(goalsCanvas, {
      type: "line",
      data: {
        labels: allSeasons,
        datasets: [
          {
            label: "历史进球数",
            data: goalsStats,
            borderColor: "#1a3a6b",
            backgroundColor: "rgba(26,58,107,0.2)",
            fill: true,
            tension: 0.3,
            pointBackgroundColor: "#c0392b",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top"
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  };
})();
