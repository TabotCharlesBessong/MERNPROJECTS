import { useMutation, gql } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      email
    }
  }
`;

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

export default function Register() {
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen w-[100vw] flex items-center justify-center bg-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await register({ variables: { input: values } });
              navigate("/login");
            } catch (err) {
              console.error(err);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
              >
                {isSubmitting ? "Creating..." : "Register"}
              </button>

              {error && (
                <p className="text-sm text-red-600 text-center">
                  {error.message}
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
}
