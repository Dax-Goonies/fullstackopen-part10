import { Pressable, Text, TextInput, View } from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';

import { commonStyles } from '../styles/common';
import useSignUp from '../hooks/useSignUp';


const initialValues = {
  username: '',
  password: '',
  confirmation: '',
};

const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(5, "Username is too short!")
      .max(30, "Username is too long!")
      .matches(/^[a-zA-Z0-9]/, "Username can only caintain letters and numbers")
      .required("Username is required"),
    password: yup
      .string()
      .min(5, "Password must be at least 5 characters long")
      .max(50, "Password is too long!")
      .required("Password is required"),
    confirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], "Password and password confirmation must match")
      .required('Password confirmation is required')
});

// Sign up container: Creating new user
export const RegisterForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <View style={commonStyles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={commonStyles.input}
        onBlur={formik.handleBlur('username')}
      />
      {formik.touched.username && formik.errors.username &&
        <Text style={commonStyles.error}>{formik.errors.username}</Text>
      }
            <TextInput 
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={commonStyles.input}
        onBlur={formik.handleBlur('password')}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password &&
        <Text style={commonStyles.error}>{formik.errors.password}</Text>
      }
            <TextInput 
        placeholder="Password confirmation"
        value={formik.values.confirmation}
        onChangeText={formik.handleChange('confirmation')}
        style={commonStyles.input}
        onBlur={formik.handleBlur('confirmation')}
        secureTextEntry
      />
      {formik.touched.confirmation && formik.errors.confirmation &&
        <Text style={commonStyles.error}>{formik.errors.confirmation}</Text>
      }
      <Pressable onPress={formik.handleSubmit}>
        <Text style={commonStyles.button}>Sign up</Text>
      </Pressable>
    </View>
  );
};

// Sign up component
const SignUp = () => {
  const [signUp] = useSignUp();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    try {
      await signUp({ username, password });
      navigate('/');
    } catch (e) {
      const message = e.graphQLErrors?.[0]?.message || "Something went wrong";
      setError(message);
    }
  };

  return (
    <>
      {error && <Text style={commonStyles.error}>{error}</Text>}
      <RegisterForm onSubmit={onSubmit} />
    </>
  );
};

export default SignUp;

