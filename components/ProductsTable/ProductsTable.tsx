import { Table } from "@mantine/core";
import "./ProductTable.scss";
import { ProductProps } from "@/types";

interface Props {
  products: ProductProps[] | undefined;
  showUpdateForm: (id: number) => void;
}

const ProductTable = ({ products, showUpdateForm }: Props) => {
  const rows = products?.map(({ code, id, createdOn, type }) => (
    <Table.Tr
      key={id}
      style={{ backgroundColor: "white", width: "100%", zIndex: "99" }}
    >
      <Table.Td className="product_tableData">{id}</Table.Td>
      <Table.Td className="product_tableData">{code}</Table.Td>
      <Table.Td className="product_tableData">{type}</Table.Td>
      <Table.Td className="product_tableData">
        {createdOn ? new Date(createdOn)?.toLocaleString() : "No date"}
      </Table.Td>
      <Table.Td className="product_tableData">
        <div className="w-100 flex items-center gap-2">
          <button className="product-edit" onClick={() => showUpdateForm(id)}>
            <i className="bx bx-edit-alt" />
          </button>
          <button className="product-edit">
            <i className="bx bx-trash" />
          </button>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div
      className="product_table"
      style={{ overflowY: "auto", height: "100%" }}
    >
      <Table striped highlightOnHover withColumnBorders>
        <Table.Thead
          style={{ backgroundColor: "white", width: "100%", zIndex: "20" }}
        >
          <Table.Tr>
            <Table.Th className="product_tableHeader">Id</Table.Th>
            <Table.Th className="product_tableHeader">Code</Table.Th>
            <Table.Th className="product_tableHeader">Type</Table.Th>
            <Table.Th className="product_tableHeader">CreatedOn</Table.Th>
            <Table.Th className="product_tableHeader">Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default ProductTable;
