import React, { useState } from 'react';
import {
  TextField,
  Tabs,
  Tab,
  Button,
  IconButton,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Joyride from 'react-joyride';
import { helpContent } from './help-content';
import HelpModal from './HelpModal';

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpKey, setHelpKey] = useState(null);
  const [selectedNav, setSelectedNav] = useState('Cockpit Controls');
  const [runTour, setRunTour] = useState(false);

  const navItems = [
    'Networking',
    'Environments',
    'Infrastructure',
    'Cockpit Controls',
    'Redirects',
  ];

  const redirectData = [
    { source: '/old-page', target: '/new-page', code: '301', status: 'Active', created: '2025-03-01', updated: '2025-03-04' },
    { source: '/blog/post1', target: '/articles/post1', code: '302', status: 'Inactive', created: '2025-02-15', updated: '2025-03-02' },
    { source: '/shop/item', target: '/store/product', code: '301', status: 'Active', created: '2025-01-10', updated: '2025-03-05' },
  ];

  const handleHelpClick = (key) => {
    setHelpKey(key);
    setHelpOpen(true);
  };

  const handleDeepDive = () => {
    setHelpOpen(false);
    setRunTour(true);
  };

  const tourSteps = [
    { target: '.redirect-source', content: <div dangerouslySetInnerHTML={{ __html: helpContent['redirects-deep-dive']?.source }} /> },
    { target: '.redirect-target', content: <div dangerouslySetInnerHTML={{ __html: helpContent['redirects-deep-dive']?.target }} /> },
    { target: '.redirect-code', content: <div dangerouslySetInnerHTML={{ __html: helpContent['redirects-deep-dive']?.code }} /> },
    { target: '.redirect-status', content: <div dangerouslySetInnerHTML={{ __html: helpContent['redirects-deep-dive']?.status }} /> },
    { target: '.redirect-created', content: <div dangerouslySetInnerHTML={{ __html: helpContent['redirects-deep-dive']?.created }} /> },
    { target: '.redirect-updated', content: <div dangerouslySetInnerHTML={{ __html: helpContent['redirects-deep-dive']?.updated }} /> },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Joyride
        steps={tourSteps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        callback={(data) => { if (data.status === 'finished' || data.status === 'skipped') setRunTour(false); }}
        styles={{ options: { zIndex: 10000 } }}
      />
      <Box sx={{ width: 250, bgcolor: '#f5f5f5', p: 2, borderRight: '1px solid #ddd' }}>
        <Typography variant="h6" gutterBottom>Navigation</Typography>
        <List>
          {navItems.map((item) => (
            <ListItem
              key={item}
              button
              onClick={() => setSelectedNav(item)}
              sx={{ bgcolor: selectedNav === item ? '#e0e0e0' : 'inherit', '&:hover': { bgcolor: '#e0e0e0' } }}
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1, p: 4, overflowY: 'auto' }}>
        <Typography variant="h4" gutterBottom>{selectedNav}</Typography>
        {selectedNav === 'Cockpit Controls' ? (
          <>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <TextField label="Input Field" variant="outlined" sx={{ mr: 1 }} />
              <IconButton onClick={() => handleHelpClick('field-help')}>
                <HelpOutlineIcon />
              </IconButton>
            </Box>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
                <Tab label="Tab 1" />
                <Tab label="Tab 2" />
              </Tabs>
              <IconButton onClick={() => handleHelpClick('tabs-help')}>
                <HelpOutlineIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button variant="contained" sx={{ mr: 1 }}>Action Button</Button>
              <IconButton onClick={() => handleHelpClick('button-help')}>
                <HelpOutlineIcon />
              </IconButton>
            </Box>
          </>
        ) : selectedNav === 'Redirects' ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Button variant="contained">Add</Button>
              <Button variant="contained">Upload</Button>
              <Button variant="contained">Publish</Button>
              <IconButton onClick={() => handleHelpClick('redirects')}>
                <HelpOutlineIcon />
              </IconButton>
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="redirects table">
                <TableHead>
                  <TableRow>
                    <TableCell className="redirect-source">Source</TableCell>
                    <TableCell className="redirect-target">Target</TableCell>
                    <TableCell className="redirect-code">Code</TableCell>
                    <TableCell className="redirect-status">Status</TableCell>
                    <TableCell className="redirect-created">Created</TableCell>
                    <TableCell className="redirect-updated">Updated</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {redirectData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.source}</TableCell>
                      <TableCell>{row.target}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.created}</TableCell>
                      <TableCell>{row.updated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Typography variant="body1">Placeholder content for {selectedNav}. Add your content here!</Typography>
        )}
        <HelpModal
          open={helpOpen}
          onClose={() => setHelpOpen(false)}
          content={helpKey ? helpContent[helpKey] : ''}
          onDeepDive={helpKey === 'redirects' ? handleDeepDive : null}
        />
      </Box>
    </Box>
  );
}

export default App;