import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getTransactions, type Transaction } from "../../services/paymentService";

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getTransactions()
      .then(setTransactions)
      .catch(() => console.error("Failed to fetch transactions"));
  }, []);

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
