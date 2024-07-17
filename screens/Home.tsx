import * as React from "react";
import {
  Button,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  Category,
  Transaction,
  TransactionsByMonth,
  Person,
  Encoding,
} from "../types";
import { useSQLiteContext } from "expo-sqlite/next";
import TransactionList from "../components/TransactionsList";
import Card from "../components/ui/Card";
import AddTransaction from "../components/AddTransaction";
import EditContact from "../components/EditContact";
import { BlurView } from "expo-blur";
import { SymbolView } from "expo-symbols";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import SummaryChart from "../components/SummaryChart";

type StackParamList = {
  Payment: undefined;
};

export default function Home() {
  // const navigation =
  //   useNavigation<NativeStackNavigationProp<StackParamList, "Payment">>();
  // const [categories, setCategories] = React.useState<Category[]>([]);
  // const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  // const [transactionsByMonth, setTransactionsByMonth] =
  //   React.useState<TransactionsByMonth>({
  //     totalExpenses: 0,
  //     totalIncome: 0,
  //   });
  const [persons, setPersons] = React.useState<Person[]>([]);
  const [encodings, setEncodings] = React.useState<Encoding[]>([]);

  const db = useSQLiteContext();

  React.useEffect(() => {
    db.withTransactionAsync(async () => {
      await getData();
    });
  }, [db]);

  async function getData() {
    const result = await db.getAllAsync<Person>(`SELECT * FROM Persons;`);
    // console.log("result:", result);
    setPersons(result);
    // console.log("persons:", persons);

    const encodingsResult = await db.getAllAsync<Encoding>(
      `SELECT * FROM Encodings;`
    );
    setEncodings(encodingsResult);
  }

  async function deletePerson(id: number) {
    db.withTransactionAsync(async () => {
      await db.runAsync(`DELETE FROM Persons WHERE person_id = ?;`, [id]);
      await getData();
    });
  }

  async function insertPerson(transaction: Person) {
    db.withTransactionAsync(async () => {
      await db.runAsync(
        `
        INSERT INTO Persons (name, phone, email, profession, detail) VALUES (?, ?, ?, ?, ?);

        `,
        [
          transaction.name,
          transaction.phone,
          transaction.email,
          transaction.profession,
          transaction.detail,
        ]
      );
      await getData();
    });
  }

  async function editContact(transaction: Person) {
    console.log(
      "this is the transaction details",
      transaction.name,
      transaction.phone,
      transaction.email
    );
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

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          padding: 15,
          paddingVertical: Platform.OS === "ios" ? 170 : 16,
        }}
      >
        <AddTransaction insertPerson={insertPerson} />

        <Text> List:</Text>

        <TransactionList
          // categories={categories}
          // transactions={transactions}
          persons={persons}
          encodings={encodings}
          deleteTransaction={deletePerson}
          editContact={editContact}
        />

        <Text> -- List ends here -- {persons.keys()} </Text>
      </ScrollView>
      {/* <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={90}
        tint={"light"}
        style={styles.blur}
      >
        <AddTransaction insertTransaction={insertTransaction} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: "gray" }}>Lifetime savings</Text>
            <Text style={{ fontWeight: "bold", fontSize: 28 }}>
              $123,823.50
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Payment")}
          >
            <SymbolView
              size={48}
              type="palette"
              name="checkmark.circle"
              colors={["black", "transparent"]}
              style={{ backgroundColor: "#00000010", borderRadius: 50 }}
              fallback={
                <Button
                  title="open"
                  onPress={() => navigation.navigate("Payment")}
                />
              }
            />
          </TouchableOpacity>
        </View>
      </BlurView> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingBottom: 7,
  },
  blur: {
    width: "100%",
    height: 70,
    position: "absolute",
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "#00000010",
    padding: 16,
  },
  periodTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  summaryText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
});
