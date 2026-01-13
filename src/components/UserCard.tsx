import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Button,
  Box,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import type { User } from '../types';

interface UserCardProps {
  user: User;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onPhotoClick?: (photoUrl: string, userName: string) => void;
}

export const UserCard = ({
  user,
  onView,
  onEdit,
  onDelete,
  onPhotoClick,
}: UserCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'primary.main',
          boxShadow: '0 8px 24px rgba(25, 118, 210, 0.15)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Avatar
            src={user.avatar}
            alt={user.name}
            sx={{
              width: 64,
              height: 64,
              mr: 2,
              border: '3px solid #1976d2',
              cursor: onPhotoClick ? 'pointer' : 'default',
              transition: 'transform 0.2s',
              '&:hover': onPhotoClick
                ? {
                    transform: 'scale(1.1)',
                  }
                : {},
            }}
            onClick={() =>
              onPhotoClick && onPhotoClick(user.avatar || '', user.name)
            }
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
              {user.name}
            </Typography>
            <Chip
              label={`@${user.username}`}
              size="small"
              sx={{ mt: 0.5 }}
              color="primary"
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" noWrap>
              {user.email}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {user.phone}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LanguageIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" noWrap>
              {user.website}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BusinessIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" noWrap>
              {user.company.name}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: 'space-between',
          px: 2,
          pb: 2,
        }}
      >
        <Button
          size="small"
          variant="contained"
          onClick={onView}
          sx={{ textTransform: 'none' }}
        >
          View Details
        </Button>
        <Box>
          <IconButton
            size="small"
            onClick={onEdit}
            color="primary"
            sx={{ mr: 1 }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={onDelete} color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};