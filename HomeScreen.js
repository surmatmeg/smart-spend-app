import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [transactions, setTransactions] = useState([
    { id: '1', title: 'Coffee', amount: '-$4.50', type: 'expense' },
    { id: '2', title: 'Freelance Gig', amount: '+$150.00', type: 'income' },
  ]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  const addTransaction = () => {
    if (!text || !amount) return;
    const newTx = {
      id: Date.now().toString(),
      title: text,
      amount: (amount.startsWith('+') || amount.startsWith('-')) ? amount : `-$${amount}`,
      type: amount.startsWith('+') ? 'income' : 'expense'
    };
    setTransactions([newTx, ...transactions]);
    setText('');
    setAmount('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SmartSpend 💸</Text>
        <Text style={styles.balanceLabel}>Total Balance: <Text style={styles.balanceAmount}>$145.50</Text></Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Description (e.g., Groceries)" 
          placeholderTextColor="#888"
          value={text}
          onChangeText={setText}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Amount (e.g., -15 or +50)" 
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity style={styles.button} onPress={addTransaction}>
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.buttonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionCard}>
            <Text style={styles.transactionTitle}>{item.title}</Text>
            <Text style={[styles.transactionAmount, item.type === 'income' ? styles.income : styles.expense]}>
              {item.amount}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingHorizontal: 20, paddingTop: 40 },
  header: { marginBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  balanceLabel: { fontSize: 16, color: '#aaa', marginTop: 5 },
  balanceAmount: { color: '#4CD964', fontWeight: 'bold' },
  inputContainer: { marginBottom: 20 },
  input: { backgroundColor: '#1E1E1E', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, fontSize: 16 },
  button: { backgroundColor: '#007AFF', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold', marginLeft: 5, fontSize: 16 },
  transactionCard: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  transactionTitle: { color: '#fff', fontSize: 16 },
  transactionAmount: { fontSize: 16, fontWeight: 'bold' },
  income: { color: '#4CD964' },
  expense: { color: '#FF3B30' }
});