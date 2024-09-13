import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ClassForm.module.css";
import { database } from "../../config/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const ClassRegisForm = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    class: "",
    gender: "",
  });
  const [userData, setUserData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addData();
  };

  const addData = async () => {
    try {
      let userInfo = {
        Firstname: input.firstname,
        Lastname: input.lastname,
        email: input.email,
        class: input.class,
        phoneNo: input.phoneNo,
        dateOfBirth: input.dateOfBirth,
        qualification: input.qualification,
        gender: input.gender,
      };

      const postData = await addDoc(
        collection(database, "Class Registration Data"),
        userInfo
      );

      console.log("User data added:", postData);
      alert("Class Registration successful!");

      navigate("/Dashboard/Class/ClassList");
    } catch (error) {
      console.error("Error adding user data:", error);
      alert("Error signing. Please try again.");
    }
  };

  useEffect(() => {
    getData();
  }, [refresh]);

  const getData = async () => {
    try {
      const arr = [];
      const getData = await getDocs(
        collection(database, "Class Registration Data")
      );

      getData.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });

      setUserData(arr);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.wrapper}>
          <form onSubmit={handleSubmit}>
            <h1>CLASS REGISTRATION FORM</h1>

            <div className={styles.inputBox}>
              <label htmlFor="firstname">First Name</label>
              <input
                name="firstname"
                value={input.firstname}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                type="text"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className={styles.inputBox}>
              <label htmlFor="lastname">Last Name</label>
              <input
                name="lastname"
                value={input.lastname}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                type="text"
                placeholder="Enter your last name"
                required
              />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                value={input.email}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="phoneNo">Phone no</label>
              <input
                name="phoneNo"
                value={input.phoneNo}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                type="number"
                placeholder="Enter your phone no"
                required
              />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="dateOfBirth">Date Of Birth</label>
              <input
                name="dateOfBirth"
                value={input.dateOfBirth}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                type="date"
                placeholder="Enter your Date Of Birth"
                required
              />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="qualification">Qualification</label>
              <input
                name="qualification"
                value={input.qualification}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                type="qualification"
                placeholder="Enter your qualification"
                required
              />
            </div>

            <div className={styles.inputBox}>
              <label htmlFor="class">Class</label>
              <input
                name="class"
                value={input.class}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                type="text"
                placeholder="Enter your class"
                required
              />
            </div>

            <div className={styles.inputBox}>
              <label>
                Gender <span style={{ fontWeight: "bold" }}>:</span>
              </label>
              <div className={styles.checkboxGroup}>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={input.gender === "male"}
                    onChange={(e) =>
                      setInput({ ...input, gender: e.target.value })
                    }
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={input.gender === "female"}
                    onChange={(e) =>
                      setInput({ ...input, gender: e.target.value })
                    }
                  />
                  Female
                </label>
              </div>
            </div>

            <button type="submit" className={styles.btn}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ClassRegisForm;
