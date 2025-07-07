// Sample query to list transactions for a user (buyer or provider)
import dbConnect from "@/lib/mongodb";

export async function getUserTransactions(userId: string, role: 'buyer' | 'provider') {
  const db = await dbConnect();
  const query = role === 'buyer' ? { buyerId: userId } : { providerId: userId };
  const transactions = await db.collection("transactions").find(query).sort({ createdAt: -1 }).toArray();
  return transactions;
}

// Usage example:
// const buyerTransactions = await getUserTransactions(buyerId, 'buyer');
// const providerTransactions = await getUserTransactions(providerId, 'provider');
