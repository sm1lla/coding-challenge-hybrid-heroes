import React from "react";
import { Inventory } from "./store/inventory";
import { Image, StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import PlaceholderSvg from "../assets/image_placeholder.svg";
import IconNew from "../assets/icon_new.svg";

type GreetingProps = {
  item: Inventory;
  id: string;
};

const isOneWeekOld = (date: Date) => {
  const currentDate = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - 7);
  return date > sevenDaysAgo;
};

export const ProductItem = (props: GreetingProps) => {
  const imageURL: string = props.item.fields["Product Image"];
  const isNew: boolean = isOneWeekOld(new Date(props.item.fields.Posted));
  const categories: string[] = props.item.fields["Product Categories"]
    ? props.item.fields["Product Categories"].split(", ")
    : [];

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {imageURL ? (
          <Image source={{ uri: imageURL }} style={styles.image} />
        ) : (
          <PlaceholderSvg style={styles.image} />
        )}
      </View>
      <View style={styles.accordion_container}>
        <List.Accordion
          title={
            <View style={{}}>
              <View style={styles.titel}>
                <Text style={styles.product_name} numberOfLines={1}>
                  {props.item.fields["Product Name"]}
                </Text>
                <View style={{ margin: 5 }}>{isNew ? <IconNew /> : null}</View>
              </View>
              <Text style={styles.product_date}>
                {new Date(props.item.fields.Posted).toLocaleDateString()}
              </Text>
            </View>
          }
          id={props.id}
          style={styles.accordion}
        >
          <View style={styles.categories}>
            {categories.map((category, index) => (
              <View style={styles.tag} key={index}>
                <Text numberOfLines={1} style={styles.text_tag}>
                  {category}
                </Text>
              </View>
            ))}
          </View>
        </List.Accordion>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    borderRadius: 4,
    padding: 8,
    margin: 6,
    backgroundColor: "#F8F9FC",
    shadowColor: "#1B263340",
    shadowOpacity: 0.25,
    shadowRadius: 3
  },
  accordion_container: { flex: 3, backgroundColor: "#F8F9FC" },
  accordion: { backgroundColor: "#F8F9FC" },
  product_name: { fontFamily: "Roboto", fontSize: 20, fontWeight: "900" },
  product_date: { fontFamily: "Roboto", fontSize: 12, fontWeight: "400" },
  image: {
    flex: 1,
    width: 85,
    resizeMode: "cover"
  },
  tag: {
    width: "30%",
    height: 26,
    backgroundColor: "#D4E5FF",
    borderRadius: 48, // rounded edges
    paddingTop: 2,
    paddingVertical: 2,
    paddingHorizontal: 12,
    margin: 3,
    justifyContent: "center"
  },
  text_tag: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "400"
  },
  titel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 50
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 12
  }
});
