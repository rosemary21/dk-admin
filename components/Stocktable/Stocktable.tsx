"use client";

import { StockProps } from "@/types";
import { Table } from "@mantine/core";

interface Props {
  stocks: StockProps[];
  showUpdateForm: (id: number) => void;
}

export default function Stocktable({ showUpdateForm, stocks }: Props) {
  const rows = stocks?.map(
    ({
      dateTimeStock,
      productCategoryCode,
      productCode,
      productDescription,
      productDescriptionCode,
      productType,
      quantity,
      stockCode,
      stockStatus,
      id,
    }) => (
      <Table.Tr
        key={id}
        style={{ backgroundColor: "white", width: "100%", zIndex: "99" }}
      >
        <Table.Td className="product_tableData">{id}</Table.Td>
        <Table.Td className="product_tableData">{dateTimeStock}</Table.Td>
        <Table.Td className="product_tableData">{productCategoryCode}</Table.Td>
        <Table.Td className="product_tableData">{productCode}</Table.Td>
        <Table.Td className="product_tableData">{productDescription}</Table.Td>
        <Table.Td className="product_tableData">
          {productDescriptionCode}
        </Table.Td>
        <Table.Td className="product_tableData">{productType}</Table.Td>
        <Table.Td className="product_tableData">{quantity}</Table.Td>
        <Table.Td className="product_tableData">{stockCode}</Table.Td>
        <Table.Td className="product_tableData">{stockStatus}</Table.Td>
        <Table.Td className="product_tableData">
          <div className="w-100 flex items-center gap-2">
            <button
              className="product-edit"
              onClick={() => showUpdateForm(id)}
            //   disabled={!productCode}
            >
              <i className="bx bx-edit-alt" />
            </button>
            <button className="product-edit">
              <i className="bx bx-trash" />
            </button>
          </div>
        </Table.Td>
      </Table.Tr>
    )
  );
  return (
    <div
      className="product_table"
      style={{ overflowY: "auto", height: "100%" }}
    >
      <Table.ScrollContainer minWidth={1000}>
        <Table striped highlightOnHover withColumnBorders>
          <Table.Thead
            style={{ backgroundColor: "white", width: "100%", zIndex: "20" }}
          >
            <Table.Tr>
              <Table.Th className="product_tableHeader">id</Table.Th>
              <Table.Th className="product_tableHeader">dateTimeStock</Table.Th>
              <Table.Th className="product_tableHeader">
                productCategoryCode
              </Table.Th>
              <Table.Th className="product_tableHeader">productCode</Table.Th>
              <Table.Th className="product_tableHeader">
                productDescription
              </Table.Th>
              <Table.Th className="product_tableHeader">
                productDescriptionCode
              </Table.Th>
              <Table.Th className="product_tableHeader">productType</Table.Th>
              <Table.Th className="product_tableHeader">quantity</Table.Th>
              <Table.Th className="product_tableHeader">stockCode</Table.Th>
              <Table.Th className="product_tableHeader">stockStatus</Table.Th>
              <Table.Th className="product_tableHeader">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
