import { CustomerProps } from "@/types";
import { Table } from "@mantine/core";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

interface Props {
  customers: CustomerProps[] | undefined;
  mutateAsync: UseMutateAsyncFunction<void, Error, string, unknown>;
}

export default function CustomersTable({ customers, mutateAsync }: Props) {
  const rows = customers?.map(
    ({
      email,
      firstName,
      lastName,
      id,
      password,
      phoneNumber,
      userName,
      userType,
    }) => (
      <Table.Tr
        key={id}
        style={{ backgroundColor: "white", width: "100%", zIndex: "99" }}
      >
        <Table.Td className="product_tableData">{id}</Table.Td>
        <Table.Td className="product_tableData">{firstName}</Table.Td>
        <Table.Td className="product_tableData">{lastName}</Table.Td>
        <Table.Td className="product_tableData">{email}</Table.Td>
        <Table.Td className="product_tableData">{userType}</Table.Td>
        <Table.Td className="product_tableData">{userType}</Table.Td>
        <Table.Td className="product_tableData">{phoneNumber}</Table.Td>
        <Table.Td className="product_tableData">{password}</Table.Td>
        <Table.Td className="product_tableData">
          <div className="w-100 flex items-center gap-2">
            <button
              className="product-edit"
              onClick={() => mutateAsync(userName)}
            >
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
              <Table.Th className="product_tableHeader">firstName</Table.Th>
              <Table.Th className="product_tableHeader">lastName</Table.Th>
              <Table.Th className="product_tableHeader">email</Table.Th>
              <Table.Th className="product_tableHeader">userType</Table.Th>
              <Table.Th className="product_tableHeader">userType</Table.Th>
              <Table.Th className="product_tableHeader">phoneNumber</Table.Th>
              <Table.Th className="product_tableHeader">password</Table.Th>
              <Table.Th className="product_tableHeader">actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
