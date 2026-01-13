import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Avatar,
  Box,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Close as CloseIcon,
  PhotoCamera as PhotoCameraIcon,
  ZoomIn as ZoomInIcon,
} from '@mui/icons-material';
import { useUserContext } from '../context/UserContext';
import { useState, useEffect, useRef } from 'react';
import type { UserFormData } from '../types';

export const UserModal = () => {
  const {
    isModalOpen,
    modalMode,
    selectedUser,
    closeModal,
    addUser,
    updateUser,
  } = useUserContext();

  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    position: '',
    department: '',
    employeeId: '',
    salary: '',
    joinDate: '',
    accountNumber: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof UserFormData, string>>
  >({});

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info',
  });

  const [photoDialog, setPhotoDialog] = useState(false);

  const [photoPreviewUrl, setPhotoPreviewUrl] = useState('');
  const photoPreviewRef = useRef('');

  const fieldRefs = useRef<
    Partial<Record<keyof UserFormData, HTMLInputElement | null>>
  >({});

  useEffect(() => {
    if (selectedUser && (modalMode === 'edit' || modalMode === 'view')) {
      setFormData({
        name: selectedUser.name,
        username: selectedUser.username,
        email: selectedUser.email,
        phone: selectedUser.phone,
        website: selectedUser.website,
        position: selectedUser.position || '',
        department: selectedUser.department || '',
        employeeId: selectedUser.employeeId || '',
        salary: selectedUser.salary?.toString() || '',
        joinDate: selectedUser.joinDate || '',
        accountNumber: selectedUser.accountNumber || '',
        address: {
          street: selectedUser.address.street,
          suite: selectedUser.address.suite,
          city: selectedUser.address.city,
          zipcode: selectedUser.address.zipcode,
        },
        company: {
          name: selectedUser.company.name,
          catchPhrase: selectedUser.company.catchPhrase,
          bs: selectedUser.company.bs,
        },
      });
    } else if (modalMode === 'add') {
      setFormData({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        position: '',
        department: '',
        employeeId: '',
        salary: '',
        joinDate: '',
        accountNumber: '',
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
        },
        company: {
          name: '',
          catchPhrase: '',
          bs: '',
        },
      });
    }
    if (photoPreviewRef.current) {
      URL.revokeObjectURL(photoPreviewRef.current);
      photoPreviewRef.current = '';
    }
    setPhotoPreviewUrl('');
    setErrors({});
  }, [selectedUser, modalMode, isModalOpen]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (photoPreviewRef.current) {
      URL.revokeObjectURL(photoPreviewRef.current);
    }
    const url = URL.createObjectURL(file);
    photoPreviewRef.current = url;
    setPhotoPreviewUrl(url);
    e.target.value = '';
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.username.trim())
      newErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      const orderedFields: (keyof UserFormData)[] = [
        'name',
        'username',
        'email',
        'phone',
      ];

      const firstInvalidField = orderedFields.find(
        (field) => !!newErrors[field]
      );

      if (firstInvalidField) {
        const el = fieldRefs.current[firstInvalidField];
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.focus();
          }, 0);
        }
      }

      return;
    }

    if (modalMode === 'add') {
      addUser(formData);
      setSnackbar({
        open: true,
        message: 'User has been successfully added to the system.',
        severity: 'success',
      });
    } else if (modalMode === 'edit' && selectedUser) {
      updateUser(selectedUser.id, formData);
      setSnackbar({
        open: true,
        message: 'User information has been successfully updated.',
        severity: 'success',
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof UserFormData] as object),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
    // Clear error when user starts typing
    if (errors[field as keyof UserFormData]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const isViewMode = modalMode === 'view';
  const title =
    modalMode === 'add'
      ? 'Add New User'
      : modalMode === 'edit'
        ? 'Edit User'
        : 'User Details';

  return (
    <>
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            border: '2px solid',
            borderColor: 'primary.main',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 2,
            bgcolor: 'primary.main',
            color: 'white',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <IconButton
            onClick={closeModal}
            size="small"
            sx={{
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {selectedUser && isViewMode && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 3,
                position: 'relative',
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  sx={{
                    width: 120,
                    height: 120,
                    border: '4px solid #1976d2',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                  onClick={() => setPhotoDialog(true)}
                />
                <IconButton
                  size="small"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                  onClick={() => setPhotoDialog(true)}
                >
                  <ZoomInIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          )}

          {!isViewMode && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <Box
                component="label"
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <Avatar
                  src={
                    photoPreviewUrl ||
                    (modalMode === 'edit' ? selectedUser?.avatar : undefined)
                  }
                  alt={formData.name}
                  sx={{
                    width: 96,
                    height: 96,
                    border: '4px solid #1976d2',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: 'primary.main',
                    color: 'white',
                    borderRadius: '50%',
                    width: 30,
                    height: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid white',
                  }}
                >
                  <PhotoCameraIcon fontSize="small" />
                </Box>
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handlePhotoUpload}
                />
              </Box>
            </Box>
          )}

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              inputRef={(el) => {
                fieldRefs.current.name = el;
              }}
              disabled={isViewMode}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
            <TextField
              fullWidth
              label="Username"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              inputRef={(el) => {
                fieldRefs.current.username = el;
              }}
              disabled={isViewMode}
              error={!!errors.username}
              helperText={errors.username}
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              inputRef={(el) => {
                fieldRefs.current.email = el;
              }}
              disabled={isViewMode}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
            <TextField
              fullWidth
              label="Phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              inputRef={(el) => {
                fieldRefs.current.phone = el;
              }}
              disabled={isViewMode}
              error={!!errors.phone}
              helperText={errors.phone}
              required
            />
            <TextField
              fullWidth
              label="Website"
              value={formData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              disabled={isViewMode}
              sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}
            />

            <Typography
              variant="h6"
              sx={{
                mt: 2,
                mb: 1,
                fontWeight: 600,
                gridColumn: { xs: '1', sm: '1 / -1' },
              }}
            >
              Financial Information
            </Typography>
            <TextField
              fullWidth
              label="Position"
              value={formData.position}
              onChange={(e) => handleChange('position', e.target.value)}
              disabled={isViewMode}
              placeholder="e.g., Financial Analyst, Manager"
            />
            <TextField
              fullWidth
              label="Department"
              value={formData.department}
              onChange={(e) => handleChange('department', e.target.value)}
              disabled={isViewMode}
              placeholder="e.g., Finance, Accounting"
            />
            <TextField
              fullWidth
              label="Employee ID"
              value={formData.employeeId}
              onChange={(e) => handleChange('employeeId', e.target.value)}
              disabled={isViewMode}
              placeholder="e.g., EMP-12345"
            />
            <TextField
              fullWidth
              label="Salary"
              type="number"
              value={formData.salary}
              onChange={(e) => handleChange('salary', e.target.value)}
              disabled={isViewMode}
              placeholder="e.g., 5000000"
              InputProps={{
                startAdornment: (
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    Rp
                  </Typography>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Join Date"
              type="date"
              value={formData.joinDate}
              onChange={(e) => handleChange('joinDate', e.target.value)}
              disabled={isViewMode}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Account Number"
              value={formData.accountNumber}
              onChange={(e) => handleChange('accountNumber', e.target.value)}
              disabled={isViewMode}
              placeholder="e.g., 1234567890"
            />

            <Typography
              variant="h6"
              sx={{
                mt: 2,
                mb: 1,
                fontWeight: 600,
                gridColumn: { xs: '1', sm: '1 / -1' },
              }}
            >
              Address
            </Typography>
            <TextField
              fullWidth
              label="Street"
              value={formData.address.street}
              onChange={(e) => handleChange('address.street', e.target.value)}
              disabled={isViewMode}
            />
            <TextField
              fullWidth
              label="Suite"
              value={formData.address.suite}
              onChange={(e) => handleChange('address.suite', e.target.value)}
              disabled={isViewMode}
            />
            <TextField
              fullWidth
              label="City"
              value={formData.address.city}
              onChange={(e) => handleChange('address.city', e.target.value)}
              disabled={isViewMode}
            />
            <TextField
              fullWidth
              label="Zipcode"
              value={formData.address.zipcode}
              onChange={(e) =>
                handleChange('address.zipcode', e.target.value)
              }
              disabled={isViewMode}
            />

            <Typography
              variant="h6"
              sx={{
                mt: 2,
                mb: 1,
                fontWeight: 600,
                gridColumn: { xs: '1', sm: '1 / -1' },
              }}
            >
              Company
            </Typography>
            <TextField
              fullWidth
              label="Company Name"
              value={formData.company.name}
              onChange={(e) => handleChange('company.name', e.target.value)}
              disabled={isViewMode}
              sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}
            />
            <TextField
              fullWidth
              label="Catch Phrase"
              value={formData.company.catchPhrase}
              onChange={(e) =>
                handleChange('company.catchPhrase', e.target.value)
              }
              disabled={isViewMode}
              sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}
            />
            <TextField
              fullWidth
              label="Business"
              value={formData.company.bs}
              onChange={(e) => handleChange('company.bs', e.target.value)}
              disabled={isViewMode}
              sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={closeModal} sx={{ textTransform: 'none' }}>
            {isViewMode ? 'Close' : 'Cancel'}
          </Button>
          {!isViewMode && (
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ textTransform: 'none' }}
            >
              {modalMode === 'add' ? 'Add User' : 'Save Changes'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Photo Viewer Dialog */}
      <Dialog
        open={photoDialog}
        onClose={() => setPhotoDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'primary.main',
            color: 'white',
          }}
        >
          <Typography variant="h6">
            {selectedUser?.name} - Profile Photo
          </Typography>
          <IconButton
            onClick={() => setPhotoDialog(false)}
            size="small"
            sx={{
              color: 'white',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'black',
              minHeight: 400,
            }}
          >
            <img
              src={selectedUser?.avatar}
              alt={selectedUser?.name}
              style={{
                maxWidth: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPhotoDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Success */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};