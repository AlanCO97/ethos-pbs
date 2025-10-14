import { getUserFullName } from "@/actions/utils";
import { DashboardWrapper } from "@/components/dashboard/DashboardWrapper";


export default async function DashboardPage() {
  const fullname = await getUserFullName();

  return <DashboardWrapper initialFullname={fullname ?? "User"} />
}