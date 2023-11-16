"use client";

import Layout from "@/layout";

export default function Receipt() {
  return <Layout active="receipts">Receipt coming soon</Layout>;
}

// import TitleBar from "@/components/TitleBar/TitleBar";
// import Layout from "@/layout";
// import { ReceiptResponseProp, ReceiptTransaction } from "@/types";
// import { dker, getToken } from "@/utils/Links";
// import { useEffect, useState } from "react";

// export default function DashboardReceipt() {
//   const [activeTab, setActiveTab] = useState("all");
//   const [transactions, setTransactions] = useState<ReceiptTransaction[]>([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [error, setError] = useState();

//   const token = getToken();

//   const pendingReceipts = transactions.filter(
//     (transaction) => transaction.transactionStatus.toLowerCase() === "pending"
//   );
//   const completedReceipts = transactions.filter(
//     (transaction) => transaction.transactionStatus.toLowerCase() === "completed"
//   );
//   const rejectedReceipts = transactions.filter(
//     (transaction) => transaction.transactionStatus.toLowerCase() === "rejected"
//   );

//   async function acceptReceipt() {}
//   async function declineReceipt() {}

//   useEffect(() => {
//     async function getAllTransactions(pageNo: number) {
//       const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/transaction/all/page`;
//       const headers = new Headers();
//       headers.append("apiKey", token);
//       headers.append("Content-Type", "application/json");

//       const body = JSON.stringify({
//         pageSize: 10,
//         pageNo,
//       });
//       const options = {
//         method: "POST",
//         headers,
//         body,
//       };
//       await fetch(url, options)
//         .then((response) => response.json())
//         .then((result: ReceiptResponseProp) => {
//           const {
//             responseDto: { code, message },
//             transactionList,
//           } = result;
//           if (code === dker) {
//             setError(message);
//             return;
//           } else {
//             setTransactions(transactionList);
//           }
//         })
//         .catch((error: any) => {
//           setError(error.message);
//         });
//     }
//     getAllTransactions(currentPage);
//   }, [transactions, currentPage]);
//   return (
//     <Layout active="receipts">
//       <TitleBar />

//       <h2 className="receipt-title">Receipt</h2>

//       <div className="receipt-tabs">
//         <button
//           className={activeTab === "all" ? "tab_btn active_tab" : "tab_btn"}
//           onClick={() => setActiveTab("all")}
//         >
//           All Reciept
//         </button>

//         <button
//           className={activeTab === "pending" ? "tab_btn active_tab" : "tab_btn"}
//           onClick={() => setActiveTab("pending")}
//         >
//           Pending Reciept
//         </button>

//         <button
//           className={
//             activeTab === "completed" ? "tab_btn active_tab" : "tab_btn"
//           }
//           onClick={() => setActiveTab("completed")}
//         >
//           Completed Receipt
//         </button>

//         <button
//           className={
//             activeTab === "rejected" ? "tab_btn active_tab" : "tab_btn"
//           }
//           onClick={() => setActiveTab("rejected")}
//         >
//           Rejected Reciept
//         </button>
//       </div>

//       <div className="display_tabs">
//         <div
//           style={{ display: activeTab === "all" ? "block" : "none" }}
//           className="display_tab w-100"
//         >

//         </div>

//         <div
//           style={{ display: activeTab === "pending" ? "block" : "none" }}
//           className="display_tab"
//         >
//           <Row xs={1} md={2} lg={4}>
//             {pendingReceipts.map((receipt) => (
//               <Col key={receipt.id}>
//                 <PendingReceiptCard receipt={receipt} />
//               </Col>
//             ))}
//           </Row>
//         </div>

//         <div
//           style={{ display: activeTab === "completed" ? "block" : "none" }}
//           className="display_tab"
//         >
//           <Row xs={1} md={2} lg={4}>
//             {completedReceipts.map((receipt) => (
//               <Col key={receipt.id}>
//                 <CompleteReceiptCard
//                   receipt={receipt}
//                   isRejected={false}
//                   reason=""
//                 />
//               </Col>
//             ))}
//           </Row>
//         </div>

//         <div
//           style={{ display: activeTab === "rejected" ? "block" : "none" }}
//           className="display_tab"
//         >
//           <Row xs={1} md={2} lg={4}>
//             {rejectedReceipts.map((receipt) => (
//               <Col key={receipt.id}>
//                 <CompleteReceiptCard
//                   receipt={receipt}
//                   isRejected={true}
//                   reason="Money not confirmed"
//                 />
//               </Col>
//             ))}
//           </Row>
//         </div>
//       </div>
//     </Layout>
//   );
// }
