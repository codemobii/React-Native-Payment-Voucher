import Axios from "axios";
import React, { Component } from "react";
import { Alert, Picker, View } from "react-native";
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
      voucher_no: makeid(10),
      ledger: "ledger",
      account: "account",
      pay_to: "",
      email_address: "",
      phone_number: "",
      // Voucher Items
      payment_method: "Cash",
      reference_no: "",
      item_description: "",
      amount: "",
      serial_number: 1,
      total_items: 0,
      loadingAdd: false,
      // Voucher Signing
      authorized_by: "",
      recieved_by: "",
      loading: false,
    };
  }

  addItem = async () => {
    //Getting the input values
    const {
      payment_method,
      reference_no,
      item_description,
      amount,
      serial_number,
      total_items,
      voucher_no,
    } = this.state;

    let year = new Date().getFullYear();
    let abbr = "BHL";
    let randCodeRef = makeid(5);
    const refCode = abbr + "/" + year + "/" + randCodeRef;
    let sn = total_items + 1;
    console.log(reference_no);

    if (payment_method === "" && reference_no === "" && amount === "") {
      Alert.alert("Please fill in all item inputs");
    } else {
      this.setState({ loadingAdd: true }, () => {
        fetch("http://saed-portal.000webhostapp.com/buiforts/add_item.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            serial_number: serial_number,
            payment_method: payment_method,
            reference_no: refCode,
            item_description: item_description,
            amount: amount,
            voucher_no: voucher_no,
          }),
        })
          .then((response) => {
            console.warn(response.statusText);
            this.setState({
              total_items: sn,
              serial_number: serial_number + 1,
              item_description: "",
              amount: "",
            });
          })
          .then((responseJsonFromServer) => {
            Alert.alert("Item added successfully");
          })
          .catch((error) => {
            console.error(error);
            alert("An error occured here");
          })
          .finally(() => this.setState({ loadingAdd: false }));
      });
    }
  };

  postVoucher = async () => {
    //Getting the input values
    const {
      voucher_no,
      ledger,
      account,
      pay_to,
      email_address,
      phone_number,
      authorized_by,
      recieved_by,
    } = this.state;

    if (
      pay_to === "" &&
      email_address === "" &&
      phone_number === "" &&
      authorized_by === "" &&
      recieved_by === ""
    ) {
      Alert.alert("Please fill in the inputs!");
    } else {
      this.setState({ loading: true }, () => {
        fetch(
          "http://saed-portal.000webhostapp.com/buiforts/create_voucher.php",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              voucher_no: voucher_no,
              ledger: ledger,
              account: account,
              pay_to: pay_to,
              email_address: email_address,
              phone_number: phone_number,
              authorized_by: authorized_by,
              recieved_by: recieved_by,
            }),
          }
        )
          .then((response) => {
            console.warn(response.statusText);
            this.setState({
              total_items: 0,
              serial_number: 1,
              pay_to: "",
              email_address: "",
              phone_number: "",
              authorized_by: "",
              recieved_by: "",
            });
          })
          .then((responseJsonFromServer) => {
            Alert.alert("Voucher created successfully!");
          })
          .catch((error) => {
            console.error(error);
            alert("An error occured here");
          })
          .finally(() => this.setState({ loading: false }));
      });
    }
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
              dense
              label="Amount paid"
              style={{ marginBottom: 10 }}
              value={this.state.amount}
              keyboardType="number-pad"
              onChangeText={(am) => this.setState({ amount: am })}
            />
            <TextInput
              multiline
              label="Description"
              value-={this.state.item_description}
              onChangeText={(desc) => this.setState({ item_description: desc })}
              style={{ marginBottom: 10, height: 100 }}
            />
            <Button
              loading={this.state.loadingAdd}
              onPress={() => this.addItem()}
            >
              Add item
            </Button>
          </View>

          {/**Other voucher information **/}
          <Text style={{ padding: 15 }}> Voucher Infomations </Text>
          <View style={{ backgroundColor: "#fff", padding: 15 }}>
            <TextInput
              dense
              label="Payment to"
              style={{ marginBottom: 10 }}
              value={this.state.pay_to}
              onChangeText={(p) => this.setState({ pay_to: p })}
            />
            <TextInput
              dense
              label="Email address"
              style={{ marginBottom: 10 }}
              value={this.state.email_address}
              onChangeText={(e) => this.setState({ email_address: e })}
            />
            <TextInput
              dense
              label="Phone number"
              style={{ marginBottom: 10 }}
              value={this.state.phone_number}
              onChangeText={(pn) => this.setState({ phone_number: pn })}
            />
          </View>
          <Text style={{ padding: 15 }}> Voucher Signing </Text>
          <View style={{ backgroundColor: "#fff", padding: 15 }}>
            <TextInput
              dense
              label="Authorized by"
              style={{ marginBottom: 10 }}
              value={this.state.authorized_by}
              onChangeText={(a) => this.setState({ authorized_by: a })}
            />
            <TextInput
              dense
              label="Received by"
              style={{ marginBottom: 10 }}
              value={this.state.recieved_by}
              onChangeText={(r) => this.setState({ recieved_by: r })}
            />
          </View>
          <View style={{ padding: 15, marginBottom: 25 }}>
            <Button
              mode="contained"
              loading={this.state.loading}
              onPress={() => this.postVoucher()}
            >
              Complete
            </Button>
          </View>
        </ScrollView>
      </>
    );
  }
}
