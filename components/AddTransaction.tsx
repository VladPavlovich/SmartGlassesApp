import * as React from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Card from "./ui/Card";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useSQLiteContext } from "expo-sqlite/next";
import { Category, Transaction, Person } from "../types";

export default function AddTransaction({
  // insertTransaction,
  insertPerson,
}: {
  insertPerson(person: Person): Promise<void>;
}) {
  const [isAddingTransaction, setIsAddingTransaction] =
    React.useState<boolean>(false);

  const [name, setName] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [profession, setProfession] = React.useState<string>("");
  const [detail, setDetail] = React.useState<string>("");

  const db = useSQLiteContext();

  // React.useEffect(() => {
  //   getExpenseType(currentTab);
  // }, [currentTab]);

  // async function getExpenseType(currentTab: number) {
  //   setCategory(currentTab === 0 ? "Expense" : "Income");
  //   const type = currentTab === 0 ? "Expense" : "Income";

  //   const result = await db.getAllAsync<Category>(
  //     `SELECT * FROM Categories WHERE type = ?;`,
  //     [type]
  //   );
  //   setCategories(result);
  // }

  async function handleSave() {
    console.log({
      name,
      profession,
    });

    // @ts-ignore
    await insertPerson({
      name: name,
      phone: phone,
      email: email,
      profession: profession,
      detail: detail,
    });

    setName("");
    setPhone("");
    setEmail("");
    setProfession("");
    setDetail("");
    setIsAddingTransaction(false);
  }

  return (
    <View style={{ marginBottom: 15 }}>
      {isAddingTransaction ? (
        <View>
          <Card>
            <TextInput
              placeholder="Enter Name here: "
              style={{ fontSize: 32, marginBottom: 15, fontWeight: "bold" }}
              onChangeText={setName}

              // keyboardType="numeric"
              // onChangeText={(text) => {
              //   // Remove any non-numeric characters before setting the state
              //   const numericValue = text.replace(/[^0-9.]/g, "");
              //   setAmount(numericValue);
              // }}
            />

            <Text>Phone:</Text>
            <TextInput
              placeholder="(xxx)xxx-xxxx"
              style={{ marginBottom: 15 }}
              onChangeText={setPhone}
            />

            <Text>Email:</Text>
            <TextInput
              placeholder="name@email.com"
              style={{ marginBottom: 15 }}
              onChangeText={setEmail}
            />

            <Text>Profession:</Text>
            <TextInput
              placeholder="Work"
              style={{ marginBottom: 15 }}
              onChangeText={setProfession}
            />

            <Text>Details:</Text>
            <TextInput
              placeholder="Any additional info...."
              style={{ marginBottom: 15 }}
              onChangeText={setDetail}
            />
            {/* <Text style={{ marginBottom: 6 }}>Select a entry type</Text>
            <SegmentedControl
              values={["Expense", "Income"]}
              style={{ marginBottom: 15 }}
              selectedIndex={currentTab}
              onChange={(event) => {
                setCurrentTab(event.nativeEvent.selectedSegmentIndex);
              }}
            />
            {categories.map((cat) => (
              <CategoryButton
                key={cat.name}
                // @ts-ignore
                id={cat.id}
                title={cat.name}
                isSelected={typeSelected === cat.name}
                setTypeSelected={setTypeSelected}
                setCategoryId={setCategoryId}
              />
            ))} */}
          </Card>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Button
              title="Cancel"
              color="red"
              onPress={() => setIsAddingTransaction(false)}
            />
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      ) : (
        <AddButton setIsAddingTransaction={setIsAddingTransaction} />
      )}
    </View>
  );
}

function AddButton({
  setIsAddingTransaction,
}: {
  setIsAddingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <TouchableOpacity
      onPress={() => setIsAddingTransaction(true)}
      activeOpacity={0.6}
      style={{
        height: 40,
        flexDirection: "row",
        alignItems: "center",

        justifyContent: "center",
        backgroundColor: "#007BFF20",
        borderRadius: 15,
      }}
    >
      <MaterialIcons name="add-circle-outline" size={24} color="#007BFF" />
      <Text style={{ fontWeight: "700", color: "#007BFF", marginLeft: 5 }}>
        New Entry
      </Text>
    </TouchableOpacity>
  );
}
