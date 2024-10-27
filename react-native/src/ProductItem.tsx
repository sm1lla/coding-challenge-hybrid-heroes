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

  return (
    <List.Accordion
      title={
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.product_name} numberOfLines={1}>
              {props.item.fields["Product Name"]}
            </Text>
            <Text style={styles.product_date}>
              {new Date(props.item.fields.Posted).toLocaleDateString()}
            </Text>
          </View>
          {isNew ? <IconNew /> : null}
        </View>
      }
      id={props.id}
      left={() => (
        <View style={{ flex: 1 }}>
          {imageURL ? (
            <Image source={{ uri: imageURL }} style={styles.image} />
          ) : (
            <PlaceholderSvg width={150} height={150} />
          )}
        </View>
      )}
      style={{ flex: 1 }}
    >
      <Text>{props.item.fields["Product Name"]}</Text>
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  product_name: {},
  product_date: {},
  image: {
    flex: 1
  }
});
