import { Chip, ListItem } from '@mui/material';

interface TagProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function Tag({ label, selected, onSelect, onDelete }: TagProps) {
  return (
    <ListItem
      disablePadding
      sx={{ display: 'inline-flex', width: 'fit-content', m: 0.5 }}
    >
      <Chip
        sx={{ borderRadius: 2 }}
        color={selected ? 'info' : undefined}
        onClick={selected ? onDelete : onSelect}
        label={label}
      />
    </ListItem>
  );
}
