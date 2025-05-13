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

const GenericTable = ({ columns, rows, onPreview, onDownload }: GenericTableProps) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GenericTable;
