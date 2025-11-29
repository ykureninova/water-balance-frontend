import React, { useEffect, useState } from "react";
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
    const check = () => setIsMobile(window.innerWidth <= 480);
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

      // GLOBAL daily record from backend (ALWAYS MAX OF ALL TIME)
      setRecord(data.record || 0);
    } catch {
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
    <div className="min-h-screen bg-white font-[Montserrat] pt-20">

      <main className="max-w-[900px] mx-auto px-6">

        {/* TOGGLE */}
        <div className="bg-white/80 border border-[#BDDBF7]/50 backdrop-blur-sm rounded-3xl shadow-xl w-[240px] mx-auto h-[45px] flex items-center justify-between px-3 mb-8">
          {["d", "w", "m", "y"].map((t) => (
            <button
              key={t}
              onClick={() => setRange(t)}
              className={`w-[50px] h-[32px] rounded-[30px] text-[15px] font-semibold transition ${
                range === t
                  ? "bg-[#0055A0] text-white"
                  : "bg-[#BDDBF7]/30 text-[#0055A0]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <h2 className="text-[22px] font-bold text-center mb-6 text-[#0055A0]">
          {label}
        </h2>

        {/* GRAPH */}
        <div className="w-full flex justify-center mb-10">
          {loading ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : chartData.length === 0 ? (
            <div className="text-sm text-gray-500">No data</div>
          ) : (
            <StatsChart data={chartData} range={range} isMobile={isMobile} />
          )}
        </div>

        {/* SUMMARY */}
        <div className="space-y-4 mb-24 max-w-[400px] mx-auto">

          <div className="bg-[#BDDBF7]/30 border border-[#BDDBF7]/50 rounded-2xl flex items-center justify-between px-5 h-[52px]">
            <span className="font-semibold text-[#0055A0]">Daily average</span>
            <span className="bg-[#438BC4] text-white px-4 py-[6px] rounded-[20px]">
              {average} ml
            </span>
          </div>

          <div className="bg-[#BDDBF7]/30 border border-[#BDDBF7]/50 rounded-2xl flex items-center justify-between px-5 h-[52px]">
            <span className="font-semibold text-[#0055A0]">Daily record</span>

            {/* GLOBAL MAX FOR ALL TIME (ALWAYS SAME) */}
            <span className="bg-[#438BC4] text-white px-4 py-[6px] rounded-[20px]">
              {record} ml
            </span>
          </div>

        </div>
      </main>
    </div>
  );
}
