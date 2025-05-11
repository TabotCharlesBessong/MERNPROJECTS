import { useMutation, gql } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        email
      }
    }
  }
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen flex w-[100vw] items-center justify-center bg-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to Your Account
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const { data } = await login({ variables: { input: values } });

              if (data?.login?.token) {
                localStorage.setItem("accessToken", data.login.token);
                navigate("/dashboard");
              }
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
                {isSubmitting ? "Logging in..." : "Login"}
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
