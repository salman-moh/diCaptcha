import { Chip, ListItem, ListItemProps } from '@mui/material';

interface TagProps {
  label: string;
  selected: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
  sx?: ListItemProps['sx'];
}

export function Tag({ label, selected, onSelect, onDelete, sx }: TagProps) {
  return (
    <ListItem
      disablePadding
      sx={{ display: 'inline-flex', width: 'fit-content', m: 0.5, ...sx }}
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
