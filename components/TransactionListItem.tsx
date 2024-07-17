import * as React from "react";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Category, Transaction, Person } from "../types";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { categoryColors, categoryEmojies } from "../constants";
import Card from "./ui/Card";
import EditContact from "./EditContact";
import { useSQLiteContext } from "expo-sqlite/next";

interface TransactionListItemProps {
  person: Person;
  // editContact: (transaction: Person) => Promise<void>;
  // categoryInfo: Category | undefined;
}

export default function TransactionListItem({
  // categoryInfo,
  // transaction,
  person,
}: // editContact,
TransactionListItemProps) {
  const db = useSQLiteContext();

  return (
    <Card>
      <View style={styles.row}>
        <PersonInfo
          name={person.name}
          phone={person.phone}
          profession={person.profession}
          person_id={person.person_id}
        />
      </View>
      {/* <EditContact editPerson={editPerson} contact={person} /> */}
    </Card>
  );
}

function PersonInfo({
  person_id,
  name,
  phone,
  profession,
}: {
  person_id: number;
  name: string;
  phone: string;
  profession: string;
}) {
  return (
    <View style={{ flexGrow: 1, gap: 6, flexShrink: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{name}</Text>
      <Text>
        Person number {person_id} - {phone}
      </Text>
      <Text style={{ fontSize: 12, color: "gray" }}>{profession}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  amount: {
    fontSize: 32,
    fontWeight: "800",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  categoryContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: 12,
  },
});
