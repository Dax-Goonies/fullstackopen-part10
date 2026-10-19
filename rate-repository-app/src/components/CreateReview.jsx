import { Pressable, Text, TextInput, View } from 'react-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';

import useCreateReview from '../hooks/useCreateReview';
import { commonStyles } from '../styles/common';


const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string().required("Repository owner name is required"),
  repositoryName: yup
    .string().required("Repository name is required"),
  rating: yup
    .number()
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100")
    .required("Rating is required"),
  text: yup.string().min(4, "Review cannot be empty"),
});

// Form to add new review matching the DB
export const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <View style={commonStyles.container}>
      <TextInput
        placeholder='Repository owner name'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        style={commonStyles.input}
        onBlur={formik.handleBlur('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName &&
        <Text style={commonStyles.error}>{formik.errors.ownerName}</Text>
      }
      <TextInput
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        style={commonStyles.input}
        onBlur={formik.handleBlur('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName &&
        <Text style={commonStyles.error}>{formik.errors.repositoryName}</Text>
      }
      <TextInput
        placeholder='Rating between 0 and 100'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        style={commonStyles.input}
        onBlur={formik.handleBlur('rating')}
        keyboardType="numeric"
      />
      {formik.touched.rating && formik.errors.rating &&
        <Text style={commonStyles.error}>{formik.errors.rating}</Text>
      }
      <TextInput
        placeholder='Review'
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        style={commonStyles.input}
        onBlur={formik.handleBlur('text')}
      />
      {formik.touched.text && formik.errors.text &&
        <Text style={commonStyles.error}>{formik.errors.text}</Text>
      }
      <Pressable onPress={formik.handleSubmit}>
        <Text style={commonStyles.button}>Create a review</Text>
      </Pressable>
    </View>
  )
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview({
        ...values,
        rating: Number(values.rating),
      });
      navigate(`/repositories/${data.createReview.repositoryId}`);
    } catch (e) {
        console.log(e);
    }
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;
