export const backupHtmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Backup Time Calculation</title>
<meta name="description" content="How to estimate UPS battery backup time for IT loads — formula, deep-discharge coefficient, worked examples and reference configurations.">
<style>
  :root{
    --ink:#1b1f23; --muted:#5b6670; --line:#e3e7ea; --bg:#ffffff; --soft:#f6f8f9;
    --accent:#c8102e; --accent-soft:#fdf2f4; --green:#127a54;
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
    font-size:16px;line-height:1.65;-webkit-font-smoothing:antialiased}
  .wrap{max-width:860px;margin:0 auto;padding:40px 16px 72px}
  .eyebrow{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);font-weight:700;margin:0 0 10px}
  h1{font-size:34px;line-height:1.2;margin:0 0 12px;letter-spacing:-.02em}
  .lede{font-size:18px;color:var(--muted);margin:0 0 28px}
  h2{font-size:21px;margin:40px 0 12px;letter-spacing:-.01em;padding-bottom:8px;border-bottom:1px solid var(--line)}
  h3{font-size:16px;margin:26px 0 8px}
  p{margin:0 0 14px}
  ul{margin:0 0 14px;padding-left:20px}
  li{margin:0 0 7px}
  .formula{background:var(--soft);border:1px solid var(--line);border-left:4px solid var(--accent);
    border-radius:8px;padding:22px 18px;text-align:center;margin:20px 0}
  .formula b{font-size:24px;letter-spacing:.01em;font-family:Georgia,"Times New Roman",serif}
  .formula span{display:block;margin-top:8px;font-size:13px;color:var(--muted)}
  table{width:100%;border-collapse:collapse;margin:16px 0 20px;font-size:14.5px}
  th,td{border:1px solid var(--line);padding:9px 11px;text-align:left;vertical-align:top}
  th{background:var(--soft);font-weight:600}
  td.num,th.num{text-align:center;white-space:nowrap}
  .ex{border:1px solid var(--line);border-radius:8px;padding:16px 18px;margin:0 0 14px;background:#fff}
  .ex h3{margin:0 0 8px;font-size:15px}
  .ex .calc{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13.5px;
    background:var(--soft);border-radius:6px;padding:10px 12px;margin:8px 0 0;overflow-x:auto;white-space:nowrap}
  .ex .res{font-weight:700;color:var(--accent)}
  .note{background:var(--accent-soft);border:1px solid #f3d6dc;border-radius:8px;padding:14px 16px;font-size:14.5px;margin:20px 0}
  .foot{margin-top:44px;padding-top:18px;border-top:1px solid var(--line);font-size:13px;color:var(--muted)}
  @media(max-width:600px){h1{font-size:27px}.lede{font-size:16.5px}.ex .calc{white-space:normal}}
</style>
</head>
<body>
<div class="wrap">

  <section id="en">
    <p class="eyebrow">Technical Support</p>
    <h1>Backup Time Calculation for UPS Systems</h1>
    <p class="lede">How to estimate the autonomy of a UPS battery bank for IT loads — the formula, the deep-discharge coefficient, worked examples and reference configurations.</p>

    <h2>1. Runtime belongs to the battery bank, not to the UPS</h2>
    <p>A UPS does not store energy; its battery bank does. The same UPS model can deliver five minutes or one hour of autonomy depending only on how the battery bank is configured. For this reason, backup time should always be quoted together with three pieces of information: the battery capacity (Ah), the number of blocks in the string, and the load level at which the figure applies.</p>
    <p>The type of load also matters. The method described here applies to <strong>IT loads</strong> — servers, storage, network equipment and other devices powered by switch-mode power supplies, which behave as an approximately constant-power load. Loads with motors, compressors, heating elements or high inrush current require a different approach and should be sized case by case.</p>

    <h2>2. The estimating formula</h2>
    <div class="formula">
      <b>T = [ (AH × V × pf) / W ] × D</b>
      <span>Backup time for normal IT load</span>
    </div>
    <table>
      <tr><th style="width:80px">Symbol</th><th style="width:210px">Meaning</th><th>How it is obtained</th></tr>
      <tr><td class="num"><strong>T</strong></td><td>Backup time</td><td>Result, in minutes.</td></tr>
      <tr><td class="num"><strong>AH</strong></td><td>Battery capacity in hours</td><td>Rated capacity of one block, converted to the minute basis (AH = Ampere × 60 minutes).</td></tr>
      <tr><td class="num"><strong>V</strong></td><td>Battery bank voltage</td><td>12 V × number of blocks in the string.</td></tr>
      <tr><td class="num"><strong>pf</strong></td><td>Power factor</td><td>Power factor of the connected load.</td></tr>
      <tr><td class="num"><strong>W</strong></td><td>Consumption power</td><td>Actual load in watts. For a 100% load figure, use the rated active power of the UPS.</td></tr>
      <tr><td class="num"><strong>D</strong></td><td>Deep discharge coefficient</td><td>See section 3.</td></tr>
    </table>

    <h2>3. The deep discharge coefficient (D)</h2>
    <p>A battery never delivers its full nameplate capacity during a short, high-rate discharge. The rated Ah figure is measured over a 10-hour or 20-hour discharge; when the same battery is emptied in 30 minutes, only part of that capacity is available. Cable and connection losses, inverter efficiency and the end-of-discharge voltage limit set by the UPS reduce the usable energy further. The coefficient D accounts for all of this in a single factor.</p>
    <table>
      <tr><th>Battery configuration</th><th class="num" style="width:150px">Coefficient D</th></tr>
      <tr><td>Standard battery built into the UPS cabinet</td><td class="num">60 – 70 %</td></tr>
      <tr><td>External battery cabinet or battery rack</td><td class="num">65 – 75 %</td></tr>
    </table>
    <p>An external bank sits in a ventilated cabinet with shorter, larger-section busbars and a cooler operating temperature, which is why it is credited with the higher range. For design and tender calculations, COSMOS recommends using the <strong>lower bound</strong> of the applicable range so that the stated figure remains on the safe side.</p>

    <h2>4. Worked examples</h2>

    <div class="ex">
      <h3>Example 1 — 60 kVA / 60 kW, external battery bank of 40 blocks 12 V / 100 Ah</h3>
      <p>V = 40 × 12 V = 480 Vdc &nbsp;·&nbsp; AH = 100 &nbsp;·&nbsp; W = 60,000 W &nbsp;·&nbsp; pf = 1.0 &nbsp;·&nbsp; D = 65 %</p>
      <div class="calc">T = (100 × 60 × 480 × 1.0) / 60,000 × 65 % = 48 × 65 % = <span class="res">31.2 minutes</span></div>
    </div>

    <div class="ex">
      <h3>Example 2 — 20 kVA / 20 kW, external battery bank of 40 blocks 12 V / 33 Ah</h3>
      <p>V = 40 × 12 V = 480 Vdc &nbsp;·&nbsp; AH = 33 &nbsp;·&nbsp; W = 20,000 W &nbsp;·&nbsp; pf = 1.0 &nbsp;·&nbsp; D = 65 %</p>
      <div class="calc">T = (33 × 60 × 480 × 1.0) / 20,000 × 65 % = 47.52 × 65 % = <span class="res">30.9 minutes</span></div>
    </div>

    <div class="ex">
      <h3>Example 3 — 10 kVA / 10 kW, built-in battery of 20 blocks 12 V / 9 Ah</h3>
      <p>V = 20 × 12 V = 240 Vdc &nbsp;·&nbsp; AH = 9 &nbsp;·&nbsp; W = 10,000 W &nbsp;·&nbsp; pf = 1.0 &nbsp;·&nbsp; D = 60 %</p>
      <div class="calc">T = (9 × 60 × 240 × 1.0) / 10,000 × 60 % = 12.96 × 60 % = <span class="res">7.8 minutes</span></div>
    </div>

    <h2>5. Reference configurations</h2>
    <p>Estimated autonomy at 100 % load, pf = 1.0, batteries new, ambient 25 °C, D taken at the lower bound of the applicable range.</p>
    <table>
      <tr><th>UPS</th><th>Battery bank</th><th class="num">Bank voltage</th><th class="num">D</th><th class="num">Backup time</th></tr>
      <tr><td>60 kVA / 60 kW</td><td>40 × 12 V / 100 Ah, external</td><td class="num">480 Vdc</td><td class="num">65 %</td><td class="num"><strong>31.2 min</strong></td></tr>
      <tr><td>60 kVA / 60 kW</td><td>36 × 12 V / 150 Ah, external</td><td class="num">432 Vdc</td><td class="num">65 %</td><td class="num"><strong>42.1 min</strong></td></tr>
      <tr><td>30 kVA / 30 kW</td><td>40 × 12 V / 75 Ah, external</td><td class="num">480 Vdc</td><td class="num">65 %</td><td class="num"><strong>46.8 min</strong></td></tr>
      <tr><td>20 kVA / 20 kW</td><td>40 × 12 V / 33 Ah, external</td><td class="num">480 Vdc</td><td class="num">65 %</td><td class="num"><strong>30.9 min</strong></td></tr>
      <tr><td>20 kVA / 20 kW</td><td>40 × 12 V / 65 Ah, external</td><td class="num">480 Vdc</td><td class="num">65 %</td><td class="num"><strong>60.8 min</strong></td></tr>
      <tr><td>10 kVA / 10 kW</td><td>20 × 12 V / 9 Ah, built-in</td><td class="num">240 Vdc</td><td class="num">60 %</td><td class="num"><strong>7.8 min</strong></td></tr>
    </table>

    <h2>6. What changes the result in a real installation</h2>
    <ul>
      <li><strong>Ambient temperature.</strong> The figures above assume 25 °C. Below that, available capacity falls; above it, capacity is briefly higher but battery life shortens roughly by half for every 10 °C of continuous excess.</li>
      <li><strong>Battery age.</strong> A VRLA battery is considered to have reached end of life at 80 % of its initial capacity. Keep a design margin of at least 20 % if the autonomy must still be met in the final years of service.</li>
      <li><strong>Actual load level.</strong> Autonomy grows faster than proportionally as the load drops — halving the load typically more than doubles the runtime.</li>
      <li><strong>State of charge.</strong> After an outage a battery bank needs several hours to recover; a second outage during the recharge window will give a shorter runtime.</li>
      <li><strong>Load type.</strong> Motor, compressor and heating loads draw inrush and non-linear current and must be sized separately.</li>
    </ul>

    <div class="note">
      <strong>When an exact figure is required.</strong> For projects with a contractually guaranteed autonomy, the estimate above should be confirmed against the battery manufacturer's constant-power discharge table — the watts per cell available at the required duration and at the end-of-discharge voltage of the UPS. Our engineering team can issue a detailed sizing calculation for any COSMOS configuration on request.
    </div>

    <p class="foot">The values on this page are calculated estimates for IT loads with new batteries at 25 °C and are provided for guidance. Actual backup time depends on site conditions, battery condition and load profile. © COSMOS RF TECHNOLOGIES LP.</p>
  </section>

</div>
</body>
</html>
`