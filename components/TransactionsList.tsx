import { Text, TouchableOpacity, View, Button } from "react-native";
import { Encoding, Person, Category, Transaction } from "../types";
import TransactionListItem from "./TransactionListItem";
import EditContact from "./EditContact";
import { useSQLiteContext } from "expo-sqlite/next";

export default function TransactionList({
  persons,
  encodings,
  deleteTransaction,
  editContact,
}: {
  encodings: Encoding[];
  persons: Person[];
  deleteTransaction: (id: number) => Promise<void>;
  editContact: (transaction: Person) => Promise<void>;
}) {
  const db = useSQLiteContext();

  async function editPerson(transaction: Person) {
    db.withTransactionAsync(async () => {
      await db.runAsync(
        `
        UPDATE Persons SET name=?, phone=?, email=?, profession=?, detail=? WHERE person_id = ?;
        `,
        [
          transaction.name,
          transaction.phone,
          transaction.email,
          transaction.profession,
          transaction.detail,
          transaction.person_id,
        ]
      );
      await getData();
    });
  }

  async function getData() {
    const result = await db.getAllAsync<Person>(`SELECT * FROM Persons;`);
    console.log("result:", result);
    persons = result;
    console.log("persons:", persons);
  }

  return (
    <View style={{ gap: 15 }}>
      {persons.map((person) => {
        const categoryForCurrentItem = encodings.find(
          (encoding) => encoding.encoding_id === person.encoding_id
        );
        return (
          <TouchableOpacity
            key={person.person_id}
            activeOpacity={0.7}
            // onLongPress={() => editContact(person)}
            // onLongPress={() => deleteTransaction(person.person_id)}
          >
            <TransactionListItem person={person} />
            <EditContact editPerson={editPerson} contact={person} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
