import { useMutation, gql } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CREATE_EXPENSE = gql`
  mutation CreateExpense($input: CreateExpenseInput!) {
    createExpense(input: $input) {
      id
      title
      amount
      category
    }
  }
`;

const ExpenseSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  amount: Yup.number()
    .positive("Must be positive")
    .required("Amount is required"),
  category: Yup.string().required("Category is required"),
});

export default function AddExpense() {
  const [createExpense] = useMutation(CREATE_EXPENSE);
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Expense</h2>

        <Formik
          initialValues={{ title: "", amount: "", category: "" }}
          validationSchema={ExpenseSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await createExpense({ variables: { input: values } });
              navigate("/dashboard");
            } catch (err) {
              console.error("Error creating expense:", err);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <Field
                  name="title"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Amount</label>
                <Field
                  name="amount"
                  type="number"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Category</label>
                <Field
                  as="select"
                  name="category"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select category</option>
                  <option value="food">Food</option>
                  <option value="transport">Transport</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-sm text-red-600"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
              >
                {isSubmitting ? "Submitting..." : "Add Expense"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
}
