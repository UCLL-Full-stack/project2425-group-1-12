import PartPicker from "@components/pcBuilder/PartPicker";
import { Part } from "@types";
import styles from "@styles/BuildForm.module.css";

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

  return (
    <div className={styles.builder}>
      <h2>Nieuwe Build</h2>

      <div className={styles.partPickerList}>
        {["CPU", "GPU", "Motherboard", "RAM", "Storage", "Case", "PSU"].map((partType) => (
          <PartPicker
            key={partType}
            availableParts={availableParts}
            selectedParts={selectedParts}
            partType={partType}
            onPartSelect={handlePartSelect}
          />
        ))}

        <div>
          <h3>Name</h3>
          <input
            placeholder="Name"
            onChange={onNameChange}
          />
        </div>

        <div>
          <h3>Pre build?</h3>
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