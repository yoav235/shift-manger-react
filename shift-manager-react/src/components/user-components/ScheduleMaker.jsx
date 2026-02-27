import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Chip,
    Menu,
    MenuItem,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
} from "@mui/material";
import { daysArray, shiftsArray } from "../../constants";
import { fetchAllShifts } from "../../util/shifts_util";
import { fetchSchedule, createSchedule } from "../../util/schedule_util";

// Build an empty grid shaped as schedule[day][shift] = []
function makeEmptyGrid() {
    const grid = {};
    daysArray.forEach((day) => {
        grid[day] = {};
        shiftsArray.forEach((shift) => {
            grid[day][shift] = [];
        });
    });
    return grid;
}

// Normalize various backend schedule shapes into the grid shape { [day]: { [shift]: string[] } }
function normalizeToGrid(raw) {
    const grid = makeEmptyGrid();

    if (!raw) return grid;

    // Case A: array of { day, shifts: { shift: string[] } }
    if (Array.isArray(raw)) {
        raw.forEach((entry) => {
            const day = entry?.day;
            const shifts = entry?.shifts || {};
            if (!day || !grid[day]) return;
            shiftsArray.forEach((shift) => {
                const arr = shifts?.[shift];
                grid[day][shift] = Array.isArray(arr) ? arr : [];
            });
        });
        return grid;
    }

    // Case B: object with { shifts: { [day]: { [shift]: string[] } } } or directly { [day]: { ... } }
    const map = (raw && typeof raw === "object" && raw.shifts && typeof raw.shifts === "object") ? raw.shifts : raw;
    daysArray.forEach((day) => {
        const d = map?.[day] || {};
        shiftsArray.forEach((shift) => {
            const arr = d?.[shift];
            grid[day][shift] = Array.isArray(arr) ? arr : [];
        });
    });

    return grid;
}

function ScheduleMaker() {
    // Local schedule state: { [day]: { [shift]: string[] } }
    const [schedule, setSchedule] = useState(() => makeEmptyGrid());

    // Workers list to choose from (names) and a dict for their day/shift preferences
    const [workers, setWorkers] = useState([]);
    const [workerDict, setWorkerDict] = useState({}); // name -> { name, shifts: { [day]: string[] } }

    // Dropdown (menu) control state
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeCell, setActiveCell] = useState({ day: null, shift: null });
    const menuOpen = Boolean(anchorEl);

    // Saving state
    const [saving, setSaving] = useState(false);

    // Load available workers from backend
    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const all = await fetchAllShifts();
                const arr = Array.isArray(all) ? all : [];
                const names = arr.map((x) => x?.name).filter(Boolean);
                const uniq = Array.from(new Set(names)).sort();
                const dict = {};
                arr.forEach((x) => {
                    if (x?.name) dict[x.name] = x;
                });
                if (mounted) {
                    setWorkers(uniq);
                    setWorkerDict(dict);
                }
            } catch (e) {
                if (mounted) {
                    setWorkers([]);
                    setWorkerDict({});
                }
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    // Load current schedule from backend and normalize into grid
    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const raw = await fetchSchedule();
                const grid = normalizeToGrid(raw);
                if (mounted) setSchedule(grid);
            } catch (e) {
                // keep empty grid on failure
                // console.error("Failed to load schedule", e);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    // Open menu for a specific cell
    const handleCellClick = (event, day, shift) => {
        setActiveCell({ day, shift });
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveCell({ day: null, shift: null });
    };

    const toggleWorkerInCell = (name) => {
        const { day, shift } = activeCell;
        if (!day || !shift) return;
        setSchedule((prev) => {
            const selected = prev?.[day]?.[shift] || [];
            const exists = selected.includes(name);
            const nextSelected = exists
                ? selected.filter((n) => n !== name)
                : [...selected, name];
            return {
                ...prev,
                [day]: {
                    ...prev[day],
                    [shift]: nextSelected,
                },
            };
        });
    };

    // Convenience getter for current cell selection
    const selectedNames = useMemo(() => {
        const { day, shift } = activeCell;
        if (!day || !shift) return [];
        const arr = schedule?.[day]?.[shift];
        return Array.isArray(arr) ? arr : [];
    }, [activeCell, schedule]);

    const handleSave = async () => {
        try {
            setSaving(true);
            await createSchedule(schedule, new Date());
            alert("Schedule saved successfully");
        } catch (e) {
            console.error(e);
            alert("Failed to save schedule");
        } finally {
            setSaving(false);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5">Schedule Maker</Typography>
                <Button variant="contained" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving…' : 'Save schedule'}
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Shift</TableCell>
                            {daysArray.map((day) => (
                                <TableCell key={day} align="center" sx={{ textTransform: "capitalize", fontWeight: 700 }}>
                                    {day}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shiftsArray.map((shift) => (
                            <TableRow key={shift} hover>
                                <TableCell sx={{ fontWeight: 600, textTransform: "capitalize" }}>{shift}</TableCell>
                                {daysArray.map((day) => {
                                    const list = schedule?.[day]?.[shift] || [];
                                    return (
                                        <TableCell
                                            key={`${day}-${shift}`}
                                            align="center"
                                            sx={{ minWidth: 200, cursor: "pointer" }}
                                            onClick={(e) => handleCellClick(e, day, shift)}
                                        >
                                            {list.length ? (
                                                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", justifyContent: "center" }}>
                                                    {list.map((name) => (
                                                        <Chip key={`${day}-${shift}-${name}`} label={name} size="small" />
                                                    ))}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">Select…</Typography>
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                keepMounted
            >
                {workers.length ? (
                    workers.map((name) => {
                        const day = activeCell.day;
                        const shift = activeCell.shift;
                        const shiftsArr = day && workerDict?.[name]?.shifts?.[day];
                        const wantsThisShift = Array.isArray(shiftsArr) && shiftsArr.includes(shift);
                        const noPrefsForDay = Array.isArray(shiftsArr) && shiftsArr.length === 0;
                        return (
                            <MenuItem
                                key={name}
                                onClick={() => toggleWorkerInCell(name)}
                                sx={{
                                    bgcolor: wantsThisShift ? 'success.light' : (noPrefsForDay ? 'error.light' : undefined),
                                    '&:hover': {
                                        bgcolor: wantsThisShift ? 'success.main' : (noPrefsForDay ? 'error.main' : undefined),
                                    },
                                }}
                            >
                                <Checkbox size="small" checked={selectedNames.includes(name)} tabIndex={-1} disableRipple />
                                <Typography variant="body2">{name}</Typography>
                            </MenuItem>
                        );
                    })
                ) : (
                    <MenuItem disabled>
                        <Typography variant="body2" color="text.secondary">No workers available</Typography>
                    </MenuItem>
                )}
            </Menu>
        </Box>
    );
}

export default ScheduleMaker;

