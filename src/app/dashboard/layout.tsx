import { FilterProvider } from "@/context/FilterContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FilterProvider>{children}</FilterProvider>;
}
