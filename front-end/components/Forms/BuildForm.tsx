import React, { useEffect, useState } from "react";
import styles from "@styles/BuildForm.module.css";
import { Build, Part } from "@types";
import { BuildService } from "@services/BuildService";
import { OrderService } from "@services/OrderService";
import { PartService } from "@services/PartService";
import BuildsList from "@components/pcBuilder/BuildsList";
import Builder from "@components/pcBuilder/Builder";
import { useTranslation } from "next-i18next";
import useSWR from "swr";

const BuildForm: React.FC = () => {
  const [activeContent, setActiveContent] = useState('builds');
  const [selectedParts, setSelectedParts] = useState<Part[]>([]);
  const [name, setName] = useState<string>("");
  const [preBuild, setPreBuild] = useState<boolean>(false);
  const { t } = useTranslation();

  const fetchBuilds = async () => {
    const builds = await OrderService.getAllBuildsByUserId();
    return builds;
  };

  const fetchParts = async () => {
    const parts = await PartService.getAllParts();
    return parts;
  };

  const { data: builds, error: buildsError } = useSWR('/orders/builds/user/', fetchBuilds);
  const { data: availableParts, error: partsError } = useSWR('/parts/', fetchParts);

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

  if (!builds || !availableParts) return <div>Loading...</div>;
  if (buildsError || partsError) return <div>Error: {buildsError?.message || partsError?.message || 'Error loading'}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button onClick={() => setActiveContent('builds')}>
          { t('buildForm.myBuildsButton') }
        </button>
        <button onClick={() => setActiveContent('new')}>
          { t('buildForm.createBuildButton')}
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
            <button className={styles.getPartsButton} onClick={addBuildToOrder}>{t('buildForm.addShopingCartButton')}</button>
          </>
        ) : (<>Loading parts...</>))}
      </div>

    </div>
  );
};

export default BuildForm;