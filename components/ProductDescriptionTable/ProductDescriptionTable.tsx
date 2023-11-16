import { Table } from "@mantine/core";
import "../ProductsTable/ProductTable.scss";
import { ProductDescriptionProps } from "@/types";
import Image from "next/image";
import MutedText from "../MutedText/MutedText";
import formatCurrency from "@/utils/FormatCurrency";
import Link from "next/link";
interface Props {
  productDescription: ProductDescriptionProps[] | undefined;
  showUpdateForm: (id: number) => void;
}
export default function ProductDescriptionTable({
  productDescription,
  showUpdateForm,
}: Props) {
  const rows = productDescription?.map(
    ({
      code,
      id,
      productCode,
      amount,
      availableQuantity,
      description,
      imageUrl,
      landDoc,
      location,
      percentageDiscount,
      price,
      productCategoryCode,
      productSize,
      imagesList,
      recent,
      multipartFile,
    }) => (
      <Table.Tr
        key={id}
        style={{ backgroundColor: "white", width: "100%", zIndex: "99" }}
      >
        <Table.Td className="product_tableData f-11">{id}</Table.Td>
        <Table.Td className="product_tableData">
          <Image
            src={imagesList[0].imageUrl}
            alt={description}
            width={110}
            height={75}
          />
        </Table.Td>
        <Table.Td className="product_tableData f-11">{description}</Table.Td>
        <Table.Td className="product_tableData f-11">{code}</Table.Td>
        <Table.Td className="product_tableData f-11">
          {productCode ? productCode : <MutedText text="no productCode" />}
        </Table.Td>
        <Table.Td className="product_tableData f-11">
          {productCategoryCode ? (
            productCategoryCode
          ) : (
            <MutedText text="no productCategoryCode" />
          )}
        </Table.Td>
        <Table.Td className="product_tableData f-11">
          {amount ? formatCurrency(amount) : <MutedText text="0" />}
        </Table.Td>
        <Table.Td className="product_tableData f-11">
          {price ? formatCurrency(price) : <MutedText text="0" />}
        </Table.Td>
        <Table.Td className="product_tableData f-11">
          {availableQuantity ? availableQuantity : <MutedText text="0" />}
        </Table.Td>
        <Table.Td className="product_tableData f-11">
          {percentageDiscount ? percentageDiscount : <MutedText text="0%" />}
        </Table.Td>
        <Table.Td className="product_tableData f-11">
          {location ? location : <MutedText text="null" />}
        </Table.Td>
        <Table.Td className="product_tableData f-11">
          {productSize ? productSize : <MutedText text="null" />}
        </Table.Td>

        <Table.Td className="product_tableData f-11">
          <Link href={landDoc[0].imageUrl} download target="_blank">
            view pdf
          </Link>
        </Table.Td>
        <Table.Td className="product_tableData">
          {imageUrl ? (
            <video src={imageUrl} width={110} height={75} autoPlay muted loop />
          ) : (
            <MutedText text="no video" />
          )}
        </Table.Td>
        <Table.Td className="product_tableData f-11">
          {recent ? recent : <MutedText text="null" />}
        </Table.Td>
        <Table.Td className="product_tableData f-11">
          {multipartFile ? multipartFile : <MutedText text="null" />}
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
              <Table.Th className="product_tableHeader">Id</Table.Th>
              <Table.Th className="product_tableHeader">Image</Table.Th>
              <Table.Th className="product_tableHeader">Description</Table.Th>
              <Table.Th className="product_tableHeader">code</Table.Th>
              <Table.Th className="product_tableHeader">productCode</Table.Th>
              <Table.Th className="product_tableHeader">
                productCategoryCode
              </Table.Th>
              <Table.Th className="product_tableHeader">amount</Table.Th>
              <Table.Th className="product_tableHeader">price</Table.Th>
              <Table.Th className="product_tableHeader">
                availableQuantity
              </Table.Th>
              <Table.Th className="product_tableHeader">
                percentageDiscount
              </Table.Th>
              <Table.Th className="product_tableHeader">location</Table.Th>
              <Table.Th className="product_tableHeader">productSize</Table.Th>
              <Table.Th className="product_tableHeader">landDoc</Table.Th>
              <Table.Th className="product_tableHeader">videoList</Table.Th>
              <Table.Th className="product_tableHeader">recent</Table.Th>
              <Table.Th className="product_tableHeader">multipartFile</Table.Th>
              <Table.Th className="product_tableHeader">Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
