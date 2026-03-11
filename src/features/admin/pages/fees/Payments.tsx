import { useState, useEffect } from "react";
import AdminLayout from "../../components/AdminLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getPayments, type Payment } from "../../services/feeService";

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const data = await getPayments();
        setPayments(data);
      } catch (error) {
        console.error("Failed to load payments");
      }
    };
    loadPayments();
  }, []);

  const filteredPayments = payments.filter(p => 
      p.student.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.matric.includes(searchTerm) ||
      p.ref.includes(searchTerm)
  );

  return (
    <AdminLayout title="Payments" description="View and manage fee payments">
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search by student, matric no, or ref..." 
                className="pl-8"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Payment Ref</TableHead><TableHead>Student</TableHead><TableHead>Matric No</TableHead><TableHead>Amount</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.ref}</TableCell><TableCell>{payment.student}</TableCell><TableCell>{payment.matric}</TableCell><TableCell>₦{payment.amount.toLocaleString()}</TableCell><TableCell>{payment.date}</TableCell>
                <TableCell><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">{payment.status}</span></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default Payments;
