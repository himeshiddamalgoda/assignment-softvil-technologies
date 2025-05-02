import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Search } from "@mui/icons-material";
import {
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import styles from "@/styles/dashboard.module.scss";

export function Filters({
  searchTerm,
  setSearchTerm,
  hostFilter,
  setHostFilter,
  startDateFilter,
  setStartDateFilter,
  uniqueHosts,
}: {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  hostFilter: string;
  setHostFilter: (val: string) => void;
  startDateFilter: Date | null;
  setStartDateFilter: (val: Date | null) => void;
  uniqueHosts: { id: string; name: string }[];
}) {
  return (
    <Box className={styles.filtersWrapper}>
      <Grid container spacing={2}>
        <Grid component="div" size={{ xs: 12, sm: 6, md: 4 }}>
          <TextField
            className={styles.input}
            size="small"
            fullWidth
            label="Search events"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid component="div" size={{ xs: 12, sm: 6, md: 4 }}>
          <FormControl className={styles.input} size="small">
            <InputLabel id="host-filter-label">Filter by Host</InputLabel>
            <Select
              labelId="host-filter-label"
              id="host-filter"
              value={hostFilter}
              label="Filter by Host"
              onChange={(e) => setHostFilter(e.target.value)}
            >
              <MenuItem value="">
                <em>All Hosts</em>
              </MenuItem>
              {uniqueHosts.map((host) => (
                <MenuItem key={host.id} value={host.id}>
                  {host.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid component="div" size={{ xs: 12, sm: 6, md: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Events after date"
              value={startDateFilter}
              onChange={setStartDateFilter}
              slotProps={{
                textField: {
                  className: styles.input,
                  size: "small",
                  fullWidth: true,
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </Box>
  );
}
