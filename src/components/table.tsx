import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  useMediaQuery,
  useTheme,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";

interface Column {
  id: string;
  label: string;
  render?: (value: any, row: Row) => React.ReactNode;
}

interface Row {
  [key: string]: any;
}

interface GenericTableProps {
  columns: Column[];
  rows: Row[];
  onPreview: (row: Row) => void;
  onDownload: (row: Row) => void;
}

// Styled components
const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#E1E6F7",
  color: theme.palette.primary.dark,
  fontWeight: "bold",
  textTransform: "none",
  paddingTop: 10,
  paddingBottom: 10,
  [theme.breakpoints.down('sm')]: {
    padding: '8px 4px',
    fontSize: '0.875rem',
  },
}));

const ZebraRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "index",
})<{ index: number }>(({ index, theme }) => ({
  backgroundColor: index % 2 === 0 ? "#fffff" : "#f8f9fa",
  "& td": {
    paddingTop: 1,
    paddingBottom: 1,
    [theme.breakpoints.down('sm')]: {
      padding: '8px 4px',
      fontSize: '0.875rem',
    },
  },
}));

const MobileCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: '#fff',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const GenericTable = ({
  columns,
  rows,
  onPreview,
  onDownload,
}: GenericTableProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    return (
      <Box sx={{ mt: 4 }}>
        {rows.map((row, idx) => (
          <MobileCard key={idx}>
            {columns.map((column) => (
              <Box key={column.id} sx={{ mb: 1 }}>
                <Typography variant="caption" color="textSecondary">
                  {column.label}:
                </Typography>
                <Typography>
                  {column.render
                    ? column.render(row[column.id], row)
                    : row[column.id]}
                </Typography>
              </Box>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <IconButton onClick={() => onPreview(row)} color="primary" size="small">
                <VisibilityIcon />
              </IconButton>
              <IconButton onClick={() => onDownload(row)} color="primary" size="small">
                <DownloadIcon />
              </IconButton>
            </Box>
          </MobileCard>
        ))}
      </Box>
    );
  }

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        marginTop: 4,
        overflowX: 'auto',
        '& .MuiTable-root': {
          minWidth: 650,
        }
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell key={column.id}>{column.label}</TableHeaderCell>
            ))}
            <TableHeaderCell>Acciones</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <ZebraRow key={idx} index={idx}>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {column.render
                    ? column.render(row[column.id], row)
                    : row[column.id]}
                </TableCell>
              ))}
              <TableCell>
                <IconButton onClick={() => onPreview(row)} color="primary">
                  <VisibilityIcon />
                </IconButton>
                <IconButton onClick={() => onDownload(row)} color="primary">
                  <DownloadIcon />
                </IconButton>
              </TableCell>
            </ZebraRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GenericTable;
