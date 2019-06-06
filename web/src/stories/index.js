import React from 'react';

import {storiesOf} from '@storybook/react';
import InfoCard from '../components/InfoCard';
import InfoDetalis from '../components/InfoDetails';
import Sidebar from '../components/Sidebar';

storiesOf('Legislator', module)
    .add('Overview', () => <InfoCard />)
    .add('Details', () => <InfoDetalis />)
    .add('Sidebar', () => <Sidebar />);
