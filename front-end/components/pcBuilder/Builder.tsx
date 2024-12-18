import PartPicker from "@components/pcBuilder/PartPicker";
import { Part } from "@types";
import styles from "@styles/BuildForm.module.css";

interface BuilderProps {
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  availableParts: Part[];
  selectedParts: Part[];
  onUpdateSelectedParts: (parts: Part[]) => void;
};

const Builder: React.FC<BuilderProps> = ({
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
        {["GPU", "CPU", "RAM", "Motherboard", "Case", "PSU", "Storage"].map((partType) => (
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

      </div>
    </div>
  );
};

export default Builder;