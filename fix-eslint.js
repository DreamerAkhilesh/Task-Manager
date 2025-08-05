#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files to fix with their specific changes
const fixes = [
  {
    file: 'client/src/components/profile/Profile.js',
    changes: [
      { from: "import { logoutUser } from '../../store/thunks/authThunks';", to: "// import { logoutUser } from '../../store/thunks/authThunks';" },
      { from: "  const { error } = useSelector((state) => state.auth);", to: "  // const { error } = useSelector((state) => state.auth);" }
    ]
  },
  {
    file: 'client/src/components/profile/UserProfile.js',
    changes: [
      { from: "import { ChartBarIcon } from '@heroicons/react/24/outline';", to: "// import { ChartBarIcon } from '@heroicons/react/24/outline';" }
    ]
  },
  {
    file: 'client/src/components/tasks/TaskForm.js',
    changes: [
      { from: "import { CheckCircleIcon } from '@heroicons/react/24/outline';", to: "// import { CheckCircleIcon } from '@heroicons/react/24/outline';" }
    ]
  },
  {
    file: 'client/src/components/tasks/TaskList.js',
    changes: [
      { from: "import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';", to: "// import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';" },
      { from: "import { ArrowsUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';", to: "// import { ArrowsUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';" },
      { from: "  const [selectedTask, setSelectedTask] = useState(null);", to: "  // const [selectedTask, setSelectedTask] = useState(null);" },
      { from: "  const [showBulkActions, setShowBulkActions] = useState(false);", to: "  // const [showBulkActions, setShowBulkActions] = useState(false);" },
      { from: "  const [showFilters, setShowFilters] = useState(false);", to: "  // const [showFilters, setShowFilters] = useState(false);" },
      { from: "  const handleDelete = (taskId) => {", to: "  // const handleDelete = (taskId) => {" },
      { from: "  const handleEdit = (task) => {", to: "  // const handleEdit = (task) => {" },
      { from: "  const handleViewDetails = (task) => {", to: "  // const handleViewDetails = (task) => {" }
    ]
  },
  {
    file: 'client/src/components/users/UserList.js',
    changes: [
      { from: "import { getUserById } from '../../store/thunks/userThunks';", to: "// import { getUserById } from '../../store/thunks/userThunks';" },
      { from: "import { CalendarIcon, FlagIcon } from '@heroicons/react/24/outline';", to: "// import { CalendarIcon, FlagIcon } from '@heroicons/react/24/outline';" },
      { from: "import { PencilSquareIcon } from '@heroicons/react/24/solid';", to: "// import { PencilSquareIcon } from '@heroicons/react/24/solid';" },
      { from: "import { ArrowsUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';", to: "// import { ArrowsUpDownIcon, CheckIcon } from '@heroicons/react/24/outline';" },
      { from: "  const [userToDelete, setUserToDelete] = useState(null);", to: "  // const [userToDelete, setUserToDelete] = useState(null);" },
      { from: "  const [showBulkActions, setShowBulkActions] = useState(false);", to: "  // const [showBulkActions, setShowBulkActions] = useState(false);" },
      { from: "  const handleDelete = (userId) => {", to: "  // const handleDelete = (userId) => {" },
      { from: "  const handleEdit = (user) => {", to: "  // const handleEdit = (user) => {" }
    ]
  },
  {
    file: 'client/src/components/users/UserProfileView.js',
    changes: [
      { from: "import { ChartBarIcon } from '@heroicons/react/24/outline';", to: "// import { ChartBarIcon } from '@heroicons/react/24/outline';" },
      { from: "import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';", to: "// import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';" }
    ]
  }
];

// Apply fixes
fixes.forEach(({ file, changes }) => {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    changes.forEach(({ from, to }) => {
      content = content.replace(from, to);
    });
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed: ${file}`);
  } else {
    console.log(`❌ File not found: ${file}`);
  }
});

console.log('\n🎉 ESLint fixes applied!');
console.log('Now try deploying to Vercel again.'); 