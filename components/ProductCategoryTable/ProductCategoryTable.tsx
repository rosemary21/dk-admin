import { Table } from "@mantine/core";
import "../ProductsTable/ProductTable.scss";
import { ProductCategoryProps } from "@/types";

interface Props {
  productCategories: ProductCategoryProps[] | undefined;
  showUpdateForm: (id: number) => void;
}

export default function ProductCategoryTable({
  productCategories,
  showUpdateForm,
}: Props) {
  const rows = productCategories?.map(({ category, code, id, productCode }) => (
    <Table.Tr
      key={id}
      style={{ backgroundColor: "white", width: "100%", zIndex: "99" }}
    >
      <Table.Td className="product_tableData">{id}</Table.Td>
      <Table.Td className="product_tableData">{code}</Table.Td>
      <Table.Td className="product_tableData">{category}</Table.Td>
      <Table.Td className="product_tableData">
        {productCode ? productCode : "no productCode"}
      </Table.Td>
      <Table.Td className="product_tableData">
        <div className="w-100 flex items-center gap-2">
          <button
            className="product-edit"
            disabled={!productCode}
            onClick={() => showUpdateForm(id)}
          >
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
      <Table striped highlightOnHover>
        <Table.Thead
          style={{ backgroundColor: "white", width: "100%", zIndex: "20" }}
        >
          <Table.Tr>
            <Table.Th className="product_tableHeader">Id</Table.Th>
            <Table.Th className="product_tableHeader">Code</Table.Th>
            <Table.Th className="product_tableHeader">Category</Table.Th>
            <Table.Th className="product_tableHeader">ProductCode</Table.Th>
            <Table.Th className="product_tableHeader">Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}
