export default function BackupTimeContent() {
  return (
    <div className="mx-auto max-w-[860px] px-4 py-10 pb-18 text-[#1b1f23] antialiased">
      {/* CSS Nhúng trực tiếp cho riêng phần nội dung này */}
      <style>{`
        .formula-box {
          background: #f6f8f9;
          border: 1px solid #e3e7ea;
          border-left: 4px solid #c8102e;
          border-radius: 8px;
          padding: 22px 18px;
          text-align: center;
          margin: 20px 0;
        }
        .formula-box b {
          font-size: 24px;
          font-family: Georgia, "Times New Roman", serif;
        }
        .html-table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0 20px;
          font-size: 14.5px;
        }
        .html-table th, .html-table td {
          border: 1px solid #e3e7ea;
          padding: 9px 11px;
          text-align: left;
          vertical-align: top;
        }
        .html-table th {
          background: #f6f8f9;
          font-weight: 600;
        }
        .ex-box {
          border: 1px solid #e3e7ea;
          border-radius: 8px;
          padding: 16px 18px;
          margin: 0 0 14px;
          background: #fff;
        }
        .ex-calc {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: 13.5px;
          background: #f6f8f9;
          border-radius: 6px;
          padding: 10px 12px;
          margin: 8px 0 0;
          overflow-x: auto;
          white-space: nowrap;
        }
      `}</style>

      <p className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#c8102e]">
        Technical Support
      </p>
      <h1 className="mb-3 text-[34px] font-bold leading-tight tracking-[-0.02em]">
        Backup Time Calculation for UPS Systems
      </h1>
      <p className="mb-7 text-[18px] text-[#5b6670]">
        How to estimate the autonomy of a UPS battery bank for IT loads — the formula, the deep-discharge coefficient, worked examples and reference configurations.
      </p>

      <h2 className="mb-3 mt-10 border-b border-[#e3e7ea] pb-2 text-[21px] font-bold tracking-[-0.01em]">
        1. Runtime belongs to the battery bank, not to the UPS
      </h2>
      <p className="mb-3.5">
        A UPS does not store energy; its battery bank does. The same UPS model can deliver five minutes or one hour of autonomy depending only on how the battery bank is configured. For this reason, backup time should always be quoted together with three pieces of information: the battery capacity (Ah), the number of blocks in the string, and the load level at which the figure applies.
      </p>
      <p className="mb-3.5">
        The type of load also matters. The method described here applies to <strong>IT loads</strong> — servers, storage, network equipment and other devices powered by switch-mode power supplies, which behave as an approximately constant-power load.
      </p>

      <h2 className="mb-3 mt-10 border-b border-[#e3e7ea] pb-2 text-[21px] font-bold tracking-[-0.01em]">
        2. The estimating formula
      </h2>
      <div className="formula-box">
        <b>T = [ (AH × V × pf) / W ] × D</b>
        <span className="mt-2 block text-[13px] text-[#5b6670]">Backup time for normal IT load</span>
      </div>

      <table className="html-table">
        <thead>
          <tr>
            <th style={{ width: "80px" }}>Symbol</th>
            <th style={{ width: "210px" }}>Meaning</th>
            <th>How it is obtained</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center font-bold">T</td>
            <td>Backup time</td>
            <td>Result, in minutes.</td>
          </tr>
          <tr>
            <td className="text-center font-bold">AH</td>
            <td>Battery capacity in hours</td>
            <td>Rated capacity of one block, converted to the minute basis (AH = Ampere × 60 minutes).</td>
          </tr>
          <tr>
            <td className="text-center font-bold">V</td>
            <td>Battery bank voltage</td>
            <td>12 V × number of blocks in the string.</td>
          </tr>
          <tr>
            <td className="text-center font-bold">pf</td>
            <td>Power factor</td>
            <td>Power factor of the connected load.</td>
          </tr>
          <tr>
            <td className="text-center font-bold">W</td>
            <td>Consumption power</td>
            <td>Actual load in watts. For a 100% load figure, use the rated active power of the UPS.</td>
          </tr>
          <tr>
            <td className="text-center font-bold">D</td>
            <td>Deep discharge coefficient</td>
            <td>See section 3.</td>
          </tr>
        </tbody>
      </table>

      <h2 className="mb-3 mt-10 border-b border-[#e3e7ea] pb-2 text-[21px] font-bold tracking-[-0.01em]">
        3. The deep discharge coefficient (D)
      </h2>
      <p className="mb-3.5">
        A battery never delivers its full nameplate capacity during a short, high-rate discharge. The rated Ah figure is measured over a 10-hour or 20-hour discharge; when the same battery is emptied in 30 minutes, only part of that capacity is available.
      </p>

      <table className="html-table">
        <thead>
          <tr>
            <th>Battery configuration</th>
            <th className="text-center" style={{ width: "150px" }}>Coefficient D</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Standard battery built into the UPS cabinet</td>
            <td className="text-center">60 – 70 %</td>
          </tr>
          <tr>
            <td>External battery cabinet or battery rack</td>
            <td className="text-center">65 – 75 %</td>
          </tr>
        </tbody>
      </table>

      <h2 className="mb-3 mt-10 border-b border-[#e3e7ea] pb-2 text-[21px] font-bold tracking-[-0.01em]">
        4. Worked examples
      </h2>

      <div className="ex-box">
        <h3 className="mb-2 text-[15px] font-bold">Example 1 — 60 kVA / 60 kW, external battery bank of 40 blocks 12 V / 100 Ah</h3>
        <p className="mb-2 text-sm">V = 40 × 12 V = 480 Vdc · AH = 100 · W = 60,000 W · pf = 1.0 · D = 65 %</p>
        <div className="ex-calc">T = (100 × 60 × 480 × 1.0) / 60,000 × 65 % = 48 × 65 % = <span className="font-bold text-[#c8102e]">31.2 minutes</span></div>
      </div>

      <div className="ex-box">
        <h3 className="mb-2 text-[15px] font-bold">Example 2 — 20 kVA / 20 kW, external battery bank of 40 blocks 12 V / 33 Ah</h3>
        <p className="mb-2 text-sm">V = 40 × 12 V = 480 Vdc · AH = 33 · W = 20,000 W · pf = 1.0 · D = 65 %</p>
        <div className="ex-calc">T = (33 × 60 × 480 × 1.0) / 20,000 × 65 % = 47.52 × 65 % = <span className="font-bold text-[#c8102e]">30.9 minutes</span></div>
      </div>

      <div className="ex-box">
        <h3 className="mb-2 text-[15px] font-bold">Example 3 — 10 kVA / 10 kW, built-in battery of 20 blocks 12 V / 9 Ah</h3>
        <p className="mb-2 text-sm">V = 20 × 12 V = 240 Vdc · AH = 9 · W = 10,000 W · pf = 1.0 · D = 60 %</p>
        <div className="ex-calc">T = (9 × 60 × 240 × 1.0) / 10,000 × 60 % = 12.96 × 60 % = <span className="font-bold text-[#c8102e]">7.8 minutes</span></div>
      </div>

      <h2 className="mb-3 mt-10 border-b border-[#e3e7ea] pb-2 text-[21px] font-bold tracking-[-0.01em]">
        5. Reference configurations
      </h2>
      <table className="html-table">
        <thead>
          <tr>
            <th>UPS</th>
            <th>Battery bank</th>
            <th className="text-center">Bank voltage</th>
            <th className="text-center">D</th>
            <th className="text-center">Backup time</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>60 kVA / 60 kW</td><td>40 × 12 V / 100 Ah, external</td><td className="text-center">480 Vdc</td><td className="text-center">65 %</td><td className="text-center font-bold">31.2 min</td></tr>
          <tr><td>60 kVA / 60 kW</td><td>36 × 12 V / 150 Ah, external</td><td className="text-center">432 Vdc</td><td className="text-center">65 %</td><td className="text-center font-bold">42.1 min</td></tr>
          <tr><td>30 kVA / 30 kW</td><td>40 × 12 V / 75 Ah, external</td><td className="text-center">480 Vdc</td><td className="text-center">65 %</td><td className="text-center font-bold">46.8 min</td></tr>
          <tr><td>20 kVA / 20 kW</td><td>40 × 12 V / 33 Ah, external</td><td className="text-center">480 Vdc</td><td className="text-center">65 %</td><td className="text-center font-bold">30.9 min</td></tr>
          <tr><td>20 kVA / 20 kW</td><td>40 × 12 V / 65 Ah, external</td><td className="text-center">480 Vdc</td><td className="text-center">65 %</td><td className="text-center font-bold">60.8 min</td></tr>
          <tr><td>10 kVA / 10 kW</td><td>20 × 12 V / 9 Ah, built-in</td><td className="text-center">240 Vdc</td><td className="text-center">60 %</td><td className="text-center font-bold">7.8 min</td></tr>
        </tbody>
      </table>

      <div className="my-5 rounded-lg border border-[#f3d6dc] bg-[#fdf2f4] p-4 text-[14.5px]">
        <strong>When an exact figure is required.</strong> For projects with a contractually guaranteed autonomy, the estimate above should be confirmed against the battery manufacturer's constant-power discharge table.
      </div>
    </div>
  );
}