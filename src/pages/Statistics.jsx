import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatsChart from "../components/StatsChart";
import { api } from "../api/client.js";

export default function Statistics() {
  const [range, setRange] = useState("d");
  const [chartData, setChartData] = useState([]);
  const [label, setLabel] = useState("Today");
  const [average, setAverage] = useState(0);
  const [record, setRecord] = useState(0);
  const [loading, setLoading] = useState(true);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const labelsMap = {
    d: "Today",
    w: "This week",
    m: "This month",
    y: "This year",
  };

  const fetchStats = async (r) => {
    try {
      setLoading(true);
      const data = await api(`/water/user/me/stats?range=${r}`);

      if (!data) return;

      setChartData(data.data || []);
      setLabel(data.label || labelsMap[r]);
      setAverage(data.average || 0);
      setRecord(data.record || 0);
    } catch (e) {
      console.error(e);
      setChartData([]);
      setLabel(labelsMap[r]);
      setAverage(0);
      setRecord(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(range);
  }, [range]);

  return (
    <div className="min-h-screen bg-white font-[Montserrat]">
      <main className="max-w-[900px] mx-auto px-6 pt-6">
        <h1 className="text-[36px] font-bold text-black mb-6 text-center">
          Statistic
        </h1>

        {/* Toggle */}
        <div className="flex bg-[#BDDBF7] w-[232px] h-[37px] rounded-[30px] mx-auto mb-6 px-2 items-center justify-between">
          {["d", "w", "m", "y"].map((t) => (
            <button
              key={t}
              onClick={() => setRange(t)}
              className={`w-[50px] h-[29px] rounded-[30px] text-[16px] font-semibold transition ${
                range === t
                  ? "bg-[#0055A0] text-white"
                  : "bg-white text-[#0055A0] border border-[#0055A0]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <h2 className="text-[20px] font-bold mb-3 text-center">{label}</h2>

        {/* graph */}
        <div className="w-full flex justify-center mb-10 mt-4">
          {loading ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : chartData.length === 0 ? (
            <div className="text-sm text-gray-500">No data</div>
          ) : (
            <StatsChart data={chartData} range={range} isMobile={isMobile} />
          )}
        </div>

        {/* Summary */}
        <div className="space-y-4 mb-10 max-w-[400px] mx-auto">
          <div className="bg-[#BDDBF7] w-full h-[49px] rounded-[30px] flex items-center justify-between px-4">
            <span className="font-semibold text-black">Daily average</span>
            <span className="bg-[#438BC4] text-white px-4 py-[6px] rounded-[20px]">
              {average} ml
            </span>
          </div>

          <div className="bg-[#BDDBF7] w-full h-[49px] rounded-[30px] flex items-center justify-between px-4">
            <span className="font-semibold text-black">Daily record</span>
            <span className="bg-[#438BC4] text-white px-4 py-[6px] rounded-[20px]">
              {record} ml
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
