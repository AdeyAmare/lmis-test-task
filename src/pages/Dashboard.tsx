import CompetencyPieChart from "../components/CompetencyPieChart"
import DataByCityChart from "../components/DataByCityChart"
import TopSection from "../components/TopSection"


export const Dashboard = () => {

    return (
        <div className="p-6 flex flex-row gap-10">

            {/* the left part */}
            <div className="w-[65%]">
                <TopSection />
            </div>

            {/* the right part */}
            <div className="w-[35%] flex flex-col justify-between gap-y-5">
                <DataByCityChart />
                <CompetencyPieChart />
            </div>



        </div>
    )
}
