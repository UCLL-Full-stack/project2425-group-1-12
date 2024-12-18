import { Part } from "@types";
import styles from "@styles/BuildForm.module.css";

interface PartPickerProps {
  availableParts: Part[];
  selectedParts: Part[];
  partType: string;
  onPartSelect: (part: Part) => void;
};

const PartPicker: React.FC<PartPickerProps> = ({ availableParts, selectedParts, partType, onPartSelect  }) => {
  const filteredParts = availableParts.filter((part) => part.type === partType);

  return (
    <div className={styles.partPicker}>
      <h3>{partType}</h3>
      <select
        className={styles.partDropdown}
        onChange={(e) => {
          const selectedPart = filteredParts.find((part) => part.name === e.target.value);
          if (selectedPart) {onPartSelect(selectedPart)};
        }}
      >
        <option value="">Select a {partType}</option>
        {filteredParts && filteredParts.map((part) => (
          <option key={part.name} value={part.name}>
            {part.brand} {part.name} €{part.price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PartPicker;