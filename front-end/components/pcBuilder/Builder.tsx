import PartPicker from "@components/pcBuilder/PartPicker";
import { Part } from "@types";
import styles from "@styles/BuildForm.module.css";
import { useTranslation } from "react-i18next";

interface BuilderProps {
  onPreBuildChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  availableParts: Part[];
  selectedParts: Part[];
  onUpdateSelectedParts: (parts: Part[]) => void;
};

const Builder: React.FC<BuilderProps> = ({
  onPreBuildChange,
  onNameChange,
  availableParts,
  selectedParts,
  onUpdateSelectedParts
}) => {
  const handlePartSelect = (selectedPart: Part) => {
    const updatedParts = [...selectedParts.filter((part) => part.type !== selectedPart.type), selectedPart];
    onUpdateSelectedParts(updatedParts);
  };

  const { t } = useTranslation();

  const partTypes = [
    "CPU",
    "GPU",
    t("buildForm.selectMotherboardTitle"),
    "RAM",
    t("buildForm.selectStorageTitle"),
    t("buildForm.selectCaseTitle"),
    "PSU",
  ];

  return (
    <div className={styles.builder}>
      <h2>{t('buildForm.title')}</h2>

      <div className={styles.partPickerList}>
        {partTypes.map((partType) => (
          <PartPicker
            key={partType}
            availableParts={availableParts}
            selectedParts={selectedParts}
            partType={partType}
            onPartSelect={handlePartSelect}
          />
        ))}

        <div>
          <h3>{t('buildForm.selectNameTitle')}</h3>
          <input
            placeholder={t('buildForm.selectNameTitle')}
            onChange={onNameChange}
          />
        </div>

        <div>
          <h3>{t('buildForm.selectPrebuildTitle')}</h3>
          <input
            className={styles.checkbox}
            type="checkbox"
            onChange={onPreBuildChange}
          />
        </div>

      </div>
    </div>
  );
};

export default Builder;