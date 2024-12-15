import React from "react";
import styles from "../../styles/BuildForm.module.css";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BuildForm: React.FC = () => {
  return (
    <div className={styles.container}>

      <div className={styles.labels}>
        <label className={styles.label}>
        Mijn builds
        <FontAwesomeIcon
        className="label-icons"
        icon={faDesktop}
        />
        </label>
        <label className={styles.label}>
        Maak een build
        <FontAwesomeIcon
        className="label-icons"
        icon={faPlus}
        />
        </label>
      </div>

    </div>
  );
};

export default BuildForm;