import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Avatar,
  IconButton,
  Chip,
  Popover,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
  FilterList as FilterListIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  LocationOn as LocationOnIcon,
  Close as CloseIcon,
  Work as WorkIcon,
  AccountBalance as AccountBalanceIcon,
  CalendarToday as CalendarIcon,
  Badge as BadgeIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { UserCard } from './UserCard';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import type { User } from '../types';

type ViewMode = 'grid' | 'list';

export const UserList = () => {
  const { users, loading, error, openModal, deleteUser } = useUserContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLElement | null>(null);
  const [companyFilter, setCompanyFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<{
    url: string;
    name: string;
  } | null>(null);

  const searchLower = searchTerm.toLowerCase();
  const companyOptions = Array.from(
    new Set(users.map((u) => u.company?.name).filter(Boolean))
  ).sort();
  const cityOptions = Array.from(
    new Set(users.map((u) => u.address?.city).filter(Boolean))
  ).sort();

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.username.toLowerCase().includes(searchLower)
    )
    .filter((user) =>
      companyFilter ? user.company?.name === companyFilter : true
    )
    .filter((user) => (cityFilter ? user.address?.city === cityFilter : true));

  const activeFilterCount = [companyFilter, cityFilter].filter(Boolean).length;

  const handleDeleteClick = (userId: number) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handlePhotoClick = (photoUrl: string, userName: string) => {
    setSelectedPhoto({ url: photoUrl, name: userName });
    setPhotoDialogOpen(true);
  };

  const handleOpenFilter = (e: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(e.currentTarget);
  };

  const handleCloseFilter = () => {
    setFilterAnchorEl(null);
  };

  const handleClearFilter = () => {
    setCompanyFilter('');
    setCityFilter('');
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  const renderListView = (user: User) => (
    <Paper
      key={user.id}
      elevation={0}
      sx={{
        p: 2.5,
        mb: 2,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: '0 4px 12px rgba(25, 118, 210, 0.15)',
        },
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{
            width: 80,
            height: 80,
            border: '3px solid',
            borderColor: 'primary.main',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
          onClick={() => handlePhotoClick(user.avatar || '', user.name)}
        />
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 1.5,
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {user.name}
              </Typography>
              <Chip
                label={`@${user.username}`}
                size="small"
                color="primary"
                sx={{ fontWeight: 500 }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size="small"
                onClick={() => openModal('view', user)}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => openModal('edit', user)}
                sx={{
                  bgcolor: 'success.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'success.dark' },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => handleDeleteClick(user.id)}
                sx={{
                  bgcolor: 'error.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'error.dark' },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
              gap: 1.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {user.phone}
              </Typography>
            </Box>
            {user.position && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WorkIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {user.position}
                  {user.department && ` - ${user.department}`}
                </Typography>
              </Box>
            )}
            {user.employeeId && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BadgeIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {user.employeeId}
                </Typography>
              </Box>
            )}
            {user.salary && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountBalanceIcon
                  fontSize="small"
                  sx={{ color: 'text.secondary' }}
                />
                <Typography variant="body2" color="text.secondary">
                  Rp {user.salary.toLocaleString('id-ID')}
                </Typography>
              </Box>
            )}
            {user.joinDate && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarIcon
                  fontSize="small"
                  sx={{ color: 'text.secondary' }}
                />
                <Typography variant="body2" color="text.secondary">
                  Joined: {user.joinDate}
                </Typography>
              </Box>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BusinessIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {user.company.name}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon
                fontSize="small"
                sx={{ color: 'text.secondary' }}
              />
              <Typography variant="body2" color="text.secondary">
                {user.address.city}, {user.address.street}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          bgcolor: 'white',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            Users
            <Chip
              label={filteredUsers.length}
              color="primary"
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(_, newMode) => newMode && setViewMode(newMode)}
              size="small"
              sx={{
                '& .MuiToggleButton-root': {
                  px: 2,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                  border: '1px solid',
                  borderColor: 'divider',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  },
                },
              }}
            >
              <ToggleButton value="list" aria-label="list view">
                <ViewListIcon sx={{ mr: 0.5 }} fontSize="small" />
                List
              </ToggleButton>
              <ToggleButton value="grid" aria-label="grid view">
                <GridViewIcon sx={{ mr: 0.5 }} fontSize="small" />
                Grid
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleOpenFilter}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: 2,
                py: 1,
                whiteSpace: 'nowrap',
              }}
            >
              {activeFilterCount ? `Filter (${activeFilterCount})` : 'Filter'}
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => openModal('add')}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                py: 1,
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4,
                },
              }}
            >
              Add User
            </Button>
          </Box>
        </Box>

        <TextField
          fullWidth
          placeholder="Search by name, email, or username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: 'grey.50',
              '&:hover': {
                bgcolor: 'white',
              },
              '&.Mui-focused': {
                bgcolor: 'white',
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={handleCloseFilter}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{ sx: { p: 2, minWidth: 280 } }}
      >
        <Box sx={{ display: 'grid', gap: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Company</InputLabel>
            <Select
              label="Company"
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {companyOptions.map((company) => (
                <MenuItem key={company} value={company}>
                  {company}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>City</InputLabel>
            <Select
              label="City"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {cityOptions.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              onClick={handleClearFilter}
              sx={{ textTransform: 'none' }}
            >
              Clear
            </Button>
            <Button
              onClick={handleCloseFilter}
              variant="contained"
              sx={{ textTransform: 'none' }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Popover>

      {filteredUsers.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            textAlign: 'center',
            py: 8,
            border: '2px dashed',
            borderColor: 'divider',
            bgcolor: 'grey.50',
          }}
        >
          <SearchIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No users found
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Try adjusting your search terms
          </Typography>
        </Paper>
      ) : viewMode === 'grid' ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onView={() => openModal('view', user)}
              onEdit={() => openModal('edit', user)}
              onDelete={() => handleDeleteClick(user.id)}
              onPhotoClick={handlePhotoClick}
            />
          ))}
        </Box>
      ) : (
        <Box>{filteredUsers.map((user) => renderListView(user))}</Box>
      )}

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />

      <Dialog
        open={photoDialogOpen}
        onClose={() => setPhotoDialogOpen(false)}
        maxWidth="md"
        PaperProps={{
          sx: {
            bgcolor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={() => setPhotoDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              },
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedPhoto && (
            <Box>
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  p: 2,
                  borderBottomLeftRadius: '8px',
                  borderBottomRightRadius: '8px',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {selectedPhoto.name}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ bgcolor: 'rgba(0, 0, 0, 0.7)', p: 2 }}>
          <Button
            onClick={() => setPhotoDialogOpen(false)}
            variant="contained"
            sx={{ textTransform: 'none' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};