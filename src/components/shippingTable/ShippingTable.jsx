import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ProductColumn from "./ProductColumn";
import QuantityColumn from "./QuantityColumn";
import TotalColumn from "./TotalColumn";
import ActionColumn from "./ActionColumn";
import Card from "@mui/material/Card";
import { useShipping } from "../../contexts/shippingContext";

const ShippingTable = () => {
  const { shippingData } = useShipping();
  return (
    <>
      <TableContainer component={Card} sx={{ width: "100%" }}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Product</StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="center">Total</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shippingData.map((product) => {
              const { imgSrc, discount, color, titleProduct, price, id } = product;
              return (
                <StyledTableRow
                  key={product.titleProduct}
                  sx={{ "& .MuiTableRow-root": { height: 50 } }}
                >
                  <StyledTableCell sx={{ width: "50%" }}>
                    <ProductColumn
                      imgSrc={imgSrc}
                      titleProduct={titleProduct}
                      color={color}
                      discount={discount}
                      price={price}
                    />
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "20%" }}>
                    <QuantityColumn id={id} />
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "20%" }}>
                    <TotalColumn id={id} />
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "10%" }}>
                    <ActionColumn id={id} />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ShippingTable;

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "#111",
    fontWeight: 600,
    fontSize: "0.95rem",
    border: "1px solid #e0e0e0",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    padding: "14px 16px",
  },
  [`&.${tableCellClasses.body}`]: {
    height: 50,
    fontFamily: "CanelaText-Light, sans-serif",
    fontSize: "0.9rem",
    border: "1px solid #e0e0e0",
    padding: "20px 16px",
    verticalAlign: "middle",
  },
}));

// Styled Row
const StyledTableRow = styled(TableRow)(() => ({
  "&:hover": {
    backgroundColor: "#fafafa",
  },
}));
