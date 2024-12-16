import React, { useEffect, useState } from "react";
import styles from "@styles/BuildForm.module.css";
import BuildCard from "@components/cards/BuildCard";
import { Build } from "@types";
import { BuildService } from "@services/BuildService";

// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import { faDesktop } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BuildForm: React.FC = () => {
  const [builds, setBuilds] = useState<Build[]>([]);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const fetchedBuilds = await BuildService.getAllBuilds();
        setBuilds(fetchedBuilds);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An unknown error occurred.");
        }
      }
    };
    fetchBuilds();
  }, []);

  console.log(builds);

  return (
    <div className={styles.container}>

      <div className={styles.labels}>
          <button onClick={() => console.log('clicked button!')}>Mijn builds</button>
          <button onClick={() => console.log('clicked button!')}>Maak een build</button>
      </div>

      {/* <div className={styles.buildCards}>
        <BuildCard />
      </div> */}

      <div className={styles.builds}>
        {builds.length > 0 ? (
          builds.map((build) => (
            <BuildCard key={build.id} {...build} />
          ))
        ) : (
          <p>Loading builds...</p>
        )}
      </div>
    </div>
  );
};

export default BuildForm;