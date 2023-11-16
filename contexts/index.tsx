"use client";

import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type Props = {
  showModal: () => void;
  handleOk: () => void;
  handleCancel: () => void;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  getFiles: (
    e:
      | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
      | MouseEvent<HTMLInputElement, globalThis.MouseEvent>,
    htmlClass: string
  ) => void;
  handleFileChange: (
    e: ChangeEvent<HTMLInputElement>,
    setFileInput: Dispatch<SetStateAction<File[]>>,
    setImgNames: Dispatch<SetStateAction<string[]>>
  ) => void;
  productName: string[];
  setProductName: Dispatch<SetStateAction<string[]>>;
  landDocName: string[];
  setLandDocName: Dispatch<SetStateAction<string[]>>;
  videoListName: string[];
  setVideoListName: Dispatch<SetStateAction<string[]>>;
  descriptionFileInput: File[];
  setDescriptionFileInput: Dispatch<SetStateAction<File[]>>;
  landDocFileInput: File[];
  setLandDocFileInput: Dispatch<SetStateAction<File[]>>;
  videoListFileInput: File[];
  setVideoListFileInput: Dispatch<SetStateAction<File[]>>;
};

export const Context = createContext({} as Props);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [productName, setProductName] = useState<string[]>([]);
  const [landDocName, setLandDocName] = useState<string[]>([]);
  const [videoListName, setVideoListName] = useState<string[]>([]);
  const [descriptionFileInput, setDescriptionFileInput] = useState<File[]>([]);
  const [landDocFileInput, setLandDocFileInput] = useState<File[]>([]);
  const [videoListFileInput, setVideoListFileInput] = useState<File[]>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getFiles = (
    e:
      | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
      | MouseEvent<HTMLInputElement, globalThis.MouseEvent>,
    htmlClass: string
  ) => {
    e.preventDefault();
    const fileElem = document.getElementById(htmlClass) as HTMLInputElement;
    fileElem.click();
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFileInput: Dispatch<SetStateAction<File[]>>,
    setImgNames: Dispatch<SetStateAction<string[]>>
  ) => {
    e.preventDefault();
    const selectedFiles: string[] = [];
    const targetFiles = e.target?.files as unknown as File[];

    setFileInput([...targetFiles]);
    [...targetFiles].map((file) =>
      selectedFiles.push(URL.createObjectURL(file))
    );
    setImgNames(selectedFiles);
  };
  const values = {
    isModalOpen,
    setIsModalOpen,
    showModal,
    handleOk,
    handleCancel,
    errorMessage,
    setErrorMessage,
    getFiles,
    handleFileChange,
    productName,
    setProductName,
    landDocName,
    setLandDocName,
    videoListName,
    setVideoListName,
    descriptionFileInput,
    setDescriptionFileInput,
    landDocFileInput,
    setLandDocFileInput,
    videoListFileInput,
    setVideoListFileInput,
  };
  return <Context.Provider value={values}>{children}</Context.Provider>;
};
