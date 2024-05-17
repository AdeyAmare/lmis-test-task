import CertificationTable from "../components/CertificationTable"
import CoCByMonthChart from "../components/CoCByMonthChart"
import CompetencyPieChart from "../components/CompetencyPieChart"
import DataByCityChart from "../components/DataByCityChart"
import TopSection from "../components/TopSection"


export const Dashboard = () => {

    return (
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 md:flex-row gap-10 ">

            {/* the left part */}
            <div className=" col-span-2 flex flex-col justify-between gap-y-5">
                <TopSection />
                <CoCByMonthChart />
                <CertificationTable />
            </div>

            {/* the right part */}
            <div className=" col-span-1 flex flex-col  gap-y-3 ">
                <DataByCityChart />
                <CompetencyPieChart />
            </div>



        </div>
    )
}
