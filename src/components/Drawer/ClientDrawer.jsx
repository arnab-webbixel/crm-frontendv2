import React from 'react';
import { Drawer, Button } from 'rsuite';

const ClientDrawer = ({ open, onClose, client, placement = 'left' }) => {
  return (
    <Drawer placement={placement} open={open} onClose={onClose}>
      <Drawer.Header>
        <Drawer.Title>Dummy Company Name</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={onClose} className='text-red-500'>Close</Button>
        </Drawer.Actions>
      </Drawer.Header>

      <Drawer.Body>
        <div>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Phone:</strong> +1234567890</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
          <p><strong>Address:</strong> 123 Main Street</p>
          <p><strong>Industry Type:</strong> IT</p>
          <p><strong>Service Type:</strong> Consulting</p>
          <p><strong>Status:</strong> Active</p>
        </div>
      </Drawer.Body>
    </Drawer>
  );
};

export default ClientDrawer;
