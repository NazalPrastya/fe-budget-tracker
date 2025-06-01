import { StatCard } from "@/ui/StatCard";
import formatRupiah from "@/utils/formatRupiah";
import { WalletIcon } from "lucide-react";
import { AiOutlineDollar } from "react-icons/ai";

export default function DashboardPage() {
  const dateNow = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  return (
    <div className="p-3 space-y-6">
      <div className="flex flex-col gap-8 text-white bg-gradient-to-r from-indigo-900 to-indigo-900 rounded-xl p-6">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div className="">
            <h2 className="text-4xl font-semibold">Welcome Back, User!</h2>
            <p className="text-md mt-1 font-normal">
              Insighths at a glance: empowering your financial journey
            </p>
          </div>
          <div className="text-right text-md text-white">
            <p className="font-medium">{dateNow}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Balance"
            value={formatRupiah(2000000)}
            icon={<WalletIcon size={24} />}
            change="This Month"
            color="text-indigo-500"
          />
          <StatCard
            title="Total Savings"
            value={formatRupiah(128000)}
            icon={<AiOutlineDollar size={24} />}
            change="For Recomendation"
            color="text-indigo-500"
          />
          <StatCard
            title="Total Income"
            value={formatRupiah(172000)}
            icon={<AiOutlineDollar size={24} />}
            change="This Month"
            color="text-indigo-500"
          />
          <StatCard
            title="Total Expense"
            value={formatRupiah(54000)}
            icon={<AiOutlineDollar size={24} />}
            change="This Month"
            color="text-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}
