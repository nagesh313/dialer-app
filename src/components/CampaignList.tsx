import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect } from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import PauseIcon from "@material-ui/icons/Pause";
import { Backdrop, CircularProgress, IconButton } from "@material-ui/core";
import { connect } from "react-redux";
import { setSnackBar } from "./../redux/actions";

interface Data {
  campaign_id: string;
  campaign_name: string;
  flow_id: string;
  primary_queue: string;
  status: string;
  target_env: string;
  updated_at: string;
  wait_queue: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: keyof Data;
  label: string;
  align: string;
}

const headCells: HeadCell[] = [
  {
    id: "campaign_id",
    label: "CAMPAIGN ID",
    align: "left",
  },
  {
    id: "campaign_name",
    label: "CAMPAIGN NAME",
    align: "center",
  },
  { id: "flow_id", label: "FLOW ID", align: "center" },
  {
    id: "primary_queue",
    label: "PRIMARY QUEUE",
    align: "center",
  },
  { id: "status", label: "STATUS", align: "center" },
  {
    id: "target_env",
    label: "TARGET ENV",
    align: "center",
  },
  {
    id: "updated_at",
    label: "UPDATED AT",
    align: "center",
  },
  {
    id: "wait_queue",
    label: "WAIT QUEUE",
    align: "center",
  },
];
interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell: any) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            style={{ fontWeight: "bold" }}
          >
            {headCell.label}
          </TableCell>
        ))}
        <TableCell align="center" style={{ fontWeight: "bold" }}>
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);
enum COMMAND {
  STATUS = "STATUS",
  START = "START",
  PAUSE = "PAUSE",
  STOP = "STOP",
}
function CampaignList(props: any) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [data, setData] = React.useState<any>([]);
  useEffect(() => {
    let url = "/campaign/getAll";
    let headers = new Headers();
    headers.set("X-Requested-With", "XMLHttpRequest");
    headers.set("Content-Type", "application/json");
    headers.set(
      "Authorization",
      "Basic " +
        btoa(
          sessionStorage.getItem("username") +
            ":" +
            sessionStorage.getItem("password")
        )
    );
    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setData([]);
      });
  }, []);
  const command = (command: COMMAND, campaignID: any) => {
    setLoading(true);
    let url = `/campaign/${campaignID}/${command}`;
    let headers = new Headers();
    headers.set("X-Requested-With", "XMLHttpRequest");
    headers.set("Content-Type", "application/json");
    headers.set(
      "Authorization",
      "Basic " +
        btoa(
          sessionStorage.getItem("username") +
            ":" +
            sessionStorage.getItem("password")
        )
    );
    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        setLoading(false);
        props.setSnackBar({
          snackbar: { message: data.response, open: true },
        });
      })
      .catch(() => {
        setLoading(false);
        props.setSnackBar({
          snackbar: {
            message: "Error while performing action",
            open: true,
            severity: "error",
          },
        });
      });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              rowCount={data.length}
            />
            <TableBody>
              {data.map((row: any, index: any) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.campaign_id}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      {row.campaign_id}
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row">
                      {row.campaign_name}
                    </TableCell>
                    <TableCell align="center">{row.flow_id}</TableCell>
                    <TableCell align="center">{row.primary_queue}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">{row.target_env}</TableCell>
                    <TableCell align="center">{row.updated_at}</TableCell>
                    <TableCell align="center">{row.wait_queue}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => command(COMMAND.START, row.campaign_id)}
                      >
                        <PlayArrowIcon></PlayArrowIcon>
                      </IconButton>
                      <IconButton
                        onClick={() => command(COMMAND.STOP, row.campaign_id)}
                      >
                        <StopIcon></StopIcon>
                      </IconButton>
                      <IconButton
                        onClick={() => command(COMMAND.PAUSE, row.campaign_id)}
                      >
                        <PauseIcon></PauseIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
const mapStateToProps: any = (state: any) => {
  return { ...state.snackbar };
};
export default connect(mapStateToProps, { setSnackBar })(CampaignList);
