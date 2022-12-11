import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  IconButton,
  List,
  ListItem,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useState } from 'react';
import { Tag } from '../tag/tag';
import { DiCaptchaLogo } from '../logo/dicaptcha';

export interface Captcha {
  image: { url: string; width: number; height: number };
}

interface CaptchaProps {
  open: boolean;
  size: number;
  close: () => void;
  refresh: () => void;
  quiz: Captcha;
}
const BASE_SEZE_XS = 350;
const BASE_SIZE_MD = 450;
export function Captcha({
  open = true,
  close,
  refresh,
  quiz = {
    image: {
      url: '/static/images/squirrel.webp',
      width: 629,
      height: 629,
    },
  },
}: Partial<CaptchaProps>) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  // custom select tags
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <Dialog onClose={close} open={open}>
      <Card
        sx={{
          width: '100%',
          maxWidth: { xs: BASE_SEZE_XS, md: BASE_SIZE_MD },
        }}
      >
        <Stack
          sx={{
            width: '100%',
            maxHeight: { xs: BASE_SEZE_XS, md: BASE_SIZE_MD },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Image
            alt={'cptcha quiz image background'}
            fill
            src={quiz.image.url}
            draggable={false}
            style={{ objectFit: 'cover' }}
          />
          <Box
            sx={{
              WebkitBackdropFilter: 'blur(20px)',
              backdropFilter: 'blur(20px)',
              position: 'absolute',
              inset: 0,
            }}
          />
          <Image
            alt={'cptcha quiz image'}
            width={quiz.image.width}
            height={quiz.image.height}
            src={quiz.image.url}
            draggable={false}
            style={{
              objectFit: 'contain',
              maxWidth: '100%',
              maxHeight: isMobile ? BASE_SEZE_XS : BASE_SIZE_MD,
              position: 'relative',
            }}
          />
        </Stack>

        <CardContent sx={{ pb: { xs: 0.5, md: 2 } }}>
          <Typography
            sx={{ fontSize: { xs: '1rem', md: '1.2rem' } }}
            gutterBottom
            variant="h5"
            component="div"
          >
            Choose tags that best describe the image:
          </Typography>

          <List sx={{ flexDirection: 'row', flexWrap: 'wrap' }} disablePadding>
            {['cute', 'nice', 'addorable', 'javascript', 'rust'].map(tag => (
              <Tag
                key={tag}
                label={tag}
                onSelect={() => setSelectedTags([...selectedTags, tag])}
                onDelete={() =>
                  setSelectedTags(selectedTags.filter(t => t !== tag))
                }
                selected={selectedTags.includes(tag)}
              />
            ))}
          </List>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <IconButton size="small" onClick={refresh}>
            <RefreshRoundedIcon />
          </IconButton>
          <DiCaptchaLogo width={30} height={30} />
          <Button size="small" variant="contained" sx={{ boxShadow: 'none' }}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
}
