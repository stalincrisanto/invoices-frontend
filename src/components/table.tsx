import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
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
const TableHeaderCell = styled(TableCell)`
  background-color:rgb(215, 220, 224);
  color: black;
  font-weight: bold;
  text-transform: none;
`;

const ZebraRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "index",
})<{ index: number }>(({ index }) => ({
  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#e0e0e0",
}));

const GenericTable = ({ columns, rows, onPreview, onDownload }: GenericTableProps) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell key={column.id}>
                {column.label}
              </TableHeaderCell>
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
