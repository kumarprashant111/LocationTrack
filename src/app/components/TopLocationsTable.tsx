"use client";

import { useBIData } from "@/hooks/useBIData";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  TableContainer,
  Paper,
} from "@mui/material";

type Props = {
  onLocationSelect?: (coords: [number, number]) => void;
};

export default function TopLocationsTable({ onLocationSelect }: Props) {
  const { data: locations } = useBIData();

  const topLocations = [...locations]
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 5);

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        overflow: "hidden",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Top 5 Locations
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <TableContainer component={Paper} elevation={0}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Visitors
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topLocations.map((loc) => (
                <TableRow
                  key={loc.id}
                  hover
                  sx={{
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onClick={() => onLocationSelect?.(loc.coords)}
                >
                  <TableCell>{loc.name}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {loc.category}
                  </TableCell>
                  <TableCell align="right">
                    {loc.visitors.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
