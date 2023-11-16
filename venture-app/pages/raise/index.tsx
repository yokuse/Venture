import type { NextPage } from "next";
import {
  withFormik,
  FormikProps,
  FormikErrors,
  Form,
  Field,
  Formik,
} from "formik";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useUser from "../../lib/useUser";
import router from "next/router";
import { resolve } from "path";

// Shape of form values
interface FormValues {
  title: string;
  description: string;
  highlights: string;
  busi_model: string;
  file: any;
  fileName: any;
  image: string;
  createdAt: string;
  updatedAt: string;
  closingDate: string;
  closingDateFill: Date;
  email: any;
}

async function create(data: FormValues) {
  try {
    fetch(`/api/create`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then(() => {
      router.push("/portfolio");
      alert("Project Submited");
    });
  } catch (error) {
    console.log(error);
    alert("Something is wrong cannot submit!");
  }
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: any & FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting, message, setFieldValue, values } =
    props;
  const { user, mutateUser } = useUser();
  values.email = user?.email;
  const errorsString: string | undefined = errors.closingDate;
  return (
    <div className="container mx-auto px-8">
      <h1 className="px-0 py-10 font-bold mr-4 text-5xl"> Raise a project</h1>
      <Form>
        <div className="px-4 input-container">
          <label className="mr-4 text-2xl">
            Title: &nbsp;
            <Field
              className="input-field"
              id="title"
              name="title"
              type="text"
              placeholder="Project Title"
            />
            {touched.title && errors.title && (
              <div className="text-orange-700">{errors.title}</div>
            )}
          </label>
          <br />
          <label className="mr-4 text-2xl pt-6">
            Project Description:
            <br />
            <Field
              component="textarea"
              rows="4"
              cols="80"
              className="form-control p-2 my-2"
              id="description"
              name="description"
              variant="outlined"
              label="PROJECT SHORT_DESCRIPTION"
              fullWidth
            />
            {touched.description && errors.description && (
              <div className="text-orange-700">{errors.description}</div>
            )}
          </label>
          <br />

          <label className="mr-4 text-2xl pt-6">
            Company Highlights:
            <br />
            <Field
              component="textarea"
              rows="4"
              cols="80"
              className="form-control p-2 my-2"
              id="highlights"
              name="highlights"
              variant="outlined"
              label="PROJECT SHORT_Hightlight"
              fullWidth
            />
            {touched.highlights && errors.highlights && (
              <div className="text-orange-700">{errors.highlights}</div>
            )}
          </label>

          <br />

          <label className="mr-4 text-2xl pt-6">
            Business Model:
            <br />
            <Field
              component="textarea"
              rows="4"
              cols="80"
              className="form-control p-2 my-2"
              id="busi_model"
              name="busi_model"
              variant="outlined"
              label="PROJECT SHORT_Hightlight"
              fullWidth
            />
            {touched.busi_model && errors.busi_model && (
              <div className="text-orange-700">{errors.busi_model}</div>
            )}
          </label>
          <br />

          <br />
          <label className="mr-4 text-2xl pt-6">
            Upload Project Image:
            <br />
            <input
              className="my-4"
              id="file"
              name="file"
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              onChange={async (event) => {
                const reader = new FileReader();
                console.log(typeof(event.target.files![0]))
                console.log(event.target.files![0])
                reader.readAsDataURL(event.target.files![0])
                reader.onload = () => resolve(reader.result as string)
                reader.onloadend = () => {setFieldValue("file", reader.result);
                setFieldValue("fileName", event.target.files![0].name);
              }
              }}
            />
          </label>
          <br />

          <br />
          <label className="mr-4 text-2xl pt-6">
            Select Funding Close Date:
            <br />
            <DatePicker
              selected={values.closingDateFill}
              dateFormat="MMMM d, yyyy"
              className="form-control my-2"
              name="closingDateFill"
              onChange={(date) => setFieldValue("closingDateFill", date)}
            />
            {touched.closingDate && errors.closingDate && (
              <div className="text-orange-700">{errors.closingDate}</div>
            )}
          </label>
          <br />
          <br />
          <button className="px-8 py-3 bg-indigo-600 mt-10 mb-5 " type="submit">
            Submit
          </button>
          {isSubmitting && values.busi_model && (
            <div className="text-emerald-700 text-2xl p-2 mb-20">
              {" "}
              Form Submitting...
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  initialTitle?: string;
  message: string; // if this passed all the way through you might do this or make a union type
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      title: props.initialTitle || "",
      description: "",
      highlights: "",
      busi_model: "",
      image: "",
      file: "",
      fileName: "",
      closingDate: "",
      updatedAt: "",
      createdAt: "",
      closingDateFill: new Date(),
      email: null,
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.title) {
      errors.title = "Required!";
    } else if (!isValidTitle(values.title)) {
      errors.title = "Title too long!";
    }
    if (!values.description) {
      errors.description = "Required!";
    } else if (!isValidDescription(values.description)) {
      errors.description = "Description too long!";
    }
    if (!values.highlights) {
      errors.highlights = "Required!";
    } else if (!isValidDescription(values.highlights)) {
      errors.highlights = "Highlights too long!";
    }
    if (!values.busi_model) {
      errors.busi_model = "Required!";
    } else if (!isValidDescription(values.busi_model)) {
      errors.busi_model = "Business Model Description too long!";
    }
    if (!values.closingDateFill) {
      errors.closingDate = "Required!";
    } else if (!isValidDate(values.closingDateFill)) {
      errors.closingDate = "Closing date cannot be less than today date!";
    }

    return errors;
  },

  handleSubmit: (values) => {

    const sanitizeHtml = require("sanitize-html");
    try {
      const now = new Date();
      values.closingDate = values.closingDateFill.toString();
      values.createdAt = now.toString();
      values.updatedAt = now.toString();
      create(values);
    } catch (error) {
      console.log(error);
    }
    // // If file is uploaded handle submit
    // if (values.file != null) {
    //   // FIle UPload to firebase
    //   const imageRef = ref(storage, `images/${values.file.name + v4()}`);
    //   console.log("filename: " + values.file.name);
    //   try {
    //     uploadBytes(imageRef, values.file).then(() => {
    //       listAll(imageRef).then(() => {
    //         getDownloadURL(imageRef).then((url) => {
    //           values.image = url;
    //           const now = new Date();
    //           values.closingDate = values.closingDateFill.toString();
    //           values.createdAt = now.toString();
    //           values.updatedAt = now.toString();
    //           // do submitting things when file is successfully uploaded
    //           try {
    //             create(values);
    //           } catch (error) {
    //             console.log(error);
    //           }
    //         });
    //       });
    //     });
    //   } catch (error) {
    //     console.log("FIle Uploading ERROR:" + error);
    //   }
    // } else {
    //   // submit even when file is not uploaded
    //   const now = new Date();
    //   values.closingDate = values.closingDateFill.toString();
    //   values.createdAt = now.toString();
    //   values.updatedAt = now.toString();
    //   // do submitting things
    //   try {
    //     create(values);
    //   } catch (error) {
    //     ;
    //   }
    // }
  },
})(InnerForm);

const Raise: NextPage = ({}) => {
  const [startDate, setStartDate] = useState(new Date());
  const { user, mutateUser } = useUser();
  if (user?.isLoggedIn === true) {
    return (
      <div>
        <div className="flex justify-center container mx-auto ">
          <MyForm message="Post A Project" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto">
        <h3> Not Authorise to raise projects!</h3>
      </div>
    );
  }
};

export default Raise;

// custom validation
function isValidTitle(title: string) {
  if (title.length > 100) {
    return false;
  }
  return true;
}
function isValidDescription(description: string) {
  if (description.length > 2000) {
    return false;
  }
  return true;
}
function isValidDate(closingDate: Date) {
  const now = new Date();
  console.log("date is " + closingDate);
  return closingDate > now;
}