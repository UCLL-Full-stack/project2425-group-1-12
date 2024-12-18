import { Build } from "@types";
import styles from "@styles/BuildForm.module.css";
import BuildCard from "@components/cards/BuildCard";

interface BuildsListProps {
  builds: Build[];
};

const BuildsList: React.FC<BuildsListProps> = ({ builds }) => (
  <>
    <h2>Builds</h2>
    <div className={styles.builds}>
      {builds.length > 0 ? (
        builds.map((build) => (
          <BuildCard key={build.id} {...build} />
        ))
      ) : (
        <p>Loading builds...</p>
      )}
    </div>
  </>
);


export default BuildsList;