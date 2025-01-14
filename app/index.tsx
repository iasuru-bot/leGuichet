import { GestureResponderEvent, Switch, Text, View } from "react-native";
import Loader from "@/components/loader";
import Input from "@/components/input";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Navbar from "@/components/navbar";
import HomePage from "./HomePage";

export default function Index() {
  return (
    <><HomePage /> <Navbar/></>
  );
}
