import React, { useEffect, useState } from "react";
import styles from "@styles/BuildForm.module.css";
import { Build, Part } from "@types";
import { BuildService } from "@services/BuildService";
import { OrderService } from "@services/OrderService";
import { PartService } from "@services/PartService";
import BuildsList from "@components/pcBuilder/BuildsList";
import Builder from "@components/pcBuilder/Builder";

const BuildForm: React.FC = () => {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [activeContent, setActiveContent] = useState('builds');
  const [selectedParts, setSelectedParts] = useState<Part[]>([]);
  const [availableParts, setAvailableParts] = useState<Part[]>([]);
  const [name, setName] = useState<string>("");
  const [preBuild, setPreBuild] = useState<boolean>(false);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const fetchedBuilds = await OrderService.getAllBuildsByUserId();
        setBuilds(fetchedBuilds);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
        else console.error("An unknown error occurred.");
      }
    };

    const fetchParts = async () => {
      try {
        const fetchedParts = await PartService.getAllParts();
        setAvailableParts(fetchedParts);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
        else console.error("An unknown error occurred.");
      }
    };

    fetchParts();
    fetchBuilds();
  }, []);

  const addBuildToOrder = async () => {
    const requiredPartTypes = ["GPU", "CPU", "RAM", "Motherboard", "Case", "PSU", "Storage"];
    const missingParts = requiredPartTypes.filter(
      (type) => !selectedParts.some((part) => part.type === type)
    );

    if (missingParts.length > 0) {
      alert(`Error: Missing the following part types: ${missingParts.join(", ")}`);
      return;
    }

    if (name === "") { alert('Error: Missing name'); return; }

    const build = { name, preBuild, parts: selectedParts };
    const createdBuild = await BuildService.createBuild(build);

    if (createdBuild.name) {
      alert(`Successfully created build ${createdBuild.name}!`);
      setName("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button onClick={() => setActiveContent('builds')}>
          Mijn Builds
        </button>
        <button onClick={() => setActiveContent('new')}>
          Maak een Build
        </button>
      </div>

      <div className={styles.content}>
        {activeContent === 'builds' && <BuildsList builds={builds} />}
        {activeContent === 'new' && ( availableParts.length ? (
          <>
            <Builder
              selectedParts={selectedParts}
              availableParts={availableParts}
              onUpdateSelectedParts={setSelectedParts}
              onNameChange={(e) => setName(e.target.value)}
              onPreBuildChange={(e) => setPreBuild(e.target.checked)}
            />
            <button className={styles.getPartsButton} onClick={addBuildToOrder}>Add to Shopping Cart</button>
          </>
        ) : (<>Loading parts...</>))}
      </div>

    </div>
  );
};

export default BuildForm;