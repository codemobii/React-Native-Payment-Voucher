import React, { Component } from "react";
import { Picker, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, Text, Button } from "react-native-paper";
import ToNavigator from "../navigations/top_navigator";

function makeid(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default class CreateVoucher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Voucher Info
      date: new Date(),
      voucher_no: "",
      ledger: "ledger",
      account: "account",
      pay_to: "",
      email_address: "",
      phone_number: "",
      // Voucher Items
      payment_method: "",
      reference_no: "",
      item_description: "",
      amount: "",
      serial_number: "",
      total_items: 0,
      loadingAdd: false,
      // Voucher Signing
      authorized_by: "",
      recieved_by: "",
      loading: false,
    };
  }

  addItem = async () => {
    let year = new Date().getFullYear();
    let abbr = "BHL";
    let randCodeRef = makeid(5);
    const refCode = abbr + "/" + year + "/" + randCodeRef;
    let sn = this.state.total_items + 1;
    this.setState({ reference_no: refCode, total_items: sn });
    console.log(this.state.reference_no);

    //Getting the input values
    const {
      payment_method,
      reference_no,
      item_description,
      amount,
      serial_number,
      total_items,
      loading,
    } = this.state;
  };

  render() {
    return (
      <>
        <ToNavigator title="Create voucher" back={false} />
        <ScrollView>
          <Text style={{ padding: 15 }}>
            {" "}
            Voucher Items ({this.state.total_items} items added){" "}
          </Text>
          <View style={{ backgroundColor: "#fff", padding: 15 }}>
            <Picker
              style={{ height: 50, width: "100%" }}
              selectedValue={this.state.payment_method}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ payment_method: itemValue })
              }
            >
              <Picker.Item label="Cash" value="Cash" />
              <Picker.Item label="Cheque" value="Cheque" />
              <Picker.Item label="Transfer" value="Transfer" />
            </Picker>
            <TextInput
              multiline
              label="Description"
              value-={this.state.item_description}
              onChangeText={(desc) => this.setState({ item_description: desc })}
              style={{ marginBottom: 10, height: 100 }}
            />
            <Button onPress={() => this.addItem()}>Add item</Button>
          </View>
          <Text style={{ padding: 15 }}> Voucher Infomations </Text>
          <View style={{ backgroundColor: "#fff", padding: 15 }}>
            <TextInput dense label="Payment to" style={{ marginBottom: 10 }} />
            <TextInput
              dense
              label="Email address"
              style={{ marginBottom: 10 }}
            />
            <TextInput
              dense
              label="Phone number"
              style={{ marginBottom: 10 }}
            />
          </View>
          <Text style={{ padding: 15 }}> Voucher Signing </Text>
          <View style={{ backgroundColor: "#fff", padding: 15 }}>
            <TextInput
              dense
              label="Authorized by"
              style={{ marginBottom: 10 }}
            />
            <TextInput dense label="Received by" style={{ marginBottom: 10 }} />
          </View>
          <View style={{ padding: 15, marginBottom: 25 }}>
            <Button mode="contained" onPress={() => {}}>
              Complete
            </Button>
          </View>
        </ScrollView>
      </>
    );
  }
}
