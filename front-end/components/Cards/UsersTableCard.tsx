import React from "react";
import styles from "@styles/loginForm.module.css";

const UsersTableCard: React.FC = () => {
  const users = [
    {
      email: "joe.biden@us.gov",
      password: "CannotRemember",
      role: "admin",
    },
    {
      email: "bernie.sanders@yahoo.com",
      password: "FeelTheBern",
      role: "staff",
    },
    {
      email: "barack.obama@gmail.com",
      password: "YesYouCan",
      role: "user",
    }
  ]

  return (
    <table className={styles.usersTable}>
      <tr>
        <th>Email</th>
        <th>Password</th>
        <th>Role</th>
      </tr>
      {users.length > 0 ? (
        users.map((user) => (
          <tr key={user.email} {...user}>
            <td><pre>{user.email}</pre></td>
            <td><pre>{user.password}</pre></td>
            <td><pre>{user.role}</pre></td>
          </tr>
        ))
      ) : (
        <p>Loading builds...</p>
      )}
    </table>
  );
};

export default UsersTableCard;