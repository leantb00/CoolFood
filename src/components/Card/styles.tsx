import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  tabHeader: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 0,
    paddingHorizontal: 15
  },
  tabHeaderItem: {
    flex: 0.6,
    flexDirection: "column",
    opacity: 0.9,
    borderBottomColor: "#ffffff6b",
    borderBottomWidth: 2
  },
  tabHeaderItemTitle: {
    textAlign: "center",
    fontSize: 35,
    color: "#fff"
  },
  tabHeaderItemText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 10,
    paddingBottom: 10,
    marginTop: -5
  },
  appList: {
    marginTop: 25,
    backgroundColor: "#fff",
    borderTopWidth: 0
  },
  listItem: {
    backgroundColor: "#fff",
    paddingHorizontal: 17,
    paddingVertical: 10,
    marginTop: 5,
    flexDirection: "row",
    // borderColor:'#e6e6e6',
    // borderBottomWidth:2,
    flex: 1
  },
  listItemblock: {
    flexDirection: "row",
    flex: 2
  },
  listItemContainer: {
    paddingHorizontal: 15,
    flex: 1
  },
  listItemTitle: {
    fontFamily: "Roboto-Bold",
    color: "#da332e",
    fontWeight: "bold",
    fontSize: 16
  },
  listItemText: {
    fontFamily: "EDPPreon-Regular",
    fontSize: 14,
    color: "#4f4f4f"
  },
  listItemDate: {
    fontSize: 14,
    color: "#b8b6b6"
  },
  checkedList: {
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 10,
    padding: 0,
    backgroundColor: "transparent",
    borderWidth: 0
  }
});
