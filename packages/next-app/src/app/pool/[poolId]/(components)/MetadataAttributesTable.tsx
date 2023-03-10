"use client";

import {
  ArrowTopRightIcon,
  ChevronDownIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import cn from "classnames";
import { TableHTMLAttributes, useContext } from "react";

import { Button } from "#/components";
import { Dialog } from "#/components/Dialog";
import {
  PoolMetadataAttribute,
  PoolMetadataContext,
  toSlug,
} from "#/contexts/PoolMetadataContext";

import { PoolMetadataItemForm } from "./PoolMetadataForm";

type CellProps = TableHTMLAttributes<HTMLTableCellElement>;

const Th = ({ className, children }: CellProps) => (
  <th
    scope="col"
    className={cn(
      "py-3.5 px-3 text-left text-sm font-semibold text-white",
      className
    )}
  >
    {children}
  </th>
);

const Header = () => {
  const cols = [
    {
      node: <span className="sr-only">Edit</span>,
      className: "relative py-3.5 pl-3 pr-4 sm:pr-0",
    },
    { node: "Name" },
    { node: "Typename" },
    { node: "Description" },
    { node: "Value" },
  ];

  return (
    <thead>
      <tr>
        {cols.map(({ node, className }, index) => (
          <Th key={index} className={className}>
            {node}
          </Th>
        ))}
      </tr>
    </thead>
  );
};

const Td = ({ className, children }: CellProps) => {
  return (
    <td className={cn("whitespace py-4 px-3 text-sm text-gray-300", className)}>
      {children}
    </td>
  );
};

const AttributeLink = ({ data }: { data: PoolMetadataAttribute }) => {
  switch (data.typename) {
    case "url":
      return (
        <button>
          <ArrowTopRightIcon className="text-white" />
        </button>
      );
    // TODO: decide whether we want to have an image type and create it accordingly
    // case "image":
    //   return (
    //     <button>
    //       <ImageDialog src={data.value as string} />
    //     </button>
    //   );
    default:
      return <></>;
  }
};

function Row({ data }: { data: PoolMetadataAttribute }) {
  return (
    <tr>
      <Td>
        <Dialog
          title={"Edit attribute"}
          content={<PoolMetadataItemForm data={data} mode="edit" />}
        >
          <button className="flex items-center">
            <Pencil2Icon className="text-yellow-400" />
          </button>
        </Dialog>
      </Td>
      <Td className="min-w-[10rem]">{data.key}</Td>
      <Td>{data.typename}</Td>
      <Td>{data.description}</Td>
      <Td>
        <div className="flex justify-between gap-2">
          <>{data.value}</>
          <AttributeLink data={data} />
        </div>
      </Td>
    </tr>
  );
}

export function MetadataAttributesTable({ poolId }: { poolId: string }) {
  const { metadata } = useContext(PoolMetadataContext);

  function handleUpdatePoolMetadata() {
    // get `selectedPool` and `metadata` from context
    // pin metadata to ipfs
    // call PoolMetadataRegistry contract to setPoolMetadata
    // TODO: https://linear.app/bleu-llc/issue/BAL-57/update-metadata-calling-poolmetadataregistry-contract
  }

  return (
    <div className="w-full bg-gray-900">
      <div className="pr-4 sm:pr-6 lg:pr-12">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="mx-1 text-2xl font-medium text-gray-400">
              Metadata attributes - Pool #{poolId}
            </h1>
          </div>
        </div>

        <div className="mt-4 flow-root rounded-md border border-gray-700 bg-gray-800">
          <table className="min-w-full divide-y divide-gray-700">
            <Header />

            <tbody className="divide-y divide-gray-800">
              {metadata.map((item) => (
                <Row key={toSlug(item.key)} data={item} />
              ))}
            </tbody>
          </table>

          <div className="flex h-10 w-full items-center justify-center border-y border-gray-700">
            <button className="text-gray-700 ">
              <div className="flex items-center">
                <span>load more</span>
                <ChevronDownIcon
                  width="20"
                  height="20"
                  className=" text-gray-700"
                />
              </div>
            </button>
          </div>
        </div>
        <div className="mt-5 w-full justify-between sm:flex sm:items-center">
          <div className="flex gap-4">
            <Dialog title={"Add attribute"} content={<PoolMetadataItemForm />}>
              <Button className="bg-indigo-500 text-white hover:bg-indigo-400 focus-visible:outline-indigo-500">
                Add attribute
              </Button>
            </Dialog>

            <Button className="border border-blue-500 bg-gray-900  text-blue-500 hover:bg-gray-800 focus-visible:outline-indigo-500">
              Import template
            </Button>
          </div>
          <Button
            onClick={handleUpdatePoolMetadata}
            className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 focus-visible:bg-yellow-300"
          >
            Update metadata
          </Button>
        </div>
      </div>
    </div>
  );
}
