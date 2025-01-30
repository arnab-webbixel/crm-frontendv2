import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const CallTypeEnum = {
  archive: 'archive',
  warmcall: 'warm-call',
  hotcall:'hot-call',
  followup:'follow-up'
};

const AddDialog = ({ open, onClose, onSave, data, onChange, type }) => {
  // Fallback if data is null
  const formData = data || { role: "", password: ""};

  const fields = type === 'staff'
    ? [ { label: 'Emp-ID', name: 'staff_id' },
        { label: 'Name', name: 'staff_name' },
        { label: 'Phone', name: 'phone' },
        { label: 'Email', name: 'email' },
        { label: 'Role', name: 'role', isSelect: true, options: ['salesperson', 'caller', ] },
      ]
    : [
        {label: 'name', name: 'name'},
        { label: 'Company Name', name: 'company_name' },
        { label: 'Phone', name: 'phone' },
        { label: 'Email', name: 'email' },
        { label: 'Address', name: 'address' },
        { label: 'Industry Type', name: 'industry_type' },
        { label: 'Service Type', name: 'service_type' },
        { label: 'Call Type', name: 'call_type', isSelect: true, options: Object.values(CallTypeEnum) },
        { label: 'Remarks', name: 'remarks' },
        { label: 'Status', name: 'status', isSelect: true, options: ['Pending', 'In Progress', 'Follow-Up', 'Closed'] },
      ];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{type === 'staff' ? (formData?.id ? 'Edit Staff' : 'Add New Staff') : (formData?.id ? 'Edit Client' : 'Add New Client')}</DialogTitle>
      <DialogContent>
        {fields.map(({ label, name, isSelect, options }) => (
          isSelect ? (
            <FormControl fullWidth margin="normal" key={name}>
              <InputLabel>{label}</InputLabel>
              <Select
                label={label}
                name={name}
                value={formData[name] || ''}
                onChange={onChange}
              >
                {options.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <TextField
              key={name}
              label={label}
              fullWidth
              name={name}
              value={formData[name] || ''}
              onChange={onChange}
              margin="normal"
            />
          )
        ))}
        {/* Conditionally render password field if the role is selected as 'salesperson' or 'caller' */}
        {(formData.role === 'salesperson' || formData.role === 'caller') && (
          <TextField
            label="Password"
            fullWidth
            name="password"
            type="password"
            value={formData.password || ''}
            onChange={onChange}
            margin="normal"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={()=>{
          console.log("Button clicked.")
          onSave()}} 
        color="primary">{formData?.id ? `Save ${type === 'staff' ? 'Staff' : 'Client'}` : `Add ${type === 'staff' ? 'Staff' : 'Client'}`}</Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddDialog;