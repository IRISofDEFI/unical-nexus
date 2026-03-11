import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const MOCK_TRANSACTIONS = [
  { id: "TXN-001", ref: "REF123456", amount: 45000, type: "School Fees", date: "2024-01-15 10:30 AM", status: "Success", gateway: "Interswitch" },
  { id: "TXN-002", ref: "REF789012", amount: 2000, type: "Acceptance", date: "2024-01-16 02:15 PM", status: "Pending", gateway: "Remita" },
];

const Transactions = () => {
  const [transactions] = useState(MOCK_TRANSACTIONS);

  return (
    <AdminLayout title="Transactions" description="View payment transaction history">
      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction Ref</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Gateway</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell className="font-medium">{txn.ref}</TableCell>
                <TableCell>{txn.type}</TableCell>
                <TableCell>₦{txn.amount.toLocaleString()}</TableCell>
                <TableCell>{txn.gateway}</TableCell>
                <TableCell>{txn.date}</TableCell>
                <TableCell>
                  <Badge variant={txn.status === "Success" ? "default" : "outline"}>{txn.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default Transactions;
