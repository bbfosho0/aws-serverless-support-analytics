import { CategoryBreakdown } from "../../components/charts/category-breakdown";
import { KpiCard } from "../../components/charts/kpi-card";
import { RegionGrid } from "../../components/charts/region-grid";
import { VolumeArea } from "../../components/charts/volume-area";
import { InsightBoard } from "../../components/feedback/insight-board";
import { GlobalFilters } from "../../components/filters/global-filters";
import { CallsTable } from "../../components/tables/calls-table";
import { DashboardHero } from "../../features/dashboard/hero";
import {
  callVolumeSeries,
  dashboardKpis,
  issueBreakdown,
  proactiveInsights,
  recentCalls,
  regionPerformance,
} from "../../lib/data/dashboard-data";
import { callsDataset } from "../../lib/data/calls-data";

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <DashboardHero
        totalInteractions={callsDataset.length}
        backlogMinutes={42}
        refreshEta="Refresh in 07:15"
        focusStreams={["Premium voice", "EU compliance", "AI deflection"]}
      />
      <GlobalFilters />
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardKpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </section>
      <section className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <VolumeArea data={callVolumeSeries} title="Volume trend" subTitle="Last 14 days" />
        <CategoryBreakdown items={issueBreakdown} />
      </section>
      <RegionGrid regions={regionPerformance} />
      <InsightBoard insights={proactiveInsights} />
      <CallsTable data={recentCalls.slice(0, 10)} caption="Latest transcripts" />
    </div>
  );
}
