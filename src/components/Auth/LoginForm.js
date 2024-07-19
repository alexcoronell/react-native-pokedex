import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Keyboard,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";

import useAuth from "../../hooks/useAuth";

import { user, userDetails } from "../../utils/userDB";

export default function LoginForm() {
  const [error, setError] = useState("");
  const { login } = useAuth()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formValue) => {
      setError("");
      const { username, password } = formValue;
      if (username !== user.username || password !== user.password) {
        setError("El usuario o la contraseña no son correctos");
      } else {
        login(userDetails)
      }
    },
  });

  return (
    <View>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue("username", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      <Button title="Entrar" onPress={() => formik.handleSubmit()} />
      <Text style={styles.error}>{formik.errors.username}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

function initialValues() {
  return {
    username: "",
    password: "",
  };
}

function validationSchema() {
  return {
    username: Yup.string().required("El usuario es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  };
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    textAlign: "center",
    color: "#f00",
    marginTop: 20,
  },
});
