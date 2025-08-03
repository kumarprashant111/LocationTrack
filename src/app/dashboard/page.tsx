"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Grid, Container } from "@mui/material";
import Map from "@/app/components/Map";
import Sidebar from "@/app/components/Sidebar";
import BIChart from "@/app/components/BIChart";
import Header from "@/app/components/Header";
import KPICards from "@/app/components/KPICards";
import TopLocationsTable from "@/app/components/TopLocationsTable";
import LocationDetailDialog from "@/app/components/LocationDetailDialog";
import { useBIData } from "@/hooks/useBIData";
import { ExternalLocation } from "@/types/geo";
import SearchBox from "@/app/components/SearchBox";
import VisitorsByCategoryChart from "../components/ PopularPlaceTypesChart";

export default function DashboardPage() {
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(
    null
  );
  const [selectedLocation, setSelectedLocation] =
    useState<ExternalLocation | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const mapScrollRef = useRef<HTMLDivElement>(null);

  const { data: filteredLocations } = useBIData();

  useEffect(() => {
    if (
      selectedCoords &&
      !filteredLocations.some(
        (loc) =>
          loc.coords[0] === selectedCoords[0] &&
          loc.coords[1] === selectedCoords[1]
      )
    ) {
      setSelectedCoords(null);
      setSelectedLocation(null);
    }
  }, [filteredLocations, selectedCoords]);

  const handleLocationSelect = (coords: [number, number]) => {
    const location = filteredLocations.find(
      (loc) => loc.coords[0] === coords[0] && loc.coords[1] === coords[1]
    );

    if (location) {
      setSelectedCoords(coords);
      setSelectedLocation(location);
      setDialogOpen(true);
      setTimeout(() => {
        mapScrollRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <Box className="min-h-screen flex flex-col">
      <Header />
      <Box display="flex" flex="1">
        <Sidebar />
        <Box component="main" flex={1} bgcolor="var(--background)">
          <Container maxWidth="xl" sx={{ py: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Map
                  selectedCoords={selectedCoords}
                  scrollRef={mapScrollRef}
                  filteredLocations={filteredLocations}
                />
              </Grid>
              <Grid item xs={12}>
                <KPICards />
              </Grid>

              <Grid item xs={12} md={6}>
                <BIChart />
              </Grid>
              <Grid item xs={12} md={6}>
                {/* <TimeSeriesChart /> */}
                <VisitorsByCategoryChart />
              </Grid>
              <Grid item xs={12}>
                <TopLocationsTable onLocationSelect={handleLocationSelect} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* 🔍 Location Modal */}
      <LocationDetailDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        location={selectedLocation}
      />
      <SearchBox
        locations={filteredLocations}
        onSelect={handleLocationSelect}
      />
    </Box>
  );
}
