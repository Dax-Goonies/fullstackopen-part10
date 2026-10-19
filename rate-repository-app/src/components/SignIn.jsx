import { Pressable, Text, TextInput, View } from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';

import useSignIn from '../hooks/useSignIn';
import { commonStyles } from '../styles/common';


const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username is too short!")
    .max(15, "Username is too long!")
    .matches(/^[a-zA-Z0-9]/, "Username can only caintain letters and numbers")
    .required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required")
});

// Sign in container: Get access to creating reviews, and see own reviews
export const SignInForm = ({ onSubmit }) => {
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
      <Pressable onPress={formik.handleSubmit}>
        <Text style={commonStyles.button}>Sign in</Text>
      </Pressable>
    </View>
  );
};

// Sign in component
const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await signIn(values);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;